package com.huawei.aipartner.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.yaml.snakeyaml.Yaml;
import org.yaml.snakeyaml.constructor.Constructor;
import org.yaml.snakeyaml.error.YAMLException;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * YAML 文件解析工具类
 */
public class YamlUtils {
    private static final Logger logger = LoggerFactory.getLogger(YamlUtils.class);
    private static final Yaml yaml = new Yaml();

    /**
     * 从类路径加载 YAML 文件并读取其内容为 Map
     *
     * @param path 类路径下的文件路径（例如："config/application.yml"）
     * @return YAML 文件内容转换的 Map，如果读取失败则返回 null
     */
    public static Map<String, Object> loadYamlAsMap(String path) {
        try (InputStream inputStream = new ClassPathResource(path).getInputStream()) {
            return yaml.load(inputStream);
        } catch (IOException | YAMLException e) {
            logger.error("从类路径加载 YAML 文件时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 从类路径加载 YAML 文件并转换为指定类型的对象
     *
     * @param path 类路径下的文件路径
     * @param clazz 目标类型
     * @return 转换后的对象，如果加载或转换失败则返回 null
     */
    /*
    public static <T> T loadYamlAsObject(String path, Class<T> clazz) {
        try (InputStream inputStream = new ClassPathResource(path).getInputStream()) {
            Yaml yaml = new Yaml(new Constructor(clazz));
            return yaml.load(inputStream);
        } catch (IOException | YAMLException e) {
            logger.error("从类路径加载 YAML 文件并转换为对象时发生错误: {}", e.getMessage());
            return null;
        }
    } */

    /**
     * 从类路径加载包含多个文档的 YAML 文件并转换为指定类型的对象列表
     *
     * @param path 类路径下的文件路径
     * @param clazz 目标类型
     * @return 转换后的对象列表，如果加载或转换失败则返回空列表
     */
    /*
    public static <T> List<T> loadAllYamlDocuments(String path, Class<T> clazz) {
        List<T> results = new ArrayList<>();
        try (InputStream inputStream = new ClassPathResource(path).getInputStream()) {
            Yaml yaml = new Yaml(new Constructor(clazz));
            Iterable<Object> objects = yaml.loadAll(inputStream);
            for (Object obj : objects) {
                if (clazz.isInstance(obj)) {
                    results.add(clazz.cast(obj));
                }
            }
            return results;
        } catch (IOException | YAMLException e) {
            logger.error("从类路径加载多文档 YAML 文件时发生错误: {}", e.getMessage());
            return results;
        }
    } */

    /**
     * 从类路径加载 YAML 文件并转换为指定类型的对象列表
     *
     * @param path 类路径下的文件路径
     * @param elementClass List 元素类型
     * @return 转换后的对象列表，如果加载或转换失败则返回 null
     */
    public static <T> List<T> loadYamlAsList(String path, Class<T> elementClass) {
        try (InputStream inputStream = new ClassPathResource(path).getInputStream()) {
            return yaml.load(inputStream);
        } catch (IOException | YAMLException e) {
            logger.error("从类路径加载 YAML 文件并转换为列表时发生错误: {}", e.getMessage());
            return null;
        }
    }

    /**
     * 检查 YAML 文件是否存在且格式有效
     *
     * @param path 类路径下的文件路径
     * @return 如果文件存在且格式有效则返回 true，否则返回 false
     */
    public static boolean isValidYaml(String path) {
        try (InputStream inputStream = new ClassPathResource(path).getInputStream()) {
            yaml.load(inputStream);
            return true;
        } catch (IOException | YAMLException e) {
            return false;
        }
    }

    /**
     * 获取 YAML 文件中指定路径的值
     *
     * @param yamlMap YAML 文件加载的 Map
     * @param path 点分隔的路径，例如 "spring.datasource.url"
     * @return 指定路径的值，如果路径不存在则返回 null
     */
    @SuppressWarnings("unchecked")
    public static Object getValueByPath(Map<String, Object> yamlMap, String path) {
        if (yamlMap == null || path == null) {
            return null;
        }

        String[] keys = path.split("\\.");
        Object current = yamlMap;

        for (String key : keys) {
            if (current instanceof Map) {
                current = ((Map<String, Object>) current).get(key);
            } else {
                return null;
            }
        }

        return current;
    }

    /**
     * 将对象转换为 YAML 字符串
     *
     * @param object 要转换的对象
     * @return YAML 字符串，如果转换失败则返回 null
     */
    public static String toYaml(Object object) {
        if (object == null) {
            return null;
        }
        try {
            return yaml.dump(object);
        } catch (YAMLException e) {
            logger.error("将对象转换为 YAML 字符串时发生错误: {}", e.getMessage());
            return null;
        }
    }
}
