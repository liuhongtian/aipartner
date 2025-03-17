package com.huawei.aipartner.dto;

import com.huawei.aipartner.utils.MarkdownUtils;

import lombok.Data;

@Data
public class AnythingLLMResponse {
    private String id;
    private String type;
    private boolean close;
    private Error error;
    private long chatId;
    private String textResponse;
    private Source[] sources;
    private Metrics metrics;

    @Data
    public static class Error {
        private String message;
        private String type;
    }

    @Data
    public static class Source {
        private String id;
        private String url;
        private String title;
        private String docAuthor;
        private String description;
        private String docSource;
        private String chunkSource;
        private String published;
        private int wordCount;
        private int token_count_estimate;
        private String text;
        private double _distance;
        private double score;

        public void parse() {
            text = text.replaceAll("\\n", "<br>").replaceAll("\\t", "&nbsp;&nbsp;&nbsp;&nbsp;")
                    .replaceAll("<document_metadata>", "<hr>").replaceAll("</document_metadata>", "<hr>");
        }
    }

    @Data
    public static class Metrics {
        private int prompt_tokens;
        private int completion_tokens;
        private int total_tokens;
        private double outputTps;
        private double duration;
    }

    public AnythingLLMResponse parseSources() {
        for (Source source : sources) {
            source.parse();
        }
        return this;
    }

    public AnythingLLMResponse parseTextResponse() {
        textResponse = textResponse.indexOf("</think>") > -1 ? textResponse.split("</think>")[1] : textResponse;
        textResponse = MarkdownUtils.markdownToHtml(textResponse.replaceAll("\\n", "\n").replaceAll("\\t", "\t"));
        return this;
    }

}