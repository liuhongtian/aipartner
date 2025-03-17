// 默认参数
const DEFAULT_WORKSPACE = "lx2"; // 默认工作空间
const DEFAULT_ENABLE_CHAT = true; // 默认启用智慧问答
const DEFAULT_ENABLE_REPORT = false; // 默认禁用智慧报表
const DEFAULT_ENABLE_EXECUTE = false; // 默认禁用智慧执行

// AI助手唤出按钮缺省样式
const DEFAULT_BUTTON_HTML = `<svg t="1740125757699" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6125" width="32" height="32"><path d="M623.786667 627.958519l-94.814815-274.204445a25.220741 25.220741 0 0 0-9.481482-12.98963 39.158519 39.158519 0 0 0-40.58074 0 25.220741 25.220741 0 0 0-9.481482 12.98963l-93.677037 273.066667c-4.266667 12.515556-3.508148 21.238519 2.085926 26.453333a31.194074 31.194074 0 0 0 22.376296 7.774815 30.814815 30.814815 0 0 0 21.522963-6.637037 44.847407 44.847407 0 0 0 11.282963-17.445926l20.100741-52.148148h92.065185l21.712593 54.518518a43.045926 43.045926 0 0 0 10.429629 15.54963 28.444444 28.444444 0 0 0 21.048889 6.162963 32.142222 32.142222 0 0 0 22.376297-8.059259c5.688889-5.214815 6.637037-13.463704 3.034074-25.031111zM464.592593 533.617778l35.176296-112.82963 34.891852 112.82963zM718.696296 632.225185a29.677037 29.677037 0 0 1-7.111111 21.997037 30.340741 30.340741 0 0 1-22.85037 7.300741 28.444444 28.444444 0 0 1-22.471111-7.300741 30.814815 30.814815 0 0 1-6.637037-21.428148V364.373333q0-29.013333 29.013333-29.013333A33.564444 33.564444 0 0 1 711.111111 341.333333a27.117037 27.117037 0 0 1 7.774815 22.186667z" fill="#FFFFFF" p-id="6126"></path><path d="M555.804444 56.888889a410.074074 410.074074 0 0 0-409.41037 409.41037 35.460741 35.460741 0 0 0 0 4.930371c-28.444444 29.297778-88.746667 96.331852-88.746667 143.454814 0 52.148148 49.303704 72.248889 84.48 73.386667l40.106667 9.007408 7.585185 197.025185a73.765926 73.765926 0 0 0 74.145185 73.007407h150.281482a29.297778 29.297778 0 1 0 0-58.500741H263.964444a14.980741 14.980741 0 0 1-14.885925-14.885926l-9.481482-243.768888-87.04-18.962963-3.034074-0.663704h-3.318519a64.948148 64.948148 0 0 1-19.911111-4.551111c-9.481481-3.792593-9.481481-7.300741-9.481481-10.619259 0-16.971852 37.262222-68.171852 79.549629-109.700741a29.297778 29.297778 0 0 0 7.300741-29.771852 28.444444 28.444444 0 0 0 1.422222-9.007407 350.814815 350.814815 0 0 1 701.62963 0c0 16.308148 29.297778 29.297778 29.297778 29.297777s29.297778-12.98963 29.297778-29.297777A409.979259 409.979259 0 0 0 555.804444 56.888889z" fill="#FFFFFF" p-id="6127"></path><path d="M860.728889 291.271111s146.299259 247.751111-81.92 485.451852c0 0-11.282963 50.725926 47.407407 36.124444 0 0 163.555556-134.542222 136.912593-392.438518z" fill="#FFFFFF" p-id="6128"></path></svg>`;
// 默认参数结束

//ADD DEPENDENCIES
// 添加依赖，用于js图片生成：Chart.js
const scriptChartJS = document.createElement('script');
//scriptChartJS.src = 'https://cdn.jsdelivr.net/npm/chart.js';
scriptChartJS.src = 'http://www.liuhongtian.com:8080/js/chart.js';
scriptChartJS.onload = () => {
    console.log('远程脚本Chart.js加载成功');
};
scriptChartJS.onerror = () => {
    console.error('远程脚本Chart.js加载失败');
};
document.head.appendChild(scriptChartJS);

// 用于生成DOC
const scriptFileSaverJS = document.createElement('script');
scriptFileSaverJS.src = 'http://www.liuhongtian.com:8080/js/FileSaver.min.js';
scriptFileSaverJS.onload = () => {
    console.log('远程脚本FileSaver.min.js加载成功');
};
scriptFileSaverJS.onerror = () => {
    console.error('远程脚本FileSaver.min.js加载失败');
};
document.head.appendChild(scriptFileSaverJS);
const scriptMhtmlToWordJS = document.createElement('script');
scriptMhtmlToWordJS.src = 'http://www.liuhongtian.com:8080/js/mhtmlToWord.js';
scriptMhtmlToWordJS.onload = () => {
    console.log('远程脚本mhtmlToWord.js加载成功');
};
scriptMhtmlToWordJS.onerror = () => {
    console.error('远程脚本mhtmlToWord.js加载失败');
};
document.head.appendChild(scriptMhtmlToWordJS);
const scriptBaiduTemplateProJS = document.createElement('script');
scriptBaiduTemplateProJS.src = 'http://www.liuhongtian.com:8080/js/baiduTemplatePro.js';
scriptBaiduTemplateProJS.onload = () => {
    console.log('远程脚本baiduTemplatePro.js加载成功');
};
scriptBaiduTemplateProJS.onerror = () => {
    console.error('远程脚本baiduTemplatePro.js加载失败');
};
document.head.appendChild(scriptBaiduTemplateProJS);

