package com.huawei.aipartner.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

/**
 * JSON 数据处理工具类
 */
public class JsonUtils {
    private static final Logger logger = LoggerFactory.getLogger(JsonUtils.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        // 配置 ObjectMapper
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
    }

    /**
     * 将对象转换为 JSON 字符串
     *
     * @param object 要转换的对象
     * @return JSON 字符串，如果转换失败则返回 null
     */
    public static String toJson(Object object) {
        if (object == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            logger.error("将对象转换为 JSON 字符串时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 将 JSON 字符串转换为指定类型的对象
     *
     * @param json JSON 字符串
     * @param clazz 目标类型
     * @return 转换后的对象，如果转换失败则返回 null
     */
    public static <T> T fromJson(String json, Class<T> clazz) {
        if (!StringUtils.hasText(json)) {
            return null;
        }
        try {
            return objectMapper.readValue(json, clazz);
        } catch (JsonProcessingException e) {
            logger.error("将 JSON 字符串转换为对象时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 将 JSON 字符串转换为 List 类型
     *
     * @param json JSON 字符串
     * @param elementClass List 元素类型
     * @return 转换后的 List 对象，如果转换失败则返回 null
     */
    public static <T> List<T> fromJsonList(String json, Class<T> elementClass) {
        if (!StringUtils.hasText(json)) {
            return null;
        }
        try {
            return objectMapper.readValue(json, objectMapper.getTypeFactory().constructCollectionType(List.class, elementClass));
        } catch (JsonProcessingException e) {
            logger.error("将 JSON 字符串转换为 List 时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 将 JSON 字符串转换为 Map 类型
     *
     * @param json JSON 字符串
     * @return 转换后的 Map 对象，如果转换失败则返回 null
     */
    public static Map<String, Object> fromJsonMap(String json) {
        if (!StringUtils.hasText(json)) {
            return null;
        }
        try {
            return objectMapper.readValue(json, new TypeReference<Map<String, Object>>() {});
        } catch (JsonProcessingException e) {
            logger.error("将 JSON 字符串转换为 Map 时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 将对象转换为格式化的 JSON 字符串（便于阅读）
     *
     * @param object 要转换的对象
     * @return 格式化的 JSON 字符串，如果转换失败则返回 null
     */
    public static String toPrettyJson(Object object) {
        if (object == null) {
            return null;
        }
        try {
            return objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(object);
        } catch (JsonProcessingException e) {
            logger.error("将对象转换为格式化 JSON 字符串时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 深度复制对象
     *
     * @param object 要复制的对象
     * @param targetClass 目标类型
     * @return 复制后的对象，如果复制失败则返回 null
     */
    public static <T> T deepCopy(Object object, Class<T> targetClass) {
        if (object == null) {
            return null;
        }
        try {
            String json = objectMapper.writeValueAsString(object);
            return objectMapper.readValue(json, targetClass);
        } catch (JsonProcessingException e) {
            logger.error("深度复制对象时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 检查字符串是否为有效的 JSON 格式
     *
     * @param json 要检查的 JSON 字符串
     * @return 如果是有效的 JSON 格式则返回 true，否则返回 false
     */
    public static boolean isValidJson(String json) {
        if (!StringUtils.hasText(json)) {
            return false;
        }
        try {
            objectMapper.readTree(json);
            return true;
        } catch (IOException e) {
            return false;
        }
    }

    /**
     * 从类路径加载 JSON 文件并读取其内容
     *
     * @param path 类路径下的文件路径（例如："json/config.json"）
     * @return JSON 文件的内容，如果读取失败则返回 null
     */
    public static String loadJsonFromClasspath(String path) {
        try {
            ClassPathResource resource = new ClassPathResource(path);
            try (InputStream inputStream = resource.getInputStream()) {
                return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
            }
        } catch (IOException e) {
            logger.error("从类路径加载 JSON 文件时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 从类路径加载 JSON 文件并转换为指定类型的对象
     *
     * @param path 类路径下的文件路径（例如："json/config.json"）
     * @param clazz 目标类型
     * @return 转换后的对象，如果加载或转换失败则返回 null
     */
    public static <T> T loadObjectFromClasspath(String path, Class<T> clazz) {
        String json = loadJsonFromClasspath(path);
        return fromJson(json, clazz);
    }

    /**
     * 从类路径加载 JSON 文件并转换为指定类型的对象列表
     *
     * @param path 类路径下的文件路径（例如："json/config.json"）
     * @param elementClass List 元素类型
     * @return 转换后的对象列表，如果加载或转换失败则返回 null
     */
    public static <T> List<T> loadListFromClasspath(String path, Class<T> elementClass) {
        String json = loadJsonFromClasspath(path);
        return fromJsonList(json, elementClass);
    }

    /**
     * 从类路径加载 JSON 文件并转换为 Map 类型
     *
     * @param path 类路径下的文件路径（例如："json/config.json"）
     * @return 转换后的 Map 对象，如果加载或转换失败则返回 null
     */
    public static Map<String, Object> loadMapFromClasspath(String path) {
        String json = loadJsonFromClasspath(path);
        return fromJsonMap(json);
    }
} 