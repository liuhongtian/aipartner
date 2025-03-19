package com.huawei.aipartner.dto;

import java.util.Map;
import lombok.Data;

@Data
public class FunctionCall {
    private String name;
    private Map<String, Object> arguments;
} 