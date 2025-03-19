package com.huawei.aipartner.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.huawei.aipartner.utils.JsonUtils;

@RestController
@RequestMapping("/api/converter")
public class DataConverterController {
    
    /**
     * 将JSON数据转换为CSV格式
     * 
     * @param jsonData JSON数据
     * @param delimiter 分隔符，默认为逗号
     * @param download 是否作为文件下载
     * @return CSV格式数据或文件
     */
    @PostMapping("/json2csv")
    public ResponseEntity<String> convertJsonToCsv(
            @RequestBody String jsonData,
            @RequestParam(value = "delimiter", defaultValue = ",") String delimiter,
            @RequestParam(value = "download", defaultValue = "false") boolean download) {
        
        String csvData = JsonUtils.jsonToCsv(jsonData, delimiter);
        
        if (csvData == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("无法将提供的JSON数据转换为CSV格式。请确保JSON是有效的数组格式。");
        }
        
        if (download) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "data.csv");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvData);
        } else {
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(csvData);
        }
    }
} 