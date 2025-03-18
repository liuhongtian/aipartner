package com.huawei.aipartner.dto;

import com.huawei.aipartner.utils.JsonUtils;

/**
 * 对话接口请求报文
 */ 
public class ChatRequest {
    private java.util.List<Message> messages;

    public java.util.List<Message> getMessages() {
        return messages;
    }

    public void setMessages(java.util.List<Message> messages) {
        this.messages = messages;
    }

    public String toString() {
        return JsonUtils.toJson(this);
    }
}
