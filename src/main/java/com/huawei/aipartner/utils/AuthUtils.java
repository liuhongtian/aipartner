package com.huawei.aipartner.utils;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * 认证工具类,用于验证UID格式是否正确。<br>
 * UID格式为：30位随机ID + 6位检验码，其中，验证码的格式为：30位随机ID + HwAiToken^%$# ，进行SHA1处理，取前6位。
 */
public class AuthUtils {
    private static final String VALIDATION_KEY = "HwAiToken^%$#";
    
    /**
     * 验证UID格式是否正确
     * UID格式：30位随机ID + 6位验证码
     * @param uid 完整的UID
     * @return 验证结果
     */
    public static boolean validateUid(String uid) {
        if (uid == null || uid.length() != 36) {
            return false;
        }
        
        String id = uid.substring(0, 30);
        String checksum = uid.substring(30);
        
        return validateChecksum(id, checksum);
    }
    
    /**
     * 验证校验码是否正确
     * @param id 30位随机ID
     * @param checksum 6位验证码
     * @return 验证结果
     */
    public static boolean validateChecksum(String id, String checksum) {
        String expectedChecksum = generateChecksum(id);
        return expectedChecksum.equals(checksum);
    }
    
    /**
     * 生成校验码
     * 校验码计算方式：30位随机ID + HwAiToken^%$# SHA1加密后取前6位
     * @param id 30位随机ID
     * @return 6位校验码
     */
    public static String generateChecksum(String id) {
        String input = id + VALIDATION_KEY;
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            byte[] hashBytes = md.digest(input.getBytes(StandardCharsets.UTF_8));
            
            StringBuilder hexString = new StringBuilder();
            for (byte b : hashBytes) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }
            
            return hexString.toString().substring(0, 6);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-1算法不可用", e);
        }
    }

    public static void main(String[] args) {
        String uid = "68c5ae71-e485-49ff-92c1-ddd29d4d12dc";
        System.out.println(validateUid(uid));
    }
} 