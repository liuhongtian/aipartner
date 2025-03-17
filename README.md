# 说明

## 样例访问地址

- html页面远端部署：

[http://mmliuhongtian.xyz:20080/chat-demo.html?username=lht&workspace=wokflow](http://mmliuhongtian.xyz:20080/chat-demo.html?username=lht&workspace=wokflow)

[http://mmliuhongtian.xyz:20080/chat-demo-minimal.html?username=lht&workspace=wokflow](http://mmliuhongtian.xyz:20080/chat-demo-minimal.html?username=lht&workspace=wokflow)

开发中版本（极不稳定，随时修改）：

[http://60.205.170.9:20080/chat-demo-dev.html?username=liuht&workspace=wokflow](http://60.205.170.9:20080/chat-demo-dev.html?username=liuht&workspace=wokflow)

- API服务中自带的样例页面：

[http://www.liuhongtian.com:8080/chat-demo.html?username=lht&workspace=wokflow](http://www.liuhongtian.com:8080/chat-demo.html?username=lht&workspace=wokflow)

[http://www.liuhongtian.com:8080/chat-demo-minimal.html?username=lht&workspace=wokflow](http://www.liuhongtian.com:8080/chat-demo-minimal.html?username=lht&workspace=wokflow)

## 前端html页面接入小组件方式

- 前端html页面中引入小组件js文件：

```html
<script src="http://www.liuhongtian.com:8080/js/chat-widget.js"></script>
```

- 在页面中 ```</body>``` 前加入如下js脚本，添加小组件：

```html
<script>

        // 用户名参数，用于标识用户，请自行获取
        const username = ... ...;
        // 要访问的工作空间（必须是slug，不是显示名称！），请自行设置
        const workspace = ... ...;
            
        // URL中的API服务器地址与端口，不设置的话，缺省值为空字符串，则页面与API服务位于同一服务器
        //const apibase = "http://www.liuhongtian.com:8080";

        // 聊天组件
        let chatWidget;
        
        // 初始化聊天组件
        document.addEventListener('DOMContentLoaded', () => {
            // 如果已存在聊天组件，先移除
            if (chatWidget) {
                document.querySelector('.chat-widget-button')?.remove();
                document.querySelector('.chat-window')?.remove();
            }

            // 创建新的聊天组件实例，传入配置对象
            chatWidget = new ChatWidget({
                workspace: workspace,
                username: username,
                //apibase: apibase
            });
        });
    </script>
```

## 表格输出样例

| 年龄段 | 人数 | 百分比 | 具体用户（姓名，年龄） |
|----------|------|---------|--------------------------------------------------------------------------------------|
| 20-29岁 | 5 | 33.3% | 张三（20岁）、王五（22岁）、谢飞机（28岁）、谢腾飞（25岁）、谢腾凤（23岁） |
| 30-39岁 | 2 | 13.3% | 赵玉田（32岁）、谢大脚（45岁） |
| 40-49岁 | 3 | 20% | 李二狗（40岁）、王大拿（50岁）、谢大脚（45岁） |
| 50-59岁 | 3 | 20% | 赵四（58岁）、谢广坤（56岁）、刘能（60岁） |
| 60岁及以上| 2 | 13.3% | 西门长海（68岁）、刘能（60岁） |
| 总计 | 15 | 100% | |
