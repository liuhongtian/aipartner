package com.huawei.aipartner.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.huawei.aipartner.utils.MarkdownUtils;

import lombok.Data;

@Data
public class Message {
    private String role;
    private String content;

    @JsonProperty("tool_calls")
    private List<ToolCall> toolCalls;

    public Message parseContent() {
        content = content.indexOf("</think>") > -1 ? content.split("</think>")[1] : content;
        content = content.replaceAll("\\n", "\n").replaceAll("\\t", "\t");
        System.out.println("MARKDOWN CONTENT: " + content);
        content = MarkdownUtils.markdownToHtml(content);
        System.out.println("HTML CONTENT: " + content);
        return this;
    }

    public Message parseToolCalls() {
        //System.out.println("TOOL CALLS: " + toolCalls);
        return this;
    }

    public Message() {
        
    }

    public Message(String role, String content) {
        this.role = role;
        this.content = content;
    }

}
