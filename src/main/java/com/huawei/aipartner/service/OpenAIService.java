package com.huawei.aipartner.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;
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
import com.huawei.aipartner.dto.Message;
import com.huawei.aipartner.dto.OpenAIResponse;

@Service
public class OpenAIService {

    private static final String REPORT_SYSTEM_PROMPT = "你是一个专业的数据分析师，擅长根据数据生成智慧报表。请在回答中提供文字描述，如果回答中有图形输出的需求，请提供一个完整的html页面，在其中使用chart.js生成图形，图形中应该包含图例，图形应包含全部图形内容，宽度不超过页面宽度的70%。";

    private static String REPORT_USER_PROMPT = "请根据待分析报表数据进行数据分析，生成智慧报表。";

    @Value("${openai.base-url}")
    private String openAIBaseUrl;

    @Value("${openai.api-key}")
    private String openAIApiKey;

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private FunctionService functionService;

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

    /**
     * 预处理用户请求，添加系统提示词以及用户数据（存储在redis中）。
     * 
     * @param chatRequest 用户请求
     * @return 预处理后的用户请求
     */
    public ChatRequest preprocessReportChatRequest(ChatRequest chatRequest, String uid) {
        // 从redis获取数据
        String data = redisTemplate.opsForValue().get(uid + ".report.data");

        data = data == null ? "" : data;

        // 添加用户数据
        String userPrompt = REPORT_USER_PROMPT;
        Optional<Message> um = chatRequest.getMessages().stream().filter(n -> n.getRole().equals("user")).findFirst();
        if (um.isPresent()) {
            userPrompt += um.get().getContent();
        }
        userPrompt += "\n待分析报表数据：" + data;

        // 添加系统提示词
        chatRequest.setMessages(new ArrayList<>(Arrays.asList(
                new Message("system", REPORT_SYSTEM_PROMPT),
                new Message("user", userPrompt))));

        return chatRequest;
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