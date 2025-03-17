package com.huawei.aipartner.config;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer, EnvironmentAware {

    private Environment env;

    @Bean
    public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    private String[] allowedOriginPatterns = new String[] { "http://localhost:8080", "http://localhost:3000" };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOriginPatterns = Stream.of(env.getProperty("cors.allowed-origin-patterns", "*").split(","))
                .map(String::trim).collect(Collectors.toList()).toArray(new String[0]);

        System.out.println("cors:");
        Arrays.asList(allowedOriginPatterns).forEach(System.out::println);

        registry.addMapping("/**")
                .allowedOriginPatterns(allowedOriginPatterns)
                // .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    @Override
    public void setEnvironment(Environment environment) {
        this.env = environment;
    }
}