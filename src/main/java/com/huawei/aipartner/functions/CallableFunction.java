package com.huawei.aipartner.functions;

import java.util.Map;

public interface CallableFunction {
    Object execute(Map<String, Object> arguments);
}
