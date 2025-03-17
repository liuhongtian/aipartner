package com.huawei.aipartner.entity;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class FunctionDefinition {
    private String type = "function";
    private Function function;

    @Data
    public static class Function {
        private String description;
        private String name;
        private Parameters parameters;

    }

    @Data
    public static class Parameters {
        private String type = "object";
        private Map<String, ParameterProperty> properties;
        private List<String> required;
    }

    @Data
    public static class ParameterProperty {
        private String type;
        private String description;
    }
}
