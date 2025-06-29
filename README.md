# Super Directors - AI 视频创作套件

## 🎬 项目简介

Super Directors 是一个全能的 AI 视频创作平台，帮助用户从故事构思到最终视频制作的完整工作流程。支持中英双语界面，集成多种 AI 服务，所有设置本地保存确保数据安全。

## ✨ 主要功能

### 📝 故事生成
- 智能生成创意故事点子
- 支持多种类型：科幻、奇幻、惊悚、爱情等
- 丰富的场景设置：未来世界、现代都市、历史时期等
- 可调节故事基调：乐观、神秘、黑暗、幽默等

### 🤖 AI 脚本制作
- 基于故事生成专业拍摄脚本
- 包含详细的摄影指导
- 支持多种场景风格和摄影机运动
- 适合短视频制作的格式

### 🎬 视频生成
- 支持多种 AI 视频生成模型
- 可调节视频时长（4-8秒）
- 多种分辨率选择（720p - 1440p）
- 自动音频生成功能

### 🔧 API 集成
- **文本生成**: OpenAI GPT, Anthropic Claude, Google Gemini
- **视频生成**: RunwayML, Pika Labs, Stability AI
- **音频生成**: ElevenLabs, OpenAI TTS, Mubert
- 支持自定义 API 端点

## 🌐 多语言支持

- 🇨🇳 中文
- 🇺🇸 English
- 一键切换界面语言

## 💾 数据安全

- 所有 API 密钥仅保存在本地浏览器
- 不会向任何服务器发送敏感信息
- 支持一键清除所有本地数据

## 📁 导出功能

- **导出故事**: 保存为 .txt 文件
- **导出脚本**: 保存为 .txt 文件
- **导出项目**: 保存完整项目为 .json 文件
- **本地保存**: 所有内容保存到浏览器本地存储

## 🚀 快速开始

### 1. 打开应用
直接用浏览器打开 `index.html` 文件即可使用。

### 2. 配置 API
1. 点击 "⚙️ 设置" 标签页
2. 配置所需的 API 服务：
   - **文本生成 API**: 用于故事和脚本生成
   - **视频生成 API**: 用于视频制作
   - **音频生成 API**: 用于配音（可选）
3. 点击 "🔧 测试连接" 验证配置
4. 点击 "💾 保存所有设置"

### 3. 创作流程
1. **故事生成**: 选择类型、场景、基调，生成故事创意
2. **脚本制作**: 基于故事生成专业拍摄脚本
3. **视频生成**: 使用脚本生成高质量视频
4. **导出保存**: 将作品导出到本地

## 🔧 API 配置说明

### OpenAI GPT
```
API 地址: https://api.openai.com/v1
API 密钥: sk-your-api-key
模型: gpt-4 或 gpt-3.5-turbo
```

### Anthropic Claude
```
API 地址: https://api.anthropic.com/v1
API 密钥: sk-your-claude-key
模型: claude-3-opus-20240229
```

### RunwayML
```
API 地址: https://api.runwayml.com/v1
API 密钥: rw-your-runway-key
```

### ElevenLabs
```
API 地址: https://api.elevenlabs.io/v1
API 密钥: xi-your-elevenlabs-key
```

## 📂 文件结构

```
super-directors/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 功能脚本
├── README.md          # 说明文档
└── deploy/            # 部署相关文件
    ├── cloudflare.md  # Cloudflare 部署指南
    └── nginx.conf     # Nginx 配置示例
```

## 🌐 部署到 Cloudflare Pages

### 方法一：GitHub 集成
1. 将项目上传到 GitHub
2. 登录 Cloudflare Dashboard
3. 进入 Pages，点击 "Create a project"
4. 选择 "Connect to Git"，选择您的仓库
5. 构建设置：
   - Build command: `(留空)`
   - Build output directory: `/`
6. 点击 "Save and Deploy"

### 方法二：直接上传
1. 登录 Cloudflare Dashboard
2. 进入 Pages，点击 "Upload assets"
3. 选择 super-directors 文件夹上传
4. 设置自定义域名（可选）

## 🛠️ 本地开发

### 环境要求
- 现代浏览器（Chrome, Firefox, Safari, Edge）
- 无需安装任何依赖

### 开发调试
1. 使用浏览器开发者工具
2. 查看控制台输出
3. 检查网络请求
4. 调试 localStorage 存储

### 自定义修改
- 修改 `styles.css` 调整界面样式
- 编辑 `script.js` 添加新功能
- 在 `index.html` 中添加新的 UI 元素

## 🔒 隐私与安全

### 数据存储
- 所有用户数据仅存储在本地浏览器
- API 密钥使用 localStorage 本地存储
- 不会向第三方服务器发送敏感信息

### API 安全
- 支持 HTTPS 加密连接
- 建议使用有限权限的 API 密钥
- 定期更换 API 密钥

### 浏览器兼容性
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## 🐛 故障排除

### 常见问题

**Q: API 连接失败**
A: 检查网络连接、API 密钥格式、服务商配额

**Q: 视频生成失败**
A: 确认视频 API 配置正确，检查提示词长度

**Q: 界面显示异常**
A: 清除浏览器缓存，检查浏览器兼容性

**Q: 数据丢失**
A: 检查是否清除了浏览器数据，使用导出功能备份

### 错误代码
- `401`: API 密钥无效
- `403`: 权限不足或配额用尽
- `429`: 请求频率过高
- `500`: API 服务器错误

## 📧 技术支持

如遇到问题，请检查：
1. 浏览器控制台错误信息
2. API 配置是否正确
3. 网络连接状态
4. 各服务商的 API 文档

## 🔄 更新日志

### v1.0.0 (2024-06-29)
- ✨ 初始版本发布
- 🎬 完整的视频创作工作流
- 🌐 中英双语支持
- 🔧 多种 API 集成
- 💾 本地数据存储
- 📁 导出功能

## 📄 许可证

MIT License - 详见 LICENSE 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Super Directors** - 让 AI 助力您的视频创作之旅！