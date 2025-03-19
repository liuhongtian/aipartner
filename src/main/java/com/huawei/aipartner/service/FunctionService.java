package com.huawei.aipartner.service;

import com.huawei.aipartner.dto.FunctionCall;
import com.huawei.aipartner.dto.FunctionDefinition;
import com.huawei.aipartner.functions.CallableFunction;
import com.huawei.aipartner.utils.JsonUtils;
import com.huawei.aipartner.utils.YamlUtils;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.lang.reflect.InvocationTargetException;

/**
 * 用于处理函数调用的服务类。
 * 它提供了以下功能：
 * 1. 初始化可用的函数列表
 * 2. 获取所有可用的函数定义
 * 3. 执行指定的函数调用
 */
@Service
public class FunctionService {

    private final List<FunctionDefinition> functions = JsonUtils.loadListFromClasspath("tools.json",
            FunctionDefinition.class);
    private static final Map<String, Object> pages = YamlUtils.loadYamlAsMap("pages.yml");

    public FunctionService() {
        // 为Page函数添加可用的页面列表
        for (var f : functions) {
            if (f.getFunction().getName().equals("Page")) {
                f.getFunction().setDescription(f.getFunction().getDescription() + "\n可用的页面包括："
                        + pages.keySet().stream().map(key -> key + " (" + pages.get(key).toString() + ")")
                                .collect(Collectors.joining(", ")));
                break;
            }
        }
    }

    public List<FunctionDefinition> getAvailableFunctions() {
        return functions;
    }

    public Object executeFunction(FunctionCall functionCall)
            throws ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException,
            InvocationTargetException, NoSuchMethodException, SecurityException {
        // 根据函数名称和参数执行相应的操作
        FunctionDefinition functionDefinition = functions.stream()
                .filter(f -> f.getFunction().getName().equals(functionCall.getName()))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown function: " + functionCall.getName()));

        System.out.println("prepare to executeFunction: " + functionDefinition);

        var clazz = Class.forName("com.huawei.aipartner.functions." + functionDefinition.getFunction().getName());
        var callableFunction = (CallableFunction) clazz.getDeclaredConstructor().newInstance();
        return callableFunction.execute(functionCall.getArguments());

    }

}