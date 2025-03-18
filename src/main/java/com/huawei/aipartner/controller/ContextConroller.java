package com.huawei.aipartner.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.huawei.aipartner.service.ContextService;

@RestController
@RequestMapping("/api/context")
public class ContextConroller {

    @Autowired
    private ContextService contextService;

    /**
     * 上报数据，数据存储在Redis中，key为{UID}.report.data
     * @param data 上报的数据内容
     * @param uid 用户ID
     * @return 处理结果
     */
    @PostMapping("/report/data")
    public ResponseEntity<String> reportData(
            @RequestBody String data,
            @RequestParam(value = "UID", required = true) String uid) {
        return contextService.reportData(uid + ".report.data", data);
    }

}
