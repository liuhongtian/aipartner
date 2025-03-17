package com.huawei.aipartner.dto;

import lombok.Data;

@Data
public class ToolCall {
    private int index;
    private String id;
    private String type;
    private Function function;
}
