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

// 添加依赖，用于js图片生成：Plotly.js
const scriptPlotlyJS = document.createElement('script');
//scriptPlotlyJS.src = 'https://cdn.plot.ly/plotly-latest.min.js';
scriptPlotlyJS.src = 'http://www.liuhongtian.com:8080/js/plotly-latest.min.js';
scriptPlotlyJS.onload = () => {
    console.log('远程脚本Plotly.js加载成功');
};
scriptPlotlyJS.onerror = () => {
    console.error('远程脚本Plotly.js加载失败');
};
document.head.appendChild(scriptPlotlyJS);

// 添加依赖，用于上传Word附件的解析：mammoth.browser.min.js
const scriptMammothJS = document.createElement('script');
//scriptMammothJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.9.0/mammoth.browser.min.js';
scriptMammothJS.src = 'http://www.liuhongtian.com:8080/js/mammoth.browser.min.js';
scriptMammothJS.onload = () => {
    console.log('远程脚本mammoth.browser.min.js加载成功');
};
scriptMammothJS.onerror = () => {
    console.error('远程脚本mammoth.browser.min.js加载失败');
};
document.head.appendChild(scriptMammothJS);

// 添加依赖，用于上传附Excel件的解析：xlsx.full.min.js
const scriptXlsxJS = document.createElement('script');
//scriptXlsxJS.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
scriptXlsxJS.src = 'http://www.liuhongtian.com:8080/js/xlsx.full.min.js';
scriptXlsxJS.onload = () => {
    console.log('远程脚本xlsx.full.min.js加载成功');
};
scriptXlsxJS.onerror = () => {
    console.error('远程脚本xlsx.full.min.js加载失败');
};
document.head.appendChild(scriptXlsxJS);

// 添加依赖，用于上传PDF附件的解析：PDF.js不要高于3.11.174版本，否则会报错（以后的版本使用了模块系统，文件名后缀为mjs，需要使用import语法引入）
const scriptPdfJS = document.createElement('script');
//scriptPdfJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
scriptPdfJS.src = 'http://www.liuhongtian.com:8080/js/pdf.min.js';
scriptPdfJS.onload = () => {
    console.log('远程脚本pdf.min.js加载成功');
};
scriptPdfJS.onerror = () => {
    console.error('远程脚本pdf.min.js加载失败');
};
document.head.appendChild(scriptPdfJS);

// 添加依赖，用于生成DOCX文件：docx
const scriptDocxJS = document.createElement('script');
//scriptDocxJS.src = 'https://unpkg.com/docx@8.0.4/build/index.js';
scriptDocxJS.src = 'http://www.liuhongtian.com:8080/js/docx.index.js';
scriptDocxJS.onload = () => {
    console.log('远程脚本docx加载成功');
};
scriptDocxJS.onerror = () => {
    console.error('远程脚本docx加载失败');
};
document.head.appendChild(scriptDocxJS);

// 另一个用于生成DOC的方案
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

class Attachment {
    constructor(options = {}) {
        this.title = options.title;
        this.text = options.text;
    }
}

class FileParser {
    /**
     * 解析文件内容
     * @param {File} file - 文件对象
     * @returns {Promise<string>} 解析后的文本内容
     */
    static async parseFile(file) {
        const fileType = file.name.split('.').pop().toLowerCase();

        switch (fileType) {
            case 'xls':
            case 'xlsx':
                return await this.parseExcel(file);
            case 'doc':
            case 'docx':
                return await this.parseWord(file);
            case 'pdf':
                return await this.parsePDF(file);
            default: // 默认解析为文本，请自行确认文件内容正确
                return await this.parseText(file);
        }
    }

    /**
     * 解析Excel文件
     * @param {File} file - Excel文件
     * @returns {Promise<string>} 解析后的文本
     */
    static async parseExcel(file) {
        try {
            // 使用 SheetJS (XLSX)
            const XLSX = window.XLSX;
            if (!XLSX) {
                throw new Error('请先引入XLSX库');
            }

            const arrayBuffer = await file.arrayBuffer();
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });

            let result = [];
            workbook.SheetNames.forEach(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                result.push(`Sheet: ${sheetName}`);
                jsonData.forEach(row => {
                    if (row.length > 0) {
                        result.push(row.join('\t'));
                    }
                });
            });

            return result.join('\n');
        } catch (error) {
            console.error('Excel解析错误:', error);
            throw error;
        }
    }

    /**
     * 解析Word文件
     * @param {File} file - Word文件
     * @returns {Promise<string>} 解析后的文本
     */
    static async parseWord(file) {
        try {
            // 使用 Mammoth.js
            const mammoth = window.mammoth;
            if (!mammoth) {
                throw new Error('请先引入Mammoth.js库');
            }

            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.extractRawText({ arrayBuffer });
            return result.value;
        } catch (error) {
            console.error('Word解析错误:', error);
            throw error;
        }
    }

    /**
     * 解析PDF文件
     * @param {File} file - PDF文件
     * @returns {Promise<string>} 解析后的文本
     */
    static async parsePDF(file) {
        try {
            // 使用 PDF.js
            const pdfjsLib = window.pdfjsLib;
            if (!pdfjsLib) {
                throw new Error('请先引入PDF.js库');
            }

            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

            let textContent = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                const text = content.items.map(item => item.str).join(' ');
                textContent.push(`Page ${i}:\n${text}`);
            }

            return textContent.join('\n\n');
        } catch (error) {
            console.error('PDF解析错误:', error);
            throw error;
        }
    }

    /**
     * 解析文本文件
     * @param {File} file - 文本文件
     * @returns {Promise<string>} 文件内容
     */
    static async parseText(file) {
        try {
            return await file.text();
        } catch (error) {
            console.error('文本文件解析错误:', error);
            throw error;
        }
    }
}

class TextParser {
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
        this.workspace = options.workspace; // 工作空间slug
        this.workspaceName = "";    // 工作空间显示名称
        this.workspaces = new Map(); // slug -> name
        this.username = options.username;
        this.messages = [];
        this.uuid = undefined;
        this.maxed = false;
        this.attachments = [];

