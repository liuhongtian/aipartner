package com.huawei.aipartner.dto;

import com.huawei.aipartner.utils.JsonUtils;

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

    public String toString() {
        return JsonUtils.toJson(this);
    }
}