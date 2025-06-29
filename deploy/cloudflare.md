# Cloudflare Pages 部署指南

## 🚀 方法一：GitHub 集成部署（推荐）

### 1. 准备 GitHub 仓库
```bash
# 1. 在 GitHub 创建新仓库
# 2. 克隆到本地
git clone https://github.com/your-username/super-directors.git
cd super-directors

# 3. 复制项目文件到仓库
# 将 super-directors 文件夹中的所有文件复制到此目录

# 4. 提交代码
git add .
git commit -m "Initial commit: Super Directors v1.0.0"
git push origin main
```

### 2. 连接 Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
2. 选择您的账户，进入 **Pages**
3. 点击 **"Create a project"**
4. 选择 **"Connect to Git"**
5. 授权访问您的 GitHub 账户
6. 选择 `super-directors` 仓库

### 3. 配置构建设置
```yaml
# 构建配置
Framework preset: None
Build command: (留空)
Build output directory: /
Root directory: /

# 环境变量（可选）
NODE_VERSION: 18
```

### 4. 部署
- 点击 **"Save and Deploy"**
- 等待构建完成（通常 1-2 分钟）
- 获取部署 URL：`https://your-project.pages.dev`

## 🌐 方法二：直接文件上传

### 1. 准备文件
确保您有以下文件：
- `index.html`
- `styles.css`
- `script.js`
- `README.md`（可选）

### 2. 上传到 Cloudflare
1. 进入 Cloudflare Pages
2. 点击 **"Upload assets"**
3. 选择 **"Upload folder"**
4. 上传整个 `super-directors` 文件夹
5. 等待处理完成

## ⚙️ 高级配置

### 自定义域名
1. 在 Pages 项目中点击 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入您的域名（例如：`super-directors.yourdomain.com`）
4. 按照指示配置 DNS 记录

### Headers 配置
创建 `_headers` 文件（可选）：
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.openai.com https://api.anthropic.com https://api.runwayml.com https://api.elevenlabs.io https://api.pika.art https://api.stability.ai https://generativelanguage.googleapis.com
```

### 重定向配置
创建 `_redirects` 文件（可选）：
```
# SPA fallback
/*    /index.html   200

# Force HTTPS
http://super-directors.yourdomain.com/*  https://super-directors.yourdomain.com/:splat  301!
```

## 🔧 环境变量（可选）

虽然本项目是纯前端应用，但您可以设置环境变量用于构建时配置：

```bash
# 生产环境标识
ENVIRONMENT=production

# 版本信息
APP_VERSION=1.0.0

# 默认语言
DEFAULT_LANGUAGE=zh
```

## 📊 性能优化

### 1. 启用缓存
Cloudflare 会自动缓存静态资源，无需额外配置。

### 2. 压缩设置
Cloudflare 会自动启用 Gzip 和 Brotli 压缩。

### 3. CDN 分发
您的应用将自动通过 Cloudflare 的全球 CDN 分发。

## 🔒 安全配置

### HTTPS 强制
默认启用，所有 HTTP 请求会自动重定向到 HTTPS。

### 安全头部
建议添加安全头部（见上文 Headers 配置）。

### API 限制
由于使用的是客户端 API 调用，请确保：
- 使用有限权限的 API 密钥
- 定期轮换密钥
- 监控 API 使用情况

## 🚨 故障排除

### 常见问题

**部署失败**
- 检查文件结构是否正确
- 确认所有文件都已上传
- 查看构建日志获取详细错误信息

**404 错误**
- 确认 `index.html` 在根目录
- 检查文件名大小写是否正确

**CORS 错误**
- 这是 API 调用的正常行为
- 确保 API 服务商支持跨域请求
- 检查 API 密钥配置

**SSL 证书问题**
- 等待 24-48 小时让证书完全生效
- 检查域名 DNS 配置

### 调试方法
1. 使用浏览器开发者工具
2. 检查网络标签查看请求状态
3. 查看控制台错误信息
4. 测试不同的 API 配置

## 📈 监控和分析

### Cloudflare Analytics
- 访问量统计
- 性能指标
- 错误率监控

### 自定义分析
可以集成 Google Analytics 或其他分析工具：

```html
<!-- 在 index.html 的 <head> 部分添加 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 更新部署

### GitHub 集成
- 推送新代码到 GitHub 仓库
- Cloudflare Pages 会自动重新部署

### 直接上传
- 重新上传更新的文件
- 等待处理完成

## 💡 最佳实践

1. **版本控制**: 使用 Git 标签管理版本
2. **测试**: 在 staging 环境先测试
3. **备份**: 定期备份重要配置
4. **监控**: 设置监控警报
5. **文档**: 保持部署文档更新

---

部署完成后，您的 Super Directors 应用就可以在全球范围内访问了！🎉