        // 创建小组件
        this.createStyles();
        this.createWidget();
        this.createChatWindow();
    }

    createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .on-top {
                position: absolute; /* 或者 relative, fixed */
                z-index: 9999;
            }

            .show-help {
                font-size: 18px;
                font-weight: bold;
                cursor: help;
            }

            .show-help:hover {
                color:rgba(202, 206, 210, 0.95);
            }

            .align-left {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }

            .align-right {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }

            .chat-widget-button-tag {
            }

            .chat-widget-button {
                position: fixed;
                bottom: 40px;
                right: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%; /* 圆形按钮 */
                background-color:rgba(213, 213, 213, 0.89);
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
                background-color: rgb(100, 100, 100);
            }

            .chat-window {
                position: fixed;
                bottom: 30px;
                right: 90px;
                width: 480px;
                max-width: 90vw;
                height:480px;
                border-radius: 16px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.1);
                display: none;
                background: rgba(255, 255, 255, 0.8); /* 使背景半透明 */
                backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
                flex-direction: column;
                z-index: 1000;
                overflow: hidden;
                resize: none; /* 不允许调整大小 */
            }

            .chat-header {
                padding: 16px;
                background:rgb(4, 61, 121); /* 蓝色 */
                backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 18px; /* 增大字体 */
                font-weight: bold;
            }

            .chat-header-buttons {
                display: flex;
            }

            .toggle-toolbar {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
            }

            .chat-close {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
            }

            .chat-max {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                font-size: 20px;
            }

            .chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: #f1f1f1; /* 浅灰色 */
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
                background:rgb(118, 225, 235); /* 蓝色 */
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
            }

            .toolbar-container {
                position: relative;
                padding: 16px;
                display: flex;
                background: #f1f1f1;
                align-items: flex-end;
                border-top: 1px solid #eee;
            }

            .toolbar {
                padding: 6px;
                flex: 1;
                background-color: rgb(159, 236, 253); /* 背景色 */
                height: 40px; /* 设置工具栏高度 */
                width: 100%;
                justify-content: space-between; /* 左右分列 */
                align-items: center; /* 垂直居中 */
                /*background-color: transparent;*/
                font-size: 16px;
                color: gray; /* 字体颜色 */
                border-radius: 12px;
            }

            .tool-spliter {
                padding: 1px;
            }

            .chat-input-container {
                position: relative;
                padding: 16px;
                display: flex;
                background: #f1f1f1;
                backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
                align-items: flex-end;
                border-top: 1px solid #eee;
            }

            .chat-input {
                flex: 1;
                padding: 12px;
                border: 1px solid #e5e7eb;
                border-radius: 12px;
                font-size: 14px;
                line-height: 1.5;
                resize: none;
                min-height: 40px; /* 增加最小高度 */
                max-height: 200px;
                transition: all 0.2s ease;
                outline: none;
                background: #f9fafb;
            }

            .chat-input:focus {
                border-color: #007bff; /* 蓝色 */
                background: white;
                box-shadow: 0 0 0 2px rgba(0,123,255,0.1);
            }

            .chat-send-icon {
                position: absolute;
                right: 40px;
                bottom: 15px;
                transform: translateY(-50%);
                width: 32px;
                height: 32px;
                cursor: pointer;
            }

            .chat-send-icon:hover {
                color:rgb(10, 171, 216);
            }

            .execute-send-icon {
                padding: 4px;
                cursor: pointer;
            }

            .execute-send-icon:hover {
                color:rgb(10, 171, 216);
            }

            .report-send-icon {
                font-size:2em;
                padding: 4px;
                cursor: pointer;
            }

            .report-send-icon:hover {
                color:rgb(10, 171, 216);
            }

            .upload-attachments-icon {
                font-size:2em;
                padding: 4px;
                cursor: pointer;
            }

            .uploaded-attachments-icon {
                font-size:2em;
                padding: 4px;
                cursor: pointer;
            }

            .clear-attachments-icon {
                font-size:2em;
                padding: 4px;
                cursor: pointer;
            }

            .export-chat-icon {
                font-size:2em;
                padding: 4px;
                cursor: pointer;
            }

            .switch-workspace-icon {
                position: absolute;
                right: 80px;
                bottom: 15px;
                transform: translateY(-50%);
                width: 24px;
                height: 24px;
                padding-left: 10px;
                cursor: pointer;
                color: gray;
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
                color: #007bff;
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
                color: #0056b3;
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
                color: #0056b3;
            }

            .resize-handle {
                position: absolute;
                top: 0;
                left: 0;
                width: 10px; /* 拖拽点的宽度 */
                height: 10px; /* 拖拽点的高度 */
                background: rgb(4, 61, 121);
                cursor: nwse-resize; /* 拖拽光标 */
                z-index: 1001; /* 确保在最上层 */
            }
        `;
        document.head.appendChild(style);
    }

    createWidget() {
        const button = document.createElement('button');
        button.className = 'chat-widget-button-tag chat-widget-button';
        //button.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
        button.innerHTML = `<svg t="1740125757699" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6125" width="36" height="36"><path d="M623.786667 627.958519l-94.814815-274.204445a25.220741 25.220741 0 0 0-9.481482-12.98963 39.158519 39.158519 0 0 0-40.58074 0 25.220741 25.220741 0 0 0-9.481482 12.98963l-93.677037 273.066667c-4.266667 12.515556-3.508148 21.238519 2.085926 26.453333a31.194074 31.194074 0 0 0 22.376296 7.774815 30.814815 30.814815 0 0 0 21.522963-6.637037 44.847407 44.847407 0 0 0 11.282963-17.445926l20.100741-52.148148h92.065185l21.712593 54.518518a43.045926 43.045926 0 0 0 10.429629 15.54963 28.444444 28.444444 0 0 0 21.048889 6.162963 32.142222 32.142222 0 0 0 22.376297-8.059259c5.688889-5.214815 6.637037-13.463704 3.034074-25.031111zM464.592593 533.617778l35.176296-112.82963 34.891852 112.82963zM718.696296 632.225185a29.677037 29.677037 0 0 1-7.111111 21.997037 30.340741 30.340741 0 0 1-22.85037 7.300741 28.444444 28.444444 0 0 1-22.471111-7.300741 30.814815 30.814815 0 0 1-6.637037-21.428148V364.373333q0-29.013333 29.013333-29.013333A33.564444 33.564444 0 0 1 711.111111 341.333333a27.117037 27.117037 0 0 1 7.774815 22.186667z" fill="#0097FF" p-id="6126"></path><path d="M555.804444 56.888889a410.074074 410.074074 0 0 0-409.41037 409.41037 35.460741 35.460741 0 0 0 0 4.930371c-28.444444 29.297778-88.746667 96.331852-88.746667 143.454814 0 52.148148 49.303704 72.248889 84.48 73.386667l40.106667 9.007408 7.585185 197.025185a73.765926 73.765926 0 0 0 74.145185 73.007407h150.281482a29.297778 29.297778 0 1 0 0-58.500741H263.964444a14.980741 14.980741 0 0 1-14.885925-14.885926l-9.481482-243.768888-87.04-18.962963-3.034074-0.663704h-3.318519a64.948148 64.948148 0 0 1-19.911111-4.551111c-9.481481-3.792593-9.481481-7.300741-9.481481-10.619259 0-16.971852 37.262222-68.171852 79.549629-109.700741a29.297778 29.297778 0 0 0 7.300741-29.771852 28.444444 28.444444 0 0 0 1.422222-9.007407 350.814815 350.814815 0 0 1 701.62963 0c0 16.308148 29.297778 29.297778 29.297778 29.297777s29.297778-12.98963 29.297778-29.297777A409.979259 409.979259 0 0 0 555.804444 56.888889z" fill="#0097FF" p-id="6127"></path><path d="M860.728889 291.271111s146.299259 247.751111-81.92 485.451852c0 0-11.282963 50.725926 47.407407 36.124444 0 0 163.555556-134.542222 136.912593-392.438518z" fill="#0097FF" p-id="6128"></path></svg>`;
        button.onclick = () => this.toggleChat();
        document.body.appendChild(button);
    }

    async getWorkspaces() {
        const url = `${this.apibase}/api/anything/workspaces`;
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return data.workspaces;
            } else {
                console.error('获取工作空间失败:', response.statusText);
                this.addMessage('获取知识库列表失败，重新打开对话窗口重试。', 'bot');
                return [];
            }
        } catch (error) {
            console.error('发送消息失败:', error);
            this.addMessage('获取知识库列表失败，重新打开对话窗口重试。', 'bot');
            return [];
        }
    }

    async refreshWorkspaces() {
        let workspaces = await this.getWorkspaces();
        for (let workspace of workspaces) {
            if (workspace.slug === this.workspace) {
                this.workspaceName = workspace.name;
            }
            this.workspaces.set(workspace.slug, workspace.name);
        }
    }

    async createChatWindow() {
        const chatWindow = document.createElement('div');

        chatWindow.className = 'chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <div class="show-help">华微世纪AI助手</div>
                <div class="chat-header-buttons">
                    <button class="toggle-toolbar">#</span></button>
                    <button class="chat-max">+</button>
                    <button class="chat-close">x</button>
                </div>
            </div>
            <div class="resize-handle"></div>
            <div class="chat-messages"></div>
            <div class="toolbar-container" style="display: block;"><div class="toolbar">
                <span class="align-left">
                </span>
                <span class="align-right">
                    <svg class="report-send-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4.00" data-swindex="0"><path stroke-linejoin="round" d="M44 5H4v12h40z"></path><path stroke-linecap="round" stroke-linejoin="round" d="m4 41.03l12.176-12.3l6.579 6.3L30.798 27l4.48 4.368"></path><path stroke-linecap="round" d="M44 16.172v26m-40-26v14M13.016 43H44M17 11h21m-28-.003h1"></path></g></svg>
                    <svg class="upload-attachments-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M208.25 123.76a6 6 0 0 1 0 8.49l-82.06 82a54 54 0 0 1-76.36-76.39L149.1 37.14a38 38 0 1 1 53.77 53.72l-99.28 100.68a22 22 0 1 1-31.15-31.09l83.28-84.67a6 6 0 0 1 8.56 8.42L81 168.91a10 10 0 1 0 14.11 14.18L194.35 82.4a26 26 0 1 0-36.74-36.8L58.33 146.28a42 42 0 1 0 59.37 59.44l82.06-82a6 6 0 0 1 8.49.04"></path></svg>
                    <svg class="uploaded-attachments-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" data-swindex="0"><path d="M5 19.5V5a2 2 0 0 1 2-2h11.4a.6.6 0 0 1 .6.6V21M9 7h6m-8.5 8H19M6.5 18H19M6.5 21H19"></path><path stroke-linejoin="round" d="M6.5 18c-1 0-1.5-.672-1.5-1.5S5.5 15 6.5 15m0 6c-1 0-1.5-.672-1.5-1.5S5.5 18 6.5 18"></path></g></svg>
                    <svg class="clear-attachments-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="m10 12.6l.7.7l1.6-1.6l1.6 1.6l.8-.7L13 11l1.7-1.6l-.8-.8l-1.6 1.7l-1.6-1.7l-.7.8l1.6 1.6zM1 4h14V3H1zm0 3h14V6H1zm8 2.5V9H1v1h8zM9 13v-1H1v1z"></path></svg>
                    <span>
                        <svg t="1740458755742" class="tool-spliter" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9815" width="32" height="32"><path d="M512 102.4h51.2v819.2H512z" fill="#B4C1D4" p-id="9816"></path></svg>
                    </span>
                    <svg class="export-chat-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-swindex="0"><path d="M21.25 9.16v7.987a4.1 4.1 0 0 1-1.204 2.901a4.113 4.113 0 0 1-2.906 1.202H6.86a4.113 4.113 0 0 1-2.906-1.202a4.1 4.1 0 0 1-1.204-2.901V6.853a4.1 4.1 0 0 1 1.204-2.901A4.113 4.113 0 0 1 6.86 2.75h8.35a3.004 3.004 0 0 1 2.25.998l3 3.415c.501.545.783 1.256.79 1.997"></path><path d="M7 21.22v-5.241a1.995 1.995 0 0 1 2-1.997h6a2.002 2.002 0 0 1 2 1.997v5.241M15.8 2.81v4.183a1.526 1.526 0 0 1-1.52 1.528H9.72A1.531 1.531 0 0 1 8.2 6.993V2.75m1.946 15.108h3.708"></path></g></svg>
                    <span>
                        <svg t="1740458755742" class="tool-spliter" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9815" width="32" height="32"><path d="M512 102.4h51.2v819.2H512z" fill="#B4C1D4" p-id="9816"></path></svg>
                    </span>
                    <svg class="execute-send-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 16 16"><g fill="currentColor"><path fill-rule="evenodd" d="M1.5 2h13l.5.5v5.503a5 5 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10z" clip-rule="evenodd"></path><path d="M12 8q.55 0 1.063.14q.51.141.953.407q.44.265.808.625q.367.36.63.808a4.03 4.03 0 0 1 .405 3.082q-.14.513-.406.954a4.4 4.4 0 0 1-.625.808q-.36.367-.808.63a4.03 4.03 0 0 1-3.082.405a3.8 3.8 0 0 1-.954-.406a4.4 4.4 0 0 1-.808-.625a3.8 3.8 0 0 1-.63-.808a4.03 4.03 0 0 1-.405-3.082q.14-.513.406-.954q.265-.44.625-.808q.36-.367.808-.63A4.03 4.03 0 0 1 12 8m2 3.988L11 10v4z"></path></g></svg>
                </span>
            </div></div>
            <div class="chat-input-container">
                <textarea class="chat-input" 
                    placeholder="输入消息..." 
                    rows="4"
                    onInput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"
                ></textarea>
                <svg class="switch-workspace-icon" xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.50" data-swindex="0" d="M10 1v10l3-2l3 2V1M5.5 18a2.5 2.5 0 1 0 0 5H22M3 20.5v-17A2.5 2.5 0 0 1 5.5 1H21v17.007H5.492M20.5 18a2.5 2.5 0 1 0 0 5"></path></svg>
                <svg class="chat-send-icon" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2"></path></svg>
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
        chatWindow.querySelector('.toggle-toolbar').onclick = () => this.toggleToolbar();
        chatWindow.querySelector('.chat-close').onclick = () => this.toggleChat();
        chatWindow.querySelector('.chat-max').onclick = () => this.toggleChatMax();
        chatWindow.querySelector('.chat-send-icon').onclick = () => this.sendMessage();
        chatWindow.querySelector('.switch-workspace-icon').onclick = () => this.switchWorkspace();
        chatWindow.querySelector('.uploaded-attachments-icon').onclick = () => this.uploadedAttachments();
        chatWindow.querySelector('.clear-attachments-icon').onclick = () => this.clearAttachments();
        chatWindow.querySelector('.export-chat-icon').onclick = () => this.exportChat();
        chatWindow.querySelector('.report-send-icon').onclick = () => this.sendReport();
        chatWindow.querySelector('.execute-send-icon').onclick = () => this.sendExecute();
        chatWindow.querySelector('.chat-input').onkeydown = (e) => {
            if (e.key === 'Enter' && e.shiftKey) { // 按下shift+enter发送消息
                e.preventDefault();
                this.sendMessage();
            }
        };

        // 在绑定事件部分添加文件上传事件处理
        const uploadIcon = chatWindow.querySelector('.upload-attachments-icon');
        uploadIcon.onclick = () => {
            // 创建隐藏的文件输入框
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.multiple = true; // 允许多文件选择
            fileInput.style.display = 'none';

            // 处理文件选择
            fileInput.onchange = async (e) => {
                const files = Array.from(e.target.files);
                for (const file of files) {
                    try {
                        // 使用FileParser解析文件
                        const text = await FileParser.parseFile(file);

                        // 创建新的Attachment对象
                        const attachment = new Attachment({
                            title: file.name,
                            text: text
                        });

                        // 添加到attachments数组
                        this.attachments.push(attachment);

                        // 显示上传成功提示
                        this.addMessage(`文件 "${file.name}" 已成功解析并添加`, 'bot');
                    } catch (error) {
                        this.addMessage(`文件 "${file.name}" 解析失败: ${error.message}`, 'bot');
                    }
                }

                // 清理文件输入框
                document.body.removeChild(fileInput);
            };

            // 添加到文档并触发点击
            document.body.appendChild(fileInput);
            fileInput.click();
        };

        this.chatWindow = chatWindow;
        this.messagesContainer = chatWindow.querySelector('.chat-messages');

        // 显示欢迎消息
        this.showWelcomeMessage();

        // 在createChatWindow函数中的事件绑定部分添加
        chatWindow.querySelector('.show-help').onclick = () => this.showHelp();
    }

    toggleChat() {
        this.refreshWorkspaces();
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

    toggleToolbar() {
        const toolbar = this.chatWindow.querySelector('.toolbar-container');
        toolbar.style.display = toolbar.style.display === 'none' ? 'flex' : 'none';
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
                console.log("toolCalls: " + JSON.stringify(toolCalls));
                toolCalls.forEach(t => { // CallFunction
                    let argString = t.function.arguments;
                    t.function.arguments = JSON.parse(argString.replaceAll("\"[", "[").replaceAll("]\"", "]"));
                    const result = this.executeFunction(t.function);
                    //msg += '<li>' + t.function.name + "(" + JSON.stringify(t.function.arguments) + ")</li>";
                    msg += '<li>' + result + '</li>';
                });
                msg += "</ul>";
                console.log("msg: " + msg);
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

        if (!message) { // 如果用户没有输入消息，则默认使用系统消息
            if (this.attachments.length > 0) {
                message = '请对上传的附件内容进行数据分析，生成智慧报表。';
            } else {
                message = '请针对当前页面内的表格进行数据分析，生成智慧报表。';
            }
        }

        let displayMessage = message;// 显示给用户的消息（不包括附件内容和当前页面内容）

        // 如果有附件，则添加附件内容
        if (this.attachments.length > 0) {
            message += '\n附件内容：\n' + this.attachments.map(a => a.text).join('\n');
        } else { // 如果附件为空，则添加当前页面内容 （不包括对话内容）
            // 如果当前页面DOM中存在class app-container，则使用此元素的innerHTML
            const appContainer = document.querySelector('.app-container');
            if (appContainer) {
                message += '\n当前页面内容：\n' + TextParser.parseText(appContainer.innerHTML);
            } else {
                message += '\n当前页面内容：\n' + TextParser.parseText(document.body.innerHTML);
            }
        }

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

    clearAttachments() {
        this.attachments = [];
        this.addMessage('已清除所有附件', 'bot');
    }

    uploadedAttachments() {
        if (this.attachments.length > 0) {
            this.addMessage('已上传附件：' + this.attachments.map(a => a.title).join('，'), 'bot');
        }
    }

    switchWorkspace() {
        // 创建工作空间选择窗口
        const workspaceDialog = document.createElement('div');
        workspaceDialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.8); /* 使背景半透明 */
            backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1002;
            min-width: 300px;
        `;

        // 获取当前工作空间选项
        const workspaceOptions = Array.from(this.workspaces.entries())
            .map(([slug, name]) => `
                <div class="workspace-option" data-slug="${slug}" style="
                    padding: 10px;
                    margin: 5px 0;
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    ${this.workspace === slug ? 'background: #e6f3ff; font-weight: bold;' : 'background: #f5f5f5;'}
                ">
                    <span style="flex: 1;">${name}</span>
                    ${this.workspace === slug ?
                    '<span style="color: #1890ff;">✓</span>' :
                    ''}
            </div>
            `).join('');

        workspaceDialog.innerHTML = `
            <h3 style="margin-top: 0; margin-bottom: 15px;">选择知识库</h3>
            <div style="max-height: 300px; overflow-y: auto;">
                ${workspaceOptions}
            </div>
            <div style="text-align: right; margin-top: 15px;">
                <button id="cancelSwitch" style="
                    margin-right: 10px;
                    padding: 5px 15px;
                    border: 1px solid #d9d9d9;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                ">取消</button>
                <button id="confirmSwitch" style="
                    padding: 5px 15px;
                    border: 1px solid #1890ff;
                    border-radius: 4px;
                    background: #1890ff;
                    color: white;
                    cursor: pointer;
                ">确定</button>
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
            background: rgba(0,0,0,0.5);
            z-index: 1001;
        `;

        // 添加到页面
        document.body.appendChild(overlay);
        document.body.appendChild(workspaceDialog);

        // 记录选中的工作空间
        let selectedSlug = this.workspace;

        // 绑定事件
        const closeDialog = () => {
            document.body.removeChild(overlay);
            document.body.removeChild(workspaceDialog);
        };

        // 为每个工作空间选项添加点击事件
        workspaceDialog.querySelectorAll('.workspace-option').forEach(option => {
            option.onclick = (e) => {
                // 移除其他选项的选中状态
                workspaceDialog.querySelectorAll('.workspace-option').forEach(opt => {
                    opt.style.background = '#f5f5f5';
                    opt.style.fontWeight = 'normal';
                    opt.querySelector('span:last-child')?.remove();
                });

                // 设置当前选项的选中状态
                option.style.background = '#e6f3ff';
                option.style.fontWeight = 'bold';
                if (!option.querySelector('span:last-child')) {
                    option.appendChild(document.createElement('span')).textContent = '✓';
                    option.lastChild.style.color = '#1890ff';
                }

                selectedSlug = option.dataset.slug;
            };
        });

        workspaceDialog.querySelector('#cancelSwitch').onclick = closeDialog;

        workspaceDialog.querySelector('#confirmSwitch').onclick = () => {
            if (selectedSlug !== this.workspace) {
                // 更新工作空间
                this.workspace = selectedSlug;
                this.workspaceName = this.workspaces.get(selectedSlug);

                // 清空消息历史
                this.messages = [];
                this.messagesContainer.innerHTML = '';

                // 显示新工作空间的欢迎消息
                this.showWelcomeMessage();

            }
            closeDialog();
        };
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
                        <input type="radio" name="exportFormat" value="docx" checked style="
                            margin: 0 8px 0 0;
                            cursor: pointer;
                        "> 
                        <span style="color: #444;">DOCX</span>
                    </label>
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
    <script src="http://www.liuhongtian.com:8080/js/plotly-latest.min.js"></script>
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
                    } else if (format === 'docx') {
                        await this.exportToDocx(content);
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

        console.log('text: ', text);
        console.log('html: ', html);

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

    async exportToDocx(content) {
        let htmlContent = content
            .replace(/<li><p>/g, '<li>')
            .replace(/<\/p><\/li>/g, '</li>')
            .replace(/<li>\n<p>/g, '<li>')
            .replace(/<\/p>\n<\/li>/g, '</li>');

        console.log('htmlContent: ', htmlContent);

        // 使用docx库
        const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell, WidthType, BorderStyle } = window.docx;
        if (!Document) {
            throw new Error('请先引入docx库');
        }

        try {
            // 创建临时DOM元素来解析HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlContent, 'text/html');

            // 创建表格
            function createTable(tableElement) {
                try {
                    const rows = [];

                    // 处理表头
                    const theadElement = tableElement.getElementsByTagName('thead')[0];
                    if (theadElement) {
                        const headerRows = theadElement.getElementsByTagName('tr');
                        if (headerRows) {
                            for (let i = 0; i < headerRows.length; i++) {
                                const row = headerRows[i];
                                const cells = [];
                                // 处理th和td单元格
                                const headerCells = [...row.getElementsByTagName('th'), ...row.getElementsByTagName('td')];

                                for (let j = 0; j < headerCells.length; j++) {
                                    const cell = headerCells[j];
                                    const cellText = cell.textContent.trim().slice(0, 32767);

                                    cells.push(new TableCell({
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: cellText,
                                                        size: 20,
                                                        bold: true // 表头文字加粗
                                                    })
                                                ]
                                            })
                                        ],
                                        borders: {
                                            top: { style: BorderStyle.SINGLE, size: 1 },
                                            bottom: { style: BorderStyle.SINGLE, size: 1 },
                                            left: { style: BorderStyle.SINGLE, size: 1 },
                                            right: { style: BorderStyle.SINGLE, size: 1 }
                                        },
                                        shading: { // 表头背景色
                                            fill: "F2F2F2"
                                        }
                                    }));
                                }

                                if (cells.length > 0) {
                                    rows.push(new TableRow({ children: cells }));
                                }
                            }
                        }
                    }

                    // 处理表体
                    const processBodyRows = (bodyRows) => {
                        for (let i = 0; i < bodyRows.length; i++) {
                            const row = bodyRows[i];
                            const cells = [];
                            // 处理td和th单元格
                            const bodyCells = [...row.getElementsByTagName('td'), ...row.getElementsByTagName('th')];

                            for (let j = 0; j < bodyCells.length; j++) {
                                const cell = bodyCells[j];
                                const cellText = cell.textContent.trim().slice(0, 32767);

                                cells.push(new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: cellText,
                                                    size: 20
                                                })
                                            ]
                                        })
                                    ],
                                    borders: {
                                        top: { style: BorderStyle.SINGLE, size: 1 },
                                        bottom: { style: BorderStyle.SINGLE, size: 1 },
                                        left: { style: BorderStyle.SINGLE, size: 1 },
                                        right: { style: BorderStyle.SINGLE, size: 1 }
                                    }
                                }));
                            }

                            if (cells.length > 0) {
                                rows.push(new TableRow({ children: cells }));
                            }
                        }
                    };

                    const tbodyElements = tableElement.getElementsByTagName('tbody');
                    // 如果有tbody标签，处理tbody中的行
                    if (tbodyElements) {
                        for (let i = 0; i < tbodyElements.length; i++) {
                            const bodyRows = tbodyElements[i].getElementsByTagName('tr');
                            processBodyRows(bodyRows);
                        }
                    } else {
                        // 如果没有tbody标签，直接处理table下的行（排除已处理的表头行）
                        const bodyRows = Array.from(tableElement.getElementsByTagName('tr'))
                            .filter(row => !row.closest('thead')); // 排除thead中的行
                        processBodyRows(bodyRows);
                    }

                    if (rows.length === 0) {
                        throw new Error('空表格');
                    }

                    // 计算每列的最大宽度
                    const columnCount = Math.max(...rows.map(row => row.options.children.length));
                    const columnWidths = new Array(columnCount).fill(0);
                    rows.forEach(row => {
                        row.options.children.forEach((cell, index) => {
                            const textLength = cell.options.children[0].root[1].root[1].root[1].length;
                            columnWidths[index] = Math.max(columnWidths[index], textLength);
                        });
                    });

                    // 根据内容调整列宽
                    const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
                    rows.forEach(row => {
                        row.options.children.forEach((cell, index) => {
                            cell.width = {
                                size: Math.max(5, Math.floor((columnWidths[index] / totalWidth) * 100)),
                                type: WidthType.PERCENTAGE
                            };
                        });
                    });

                    return new Table({
                        rows: rows,
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE
                        },
                        margins: {
                            top: 120,
                            bottom: 120,
                            right: 120,
                            left: 120
                        }
                    });
                } catch (error) {
                    console.error('处理表格时出错:', error);
                    throw error;
                }
            }

            // 将HTML元素转换为DOCX元素
            function processNode(node) {
                if (!node) return [];

                const elements = [];

                if (node.nodeType === Node.TEXT_NODE) {
                    const text = node.textContent.trim();
                    if (text) {
                        elements.push(new TextRun({
                            text: text.slice(0, 32767),
                            size: 20
                        }));
                    }
                }

                else if (node.nodeType === Node.ELEMENT_NODE) {
                    const style = window.getComputedStyle(node);
                    const isBold = style.fontWeight >= 600;
                    const isItalic = style.fontStyle === 'italic';
                    const textColor = style.color;

                    switch (node.nodeName.toLowerCase()) {
                        case 'h1':
                        case 'h2':
                        case 'h3':
                        case 'h4':
                        case 'h5':
                        case 'h6': {
                            const level = parseInt(node.nodeName.charAt(1));
                            const size = 48 - (level - 1) * 4; // h1: 48, h2: 44, ...
                            const children = Array.from(node.childNodes).flatMap(child => processNode(child));
                            elements.push(new Paragraph({
                                children: children.length ? children : [new TextRun({ text: node.textContent.trim(), size })],
                                heading: HeadingLevel[`HEADING_${level}`],
                                spacing: { before: 240, after: 120 }
                            }));
                            break;
                        }
                        case 'p': {
                            const children = Array.from(node.childNodes).flatMap(child => processNode(child));
                            elements.push(new Paragraph({
                                children: children.length ? children : [new TextRun({ text: node.textContent.trim(), size: 20 })],
                                spacing: { before: 120, after: 120 }
                            }));
                            break;
                        }
                        case 'br':
                            elements.push(new Paragraph({ children: [] }));
                            break;
                        case 'hr':
                            elements.push(new Paragraph({
                                border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "999999" } },
                                spacing: { before: 240, after: 240 }
                            }));
                            break;
                        case 'table':
                            try {
                                elements.push(createTable(node));
                            } catch (error) {
                                console.error('表格处理错误:', error);
                                elements.push(new Paragraph({
                                    children: [new TextRun({
                                        text: '(表格处理出错: ' + error.message + ')',
                                        color: 'FF0000',
                                        size: 20,
                                        italics: true
                                    })]
                                }));
                            }
                            break;
                        case 'ul':
                        case 'ol': {
                            //elements.push(new Paragraph({
                            //    text: "",
                            //    alignment: AlignmentType.CENTER
                            //}));
                            const listItems = Array.from(node.children);
                            listItems.forEach((li, index) => {
                                const children = Array.from(li.childNodes).flatMap(child => processNode(child));
                                elements.push(new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: node.nodeName === 'OL' ? `${index + 1}. ` : '• ',
                                            size: 20
                                        }),
                                        ...(children.length ? children : [new TextRun({ text: li.textContent.trim(), size: 20 })])
                                    ],
                                    indent: { left: 400 },
                                    spacing: { before: 60, after: 60 }
                                }));
                            });
                            elements.push(new Paragraph({
                                text: "",
                                alignment: AlignmentType.CENTER
                            }));
                            break;
                        }
                        case 'a': {
                            const children = Array.from(node.childNodes).flatMap(child => processNode(child));
                            const linkText = children.length ? children : [new TextRun({
                                text: node.textContent.trim(),
                                size: 20
                            })];
                            linkText.forEach(run => {
                                run.color = '0000FF';
                                run.underline = {};
                            });
                            elements.push(...linkText);
                            break;
                        }
                        case 'span':
                        case 'div': {
                            const children = Array.from(node.childNodes).flatMap(child => processNode(child));
                            if (children.length) {
                                // 如果有子元素，应用样式到子元素
                                children.forEach(child => {
                                    if (child instanceof TextRun) {
                                        if (isBold) child.bold = true;
                                        if (isItalic) child.italics = true;
                                        if (textColor) child.color = textColor.replace(/[^0-9A-Fa-f]/g, '');
                                    }
                                });
                                elements.push(...children);
                            } else if (node.textContent.trim()) {
                                // 如果只有文本，创建新的TextRun
                                elements.push(new TextRun({
                                    text: node.textContent.trim(),
                                    size: 20,
                                    bold: isBold,
                                    italics: isItalic,
                                    color: textColor ? textColor.replace(/[^0-9A-Fa-f]/g, '') : undefined
                                }));
                            }
                            // 对于div，添加段落分隔
                            if (node.nodeName.toLowerCase() === 'div') {
                                elements.push(new Paragraph({}));
                            }
                            break;
                        }
                        default: {
                            // 处理其他元素
                            const children = Array.from(node.childNodes).flatMap(child => processNode(child));
                            if (children.length) {
                                elements.push(...children);
                            }
                        }
                    }
                }

                return elements;
            }

            // 处理整个文档
            const docElements = processNode(doc.body);

            // 创建文档
            const docx = new Document({
                sections: [{
                    properties: {},
                    children: [
                        // 添加标题
                        new Paragraph({
                            text: "对话记录",
                            heading: HeadingLevel.HEADING_1,
                            alignment: AlignmentType.CENTER
                        }),
                        // 添加导出时间
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: `导出时间：${new Date().toLocaleString()}`,
                                    size: 20
                                })
                            ],
                            spacing: { after: 400 }
                        }),

                        // 添加转换后的内容
                        ...docElements
                    ]
                }]
            });
            // 生成文档
            const buffer = await Packer.toBlob(docx);
            const url = URL.createObjectURL(buffer);

            // 创建下载链接
            const link = document.createElement('a');
            link.href = url;
            link.download = `对话记录_${new Date().toLocaleString()}.docx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('导出文档时出错:', error);
            throw new Error('导出文档失败: ' + error.message);
        }
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
        const welcomeMessage = `${timeString}，${this.username}！欢迎来到 ${this.workspaceName} 。我是您的AI助手，请问有什么可以帮您？`;
        //const welcomeMessage = `${timeString}，${this.username}！欢迎访问华微世纪。我是您的AI助手，请问有什么可以帮您？`;
        this.addMessage(welcomeMessage, 'bot');
    }

    showHelp() {
        console.log('showHelp');
        // 创建帮助窗口
        const helpDialog = document.createElement('div');
        helpDialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1002;
            width: 800px;
            max-width: 90vw;
            max-height: 80vh;
            overflow-y: auto;
        `;

        // 帮助内容
        helpDialog.innerHTML = `
            <div id="help-header" style="position: sticky; top: 0; width: 100%; background: white; z-index: 1003;">
                <h2 style="margin-top: 0; color: #333;">华微世纪AI助手使用指南</h2>
                <div style="position: absolute; top: 0; right: 0; margin-top: 10px; cursor: pointer;" id="closeHelp">✕</div>                
                <hr/>
            </div>

            <div style="position: relative; background: rgba(248, 246, 234, 0.76);">
                <div style="margin: 20px 0;">
                    <h3 style="color: #444;">基本功能</h3>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li style="margin: 10px 0;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2"></path></svg> <strong>智慧问答</strong>：直接在输入框中输入问题并发送，AI助手将根据知识库的内容回答您的问题。</li>
                        <li style="margin: 10px 0;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4.00" data-swindex="0"><path stroke-linejoin="round" d="M44 5H4v12h40z"></path><path stroke-linecap="round" stroke-linejoin="round" d="m4 41.03l12.176-12.3l6.579 6.3L30.798 27l4.48 4.368"></path><path stroke-linecap="round" d="M44 16.172v26m-40-26v14M13.016 43H44M17 11h21m-28-.003h1"></path></g></svg> <strong>智慧分析</strong>：点击智慧分析图标，AI助手将根据您的需求进行数据分析。</li>
                        <li style="margin: 10px 0;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><g fill="currentColor"><path fill-rule="evenodd" d="M1.5 2h13l.5.5v5.503a5 5 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10z" clip-rule="evenodd"></path><path d="M12 8q.55 0 1.063.14q.51.141.953.407q.44.265.808.625q.367.36.63.808a4.03 4.03 0 0 1 .405 3.082q-.14.513-.406.954a4.4 4.4 0 0 1-.625.808q-.36.367-.808.63a4.03 4.03 0 0 1-3.082.405a3.8 3.8 0 0 1-.954-.406a4.4 4.4 0 0 1-.808-.625a3.8 3.8 0 0 1-.63-.808a4.03 4.03 0 0 1-.405-3.082q.14-.513.406-.954q.265-.44.625-.808q.36-.367.808-.63A4.03 4.03 0 0 1 12 8m2 3.988L11 10v4z"></path></g></svg> <strong>智慧执行</strong>：点击智慧执行图标，AI助手将根据您的需求，执行相应的操作。</li>
                        <li style="margin: 10px 0;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" data-swindex="0"><path d="M21.25 9.16v7.987a4.1 4.1 0 0 1-1.204 2.901a4.113 4.113 0 0 1-2.906 1.202H6.86a4.113 4.113 0 0 1-2.906-1.202a4.1 4.1 0 0 1-1.204-2.901V6.853a4.1 4.1 0 0 1 1.204-2.901A4.113 4.113 0 0 1 6.86 2.75h8.35a3.004 3.004 0 0 1 2.25.998l3 3.415c.501.545.783 1.256.79 1.997"></path><path d="M7 21.22v-5.241a1.995 1.995 0 0 1 2-1.997h6a2.002 2.002 0 0 1 2 1.997v5.241M15.8 2.81v4.183a1.526 1.526 0 0 1-1.52 1.528H9.72A1.531 1.531 0 0 1 8.2 6.993V2.75m1.946 15.108h3.708"></path></g></svg> <strong>对话导出</strong>：可将对话内容导出为PDF或Word文档，可以选择导出全部对话历史，或AI助手的最后一条回答。</li>
                    </ul>
                </div>

                <hr/>
                <div style="margin: 20px 0;">
                    <h3 style="color: #444;">快捷键</h3>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li style="margin: 10px 0;">⌨️ <strong>Shift + Enter</strong>：在输入框中快速发送消息，进行智慧问答。</li>
                    </ul>
                </div>

                <hr/>
                <div style="margin: 20px 0;">
                    <h3 style="color: #444;">智慧分析使用说明</h3>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li style="margin: 10px 0;">在对话输入框输入分析需求，点击分析图标（<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-width="4.00" data-swindex="0"><path stroke-linejoin="round" d="M44 5H4v12h40z"></path><path stroke-linecap="round" stroke-linejoin="round" d="m4 41.03l12.176-12.3l6.579 6.3L30.798 27l4.48 4.368"></path><path stroke-linecap="round" d="M44 16.172v26m-40-26v14M13.016 43H44M17 11h21m-28-.003h1"></path></g></svg>），AI助手将分析当前页面或上传的附件数据。</li>
                        <li style="margin: 10px 0;">点击附件上传图标（<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 256"><path fill="currentColor" d="M208.25 123.76a6 6 0 0 1 0 8.49l-82.06 82a54 54 0 0 1-76.36-76.39L149.1 37.14a38 38 0 1 1 53.77 53.72l-99.28 100.68a22 22 0 1 1-31.15-31.09l83.28-84.67a6 6 0 0 1 8.56 8.42L81 168.91a10 10 0 1 0 14.11 14.18L194.35 82.4a26 26 0 1 0-36.74-36.8L58.33 146.28a42 42 0 1 0 59.37 59.44l82.06-82a6 6 0 0 1 8.49.04"></path></svg>），选择文件上传，AI助手将分析上传的文件。</li>
                        <li style="margin: 10px 0;">否则，AI助手将分析当前页面内容。</li>
                        <li style="margin: 10px 0;">点击已上传附件图标（<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" data-swindex="0"><path d="M5 19.5V5a2 2 0 0 1 2-2h11.4a.6.6 0 0 1 .6.6V21M9 7h6m-8.5 8H19M6.5 18H19M6.5 21H19"></path><path stroke-linejoin="round" d="M6.5 18c-1 0-1.5-.672-1.5-1.5S5.5 15 6.5 15m0 6c-1 0-1.5-.672-1.5-1.5S5.5 18 6.5 18"></path></g></svg>），可查看已上传的附件列表。</li>
                        <li style="margin: 10px 0;">点击清除附件图标（<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><path fill="currentColor" d="m10 12.6l.7.7l1.6-1.6l1.6 1.6l.8-.7L13 11l1.7-1.6l-.8-.8l-1.6 1.7l-1.6-1.7l-.7.8l1.6 1.6zM1 4h14V3H1zm0 3h14V6H1zm8 2.5V9H1v1h8zM9 13v-1H1v1z"></path></svg>），可将已上传的附件内容从对话历史中清除。</li>
                        <li style="margin: 10px 0;">支持的文件格式：
                            <ul>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="currentColor" d="M453.547 273.449H372.12v-40.714h81.427zm0 23.264H372.12v40.714h81.427zm0-191.934H372.12v40.713h81.427zm0 63.978H372.12v40.713h81.427zm0 191.934H372.12v40.714h81.427zm56.242 80.264c-2.326 12.098-16.867 12.388-26.58 12.796H302.326v52.345h-36.119L0 459.566V52.492L267.778 5.904h34.548v46.355h174.66c9.83.407 20.648-.291 29.197 5.583c5.991 8.608 5.41 19.543 5.817 29.43l-.233 302.791c-.29 16.925 1.57 34.2-1.978 50.892m-296.51-91.256c-16.052-32.57-32.395-64.909-48.39-97.48c15.82-31.698 31.408-63.512 46.937-95.327c-13.203.64-26.406 1.454-39.55 2.385c-9.83 23.904-21.288 47.169-28.965 71.888c-7.154-23.323-16.634-45.774-25.3-68.515c-12.796.698-25.592 1.454-38.387 2.21c13.493 29.78 27.86 59.15 40.946 89.104c-15.413 29.081-29.837 58.57-44.785 87.825c12.737.523 25.475 1.047 38.212 1.221c9.074-23.148 20.357-45.424 28.267-69.038c7.096 25.359 19.135 48.798 29.023 73.051c14.017.99 27.976 1.862 41.993 2.676M484.26 79.882H302.326v24.897h46.53v40.713h-46.53v23.265h46.53v40.713h-46.53v23.265h46.53v40.714h-46.53v23.264h46.53v40.714h-46.53v23.264h46.53v40.714h-46.53v26.897H484.26z"></path></svg> Excel文件 (.xlsx, .xls)</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="currentColor" d="M488.877 52.447H302.306V5.92h-34.779L0 52.563v406.99l265.957 46.527h36.349v-46.353h174.59c9.887-.465 20.879.291 29.37-5.757c6.804-10.41 5.06-23.438 5.641-35.186V75.012c1.221-13.26-9.77-23.903-23.03-22.565m-294.862 282.59c-9.712 5.06-24.252-.233-35.767.581c-7.735-38.5-16.75-76.768-23.67-115.443c-6.805 37.57-15.645 74.79-23.438 112.128c-11.166-.581-22.39-1.28-33.615-2.035c-9.655-51.18-20.995-102.01-30.01-153.305c9.945-.465 19.948-.872 29.893-1.221c5.99 37.047 12.795 73.919 18.03 111.024c8.2-38.036 16.574-76.071 24.717-114.106c11.05-.64 22.1-1.105 33.15-1.687c7.735 39.257 15.644 78.455 24.019 117.537c6.572-40.361 13.841-80.607 20.879-120.91c11.631-.407 23.263-1.047 34.836-1.745c-13.143 56.355-24.659 113.176-39.024 169.182m290.212 97.069H302.306v-36.527h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-29.08h151.21v-23.262h-151.21v-29.08h151.21V215.29h-151.21v-29.08h151.21v-23.263h-151.21v-29.079h151.21v-23.263h-151.21v-30.71h181.921z"></path></svg> Word文件 (.docx, .doc)</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 384 512"><path fill="currentColor" d="M181.9 256.1c-5-16-4.9-46.9-2-46.9c8.4 0 7.6 36.9 2 46.9m-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7c18.3-7 39-17.2 62.9-21.9c-12.7-9.6-24.9-23.4-34.5-40.8M86.1 428.1c0 .8 13.2-5.4 34.9-40.2c-6.7 6.3-29.1 24.5-34.9 40.2M248 160h136v328c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V24C0 10.7 10.7 0 24 0h200v136c0 13.2 10.8 24 24 24m-8 171.8c-20-12.2-33.3-29-42.7-53.8c4.5-18.5 11.6-46.6 6.2-64.2c-4.7-29.4-42.4-26.5-47.8-6.8c-5 18.3-.4 44.1 8.1 77c-11.6 27.6-28.7 64.6-40.8 85.8c-.1 0-.1.1-.2.1c-27.1 13.9-73.6 44.5-54.5 68c5.6 6.9 16 10 21.5 10c17.9 0 35.7-18 61.1-61.8c25.8-8.5 54.1-19.1 79-23.2c21.7 11.8 47.1 19.5 64 19.5c29.2 0 31.2-32 19.7-43.4c-13.9-13.6-54.3-9.7-73.6-7.2M377 105L279 7c-4.5-4.5-10.6-7-17-7h-6v128h128v-6.1c0-6.3-2.5-12.4-7-16.9m-74.1 255.3c4.1-2.7-2.5-11.9-42.8-9c37.1 15.8 42.8 9 42.8 9"></path></svg> PDF文件 (.pdf)</li>
                                <li><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="2" data-swindex="0" d="M4.998 9V1H19.5L23 4.5V23H4M18 1v5h5M2 12h5m-2.5 0v7M16 12h5m-2.5 0v7m-4-7.5l-6 7m0-7l6 7"></path></svg> 文本文件 (.txt)</li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <hr/>
                <div style="margin: 20px 0;">
                    <h3 style="color: #444;">智慧执行使用说明</h3>
                    <ul style="list-style-type: none; padding-left: 0;">
                        <li style="margin: 10px 0;">在对话输入框输入需要执行的操作，点击执行图标（<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16"><g fill="currentColor"><path fill-rule="evenodd" d="M1.5 2h13l.5.5v5.503a5 5 0 0 0-1-.583V3H2v9h5a5 5 0 0 0 1 3H4v-1h3v-1H1.5l-.5-.5v-10z" clip-rule="evenodd"></path><path d="M12 8q.55 0 1.063.14q.51.141.953.407q.44.265.808.625q.367.36.63.808a4.03 4.03 0 0 1 .405 3.082q-.14.513-.406.954a4.4 4.4 0 0 1-.625.808q-.36.367-.808.63a4.03 4.03 0 0 1-3.082.405a3.8 3.8 0 0 1-.954-.406a4.4 4.4 0 0 1-.808-.625a3.8 3.8 0 0 1-.63-.808a4.03 4.03 0 0 1-.405-3.082q.14-.513.406-.954q.265-.44.625-.808q.36-.367.808-.63A4.03 4.03 0 0 1 12 8m2 3.988L11 10v4z"></path></g></svg>），AI助手将分析当前页面或上传的附件数据。</li>
                        <li style="margin: 10px 0;">目前可使用两个功能：页面跳转以及表达式求值。（表达式求值仅作为演示。）</li>
                        <li style="margin: 10px 0;">可以在对话框直接输入表达式，例如：1+4，AI助手将给出计算结果。</li>
                        <li style="margin: 10px 0;">可以在对话框输入要跳转的页面名称（无需特别精确），例如：用户管理，AI助手将匹配可能的页面，并在响应中提供页面链接。</li>
                        <li style="margin: 10px 0;">页面可配置，目前随便配了一些（为了演示跳转效果，必应的地址是真实的，可正常跳转）：
                            <ul>
                                <li>bing: 必应，Bing</li>
                                <li>site: 站点管理</li>
                                <li>user: 用户管理</li>
                                <li>role: 角色管理</li>
                                <li>menu: 菜单管理</li>
                                <li>log: 日志管理</li>
                                <li>config: 配置管理</li>
                                <li>help: 帮助文档</li>
                            </ul>
                        </li>
                    </ul>
                </div>

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
            background: rgba(0,0,0,0.5);
            z-index: 1001;
        `;

        // 添加到页面
        document.body.appendChild(overlay);
        document.body.appendChild(helpDialog);

        // 绑定关闭事件
        const closeDialog = () => {
            document.body.removeChild(overlay);
            document.body.removeChild(helpDialog);
        };

        helpDialog.querySelector('#closeHelp').onclick = closeDialog;
        overlay.onclick = closeDialog;
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
window.getUuid = getUuid;
window.showHelp = ChatWidget.showHelp;
