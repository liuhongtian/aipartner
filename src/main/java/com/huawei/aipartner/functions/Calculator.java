package com.huawei.aipartner.functions;

import java.util.List;
import java.util.Map;

public class Calculator implements CallableFunction {
    @Override
    public Object execute(Map<String, Object> arguments) {
        System.out.println("Calculator execute: " + arguments);
        
        String operation = (String) arguments.get("operation");
        @SuppressWarnings("unchecked")
        List<Number> numbers = (List<Number>) arguments.get("numbers");
        
        if (numbers == null || numbers.isEmpty()) {
            throw new IllegalArgumentException("Numbers list cannot be empty");
        }

        double result = numbers.get(0).doubleValue();
        for (int i = 1; i < numbers.size(); i++) {
            switch (operation) {
                case "add":
                    result += numbers.get(i).doubleValue();
                    break;
                case "subtract":
                    result -= numbers.get(i).doubleValue();
                    break;
                case "multiply":
                    result *= numbers.get(i).doubleValue();
                    break;
                case "divide":
                    double divisor = numbers.get(i).doubleValue();
                    if (divisor == 0) {
                        throw new IllegalArgumentException("Division by zero");
                    }
                    result /= divisor;
                    break;
                default:
                    throw new IllegalArgumentException("Unknown operation: " + operation);
            }
        }
        System.out.println("Calculator result: " + result);
        return result;
    }
}
