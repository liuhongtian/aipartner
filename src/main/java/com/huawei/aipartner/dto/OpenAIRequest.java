package com.huawei.aipartner.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.huawei.aipartner.utils.JsonUtils;

import lombok.Data;

@Data
public class OpenAIRequest {
    private String model;
    private java.util.List<Message> messages;
    
    @JsonProperty("stream")
    private boolean isStream = false;

    private List<FunctionDefinition> tools;
    
    // 流式对话相关的参数
    private Double temperature = 0.7;
    private Integer maxTokens;
    
    @JsonProperty("presence_penalty")
    private Double presencePenalty = 0.0;
    
    @JsonProperty("frequency_penalty")
    private Double frequencyPenalty = 0.0;

    public String toString() {
        return JsonUtils.toJson(this);
    }
}
