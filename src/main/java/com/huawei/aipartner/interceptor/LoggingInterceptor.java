package com.huawei.aipartner.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class LoggingInterceptor implements HandlerInterceptor {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;
    
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private static final String LOG_PREFIX = "access_log:";
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 将请求开始时间放入请求属性中，用于后续计算请求处理时间
        request.setAttribute("startTime", System.currentTimeMillis());
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // 不做特殊处理
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        try {
            // 计算请求处理时间
            long startTime = (Long) request.getAttribute("startTime");
            long endTime = System.currentTimeMillis();
            long processingTime = endTime - startTime;
            
            // 获取请求参数
            Map<String, String> params = request.getParameterMap().entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getKey, e -> String.join(",", e.getValue())));
            
            // 获取处理方法信息
            String handlerInfo = "Unknown";
            if (handler instanceof HandlerMethod) {
                HandlerMethod handlerMethod = (HandlerMethod) handler;
                handlerInfo = handlerMethod.getBeanType().getSimpleName() + "." + handlerMethod.getMethod().getName();
            }
            
            // 构建日志内容
            StringBuilder logContent = new StringBuilder();
            logContent.append("时间: ").append(LocalDateTime.now().format(FORMATTER)).append(", ");
            logContent.append("URL: ").append(request.getRequestURI()).append(", ");
            logContent.append("方法: ").append(request.getMethod()).append(", ");
            logContent.append("IP: ").append(getClientIp(request)).append(", ");
            logContent.append("处理器: ").append(handlerInfo).append(", ");
            logContent.append("参数: ").append(params).append(", ");
            logContent.append("响应状态: ").append(response.getStatus()).append(", ");
            logContent.append("处理时间: ").append(processingTime).append("ms");
            
            if (ex != null) {
                logContent.append(", 异常: ").append(ex.getMessage());
            }
            
            // 生成唯一日志ID
            String logId = LOG_PREFIX + UUID.randomUUID().toString();
            
            // 将日志存储到Redis中，并设置1天过期时间
            redisTemplate.opsForValue().set(logId, logContent.toString());
            redisTemplate.expire(logId, 1, java.util.concurrent.TimeUnit.DAYS);
            
            // 也输出到控制台
            System.out.println("API访问日志: " + logContent);
        } catch (Exception e) {
            System.err.println("记录访问日志时发生错误: " + e.getMessage());
        }
    }
    
    /**
     * 获取客户端真实IP地址
     */
    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
} 