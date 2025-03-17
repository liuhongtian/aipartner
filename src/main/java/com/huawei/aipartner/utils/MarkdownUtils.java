package com.huawei.aipartner.utils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.commonmark.Extension;
import org.commonmark.ext.gfm.tables.TablesExtension;
import org.commonmark.parser.Parser;
import org.commonmark.renderer.html.HtmlRenderer;

public class MarkdownUtils {
    private static final List<Extension> extensions = Arrays.asList(TablesExtension.create());
    private static final Parser parser = Parser.builder().extensions(extensions).build();
    private static final HtmlRenderer renderer = HtmlRenderer.builder().extensions(extensions).build();

    public static String markdownToHtml(String markdown) {
        var html = renderer.render(parser.parse(markdown));
        System.out.println("RAW HTML: " + html);
        html = parsePrepare(html);
        html = parseCodeSvg(html);
        html = parseCodeHtml(html);
        html = parseCodeJavascript(html);
        System.out.println("PARSED HTML: " + html);
        return html;
    }

    private static final String CODE_END = "</code></pre>";
    private static final String SVG_BEGIN = "<pre><code class=\"language-svg\">";
    private static final String HTML_BEGIN = "<pre><code class=\"language-html\">";
    private static final String JAVASCRIPT_BEGIN = "<pre><code class=\"language-javascript\">";

    private static String parsePrepare(String rawHtml) {
        return rawHtml.replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", "\"")
                .replaceAll("&apos;", "'").replaceAll("&amp;", "&");
    }

    /**
     * 处理html字符串，去除code标签，提取svg中的内容
     * 
     * @param rawHtml
     * @return
     */
    private static String parseCodeSvg(String rawHtml) {
        int start = rawHtml.indexOf(SVG_BEGIN) + SVG_BEGIN.length();

        if (start != -1) {
            return Stream.of(rawHtml.split(SVG_BEGIN))
                    .map(svg -> svg.replace(CODE_END, ""))
                    .collect(Collectors.joining());
        }

        return rawHtml;
    }

    /**
     * 处理完整的html字符串，去除code标签，并提取body中的内容
     * 
     * @param rawHtml
     * @return
     */
    private static String parseCodeHtml(String rawHtml) {
        int start = rawHtml.indexOf(HTML_BEGIN) + HTML_BEGIN.length();

        if (start != -1) {
            return Stream.of(rawHtml.split(HTML_BEGIN)) // 按html起始标签拆分
                    .map(html -> {
                        html = html.replace(CODE_END, ""); // 去掉第一个</code></pre>，不然会干扰其他节点
                        int s = html.indexOf("<body>") + "<body>".length();
                        int f = html.indexOf("</body>");
                        if (s != -1 && f != -1) {
                            var tmp = html.split("</head>"); // 按</head>拆分，分别处理head和body

                            // 处理head，提取出所有script标签
                            var head = tmp[0];
                            var scripts = Stream.of(head.split("<script"))
                                    .filter(script -> script.contains("</script>"))
                                    .map(script -> "<script"
                                            + script.substring(0, script.indexOf("</script>") + "</script>".length()))
                                    .collect(Collectors.joining());

                            var body = tmp[1];
                            // 去掉</body>到</html>之间的内容(包括</body>和</html>)，不能直接丢弃</body>之后的内容，因为还可能包括code标签之外的内容
                            var content = body.substring(body.indexOf("<body>") + "<body>".length(),
                                    body.indexOf("</body>"))
                                    + body.substring(body.indexOf("</html>") + "</html>".length());
                            // 将scripts插入到content的开头
                            return scripts + content;
                        } else {
                            return html;
                        }
                    })
                    .collect(Collectors.joining());
        } else {
            return rawHtml;
        }
    }

    /**
     * 
     * @param rawHtml
     * @return
     */
    private static String parseCodeJavascript(String rawHtml) {
        int start = rawHtml.indexOf(JAVASCRIPT_BEGIN) + JAVASCRIPT_BEGIN.length();

        if (start != -1) {
            return Stream.of(rawHtml.split(JAVASCRIPT_BEGIN))
                    .map(e -> e.contains(CODE_END) ? "<script>" + e.replace(CODE_END, "</script>") : e)
                    .collect(Collectors.joining());
        }

        return rawHtml;
    }
}