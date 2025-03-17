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

            .tooltip { /* Tooltip 容器 */
                position: relative;
                display: inline-block;
            }           
            .tooltip .tooltiptext { /* Tooltip 文本 */
                visibility: hidden;
                width: 120px;
                display: flex;
                background-color: transparent;
                color: rgb(146, 146, 132);
                text-align: left;
                padding: 2px 0;
                border-radius: 6px;
                position: fixed;
                z-index: 1;
                font-size: 12px;
            }
            .tooltip:hover .tooltiptext { /* 将鼠标悬停在工具提示容器上时，显示工具提示文本 */
                visibility: visible;
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
                width: 320px;
                max-width: 90vw;
                height:480px;
                border-radius: 16px;
                box-shadow: 0 4px 24px rgba(0,0,0,0.1);
                display: none;
                flex-direction: column;
                z-index: 1000;
                overflow: hidden;
                resize: none; /* 不允许调整大小 */
            }

            .chat-header {
                padding: 16px;
                background:rgb(4, 61, 121); /* 蓝色 */
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
                align-items: center;
            }

            .toolbar {
                padding: 8px;
                display: flex;
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

            .chat-input-container {
                position: relative;
                padding: 16px;
                display: flex;
                background: #f1f1f1;
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
                right: 25px;
                bottom: 5px;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                cursor: pointer;
            }

            .chat-send-icon:hover {
                color:rgb(61, 95, 11);
            }

            .execute-send-icon {
                padding-left: 10px;
                cursor: pointer;
            }

            .report-send-icon {
                padding-left: 10px;
                cursor: pointer;
            }

            .loading-indicator {
                text-align: center;
                padding: 10px;
                color: #666; /* 灰色 */
            }

            .workspace-selector {
                flex: 0; /* 设为 1 会使下拉列表占据剩余空间 */
                width: 160px;
                margin-right: 10px; /* 右边距 */
                padding: 8px; /* 内边距 */
                border: none; /* 去掉边框 */
                border-radius: 8px; /* 去掉圆角 */
                font-size: 16px; /* 字体大小 */
                color: gray; /* 字体颜色 */
                appearance: none; /* 去掉默认样式 */
                cursor: pointer; /* 鼠标指针样式 */
            }

            .workspace-selector:focus {
                outline: none; /* 去掉聚焦时的轮廓 */
                border-color: rgb(4, 61, 121); /* 聚焦时边框颜色 */
            }

            .workspace-selector:hover {
                color: rgb(0, 0, 0); /* 悬停时颜色 */
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

            if (!response.ok) {
                throw new Error('网络请求失败');
            }

            const data = await response.json();
            return data.workspaces;

        } catch (error) {
            console.error('发送消息失败:', error);
            this.addMessage('抱歉，访问知识库失败，请稍后重试。', 'bot');
        }
        return [{ name: "test", slug: "mytest" }];
    }

    async refreshWorkspaceOptions() {
        let html = '';
        let workspaces = await this.getWorkspaces();
        for (let workspace of workspaces) {
            if (workspace.slug === this.workspace) {
                html += `<option value="${workspace.slug}" selected>${workspace.name}</option>`;
                this.workspaceName = workspace.name;
            } else {
                html += `<option value="${workspace.slug}">${workspace.name}</option>`;
            }
            this.workspaces.set(workspace.slug, workspace.name);
        }
        return html;
    }

    async createChatWindow() {
        const chatWindow = document.createElement('div');

        let workspaceOptions = await this.refreshWorkspaceOptions();

        chatWindow.className = 'chat-window';
        chatWindow.innerHTML = `
            <div class="chat-header">
                <span class="tooltip">华微世纪AI助手<span class="tooltiptext">华微世纪AI助手</span></span>
                <div class="chat-header-buttons">
                    <button class="toggle-toolbar tooltip">t<span class="tooltiptext">点击显示/隐藏工具栏</span></button>
                    <button class="chat-max tooltip">+<span class="tooltiptext">点击最大化AI助手</span></button>
                    <button class="chat-close tooltip">×<span class="tooltiptext">点击隐藏AI助手</span></button>
                </div>
            </div>
            <div class="resize-handle"></div>
            <div class="chat-messages"></div>
            <div class="loading-indicator" style="display: none;">处理中 ...</div>
            <div class="toolbar-container" style="display: none;"><div class="toolbar">
                <span>
                    <span class="tooltip">
                        <select class="workspace-selector" id="kb">
                            ${workspaceOptions}
                        </select>
                        <span class="tooltiptext">选择知识库</span>
                    </span>
                </span>
                <span>
                    <span class="tooltip">
                        <svg t="1740111681763" class="report-send-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2907" width="28" height="28"><path d="M984.529455 945.058909H78.941091V39.470545A39.563636 39.563636 0 0 0 39.470545 0 39.563636 39.563636 0 0 0 0 39.470545v945.05891A39.563636 39.563636 0 0 0 39.470545 1024h945.05891a39.563636 39.563636 0 0 0 39.470545-39.470545 39.563636 39.563636 0 0 0-39.470545-39.470546z" fill="#939393" p-id="2908"></path><path d="M937.890909 930.909091c21.783273 0 39.563636-17.826909 39.563636-39.563636V416.581818a39.656727 39.656727 0 0 0-39.563636-39.563636 39.656727 39.656727 0 0 0-39.563636 39.563636v474.763637c0 21.783273 17.826909 39.563636 39.563636 39.563636z m-237.381818 0c21.736727 0 39.563636-17.826909 39.563636-39.563636v-315.252364a39.656727 39.656727 0 0 0-39.563636-39.563636 39.656727 39.656727 0 0 0-39.563636 39.563636v315.252364c0 21.783273 17.826909 39.563636 39.563636 39.563636z m-237.381818 0c21.783273 0 39.563636-17.826909 39.563636-39.563636V179.2A39.656727 39.656727 0 0 0 463.127273 139.636364a39.656727 39.656727 0 0 0-39.563637 39.563636v712.145455c0 21.783273 17.826909 39.563636 39.563637 39.563636z m-237.381818 0c21.783273 0 39.563636-17.826909 39.563636-39.563636v-395.636364a39.656727 39.656727 0 0 0-39.563636-39.563636 39.656727 39.656727 0 0 0-39.563637 39.563636v395.636364c0 21.783273 17.826909 39.563636 39.563637 39.563636z" fill="#939393" p-id="2909"></path></svg>
                        <span class="tooltiptext">智慧分析</span>
                    </span>
                    <span class="tooltip">
                        <svg t="1740111831598" class="execute-send-icon tooltip" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12214" width="34" height="34"><path d="M512 51.2a102.4 102.4 0 0 1 51.2512 191.0784L563.2 307.2h307.2a51.2 51.2 0 0 1 51.2 51.2v512a51.2 51.2 0 0 1-51.2 51.2H153.6a51.2 51.2 0 0 1-51.2-51.2V358.4a51.2 51.2 0 0 1 51.2-51.2h307.2V242.2784A102.4 102.4 0 0 1 512 51.2z m-153.6 460.8H307.2a51.2 51.2 0 0 0-50.8416 45.2096L256 563.2v51.2a51.2 51.2 0 0 0 45.2096 50.8416L307.2 665.6h51.2a51.2 51.2 0 0 0 50.8416-45.2096L409.6 614.4v-51.2a51.2 51.2 0 0 0-51.2-51.2z m358.4 0h-51.2a51.2 51.2 0 0 0-50.8416 45.2096L614.4 563.2v51.2a51.2 51.2 0 0 0 45.2096 50.8416L665.6 665.6h51.2a51.2 51.2 0 0 0 50.8416-45.2096L768 614.4v-51.2a51.2 51.2 0 0 0-51.2-51.2zM51.2 460.8v256a51.2 51.2 0 0 1-51.2-51.2v-153.6a51.2 51.2 0 0 1 51.2-51.2zM972.8 460.8a51.2 51.2 0 0 1 51.2 51.2v153.6a51.2 51.2 0 0 1-51.2 51.2V460.8z" fill="#A8ADAF" p-id="12215"></path></svg>
                        <span class="tooltiptext">智慧执行</span>
                    </span>
                </span>
            </div></div>
            <div class="chat-input-container">
                <textarea class="chat-input" 
                    placeholder="输入消息..." 
                    rows="4"
                    onInput="this.style.height = 'auto'; this.style.height = this.scrollHeight + 'px'"
                ></textarea>
                <span class="on-top tooltip">
                    <svg t="1740105765558" class="chat-send-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2650" width="40" height="40"><path d="M899.6 117c9.9 7.1 13.8 16.7 12 28.5L797.3 831.2c-1.5 8.6-6.3 15.3-14.3 20.1-4.1 2.3-8.8 3.6-13.8 3.6-3.3 0-6.9-0.8-10.7-2.3L556.3 770 448.2 901.8c-5.4 6.9-12.7 10.2-21.9 10.2-3.8 0-7.1-0.6-9.9-1.8-5.6-2.1-10.2-5.5-13.6-10.5-3.4-4.9-5.2-10.3-5.2-16.3V727.7l385.7-472.8-477.2 413-176.3-72.3c-11-4.1-17-12.3-17.8-24.6-0.6-11.9 4.1-20.7 14.3-26.4L869.1 116c4.5-2.7 9.2-4 14.3-4 6 0 11.4 1.7 16.2 5z" fill="#4280dc" p-id="2651"></path></svg>
                    <span class="tooltiptext">客服问答</span>
                </span>
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
        chatWindow.querySelector('.chat-input').onkeydown = (e) => {
            if (e.key === 'Enter' && e.shiftKey) { // 按下shift+enter发送消息
                e.preventDefault();
                this.sendMessage();
            }
        };

        // 绑定工作空间下拉列表事件
        chatWindow.querySelector('.workspace-selector').onchange = (e) => {
            this.workspaceName = this.workspaces.get(e.target.value);
            this.workspace = e.target.value;
            this.messages = []; // 清空消息历史
            this.messagesContainer.innerHTML = ''; // 清空消息显示
            this.showWelcomeMessage(); // 显示新工作空间的欢迎消息
        };

        this.chatWindow = chatWindow;
        this.messagesContainer = chatWindow.querySelector('.chat-messages');
        this.loadingIndicator = chatWindow.querySelector('.loading-indicator');

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
            this.chatWindow.style.width = '320px';
            this.chatWindow.style.height = '480px';
            this.chatWindow.querySelector('.chat-max').innerHTML = '+<span class="tooltiptext">点击最大化AI助手</span>';
        } else {
            this.chatWindow.style.width = '100vw';
            this.chatWindow.style.height = '95vh';
            this.chatWindow.querySelector('.chat-max').innerHTML = '-<span class="tooltiptext">点击复原AI助手</span>';
        }
        this.maxed = !this.maxed;
    }

    toggleToolbar() {
        const toolbar = this.chatWindow.querySelector('.toolbar-container');
        toolbar.style.display = toolbar.style.display === 'none' ? 'flex' : 'none';
    }

    async sendMessage() {
        const input = this.chatWindow.querySelector('.chat-input');
        const message = input.value.trim();
        if (!message) return;

        // 清空输入
        input.value = '';
        //this.loadingIndicator.style.display = 'block'; // 不显示loading

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
            //this.loadingIndicator.style.display = 'none'; // 不显示loading
        }
    }

    addMessage(text, type, sources = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        messageDiv.innerHTML = text;

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

}

function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function helloWorld() {
    console.log("Hello, World!");
}

// 导出供其他文件使用
window.ChatWidget = ChatWidget;
window.getUuid = getUuid;