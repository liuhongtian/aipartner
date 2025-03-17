package com.huawei.aipartner.controller;

import com.huawei.aipartner.entity.FunctionCall;
import com.huawei.aipartner.entity.FunctionDefinition;
import com.huawei.aipartner.service.FunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

@RestController
@RequestMapping("/api/functions")
public class FunctionController {

    @Autowired
    FunctionService functionService;

    @GetMapping
    public ResponseEntity<List<FunctionDefinition>> getAvailableFunctions() {
        return ResponseEntity.ok(functionService.getAvailableFunctions());
    }

    @PostMapping("/execute")
    public ResponseEntity<Object> executeFunction(@RequestBody FunctionCall functionCall) {
        System.out.println("executeFunction: " + functionCall);
        try {
            Object result = functionService.executeFunction(functionCall);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException | ClassNotFoundException | InstantiationException | IllegalAccessException | InvocationTargetException | NoSuchMethodException | SecurityException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
} 