// 添加依赖，用于生成PDF文件：html2pdf.bundle.min.js
const scriptHtml2pdfJS = document.createElement('script');
//scriptHtml2pdfJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
scriptHtml2pdfJS.src = 'http://www.liuhongtian.com:8080/js/html2pdf.bundle.min.js';
scriptHtml2pdfJS.onload = () => {
    console.log('远程脚本html2pdf.bundle.min.js加载成功');
};
scriptHtml2pdfJS.onerror = () => {
    console.error('远程脚本html2pdf.bundle.min.js加载失败');
};
document.head.appendChild(scriptHtml2pdfJS);
// END OF ADD DEPENDENCIES

// 页面数据解析器
class PageDataParser {

    static parse() {
        let src;
        // 如果当前页面DOM中存在class app-container，则使用此元素的innerHTML
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            src = appContainer.innerHTML;
        } else {
            src = document.body.innerHTML;
        }
        return PageDataParser.parseText(src);
    }

    /**
     * 从HTML字符串中提取文本内容
     * @param {string} html - HTML字符串
     * @returns {string} 提取的文本内容
     */
    static parseText(html) {
        try {
            // 创建一个临时的DOM解析器
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 移除所有script标签
            const scripts = doc.getElementsByTagName('script');
            while (scripts.length > 0) {
                scripts[0].parentNode.removeChild(scripts[0]);
            }

            // 移除所有style标签
            const styles = doc.getElementsByTagName('style');
            while (styles.length > 0) {
                styles[0].parentNode.removeChild(styles[0]);
            }

            // 移除所有link标签
            const links = doc.getElementsByTagName('link');
            while (links.length > 0) {
                links[0].parentNode.removeChild(links[0]);
            }

            // 获取body内容
            const body = doc.body;
            if (!body) {
                return '';
            }

            // 递归提取文本，保持基本结构
            function extractText(element) {
                let text = '';

                // 处理表格
                if (element.tagName === 'TABLE') {
                    const rows = element.getElementsByTagName('tr');
                    for (const row of rows) {
                        const cells = row.getElementsByTagName('td');
                        const cellTexts = [];
                        for (const cell of cells) {
                            cellTexts.push(cell.textContent.trim());
                        }
                        text += cellTexts.join('\t') + '\n';
                    }
                    return text;
                }

                // 处理列表
                if (element.tagName === 'UL' || element.tagName === 'OL') {
                    const items = element.getElementsByTagName('li');
                    for (const item of items) {
                        text += '• ' + item.textContent.trim() + '\n';
                    }
                    return text;
                }

                // 处理标题
                if (element.tagName && element.tagName.match(/^H[1-6]$/)) {
                    return '\n' + element.textContent.trim() + '\n';
                }

                // 处理段落
                if (element.tagName === 'P') {
                    return element.textContent.trim() + '\n';
                }

                // 处理其他元素
                for (const node of element.childNodes) {
                    if (node.nodeType === 3) { // 文本节点
                        text += node.textContent.trim() + ' ';
                    } else if (node.nodeType === 1) { // 元素节点
                        text += extractText(node);
                    }
                }

                return text;
            }

            // 提取文本并清理
            let text = extractText(body)
                .replace(/\s+/g, ' ') // 合并多个空白字符
                .replace(/\n\s*\n/g, '\n') // 移除多余的空行
                .trim();

            return text;
        } catch (error) {
            console.error('HTML解析错误:', error);
            return '';
        }
    }
}

class ChatWidget {
    constructor(options = {}) {
        // 设置默认值和传入的选项
        this.apibase = options.apibase || ""; // 设置默认的API基础URL，如果为空，则使API服务与js在同一服务器
        this.workspace = options.workspace || DEFAULT_WORKSPACE; // 工作空间slug
        this.workspaces = new Map(); // slug -> name
        this.username = options.username;
        this.messages = [];
        this.uuid = undefined;
        this.maxed = false;
        this.attachments = [];

        this.enableChat = options.enable_chat || DEFAULT_ENABLE_CHAT;
        this.enableReport = options.enable_report || DEFAULT_ENABLE_REPORT;
        this.enableExecute = options.enable_execute || DEFAULT_ENABLE_EXECUTE;
        this.button_html = options.button_html || DEFAULT_BUTTON_HTML;
        this.container_id = options.container_id; // 容器ID，如果为空，则使用document.body

        // 创建小组件
        this.createStyles();
        this.createWidget();
        this.createChatWindow();
    }

