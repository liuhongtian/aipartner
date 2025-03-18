package com.huawei.aipartner.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/logs")
public class LogController {
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    private static final String LOG_PREFIX = "access_log:";
    
    /**
     * 获取最近的访问日志
     * @param limit 返回的日志数量限制
     * @return 日志列表
     */
    @GetMapping("/access")
    public ResponseEntity<List<String>> getAccessLogs(@RequestParam(value = "limit", defaultValue = "50") int limit) {
        // 获取所有以LOG_PREFIX开头的键
        Set<String> keys = redisTemplate.keys(LOG_PREFIX + "*");
        List<String> logs = new ArrayList<>();
        
        if (keys != null && !keys.isEmpty()) {
            // 获取所有日志内容
            List<String> tempLogs = new ArrayList<>(redisTemplate.opsForValue().multiGet(keys));
            
            // 限制返回的日志数量
            int size = Math.min(limit, tempLogs.size());
            logs = tempLogs.subList(0, size);
        }
        
        return ResponseEntity.ok(logs);
    }
} 