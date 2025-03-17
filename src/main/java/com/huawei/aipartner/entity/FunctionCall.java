package com.huawei.aipartner.entity;

import java.util.Map;
import lombok.Data;

@Data
public class FunctionCall {
    private String name;
    private Map<String, Object> arguments;
} 