    createStyles() {
        let widgetButtonPosition = 'fixed';
        if (this.container_id) {   // AI助手按钮在指定容器中
            widgetButtonPosition = 'relative';
        }
        const style = document.createElement('style');
        style.textContent = `
            .on-top {
                position: absolute; /* 或者 relative, fixed */
                z-index: 9999;
            }

            .align-left {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                gap: 10px;
            }

            .align-right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 10px;
            }

            .chat-widget-button {
                position: ${widgetButtonPosition};
                bottom: 40px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%; /* 圆形按钮 */
                background-color: #0097FF;
                color: white;
                border: none;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                z-index: 1000;
            }

            .chat-widget-button:hover {
                background-color: #0078cc;
                transform: scale(1.05);
            }

            .chat-window {
                position: fixed;
                bottom: 30px;
                right: 90px;
                width: 480px;
                max-width: 90vw;
                height: 480px;
                border-radius: 16px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.1);
                display: none;
                background: white;
                flex-direction: column;
                z-index: 1000;
                overflow: hidden;
                resize: none; /* 不允许调整大小 */
                border: 1px solid #e5e7eb;
            }

            .chat-header {
                padding: 16px;
                background: #0097FF;
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 18px; /* 增大字体 */
                font-weight: bold;
            }

            .chat-header-buttons {
                display: flex;
                gap: 8px;
            }

            .chat-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }

            .chat-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .chat-max {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }

            .chat-max:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f9fafb;
            }

            .message {
                margin-bottom: 16px;
                max-width: 85%;
                line-height: 1.5;
                position: relative;
                font-size: 14px; /* 调整字体大小 */
            }

            .user-message {
                margin-left: auto;
                padding: 12px;
                background: #0097FF;
                color: white;
                border-radius: 16px;
                border-bottom-right-radius: 4px;
            }

            .bot-message {
                margin-right: auto;
                padding: 12px;
                background: white;
                color: #333; /* 深灰色 */
                border-radius: 16px;
                border-bottom-left-radius: 4px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.05);
                border: 1px solid #e5e7eb;
            }

            .toolbar-container {
                padding: 8px 16px;
                background: white;
                border-top: 1px solid #e5e7eb;
            }

            .toolbar {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 36px;
            }

            .tool-spliter {
                color: #e5e7eb;
            }

            .chat-input-container {
                position: relative;
                padding: 8px 16px 16px;
                display: flex;
                background: white;
                align-items: flex-end;
                border-top: 1px solid #e5e7eb;
            }

            .chat-input {
                flex: 1;
                padding: 12px 40px 12px 12px;
                border: 1px solid #e5e7eb;
                border-radius: 24px;
                font-size: 14px;
                line-height: 1.5;
                resize: none;
                min-height: 24px;
                max-height: 120px;
                transition: all 0.2s ease;
                outline: none;
                background: #f9fafb;
            }

            .chat-input:focus {
                border-color: #0097FF;
                background: white;
                box-shadow: 0 0 0 2px rgba(0,151,255,0.1);
            }

            .chat-send-icon {
                position: absolute;
                right: 28px;
                bottom: 24px;
                cursor: pointer;
                color: #0097FF;
            }

            .chat-send-icon:hover {
                color: #0078cc;
            }

            .execute-send-icon {
                cursor: pointer;
                color: #666;
            }

            .execute-send-icon:hover {
                color: #0097FF;
            }

            .report-send-icon {
                cursor: pointer;
                color: #666;
            }

            .report-send-icon:hover {
                color: #0097FF;
            }

            .clear-chat-icon {
                cursor: pointer;
                color: #666;
            }

            .clear-chat-icon:hover {
                color: #0097FF;
            }

            .export-chat-icon {
                cursor: pointer;
                color: #666;
            }

            .export-chat-icon:hover {
                color: #0097FF;
            }

            .sources-container {
                margin-top: 8px;
                padding: 8px;
                background: rgba(0, 0, 0, 0.05);
                border-radius: 8px;
                font-size: 12px;
            }

            .sources-title {
                color: #666;
                margin-bottom: 4px;
                font-weight: bold;
            }

            .source-item {
                color: #0097FF;
                margin: 2px 0;
                cursor: pointer;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                text-decoration: none;
                display: block;
            }

            .source-item:hover {
                text-decoration: underline;
                color: #0078cc;
            }

            .source-preview {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                height: 80%;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.2);
                z-index: 1001;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }

            .preview-header {
                padding: 16px;
                background: #f8f9fa;
                border-bottom: 1px solid #dee2e6;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .preview-title {
                font-weight: bold;
                margin-right: 16px;
                flex: 1;
            }

            .preview-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }

            .preview-content {
                flex: 1;
                overflow: auto;
                padding: 16px;
            }

            .preview-iframe {
                width: 100%;
                height: 100%;
                border: none;
            }

            /* 针对机器人消息中的来源样式特殊处理 */
            .bot-message .sources-container {
                background: rgba(0, 0, 0, 0.05);
            }

            .bot-message .sources-title {
                color: #666;
            }

            .bot-message .source-item {
                color: #0097FF;
            }

            .resize-handle {
                position: absolute;
                top: 0;
                left: 0;
                width: 10px; /* 拖拽点的宽度 */
                height: 10px; /* 拖拽点的高度 */
                background: #0097FF;
                cursor: nwse-resize; /* 拖拽光标 */
                z-index: 1001; /* 确保在最上层 */
            }
        `;
        document.head.appendChild(style);
    }

