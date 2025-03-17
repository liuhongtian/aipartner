package com.huawei.aipartner.dto;

import lombok.Data;

@Data
public class OpenAIResponse {
    private String id;
    private String object;
    private long created;
    private String model;
    private Choice[] choices;
    private Usage usage;
    private String system_fingerprint;
}