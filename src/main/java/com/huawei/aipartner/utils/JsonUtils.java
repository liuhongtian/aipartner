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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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

    /**
     * 将JSON字符串转换为CSV格式
     *
     * @param json JSON字符串，必须是数组格式
     * @param delimiter 分隔符，默认为逗号
     * @return CSV格式的字符串，转换失败则返回null
     */
    public static String jsonToCsv(String json, String delimiter) {
        if (!StringUtils.hasText(json)) {
            return null;
        }
        
        if (delimiter == null || delimiter.isEmpty()) {
            delimiter = ",";
        }
        
        try {
            // 将JSON解析为List<Map>
            List<Map<String, Object>> rows = objectMapper.readValue(json, 
                    new TypeReference<List<Map<String, Object>>>() {});
            
            if (rows == null || rows.isEmpty()) {
                return "";
            }
            
            // 获取所有列名
            Set<String> columnNames = rows.stream()
                    .flatMap(row -> row.keySet().stream())
                    .collect(Collectors.toSet());
            
            // 创建CSV表头
            StringBuilder csv = new StringBuilder();
            // 添加表头
            csv.append(String.join(delimiter, columnNames)).append("\n");
            
            // 添加数据行
            for (Map<String, Object> row : rows) {
                List<String> values = new ArrayList<>();
                for (String columnName : columnNames) {
                    Object value = row.get(columnName);
                    String valueStr = (value == null) ? "" : escapeCsvValue(value.toString(), delimiter);
                    values.add(valueStr);
                }
                csv.append(String.join(delimiter, values)).append("\n");
            }
            
            return csv.toString();
        } catch (Exception e) {
            //logger.error("将JSON转换为CSV时发生错误: {}", e.getMessage());
            return null;
        }
    }
    
    /**
     * 将JSON字符串转换为CSV格式，使用默认的逗号分隔符
     *
     * @param json JSON字符串，必须是数组格式
     * @return CSV格式的字符串，转换失败则返回null
     */
    public static String jsonToCsv(String json) {
        return jsonToCsv(json, ",");
    }
    
    /**
     * 处理CSV值中的特殊字符
     *
     * @param value 原始值
     * @param delimiter 分隔符
     * @return 处理后的值
     */
    private static String escapeCsvValue(String value, String delimiter) {
        if (value == null) {
            return "";
        }
        
        // 如果值包含分隔符、双引号或换行符，则用双引号包围
        if (value.contains(delimiter) || value.contains("\"") || value.contains("\n")) {
            // 将值中的双引号替换为两个双引号
            value = value.replace("\"", "\"\"");
            // 用双引号包围
            return "\"" + value + "\"";
        }
        
        return value;
    }

    public static void main(String[] args) {
        String json = "[{\"rowId\":\"297\",\"PK_ID\":\"778\",\"Custom_Code\":\"C-170727-0008\",\"Custom_Name\":\"AAAA\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2022-08-09\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"298\",\"PK_ID\":\"777\",\"Custom_Code\":\"C-170803-0001\",\"Custom_Name\":\"北京人人优活科技有限公司\",\"Province_Name\":\"北京市\",\"City_Name\":\"北京市\",\"County_Name\":\"\",\"Area_Name\":\"华东区\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2017-10-24\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"299\",\"PK_ID\":\"776\",\"Custom_Code\":\"C-170727-0003\",\"Custom_Name\":\"北京长城电子商务有限公司\",\"Province_Name\":\"北京市\",\"City_Name\":\"北京市\",\"County_Name\":\"朝阳区\",\"Area_Name\":\"华东区\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2017-10-24\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"300\",\"PK_ID\":\"774\",\"Custom_Code\":\"C-180703-0014\",\"Custom_Name\":\"重庆华邦制药有限公司\",\"Province_Name\":\"安徽省\",\"City_Name\":\"安徽省亳州市\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"罗茜\",\"Trans_Date\":\"2017-10-24\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"301\",\"PK_ID\":\"772\",\"Custom_Code\":\"C-170627-0002\",\"Custom_Name\":\"金丰科技股份有限公司\",\"Province_Name\":\"北京市\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"华东区\",\"Post_Code\":\"\",\"Source_Name\":\"业务收集\",\"LinkMan_Mob\":\"13966312569\",\"LinkMan_Tel\":\"010-6936582\",\"LinkMan_Mail\":\"369852\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"3698528956\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"\",\"Trans_Date\":\"2017-06-27\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"302\",\"PK_ID\":\"770\",\"Custom_Code\":\"C-170627-0001\",\"Custom_Name\":\"金华集团\",\"Province_Name\":\"北京市\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"华东区\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"13689562314\",\"LinkMan_Tel\":\"010-9632569\",\"LinkMan_Mail\":\"lijinh@163.com\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"9632569569\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"\",\"Trans_Date\":\"2017-06-27\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"303\",\"PK_ID\":\"766\",\"Custom_Code\":\"C-170618-0002\",\"Custom_Name\":\"联想科技\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"乔鹏\",\"Trans_Date\":\"2022-08-18\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"304\",\"PK_ID\":\"765\",\"Custom_Code\":\"C-170618-0001\",\"Custom_Name\":\"哇哈哈\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"乔鹏\",\"Trans_Date\":\"2022-08-18\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"305\",\"PK_ID\":\"764\",\"Custom_Code\":\"C-170618-0003\",\"Custom_Name\":\"银信科技股份有限公司\",\"Province_Name\":\"北京市\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"华东区\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"13798736748\",\"LinkMan_Tel\":\"011-98767833\",\"LinkMan_Mail\":\"lind@163.com\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"98736748\",\"LinkMan_WX\":\"weindd677\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2017-06-18\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"306\",\"PK_ID\":\"763\",\"Custom_Code\":\"C-170607-0001\",\"Custom_Name\":\"IT信息\",\"Province_Name\":\"广东省\",\"City_Name\":\"广东省中山市\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"自有客户\",\"LinkMan_Mob\":\"18218178496\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"张德才\",\"Trans_Date\":\"2017-06-07\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"307\",\"PK_ID\":\"753\",\"Custom_Code\":\"C-170601-0001\",\"Custom_Name\":\"周培超 测试\",\"Province_Name\":\"广东省\",\"City_Name\":\"广东省中山市\",\"County_Name\":\"中山市\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"自有客户\",\"LinkMan_Mob\":\"18022107775\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"朱品超\",\"Trans_Date\":\"2017-06-01\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"308\",\"PK_ID\":\"752\",\"Custom_Code\":\"C-170613-0001\",\"Custom_Name\":\"北京长城电商科技有限公司\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2018-03-06\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"309\",\"PK_ID\":\"745\",\"Custom_Code\":\"C-170613-0001\",\"Custom_Name\":\"星港茶餐厅\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"310\",\"PK_ID\":\"744\",\"Custom_Code\":\"C-170518-0001\",\"Custom_Name\":\"手机城\",\"Province_Name\":\"广东省\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"资源交换\",\"LinkMan_Mob\":\"18223796056\",\"LinkMan_Tel\":\"0389-8955489\",\"LinkMan_Mail\":\"jinlong@sud.com\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"896523210236\",\"LinkMan_WX\":\"wangjl34599\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2017-06-28\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"311\",\"PK_ID\":\"743\",\"Custom_Code\":\"C-170516-0002\",\"Custom_Name\":\"奥玛\",\"Province_Name\":\"广东省\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"18218178496\",\"LinkMan_Tel\":\"010-6985412\",\"LinkMan_Mail\":\"zfm@163.com\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"698541234\",\"LinkMan_WX\":\"zfmsdf1346\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2017-06-28\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"312\",\"PK_ID\":\"741\",\"Custom_Code\":\"C-170515-0001\",\"Custom_Name\":\"东鹏\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"13623454321\",\"LinkMan_Tel\":\"010-11111111\",\"LinkMan_Mail\":\"1377935565@qq.com\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"1377935565\",\"LinkMan_WX\":\"wanmy965\",\"Remark\":\"\",\"User_Desc\":\"测试\",\"Trans_Date\":\"\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"313\",\"PK_ID\":\"738\",\"Custom_Code\":\"C-190710-0002\",\"Custom_Name\":\"北京宏安天润科技有限公司\",\"Province_Name\":\"北京市\",\"City_Name\":\"北京市\",\"County_Name\":\"海淀区\",\"Area_Name\":\"华东区\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"韩溢新\",\"Trans_Date\":\"2017-05-16\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"314\",\"PK_ID\":\"734\",\"Custom_Code\":\"C-170512-0008\",\"Custom_Name\":\"测试啊啊啊\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"乔鹏\",\"Trans_Date\":\"\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"315\",\"PK_ID\":\"730\",\"Custom_Code\":\"C-180703-0018\",\"Custom_Name\":\"三晋科技股份有限公司\",\"Province_Name\":\"北京市\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"华东区\",\"Post_Code\":\"\",\"Source_Name\":\"业务收集\",\"LinkMan_Mob\":\"\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"316\",\"PK_ID\":\"729\",\"Custom_Code\":\"C-170512-0002\",\"Custom_Name\":\"测试客户2\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"\",\"LinkMan_Mob\":\"18218178496\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"张德才\",\"Trans_Date\":\"2023-03-16\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"},{\"rowId\":\"317\",\"PK_ID\":\"727\",\"Custom_Code\":\"C-170512-0004\",\"Custom_Name\":\"中山尚善集团\",\"Province_Name\":\"\",\"City_Name\":\"\",\"County_Name\":\"\",\"Area_Name\":\"\",\"Post_Code\":\"\",\"Source_Name\":\"自有客户\",\"LinkMan_Mob\":\"18809990911\",\"LinkMan_Tel\":\"\",\"LinkMan_Mail\":\"\",\"Mail_Box\":\"\",\"LinkMan_QQ\":\"\",\"LinkMan_WX\":\"\",\"Remark\":\"\",\"User_Desc\":\"系统管理\",\"Trans_Date\":\"2017-05-12\",\"Invoice_Title\":\"\",\"Shared\":\"自定义转换方法不存在\",\"HasContract\":\"自定义转换方法不存在\",\"Hascontactreply\":\"自定义转换方法不存在\",\"Hasnewproduct\":\"自定义转换方法不存在\"}]";
        String csv = jsonToCsv(json);
        System.out.println(csv);

        System.out.println(jsonToCsv("t1,t2,t3\n1,2,3\n4,5,6"));
    }
} 
