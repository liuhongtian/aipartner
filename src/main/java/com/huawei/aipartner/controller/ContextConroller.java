package com.huawei.aipartner.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.huawei.aipartner.dto.ChatRequest;
import com.huawei.aipartner.dto.Message;
import com.huawei.aipartner.service.ContextService;
import com.huawei.aipartner.service.OpenAIService;

@RestController
@RequestMapping("/api/context")
public class ContextConroller {

    @Autowired
    private ContextService contextService;

    @Autowired
    private OpenAIService chatService;

    /**
     * 上报数据，数据存储在Redis中，key为{UID}.report.data
     * @param data 上报的数据内容
     * @param uid 用户ID
     * @return 处理结果
     */
    @PostMapping("/report/data")
    public ResponseEntity<String> reportData(
            @RequestBody String data,
            @RequestParam(value = "UID", required = true) String uid) {
        var response = contextService.reportData(uid, data);

        /* 用户上报数据后，就调用AI生成报表（此处理存疑！）
        ChatRequest chatRequest = new ChatRequest();
        chatRequest.setMessages(new ArrayList<Message>());
        var reportResponse = chatService.chat(uid, "deepseek-chat", chatService.preprocessReportChatRequest(chatRequest, uid));
        return reportResponse;
        */
        
        return response;
    }

}
