const generateHtmlContent = (text) => {
    if (!text) return '';

    // 转义HTML特殊字符
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

    // 处理换行符
    html = html.replace(/\n/g, '<br>');

    // 处理URL链接
    html = html.replace(
        /(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/g,
        '<a href="$1" target="_blank" style="color: #1890ff; text-decoration: underline;">$1</a>'
    );

    // 处理粗体文本 **text** 或 __text__
    html = html.replace(
        /(\*\*|__)(.*?)\1/g,
        '<strong style="font-weight: 600;">$2</strong>'
    );

    // 处理斜体文本 *text* 或 _text_
    html = html.replace(
        /(\*|_)(.*?)\1/g,
        '<em style="font-style: italic;">$2</em>'
    );

    // 处理代码块 ```code```
    html = html.replace(
        /```([\s\S]*?)```/g,
        '<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 4px; font-family: monospace; white-space: pre-wrap;">$1</pre>'
    );

    // 处理行内代码 `code`
    html = html.replace(
        /`([^`]+)`/g,
        '<code style="background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>'
    );

    // 处理无序列表
    html = html.replace(
        /^[\s]*?[-*+][\s]+(.*?)(?=\n|$)/gm,
        '<li style="margin-left: 20px;">$1</li>'
    );
    if (html.includes('<li')) {
        html = '<ul style="list-style-type: disc; margin: 10px 0;">' + html + '</ul>';
    }

    // 处理有序列表
    html = html.replace(
        /^[\s]*?\d+\.[\s]+(.*?)(?=\n|$)/gm,
        '<li style="margin-left: 20px;">$1</li>'
    );
    if (html.includes('<li')) {
        html = '<ul style="list-style-type: decimal; margin: 10px 0;">' + html + '</ul>';
    }

    // 处理引用
    html = html.replace(
        /^>[\s]+(.*?)(?=\n|$)/gm,
        '<blockquote style="border-left: 4px solid #ddd; margin: 10px 0; padding: 10px; color: #666;">$1</blockquote>'
    );

    // 处理标题 # Heading
    html = html.replace(
        /^(#{1,6})[\s]+(.*?)(?=\n|$)/gm,
        (match, hashes, content) => {
            const level = hashes.length;
            const fontSize = 24 - ((level - 1) * 2);
            return `<h${level} style="font-size: ${fontSize}px; margin: 16px 0; font-weight: 600;">${content}</h${level}>`;
        }
    );

    // 处理水平线
    html = html.replace(
        /^[\s]*?(?:[-*_]){3,}[\s]*$/gm,
        '<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">'
    );

    // 将连续的换行符替换为一个段落
    html = html.replace(
        /(<br>[\s]*){2,}/g,
        '</p><p style="margin: 10px 0;">'
    );

    // 确保内容被包裹在段落标签中
    if (!html.startsWith('<')) {
        html = '<p style="margin: 10px 0;">' + html + '</p>';
    }

    return html;
};
