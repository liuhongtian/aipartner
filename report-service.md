# AI助手智能报表WEB接口说明

## 思路

### 接口鉴权

接口中接收 **RequestParam** 参数 **UID** ，包含 **会话ID** 与 **会话鉴权码** 。接口需要对会话进行鉴权，鉴权成功才进行后续处理。

### 会话存储

#### 报表数据

报表分析的原始数据，每个报表只保存一份，后上传的数据替换原数据。数据保存到Redis中，以会话ID为Key。

#### 对话历史

对话历史暂时保存在 **SQLite** 中，后期可能迁移到 **ElasticSearch** （个人认为 **MongoDB** 更合适）。

对话历史保存内容：

- 会话ID
- 时间
- 消息类型（用户，或DeepSeek）
- 对话内容
- DeepSeek会话ID

#### 报表分析

接收到前端发来的用户的报表分析请求后，接口从Redis查找用户提交的报表数据，添加系统Prompts，提交到DeepSeek，接收DeepSeek响应，转换格式为HTML，返回给前端。

## 接口汇总

|URI|HTTP方法|说明|
|---|---|---|
|/api/context/report/data|POST|智能报表数据接口|
|/api/openai/chat/deepseek-chat|POST|智能报表分析接口|

## 接口详细说明

### 用户验证

使用请求参数 **UID** 验证用户身份，验证失败时使用HTTP状态码进行标识：

- 401：缺少验证信息（没有UID请求参数）。
- 403：验证码无效，或者UID格式错误。

### 智能报表数据接口

[http://www.liuhongtian.com:8080/api/context/report/data?UID=68c5ae71-e485-49ff-92c1-ddd29d4d12dc](http://www.liuhongtian.com:8080/api/context/report/data?UID=68c5ae71-e485-49ff-92c1-ddd29d4d12dc)

请求报文格式没需求。

### 智能报表分析接口

[http://www.liuhongtian.com:8080/api/openai/report/deepseek-chat?UID=68c5ae71-e485-49ff-92c1-ddd29d4d12dc](http://www.liuhongtian.com:8080/api/openai/report/deepseek-chat?UID=68c5ae71-e485-49ff-92c1-ddd29d4d12dc)

请求报文：

```json
{
    "messages": [
        {
            "role": "user",
            "content": "请对用户年龄进行分析，生成柱状图并做统计分析。"
        }
    ]
}
```

响应报文：

```json
{
    "messages": [
        {
            "role": "assistant",
            "content": "<p>根据提供的用户年龄数据，我们可以进行以下统计分析：</p>\n<ol>\n<li><strong>年龄分布</strong>：用户的年龄范围从20岁到68岁。</li>\n<li><strong>平均年龄</strong>：计算所有用户的平均年龄。</li>\n<li><strong>年龄中位数</strong>：找出年龄的中位数。</li>\n<li><strong>年龄众数</strong>：找出出现频率最高的年龄。</li>\n<li><strong>年龄标准差</strong>：计算年龄的标准差，了解年龄分布的离散程度。</li>\n</ol>\n<p>首先，我们计算这些统计量：</p>\n<ul>\n<li><strong>平均年龄</strong>：将所有年龄相加后除以人数。</li>\n<li><strong>年龄中位数</strong>：将所有年龄按大小顺序排列，位于中间位置的年龄。</li>\n<li><strong>年龄众数</strong>：出现次数最多的年龄。</li>\n<li><strong>年龄标准差</strong>：计算每个年龄与平均年龄的差的平方的平均数，再开平方。</li>\n</ul>\n<p>接下来，我们将生成一个柱状图来展示年龄的分布情况。以下是使用Chart.js生成的HTML页面代码：</p>\n<script src=\"https://cdn.jsdelivr.net/npm/chart.js\"></script>\n    <div style=\"width: 70%; margin: auto;\">\n        <canvas id=\"ageChart\"></canvas>\n    </div>\n    <script>\n        var ctx = document.getElementById('ageChart').getContext('2d');\n        var ageChart = new Chart(ctx, {\n            type: 'bar',\n            data: {\n                labels: ['20', '21', '22', '23', '25', '28', '32', '40', '45', '50', '56', '58', '60', '68'],\n                datasets: [{\n                    label: '年龄分布',\n                    data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 每个年龄出现的次数\n                    backgroundColor: 'rgba(54, 162, 235, 0.2)',\n                    borderColor: 'rgba(54, 162, 235, 1)',\n                    borderWidth: 1\n                }]\n            },\n            options: {\n                scales: {\n                    y: {\n                        beginAtZero: true\n                    }\n                }\n            }\n        });\n    </script>\n\n\n<p>在这个HTML页面中，我们使用了Chart.js库来创建一个柱状图，展示了每个年龄的用户数量。每个柱代表一个特定的年龄，柱的高度表示该年龄的用户数量。这个图表帮助我们直观地看到用户年龄的分布情况。</p>\n<p>请注意，由于数据中每个年龄只出现一次，所以柱状图中的每个柱的高度都是1。如果有更多数据，柱的高度会相应变化，反映出不同年龄的用户数量。</p>\n",
            "tool_calls": null
        }
    ],
    "error": null
}
```

从响应报文中提取出 **messages[0].content** 的内容，直接嵌入到页面就可以了。注意图表是用 **Chat.js** 生成的，请预先自行引入脚本，例如：

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

或者：

```html
<script src="http://www.liuhongtian.com:8080/js/chart.js"></script>
```

## 原始需求文档

### 一 需求描述

根据页面表格数据，自动生成智能报表和解读。

### 二 解决方案

#### 页面表定义，增加以下字段

|字段|说明|
|---|---|
|AI_Report|char(1)，AI智能报表：Y-启用，N-禁用|

#### 启用AI智能报表时，页面右上角自动添加AI报表图标

1. 点击报表，弹出AI对话框。
2. 自动获取本页面显示数据，并自动提交到华微世纪AI报表接口

#### AI报表接口要求

1. 接口需要有安全验证
2. 需要自动记录上下文
3. 首次进入时，自动提交页面数据

### 三 开发文档

#### 扩充后台show方法

1. 生成带中文列名的JSON数据
2. 限制最大数据行数
3. 不包括合计行数据

#### 启用AI报表时，Hw_PageSize控件，附加上AI报表标识

#### AI后台

1. AiReport.ashx?UID=52ae3847-98a8-4128-aa0b-7105ef292b26
2. 首次：PostData=GRID数据
3. 后面为用户输入的内容，Post提交

#### JS处理

1. 从后台获取UID数据
2. 调用show方法，获取GRID数据
3. 打开AI对话框
4. 自动提交GRID数据
5. 接收AI返回的数据并显示
6. 用户输入后，再提交，再显示返回结果