    createWidget() {
        const container = document.getElementById(this.container_id) || document.body;
        const button = document.createElement('button');
        button.className = 'chat-widget-button';
        button.innerHTML = this.button_html;
        button.onclick = () => this.toggleChat();
        container.appendChild(button);
    }

    async createChatWindow() {
        const chatWindow = document.createElement('div');

        chatWindow.className = 'chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <div>华微世纪AI助手</div>
                <div class="chat-header-buttons">
                    <button class="chat-max">+</button>
                    <button class="chat-close">x</button>
                </div>
            </div>
            <div class="resize-handle"></div>
            <div class="chat-messages"></div>
            <div class="toolbar-container" style="display: flex;">
                <div class="toolbar">
                    <span class="align-left">
                        <svg class="report-send-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4.00" data-swindex="0"><path stroke-linejoin="round" d="M44 5H4v12h40z"></path><path stroke-linecap="round" stroke-linejoin="round" d="m4 41.03l12.176-12.3l6.579 6.3L30.798 27l4.48 4.368"></path><path stroke-linecap="round" d="M44 16.172v26m-40-26v14M13.016 43H44M17 11h21m-28-.003h1"></path></g></svg>
                        <svg class="clear-chat-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="m10 12.6l.7.7l1.6-1.6l1.6 1.6l.8-.7L13 11l1.7-1.6l-.8-.8l-1.6 1.7l-1.6-1.7l-.7.8l1.6 1.6zM1 4h14V3H1zm0 3h14V6H1zm8 2.5V9H1v1h8zM9 13v-1H1v1z"></path></svg>
                    </span>
                    <span class="align-right">
                        <svg class="export-chat-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-swindex="0"><path d="M21.25 9.16v7.987a4.1 4.1 0 0 1-1.204 2.901a4.113 4.113 0 0 1-2.906 1.202H6.86a4.113 4.113 0 0 1-2.906-1.202a4.1 4.1 0 0 1-1.204-2.901V6.853a4.1 4.1 0 0 1 1.204-2.901A4.113 4.113 0 0 1 6.86 2.75h8.35a3.004 3.004 0 0 1 2.25.998l3 3.415c.501.545.783 1.256.79 1.997"></path><path d="M7 21.22v-5.241a1.995 1.995 0 0 1 2-1.997h6a2.002 2.002 0 0 1 2 1.997v5.241M15.8 2.81v4.183a1.526 1.526 0 0 1-1.52 1.528H9.72A1.531 1.531 0 0 1 8.2 6.993V2.75m1.946 15.108h3.708"></path></g></svg>
                        <span>
                            <svg t="1740458755742" class="tool-spliter" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9815" width="24" height="24"><path d="M512 102.4h51.2v819.2H512z" fill="#B4C1D4" p-id="9816"></path></svg>
                        </span>
                        <svg class="execute-send-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><g fill="currentColor"><path fill-rule="evenodd" d="M1.5 2h13l.5.5v5.503a5 5 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10z" clip-rule="evenodd"></path><path d="M12 8q.55 0 1.063.14q.51.141.953.407q.44.265.808.625q.367.36.63.808a4.03 4.03 0 0 1 .405 3.082q-.14.513-.406.954a4.4 4.4 0 0 1-.625.808q-.36.367-.808.63a4.03 4.03 0 0 1-3.082.405a3.8 3.8 0 0 1-.954-.406a4.4 4.4 0 0 1-.808-.625a3.8 3.8 0 0 1-.63-.808a4.03 4.03 0 0 1-.405-3.082q.14-.513.406-.954q.265-.44.625-.808q.36-.367.808-.63A4.03 4.03 0 0 1 12 8m2 3.988L11 10v4z"></path></g></svg>
                    </span>
                </div>
            </div>
            <div class="chat-input-container">
                <textarea class="chat-input" 
                    placeholder="向 AI助手 发送消息..." 
                    rows="1"
                    onInput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"
                ></textarea>
                <svg class="chat-send-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2"></path></svg>
            </div>
        `;
        document.body.appendChild(chatWindow);

        // 拖拽功能
        const resizeHandle = chatWindow.querySelector('.resize-handle');
        resizeHandle.style.cursor = 'nwse-resize';

        resizeHandle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = parseInt(document.defaultView.getComputedStyle(chatWindow).width, 10);
            const startHeight = parseInt(document.defaultView.getComputedStyle(chatWindow).height, 10);

            const doDrag = (e) => {
                chatWindow.style.width = `${startWidth - (e.clientX - startX)}px`;
                chatWindow.style.height = `${startHeight - (e.clientY - startY)}px`;
            };

            const stopDrag = () => {
                document.documentElement.removeEventListener('mousemove', doDrag);
                document.documentElement.removeEventListener('mouseup', stopDrag);
            };

            document.documentElement.addEventListener('mousemove', doDrag);
            document.documentElement.addEventListener('mouseup', stopDrag);
        });

        // 绑定事件
        chatWindow.querySelector('.chat-close').onclick = () => this.toggleChat();
        chatWindow.querySelector('.chat-max').onclick = () => this.toggleChatMax();
        chatWindow.querySelector('.chat-send-icon').onclick = () => this.sendMessage();
        chatWindow.querySelector('.clear-chat-icon').onclick = () => this.clearChat();
        chatWindow.querySelector('.export-chat-icon').onclick = () => this.exportChat();
        chatWindow.querySelector('.report-send-icon').onclick = () => this.sendReport();
        chatWindow.querySelector('.execute-send-icon').onclick = () => this.sendExecute();
        chatWindow.querySelector('.chat-input').onkeydown = (e) => {
            if (e.key === 'Enter' && e.shiftKey) { // 按下shift+enter发送消息
                e.preventDefault();
                this.sendMessage();
            }
        };

        this.chatWindow = chatWindow;
        this.messagesContainer = chatWindow.querySelector('.chat-messages');

        // 显示欢迎消息
        this.showWelcomeMessage();

    }

    toggleChat() {
        this.chatWindow.style.display =
            this.chatWindow.style.display === 'none' ||
                this.chatWindow.style.display === '' ? 'flex' : 'none';

        if (this.chatWindow.style.display === 'flex') {
            this.chatWindow.querySelector('.chat-input').focus();
        }
    }

    toggleChatMax() {
        if (this.maxed) {
            this.chatWindow.style.width = '480px';
            this.chatWindow.style.height = '480px';
            this.chatWindow.querySelector('.chat-max').innerHTML = '+';
        } else {
            this.chatWindow.style.width = '100vw';
            this.chatWindow.style.height = '95vh';
            this.chatWindow.querySelector('.chat-max').innerHTML = '-';
        }
        this.maxed = !this.maxed;
    }

    // 客服问答（AnythingLLM）
    async sendMessage() {
        const input = this.chatWindow.querySelector('.chat-input');
        const message = input.value.trim();
        if (!message) return;

        // 清空输入
        input.value = '';

        // 显示用户消息
        this.addMessage(message, 'user');

        // 思考中
        const thinkingMessage = this.addMessage('AI助手思考中 ...', 'bot');

        try {
            if (this.uuid === undefined) {
                this.uuid = getUuid();
            }
            let threadSlug = this.workspace + "_" + this.username + "_" + this.uuid;

            const response = await fetch(`${this.apibase}/api/anything/${this.workspace}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Name': threadSlug // 添加thread slug到请求头
                },
                body: JSON.stringify(message)
            });

            if (!response.ok) {
                throw new Error('网络请求失败');
            }

            // 删除思考中消息
            this.messagesContainer.removeChild(thinkingMessage);

            const data = await response.json();
            this.addMessage(data.textResponse, 'bot', data.sources);

        } catch (error) {
            console.error('发送消息失败:', error);
            this.addMessage('抱歉，发生了错误，请稍后重试。', 'bot');
        } finally {
        }
    }

    // 智慧执行
    async sendExecute() {
        //alert('智慧执行开发中，敬请期待！');
        //return;

        const input = this.chatWindow.querySelector('.chat-input');
        let message = input.value.trim(); // 用户输入的消息
        if (!message) return;

        this.messages.push({
            type: 'user',
            text: message,
            timestamp: new Date()
        });

        const messages = {
            messages: [
                {
                    role: 'system',
                    content: '你是一个专业的AI助手，擅长根据用户的需求归纳需要执行的函数以及对应的参数，并返回给用户。'
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        };


        // 清空输入
        input.value = '';

        // 显示用户消息
        this.addMessage(message, 'user');

        // 思考中
        const thinkingMessage = this.addMessage('AI助手思考中 ...', 'bot');

        try {
            if (this.uuid === undefined) {
                this.uuid = getUuid();
            }
            let threadSlug = this.workspace + "_" + this.username + "_" + this.uuid;

            const response = await fetch(`${this.apibase}/api/openai/fc/deepseek-chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Name': threadSlug // 添加thread slug到请求头
                },
                body: JSON.stringify(messages)
            });

            if (!response.ok) {
                throw new Error('网络请求失败');
            }

            // 删除思考中消息
            this.messagesContainer.removeChild(thinkingMessage);

            const data = await response.json();

            data.messages.forEach(m => {
                let msg = "<p>根据您的指示，您可能需要执行如下操作，请确认：</p><ul>";
                let toolCalls = m.tool_calls;
                toolCalls.forEach(t => { // CallFunction
                    let argString = t.function.arguments;
                    t.function.arguments = JSON.parse(argString.replaceAll("\"[", "[").replaceAll("]\"", "]"));
                    const result = this.executeFunction(t.function);
                    //msg += '<li>' + t.function.name + "(" + JSON.stringify(t.function.arguments) + ")</li>";
                    msg += '<li>' + result + '</li>';
                });
                msg += "</ul>";
                this.addMessage(msg, 'bot');
            });

        } catch (error) {
            console.error('发送消息失败:', error);
            this.addMessage('抱歉，发生了错误，请稍后重试。', 'bot');
        } finally {
        }
    }

    // 执行函数
    executeFunction(functionCall) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `${this.apibase}/api/functions/execute`, false); // false表示同步请求
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(JSON.stringify(functionCall));

        if (xhr.status !== 200) {
            throw new Error('网络请求失败');
        }

        return xhr.responseText;
    }

    // 智慧报表（DeepSeek）
    async sendReport() {
        const input = this.chatWindow.querySelector('.chat-input');
        let message = input.value.trim(); // 用户输入的消息
        message = '请针对当前页面内的表格进行数据分析，生成智慧报表。';

        let displayMessage = message;// 显示给用户的消息（不包括附件内容和当前页面内容）

        // 添加当前页面内容 （不包括对话内容）
        message += '\n当前页面内容：\n' + PageDataParser.parse();

        this.messages.push({
            type: 'user',
            text: message,
            timestamp: new Date()
        });

        const messages = {
            messages: [
                {
                    role: 'system',
                    content: '你是一个专业的数据分析师，擅长根据数据生成智慧报表。请在回答中提供文字描述，如果回答中有图形输出的需求，请提供一个完整的html页面，在其中使用chart.js生成图形，图形中应该包含图例，图形应包含全部图形内容，宽度不超过页面宽度的70%。'
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        };

        // 清空输入
        input.value = '';

        // 显示用户消息
        this.addMessage(displayMessage, 'user');

        // 思考中
        const thinkingMessage = this.addMessage('AI助手思考中 ...', 'bot');

        try {
            if (this.uuid === undefined) {
                this.uuid = getUuid();
            }
            let threadSlug = this.workspace + "_" + this.username + "_" + this.uuid;

            const response = await fetch(`${this.apibase}/api/openai/chat/deepseek-chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-User-Name': threadSlug // 添加thread slug到请求头
                },
                body: JSON.stringify(messages)
            });

            if (!response.ok) {
                throw new Error('网络请求失败');
            }

            // 删除思考中消息
            this.messagesContainer.removeChild(thinkingMessage);

            const data = await response.json();

            data.messages.forEach(m => {
                this.addMessage(m.content, 'bot');
            });

        } catch (error) {
            console.error('发送消息失败:', error);
            this.addMessage('抱歉，发生了错误，请稍后重试。', 'bot');
        } finally {
        }
    }

    clearChat() {
        this.attachments = [];
    }

    exportChat() {
        // 创建导出选项弹窗
        const exportDialog = document.createElement('div');
        exportDialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.8); /* 使背景半透明 */
            backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.15);
            z-index: 1002;
            min-width: 360px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        `;

        exportDialog.innerHTML = `
            <div style="
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
            ">
                <h3 style="
                    margin: 0;
                    font-size: 20px;
                    color: #333;
                    font-weight: 600;
                ">导出对话</h3>
                <button id="closeExport" style="
                    background: none;
                    border: none;
                    font-size: 20px;
                    color: #999;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    transition: all 0.3s;
                ">×</button>
            </div>
            <div style="margin-bottom: 25px;">
                <label style="
                    display: block;
                    margin-bottom: 12px;
                    font-weight: 500;
                    color: #333;
                    font-size: 15px;
                ">导出范围：</label>
                <div style="display: flex; gap: 20px;">
                    <label style="
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                    ">
                        <input type="radio" name="exportRange" value="last" checked style="
                            margin: 0 8px 0 0;
                            cursor: pointer;
                        "> 
                        <span style="color: #444;">最后一条</span>
                    </label>
                    <label style="
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                    ">
                        <input type="radio" name="exportRange" value="all" style="
                            margin: 0 8px 0 0;
                            cursor: pointer;
                        "> 
                        <span style="color: #444;">全部对话</span>
                    </label>
                </div>
            </div>
            <div style="margin-bottom: 30px;">
                <label style="
                    display: block;
                    margin-bottom: 12px;
                    font-weight: 500;
                    color: #333;
                    font-size: 15px;
                ">导出格式：</label>
                <div style="display: flex; gap: 20px;">
                    <label style="
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                    ">
                        <input type="radio" name="exportFormat" value="doc" style="
                            margin: 0 8px 0 0;
                            cursor: pointer;
                        "> 
                        <span style="color: #444;">DOC</span>
                    </label>
                    <label style="
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                    ">
                        <input type="radio" name="exportFormat" value="pdf" style="
                            margin: 0 8px 0 0;
                            cursor: pointer;
                        "> 
                        <span style="color: #444;">PDF</span>
                    </label>
                    <label style="
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        user-select: none;
                    ">
                        <input type="radio" name="exportFormat" value="html" style="
                            margin: 0 8px 0 0;
                            cursor: pointer;
                        "> 
                        <span style="color: #444;">HTML</span>
                    </label>
                </div>
            </div>
            <div style="
                display: flex;
                justify-content: flex-end;
                gap: 12px;
            ">
                <button id="cancelExport" style="
                    padding: 8px 20px;
                    border: 1px solid #ddd;
                    background: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #666;
                    transition: all 0.3s;
                ">取消</button>
                <button id="confirmExport" style="
                    padding: 8px 20px;
                    border: none;
                    background: #1890ff;
                    color: white;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.3s;
                ">导出</button>
            </div>
        `;

        // 添加遮罩层
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.45);
            z-index: 1001;
            backdrop-filter: blur(2px);
            transition: all 0.3s;
        `;

        // 添加到页面
        document.body.appendChild(overlay);
        document.body.appendChild(exportDialog);

        // 添加悬停效果
        const buttons = exportDialog.querySelectorAll('button');
        buttons.forEach(button => {
            button.onmouseover = () => {
                if (button.id === 'confirmExport') {
                    button.style.background = '#40a9ff';
                } else if (button.id === 'cancelExport') {
                    button.style.background = '#f5f5f5';
                } else if (button.id === 'closeExport') {
                    button.style.background = '#f5f5f5';
                }
            };
            button.onmouseout = () => {
                if (button.id === 'confirmExport') {
                    button.style.background = '#1890ff';
                } else if (button.id === 'cancelExport') {
                    button.style.background = 'white';
                } else if (button.id === 'closeExport') {
                    button.style.background = 'none';
                }
            };
        });

        // 绑定事件
        const closeDialog = () => {
            overlay.style.opacity = '0';
            exportDialog.style.opacity = '0';
            exportDialog.style.transform = 'translate(-50%, -60%)';
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.removeChild(exportDialog);
            }, 300);
        };

        exportDialog.querySelector('#closeExport').onclick = closeDialog;
        exportDialog.querySelector('#cancelExport').onclick = closeDialog;

        exportDialog.querySelector('#confirmExport').onclick = async () => {
            const range = exportDialog.querySelector('input[name="exportRange"]:checked').value;
            const format = exportDialog.querySelector('input[name="exportFormat"]:checked').value;

            // 获取要导出的消息
            const messagesToExport = range === 'last'
                ? [this.messages[this.messages.length - 1]]
                : this.messages;

            // 生成导出内容
            let content = '';
            messagesToExport.forEach(msg => {
                const role = msg.type === 'user' ? '用户' : 'AI助手';
                const time = msg.timestamp.toLocaleString();

                let text = msg.type === 'user' ? this.convertToHtml(msg.text) : msg.text;
                content += `<p>${role}&nbsp;(${time}):</p><p class="message-content">${text}</p>`;

                //content += `<p>${role}&nbsp;(${time}):<p class="message-content">${msg.text}</p>`;

                // 添加来源信息（如果有）
                if (msg.sources && msg.sources.length > 0) {
                    content += '<p class="sources-title">参考来源:</p><ul class="sources-list">';
                    msg.sources.forEach(source => {
                        content += `<li>${source.title || source.url}</li>`;
                    });
                    content += '</ul>';
                }

                content += '<hr class="message-separator" />';
            });

            // 如果是导出HTML，添加完整的HTML结构和样式
            if (format === 'html') {
                const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>对话记录 - ${new Date().toLocaleString()}</title>
    <script src="http://www.liuhongtian.com:8080/js/chart.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #1890ff;
            margin-bottom: 30px;
        }
        .message-content {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
        }
        .message-content pre {
            background: #f1f1f1;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .message-content code {
            background: #f1f1f1;
            padding: 2px 4px;
            border-radius: 3px;
        }
        .sources-title {
            color: #666;
            margin-top: 15px;
            font-weight: 500;
        }
        .sources-list {
            margin: 10px 0;
            padding-left: 20px;
        }
        .sources-list a {
            color: #1890ff;
            text-decoration: none;
        }
        .sources-list a:hover {
            text-decoration: underline;
        }
        .message-separator {
            border: none;
            border-top: 1px solid #eee;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>对话记录</h1>
        ${content}
    </div>
</body>
</html>`;

                // 创建Blob并下载
                const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `对话记录_${new Date().toLocaleString()}.html`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                closeDialog();
            } else {
                try {
                    if (format === 'pdf') {
                        await this.exportToPDF(content);
                    } else if (format === 'doc') {
                        await this.exportToDoc(content);
                    }
                    closeDialog();
                } catch (error) {
                    console.error('导出失败:', error);
                    alert('导出失败，请稍后重试');
                }
            }
        };
    }

    // 将原始字符串转换为html（用户消息需要这个处理）
    convertToHtml(text) {
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
    }

    async exportToDoc(content) {
        exportWord({
            mhtml: content,
            data: { title: "exportword" },
            filename: `对话记录_${new Date().toLocaleString()}`,
            style: `
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 12px rgba(0,0,0,0.1);
        }
        h1 {
            text-align: center;
            color: #1890ff;
            margin-bottom: 30px;
        }
        .message-content {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
        }
        .message-content pre {
            background: #f1f1f1;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .message-content code {
            background: #f1f1f1;
            padding: 2px 4px;
            border-radius: 3px;
        }
        .sources-title {
            color: #666;
            margin-top: 15px;
            font-weight: 500;
        }
        .sources-list {
            margin: 10px 0;
            padding-left: 20px;
        }
        .sources-list a {
            color: #1890ff;
            text-decoration: none;
        }
        .sources-list a:hover {
            text-decoration: underline;
        }
        .message-separator {
            border: none;
            border-top: 1px solid #eee;
            margin: 20px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background: #f5f5f5;
        }
`
        })
    }

    async exportToPDF(htmlContent) {
        const element = document.createElement('div');
        element.innerHTML = htmlContent;

        const opt = {
            margin: 1,
            filename: `对话记录_${new Date().toLocaleString()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            await html2pdf().from(element).set(opt).save();
        } catch (error) {
            console.error('导出PDF时出错:', error);
            throw new Error('导出PDF失败: ' + error.message);
        }
    }

    addMessage(text, type, sources = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;

        if (type === 'bot') {
            const parser = new DOMParser();
            const dom = parser.parseFromString(text, 'text/html');

            // 将dom.body的内容添加到messageDiv
            const nodes = Array.from(dom.body.childNodes);
            nodes.forEach(node => {
                // 如果是script标签，需要创建新的script标签并执行
                if (node.nodeName.toLowerCase() === 'script') {
                    const scriptElement = document.createElement('script');
                    // 复制原script的属性
                    Array.from(node.attributes).forEach(attr => {
                        scriptElement.setAttribute(attr.name, attr.value);
                    });
                    // 复制内容
                    scriptElement.textContent = node.textContent;
                    messageDiv.appendChild(scriptElement);
                } else {
                    // 其他元素直接添加
                    messageDiv.appendChild(node.cloneNode(true));
                }
            });
        } else {
            messageDiv.innerHTML = text;
        }

        if (sources && sources.length > 0) {
            const sourcesContainer = document.createElement('div');
            sourcesContainer.className = 'sources-container';
            sourcesContainer.innerHTML = '<div class="sources-title">参考来源</div>';

            sources.forEach(source => {
                const sourceItem = document.createElement('a');
                sourceItem.className = 'source-item';
                sourceItem.textContent = source.title || source.url;
                sourceItem.href = source.url;
                sourceItem.onclick = () => this.showSourcePreview(source);
                sourcesContainer.appendChild(sourceItem);
            });

            messageDiv.appendChild(sourcesContainer);
        }

        this.messagesContainer.appendChild(messageDiv);
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

        this.messages.push({
            type,
            text,
            sources,
            timestamp: new Date()
        });

        return messageDiv;
    }

    showSourcePreview(source) {
        // 创建预览窗口
        const previewDiv = document.createElement('div');
        previewDiv.className = 'source-preview';

        // 创建预览窗口头部
        const headerDiv = document.createElement('div');
        headerDiv.className = 'preview-header';

        const titleSpan = document.createElement('span');
        titleSpan.className = 'preview-title';
        titleSpan.textContent = source.title || source.url;

        const closeButton = document.createElement('button');
        closeButton.className = 'preview-close';
        closeButton.innerHTML = '×';
        closeButton.onclick = () => previewDiv.remove();

        headerDiv.appendChild(titleSpan);
        headerDiv.appendChild(closeButton);

        // 创建内容区域
        const contentDiv = document.createElement('div');
        contentDiv.className = 'preview-content';

        // 使用iframe加载URL内容
        const iframe = document.createElement('iframe');
        iframe.className = 'preview-iframe';
        // iframe.src = source.url; // 使用iframe加载URL内容（这个不行，url不对）
        iframe.srcdoc = source.text; // 使用srcdoc加载文本内容

        contentDiv.appendChild(iframe);

        // 组装预览窗口
        previewDiv.appendChild(headerDiv);
        previewDiv.appendChild(contentDiv);

        // 添加到页面
        document.body.appendChild(previewDiv);
    }

    showWelcomeMessage() {
        const timeString = new Date().getHours() < 12 ? '上午好' : '下午好';
        const welcomeMessage = `${timeString}，${this.username}！我是华微世纪AI助手，很高兴见到您！<br>我可以为您解答问题、分析数据、执行任务，请把您的要求告诉我吧～`;
        this.addMessage(welcomeMessage, 'bot');
    }

}

function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

// 导出供其他文件使用
window.ChatWidget = ChatWidget;
