package com.huawei.aipartner.dto;

import java.util.List;

import com.huawei.aipartner.utils.JsonUtils;

import lombok.Data;

/**
 * 对话接口响应报文
 */
@Data
public class ChatResponse {
    private List<Message> messages;
    private String error;

    public String toString() {
        return JsonUtils.toJson(this);
    }
}
