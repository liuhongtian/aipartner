package com.huawei.aipartner.service;

import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ContextService {
    
    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    /**
     * 处理上报的数据
     * @param uid UID
     * @param data 上报的数据内容
     * @return 处理结果
     */
    public ResponseEntity<String> reportData(String uid, String data) {
        try {
            // 将数据存储在Redis中，key为uid + .report.data，value为data
            String datakey = uid + ".report.data";
            redisTemplate.opsForValue().set(datakey, data);
            redisTemplate.expire(datakey, 1, TimeUnit.DAYS);
            
            // 日志记录
            System.out.println("接收到上报数据，已存储到Redis: datakey=" + datakey);
            
            return ResponseEntity.ok("数据上报成功");
        } catch (Exception e) {
            System.err.println("数据存储到Redis失败: " + e.getMessage());
            return ResponseEntity.internalServerError().body("数据存储失败: " + e.getMessage());
        }
    }
} 