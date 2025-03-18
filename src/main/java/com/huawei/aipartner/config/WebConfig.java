package com.huawei.aipartner.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.huawei.aipartner.filter.UserAuthFilter;
import com.huawei.aipartner.interceptor.LoggingInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoggingInterceptor loggingInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册日志拦截器，拦截所有API请求
        registry.addInterceptor(loggingInterceptor)
                .addPathPatterns("/api/**");
    }

    @Bean
    public FilterRegistrationBean<UserAuthFilter> userAuthFilter() {
        FilterRegistrationBean<UserAuthFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new UserAuthFilter());
        registrationBean.addUrlPatterns("/api/*"); // 指定需要过滤的URL模式
        registrationBean.setOrder(1); // 设置过滤器执行顺序
        return registrationBean;
    }

}