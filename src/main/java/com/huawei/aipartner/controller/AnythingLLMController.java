package com.huawei.aipartner.controller;

import com.huawei.aipartner.dto.AnythingLLMResponse;
import com.huawei.aipartner.dto.Workspaces;
import com.huawei.aipartner.service.AnythingLLMService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/anything")
//@CrossOrigin(origins = "*")
public class AnythingLLMController {

    private final AnythingLLMService anythingLLMService;

    private final HttpServletRequest request;
    private final HttpServletResponse response;

    public AnythingLLMController(AnythingLLMService anythingLLMService, HttpServletRequest request, HttpServletResponse response) {
        this.anythingLLMService = anythingLLMService;
        this.request = request;
        this.response = response;
    }

    @PostMapping("/{workspace}/chat")
    public ResponseEntity<AnythingLLMResponse> chat(
            @PathVariable String workspace,
            @RequestBody String message,
            @RequestParam(value = "UID", required = false, defaultValue = "1") String uid) {
        String thread = request.getHeader("X-User-Name"); // workspace_username_uuid
        return ResponseEntity.ok(anythingLLMService.chat(workspace, message, thread));
    }

    @GetMapping("/workspaces")
    public ResponseEntity<Workspaces> workspaces () {
        return ResponseEntity.ok(anythingLLMService.workspaces());
    }

} 