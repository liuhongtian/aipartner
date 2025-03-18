package com.huawei.aipartner.filter;

import java.io.IOException;

import org.springframework.http.HttpStatus;
//import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.huawei.aipartner.utils.AuthUtils;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//@Component
public class UserAuthFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // 排除不需要验证的路径，如静态资源等
        String path = request.getRequestURI();
        if (shouldSkipAuth(path)) {
            filterChain.doFilter(request, response);
            return;
        }
        
        // 获取UID参数
        String uid = request.getParameter("UID");
        
        // 如果UID为空，返回401未授权状态码
        if (uid == null || uid.isEmpty()) {
            System.out.println("UID为空，返回401未授权状态码");
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }
        
        // 验证UID格式和校验码
        if (!AuthUtils.validateUid(uid)) {
            System.out.println("UID格式不正确，返回403禁止访问状态码");
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return;
        }
        
        // 验证通过，继续处理请求
        System.out.println("UID格式正确，继续处理请求");
        filterChain.doFilter(request, response);
    }
    
    /**
     * 判断是否跳过认证
     * @param path 请求路径
     * @return 是否跳过
     */
    private boolean shouldSkipAuth(String path) {
        // 可根据需要排除某些路径，例如静态资源、Swagger文档等
        return path.contains("/swagger") 
               || path.contains("/v3/api-docs")
               || path.contains("/health")
               || path.contains("/static");
    }
} 