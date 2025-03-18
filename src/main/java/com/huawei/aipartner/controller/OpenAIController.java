package com.huawei.aipartner.controller;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;

import com.huawei.aipartner.dto.ChatRequest;
import com.huawei.aipartner.dto.ChatResponse;
import com.huawei.aipartner.dto.Message;
import com.huawei.aipartner.service.OpenAIService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {

    private static final String SYSTEM_PROMPT = "你是一个专业的数据分析师，擅长根据数据生成智慧报表。请在回答中提供文字描述，如果回答中有图形输出的需求，请提供一个完整的html页面，在其中使用chart.js生成图形，图形中应该包含图例，图形应包含全部图形内容，宽度不超过页面宽度的70%。";

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    private final OpenAIService chatService;

    public OpenAIController(OpenAIService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat/{model}")
    public ResponseEntity<ChatResponse> chat(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest) {
        return chatService.chat(model, chatRequest);
    }

    /**
     * 智能报表分析
     * 
     * @param model       使用的模型，例如：deepseek-chat，deepseek-reasoner
     * @param chatRequest 用户请求
     * @param uid         用户ID
     * @return 分析结果
     */
    @PostMapping("/report/{model}")
    public ResponseEntity<ChatResponse> report(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest,
            @RequestParam(value = "UID", required = true) String uid) {
        return chatService.chat(model, preprocessChatRequest(chatRequest, uid));
    }

    /**
     * 预处理用户请求，添加系统提示词以及用户数据（存储在redis中）。
     * 
     * @param chatRequest 用户请求
     * @return 预处理后的用户请求
     */
    private ChatRequest preprocessChatRequest(ChatRequest chatRequest, String uid) {
        //从redis获取数据
        String data = redisTemplate.opsForValue().get(uid + ".report.data");

        data = data == null ? "" : data;

        // 添加用户数据
        String userPrompt = "请根据待分析报表数据进行数据分析，生成智慧报表。" + chatRequest.getMessages().stream().filter(n -> n.getRole().equals("user")).findFirst().get().getContent() + "\n待分析报表数据：" + data;
        
        // 添加系统提示词
        chatRequest.setMessages(new ArrayList<>(Arrays.asList(
            new Message("system", SYSTEM_PROMPT),
            new Message("user", userPrompt)
        )));

        return chatRequest;
    }

    // Function
    // Calling，完整的逻辑需要先调用functionCalling，然后根据functionCalling的返回结果，再调用chatWithFunctionCalling
    @PostMapping("/fc/{model}")
    public ResponseEntity<ChatResponse> functionCalling(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest) {
        return chatService.functionCalling(model, chatRequest);
    }

    /**
     * 根据functionCalling的返回结果，再调用chatWithFunctionCalling
     * 暂时用不到，AI助手自行组织响应。
     * 
     * @param model
     * @param chatRequest
     * @return
     */
    @PostMapping("/fc/chat/{model}")
    public ResponseEntity<ChatResponse> chatWithFunctionCalling(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest) {
        throw new UnsupportedOperationException("Not implemented");
        // return chatService.chatWithFunctionCalling(model, chatRequest);
    }

    @PostMapping(value = "/chat/{model}/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> chatStream(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest) {
        return chatService.chatStream(model, chatRequest);
    }

}
