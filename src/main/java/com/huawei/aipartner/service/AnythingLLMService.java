package com.huawei.aipartner.service;

import com.huawei.aipartner.dto.AnythingLLMResponse;
import com.huawei.aipartner.dto.Workspaces;
import com.huawei.aipartner.exception.AnythingLLMException;

import lombok.Data;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
public class AnythingLLMService {

    private final WebClient webClient;

    public AnythingLLMService(
            @Value("${anythingllm.base-url}") String baseUrl,
            @Value("${anythingllm.api-key}") String apiKey) {
        this.webClient = WebClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                .build();
    }

    public AnythingLLMResponse chat(String workspace, String message, String thread) {
        try {
            if (thread == null || thread.isEmpty()) { // 在缺省thread中对话
                thread = "";
                return webClient.post()
                        .uri("/api/v1/workspace/{workspace}/chat", workspace)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(new ChatRequestBody(message, thread))
                        .retrieve()
                        .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                                response -> response.bodyToMono(AnythingLLMResponse.class)
                                        .flatMap(err -> Mono.error(new AnythingLLMException(err))))
                        .bodyToMono(AnythingLLMResponse.class)
                        .block();
            } else { // 在指定thread中对话（首先尝试创建thread）
                tryCreateThread(workspace, thread);

                return webClient.post()
                        .uri("/api/v1/workspace/{workspace}/thread/{thread}/chat", workspace, thread)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue(new ChatRequestBody(message, thread))
                        .retrieve()
                        .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                                response -> response.bodyToMono(AnythingLLMResponse.class)
                                        .flatMap(err -> Mono.error(new AnythingLLMException(err))))
                        .bodyToMono(AnythingLLMResponse.class)
                        .block().parseTextResponse().parseSources();
            }
        } catch (WebClientResponseException e) {
            //
            throw new AnythingLLMException("调用 AnythingLLM 服务失败: " + e.getMessage(), e);
        }
    }

    /**
     * 用指定的slug在指定的工作空间下创建thread。
     * 
     * @param workspace
     * @param thread
     */
    private void tryCreateThread(String workspace, String thread) {
        webClient.post()
                .uri("/api/v1/workspace/{workspace}/thread/new", workspace)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(new NewTreadRequest(thread))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    /**
     * 获取所有工作空间
     * 
     * @return
     */
    public Workspaces workspaces() {
        return webClient.get()
                .uri("/api/v1/workspaces")
                .retrieve()
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        response -> response.bodyToMono(AnythingLLMResponse.class)
                                .flatMap(err -> Mono.error(new AnythingLLMException(err))))
                .bodyToMono(Workspaces.class)
                .block();
    }

}

@Data
class ChatRequestBody {
    private String message;
    private int userId;
    private String username;

    public ChatRequestBody(String message, String thread) {
        this.message = message;
        this.username = thread;
        this.userId = 1; // 暂时固定
    }

}

/**
 * 创建thread请求报文
 */
@Data
class NewTreadRequest {
    private String name;
    private String slug;
    private int userId;

    public NewTreadRequest(String thread) {
        this.name = thread.contains("_") ? thread.substring(thread.indexOf("_") + 1) : thread;
        this.slug = thread;
        this.userId = 1; // 暂时固定
    }
}
