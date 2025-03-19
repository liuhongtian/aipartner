package com.huawei.aipartner.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;

import com.huawei.aipartner.dto.ChatRequest;
import com.huawei.aipartner.dto.ChatResponse;
import com.huawei.aipartner.dto.Message;
import com.huawei.aipartner.dto.MessageWithData;
import com.huawei.aipartner.service.ContextService;
import com.huawei.aipartner.service.OpenAIService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {

    @Autowired
    private OpenAIService chatService;

    @Autowired
    private ContextService contextService;


    @PostMapping("/chat/{model}")
    public ResponseEntity<ChatResponse> chat(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest,
            @RequestParam(value = "UID", required = true) String uid) {
        return chatService.chat(uid, model, chatRequest);
    }

    /**
     * 智能报表分析（用户请求中可能包含报表数据）
     * 
     * @param messageWithData 用户消息
     * @param uid             用户ID
     * @return 分析结果
     */
    @PostMapping("/reportwithdata")
    public ResponseEntity<ChatResponse> reportWithData(
            @RequestBody MessageWithData messageWithData,
            @RequestParam(value = "UID", required = true) String uid) {

        // 上报数据（如果有数据）
        if(messageWithData.getData() != null && !messageWithData.getData().isEmpty()) {
            contextService.reportData(uid, messageWithData.getData());
        }

        ChatRequest chatRequest = new ChatRequest();

        // 添加用户消息
        if(messageWithData.getMessage() != null && !messageWithData.getMessage().isEmpty()) {
            chatRequest.getMessages().add(new Message("user", messageWithData.getMessage()));
        }

        // 智能报表分析
        return chatService.chat(uid, "deepseek-chat", chatService.preprocessReportChatRequest(chatRequest, uid));
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
        return chatService.chat(uid, model, chatService.preprocessReportChatRequest(chatRequest, uid));
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
