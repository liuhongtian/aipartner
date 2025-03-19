package com.huawei.aipartner.dto;

import lombok.Data;

@Data
public class MessageWithData {
    private String message;
    private String data;

    public MessageWithData(String message, String data) {
        this.message = message;
        this.data = data;
    }

    public MessageWithData() {
    }
}