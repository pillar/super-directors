# Super Directors 项目结构

## 📁 文件组织

```
super-directors/
├── index.html              # 主页面文件
├── styles.css              # 样式文件
├── js/                     # JavaScript 模块化文件夹
│   ├── core.js             # 核心功能和全局变量
│   ├── language.js         # 多语言切换功能
│   ├── storage.js          # 本地存储管理
│   ├── api.js             # API 配置和测试
│   ├── story.js           # 故事生成功能
│   ├── script.js          # 脚本制作功能
│   ├── video.js           # 视频生成功能
│   └── export.js          # 导出和文件下载
├── deploy/                # 部署相关文件
│   ├── cloudflare.md      # Cloudflare 部署指南
│   └── nginx.conf         # Nginx 配置示例
├── README.md              # 项目说明文档
├── TEST-CHECKLIST.md      # 功能测试清单
└── project-checklist.md   # 项目完成状态
```

## 🔧 JavaScript 模块说明

### core.js - 核心功能
- 全局变量定义 (`currentStory`, `currentScript`, `apiSettings`, `currentLanguage`)
- 多语言文本配置 (`translations`)
- 页面初始化 (`DOMContentLoaded`)
- 通用工具函数 (`showAlert`, `switchTab`)

### language.js - 多语言功能
- `toggleLanguage()` - 切换中英文
- `updateLanguage()` - 更新界面文本
- `loadLanguage()` - 加载保存的语言设置
- `updateExportButtons()` - 更新导出按钮文本

### storage.js - 本地存储
- `saveAllSettings()` - 保存 API 配置
- `loadSettings()` - 加载保存的配置
- `clearAllSettings()` - 清除所有设置
- `getElementValue()` / `setElementValue()` - 工具函数

### api.js - API 管理
- `updateTextApiFields()` - 更新文本 API 字段
- `updateVideoApiFields()` - 更新视频 API 字段
- `updateAudioApiFields()` - 更新音频 API 字段
- `testTextApi()` / `testVideoApi()` / `testAudioApi()` - API 连接测试
- `updateApiStatusIndicator()` - 更新状态指示器

### story.js - 故事生成
- `generateStory()` - 调用 AI 生成故事
- `selectStory()` - 选择预设故事
- `useStoryInScript()` - 将故事传递给脚本制作

### script.js - 脚本制作
- `generateScript()` - 调用 AI 生成脚本
- `useScriptInVideo()` - 将脚本传递给视频生成

### video.js - 视频生成
- `generateVideo()` - 调用 AI 生成视频
- `downloadVideo()` - 下载生成的视频
- `generateAudio()` - 音频生成（开发中）

### export.js - 导出功能
- `addExportButtons()` - 添加导出按钮到界面
- `exportStory()` - 导出故事为 txt 文件
- `exportScript()` - 导出脚本为 txt 文件
- `exportProject()` - 导出完整项目为 JSON
- `saveAllContent()` - 保存内容到本地存储
- `downloadFile()` - 通用文件下载函数

## 🎯 模块化的优势

1. **代码组织清晰**: 每个文件负责特定功能
2. **易于维护**: 修改某个功能只需要编辑对应文件
3. **调试友好**: 出错时可以快速定位到具体模块
4. **可扩展性**: 添加新功能只需创建新模块
5. **团队协作**: 不同开发者可以负责不同模块

## 🔄 文件加载顺序

HTML 中的 JavaScript 文件按以下顺序加载：

1. `core.js` - 必须最先加载（包含全局变量和基础函数）
2. `language.js` - 语言功能
3. `storage.js` - 存储功能
4. `api.js` - API 管理
5. `story.js` - 故事生成
6. `script.js` - 脚本制作
7. `video.js` - 视频生成
8. `export.js` - 导出功能（最后加载，因为它需要添加 DOM 元素）

## 🔍 故障排除

### 常见问题及解决方案

1. **JavaScript 错误**
   - 检查浏览器控制台 (F12)
   - 确认所有 JS 文件都正确加载
   - 验证文件路径是否正确

2. **功能不工作**
   - 检查对应的模块文件
   - 确认函数名拼写正确
   - 验证 HTML 中的 id 和 onclick 属性

3. **API 调用失败**
   - 检查 `api.js` 中的 API 配置
   - 验证网络连接
   - 确认 API 密钥有效

4. **本地存储问题**
   - 检查 `storage.js` 中的存储逻辑
   - 清除浏览器缓存和本地存储
   - 验证 JSON 格式是否正确

## 🚀 开发建议

### 添加新功能
1. 在 `js/` 文件夹中创建新的模块文件
2. 在 `index.html` 中引入新的 JavaScript 文件
3. 在 `language.js` 中添加多语言支持
4. 在 `storage.js` 中添加数据持久化（如需要）

### 代码规范
- 使用有意义的函数名和变量名
- 添加必要的注释
- 保持代码格式一致
- 进行错误处理

### 测试流程
1. 使用 `TEST-CHECKLIST.md` 进行功能测试
2. 在不同浏览器中测试
3. 验证移动设备兼容性
4. 检查控制台无错误信息

---

这种模块化的结构使得 Super Directors 项目更加专业、可维护和可扩展！ 🎬✨