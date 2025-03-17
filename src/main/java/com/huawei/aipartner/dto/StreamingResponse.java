package com.huawei.aipartner.dto;

public class StreamingResponse {
    private String content;
    private boolean done;
    private String error;

    public String getContent() {
        return content;
    }


    public void setContent(String content) {
        this.content = content;
    }
    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
} 