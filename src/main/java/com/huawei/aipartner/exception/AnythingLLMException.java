package com.huawei.aipartner.exception;

import com.huawei.aipartner.dto.AnythingLLMResponse;

public class AnythingLLMException extends RuntimeException {
    
    public AnythingLLMException(String message) {
        super(message);
    }

    public AnythingLLMException(String message, Throwable cause) {
        super(message, cause);
    }

    public AnythingLLMException(AnythingLLMResponse errorResponse) {
        super(errorResponse.getError() != null ? 
                errorResponse.getError().getMessage() : 
                "Unknown AnythingLLM error");
    }
    
} 