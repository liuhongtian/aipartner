package com.huawei.aipartner.functions;

import java.util.Map;

import com.huawei.aipartner.utils.YamlUtils;

/**
 * 根据参数（主要是PageID）生成页面URL，用于展示给用户，供用户选择。
 * 
 */
public class Page implements CallableFunction {

    private static final Map<String, Object> pages = YamlUtils.loadYamlAsMap("pages.yml");

    @Override
    public Object execute(Map<String, Object> arguments) {
        String pageid = (String) arguments.get("pageid");
        // 从url中获取页面内容
        return getPageURL(pageid);
    }

    /**
     * 根据pageid生成页面URL
     * @param pageid
     * @return
     */
    private String getPageURL(String pageid) {
        if(pageid.equals("bing")) { // 特殊处理bing页面，仅做展示
            return "<a href=\"https://www.bing.com\" target=\"_blank\">Bing</a>";
        }

        if(pageid.equals("help")) { // 特殊处理bing页面，仅做展示
            return "<a href=\"/help.html\">帮助</a>";
        }

        return "<a href=\"/Com/PageServer.aspx?PageID=" + pageid + "\">" + pages.get(pageid) + "</a>";
    }

}
