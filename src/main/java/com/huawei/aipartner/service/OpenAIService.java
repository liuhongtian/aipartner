package com.huawei.aipartner.service;

import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.huawei.aipartner.dto.OpenAIRequest;
import com.huawei.aipartner.dto.ChatRequest;
import com.huawei.aipartner.dto.ChatResponse;
import com.huawei.aipartner.dto.OpenAIResponse;

@Service
public class OpenAIService {

    @Value("${openai.base-url}")
    private String openAIBaseUrl;

    @Value("${openai.api-key}")
    private String openAIApiKey;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    FunctionService functionService;

    private final RestTemplate restTemplate = new RestTemplate();
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public OpenAIService() {
        this.objectMapper = new ObjectMapper();
        this.webClient = WebClient.builder()
                .baseUrl(openAIBaseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public ResponseEntity<ChatResponse> chat(String uid, String model, ChatRequest chatRequest) {
        System.out.println("chatRequest: " + chatRequest.getMessages().get(1).getContent());
        // 构建请求头
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openAIApiKey);

        // 构建发送给 openAI 的请求体
        OpenAIRequest llmRequest = new OpenAIRequest();
        llmRequest.setModel(model);
        llmRequest.setMessages(chatRequest.getMessages());
        llmRequest.setStream(false);
        redisTemplate.opsForValue().set(uid + ".chat.request", llmRequest.toString());
        redisTemplate.expire(uid + ".chat.request", 1, java.util.concurrent.TimeUnit.DAYS);

        // 发送请求到 openAI
        HttpEntity<OpenAIRequest> request = new HttpEntity<>(llmRequest, headers);
        String url = openAIBaseUrl + "/v1/chat/completions";
        // 以下请求获得的响应报文，忽略了OpenAIResponse中的多余属性，只留下了Message属性。如果必要，可以返回OpenAIResponse。
        ChatResponse chatResponse = new ChatResponse();
        try {
            ResponseEntity<String> rawResponse = restTemplate.postForEntity(
                url,
                request,
                String.class
            );
            if (rawResponse.getBody() != null) {
                try {
                    System.out.println("openaiResponse: " + rawResponse.getBody());
                    redisTemplate.opsForValue().set(uid + ".chat.response", rawResponse.getBody()==null?"":rawResponse.getBody());
                    redisTemplate.expire(uid + ".chat.response", 1, java.util.concurrent.TimeUnit.DAYS);

                    OpenAIResponse openaiResponse = objectMapper.readValue(rawResponse.getBody(), OpenAIResponse.class);
                    chatResponse.setMessages(Stream.of(openaiResponse.getChoices()).map(c -> c.getMessage().parseContent()).toList());
                    return new ResponseEntity<>(chatResponse, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    chatResponse.setError("解析JSON失败: " + e.getMessage());
                    return new ResponseEntity<>(chatResponse, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                System.out.println("请求失败: 没有响应");
                chatResponse.setError("请求失败: 没有响应");
                return new ResponseEntity<>(chatResponse, HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            chatResponse.setError("请求失败: " + e.getMessage());
            return new ResponseEntity<>(chatResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public Flux<ServerSentEvent<String>> chatStream(String model, ChatRequest chatRequest) {
        // 构建 openAI 请求
        OpenAIRequest llmRequest = new OpenAIRequest();
        llmRequest.setModel(model);
        llmRequest.setMessages(chatRequest.getMessages());
        llmRequest.setStream(true);  // 启用流式响应

        return webClient.post()
                .uri("/api/v1/openai/chat/completions")
                .header("Authorization", "Bearer " + openAIApiKey)
                .bodyValue(llmRequest)
                .retrieve()
                .bodyToFlux(String.class)
                .map(chunk -> {
                    try {
                        // 处理 SSE 数据块
                        if (chunk.startsWith("data: ")) {
                            chunk = chunk.substring(6);
                        }
                        if ("[DONE]".equals(chunk)) {
                            return ServerSentEvent.<String>builder()
                                    .event("done")
                                    .build();
                        }
                        return ServerSentEvent.<String>builder()
                                .data(chunk)
                                .build();
                    } catch (Exception e) {
                        return ServerSentEvent.<String>builder()
                                .event("error")
                                .data("Error processing response: " + e.getMessage())
                                .build();
                    }
                });
    }

    /**
     * 发起Function Calling请求到LLM
     * @param model
     * @param chatRequest
     * @return
     */
    public ResponseEntity<ChatResponse> functionCalling(String model, ChatRequest chatRequest) {
        System.out.println("chatRequest: " + chatRequest.getMessages().get(1).getContent());
        // 构建请求头
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + openAIApiKey);

        // 构建发送给 openAI 的请求体
        OpenAIRequest llmRequest = new OpenAIRequest();
        llmRequest.setModel(model);
        llmRequest.setMessages(chatRequest.getMessages());
        llmRequest.setStream(false);
        llmRequest.setTools(functionService.getAvailableFunctions()); // 设置可用的工具

        // 发送请求到 openAI
        HttpEntity<OpenAIRequest> request = new HttpEntity<>(llmRequest, headers);
        String url = openAIBaseUrl + "/v1/chat/completions";
        // 以下请求获得的响应报文，忽略了OpenAIResponse中的多余属性，只留下了Message属性。如果必要，可以返回OpenAIResponse。
        ChatResponse chatResponse = new ChatResponse();
        try {
            ResponseEntity<String> rawResponse = restTemplate.postForEntity(
                url,
                request,
                String.class
            );
            if (rawResponse.getBody() != null) {
                try {
                    System.out.println("openaiResponse: " + rawResponse.getBody());
                    OpenAIResponse openaiResponse = objectMapper.readValue(rawResponse.getBody(), OpenAIResponse.class);
                    chatResponse.setMessages(Stream.of(openaiResponse.getChoices()).filter(c -> c.getFinishReason().equals("tool_calls")).map(c -> c.getMessage().parseToolCalls()).toList());
                    return new ResponseEntity<>(chatResponse, HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                    chatResponse.setError("解析JSON失败: " + e.getMessage());
                    return new ResponseEntity<>(chatResponse, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            } else {
                System.out.println("请求失败: 没有响应");
                chatResponse.setError("请求失败: 没有响应");
                return new ResponseEntity<>(chatResponse, HttpStatus.NO_CONTENT);
            }
        } catch (Exception e) {
            e.printStackTrace();
            chatResponse.setError("请求失败: " + e.getMessage());
            return new ResponseEntity<>(chatResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

} 