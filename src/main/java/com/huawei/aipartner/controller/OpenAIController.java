package com.huawei.aipartner.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;

import com.huawei.aipartner.dto.ChatRequest;
import com.huawei.aipartner.dto.ChatResponse;
import com.huawei.aipartner.service.OpenAIService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/openai")
public class OpenAIController {

    private final OpenAIService chatService;

    public OpenAIController(OpenAIService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/chat/{model}")
    public ResponseEntity<ChatResponse> chat(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest,
            @RequestParam(value = "UID", required = false, defaultValue = "1") String uid) {
        return chatService.chat(model, chatRequest);
    }

    // Function Calling，完整的逻辑需要先调用functionCalling，然后根据functionCalling的返回结果，再调用chatWithFunctionCalling
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
        //return chatService.chatWithFunctionCalling(model, chatRequest);
    }

    @PostMapping(value = "/chat/{model}/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ServerSentEvent<String>> chatStream(
            @PathVariable String model,
            @RequestBody ChatRequest chatRequest) {
        return chatService.chatStream(model, chatRequest);
    }

}
