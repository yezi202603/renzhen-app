# 🚀 认真交友平台 - 部署指南

**最后更新**: 2026-03-08  
**预计耗时**: 30-60 分钟

---

## 📋 部署步骤总览

| 步骤 | 操作 | 预计时间 |
|------|------|----------|
| 1 | 在 Supabase 运行 SQL 创建数据表 | 5 分钟 |
| 2 | 配置环境变量 | 2 分钟 |
| 3 | 上传代码到 GitHub | 10 分钟 |
| 4 | 在 Vercel 部署 | 5 分钟 |
| 5 | 测试访问 | 5 分钟 |

---

## 第 1 步：在 Supabase 创建数据表 ⭐

**这是最重要的一步！**

### 1.1 登录 Supabase
访问：https://supabase.com/dashboard

选择你的项目 `renzhen-dating`

### 1.2 进入 SQL Editor
左侧菜单 → **SQL Editor** → **New Query**

### 1.3 复制并运行 SQL

打开文件：`/root/.openclaw/workspace/renzhen-app/apps/web/sql/init.sql`

**复制全部内容**，粘贴到 SQL Editor 中

点击 **Run** 按钮（或按 Ctrl+Enter / Cmd+Enter）

### 1.4 验证成功

看到以下提示说明成功：
```
Success. No rows returned
```

或者在左侧 **Table Editor** 里能看到新建的表：
- profiles
- likes
- matches
- messages
- reports
- daily_recommendations

---

## 第 2 步：配置环境变量

### 2.1 创建 .env.local 文件

在项目根目录创建文件：`/root/.openclaw/workspace/renzhen-app/apps/web/.env.local`

内容如下（**替换成你的实际值**）：

```env
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://lpmnqgedscynzlyujgpt.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_4QaVQsAZjc7Rf4JO9ADNiw_974UwwmX

# 应用配置
NEXT_PUBLIC_APP_NAME=认真
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2.2 获取 Service Role Key（重要！）

1. 登录 Supabase Dashboard
2. Settings → API
3. 找到 **service_role key**（不是 anon key！）
4. 复制这个密钥

**注意**：service_role key 有更高权限，不要暴露到前端代码中！

---

## 第 3 步：上传代码到 GitHub

### 3.1 初始化 Git

在服务器终端执行：

```bash
cd /root/.openclaw/workspace/renzhen-app

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit - 认真交友平台 MVP"
```

### 3.2 创建 GitHub 仓库

1. 访问：https://github.com/new
2. Repository name: `renzhen-app`
3. 选择 **Public**（公开）
4. 点击 **Create repository**

### 3.3 关联并推送

在终端执行（**替换成你的用户名**）：

```bash
# 关联远程仓库
git remote add origin https://github.com/yezi202603/renzhen-app.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

**如果提示需要认证**：
- 使用 GitHub Personal Access Token
- 或者配置 SSH Key

---

## 第 4 步：在 Vercel 部署

### 4.1 登录 Vercel

访问：https://vercel.com/dashboard

使用 GitHub 账号登录

### 4.2 导入项目

1. 点击 **Add New Project**
2. 选择 **Import Git Repository**
3. 找到 `renzhen-app` 仓库
4. 点击 **Import**

### 4.3 配置项目

**Framework Preset**: Next.js（应该自动识别）

**Root Directory**: 点击 Edit，改为 `apps/web`

**Environment Variables**: 添加以下变量：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://lpmnqgedscynzlyujgpt.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_4QaVQsAZjc7Rf4JO9ADNiw_974UwwmX` |

### 4.4 点击 Deploy

点击 **Deploy** 按钮

等待 2-5 分钟，看到 **Congratulations** 说明部署成功！

### 4.5 访问网站

Vercel 会给你一个域名：
```
https://renzhen-app-xxxx.vercel.app
```

点击 **Visit** 访问你的网站！

---

## 第 5 步：测试功能

### 测试清单

- [ ] 首页能正常访问
- [ ] 点击"注册"能跳转到注册页
- [ ] 注册新账号成功
- [ ] 登录成功
- [ ] 能看到每日推荐
- [ ] 点击"喜欢"能发送喜欢
- [ ] 互相喜欢后能匹配成功

---

## 🆘 常见问题

### Q: Git push 失败，需要认证
**A**: 使用 Personal Access Token
1. GitHub → Settings → Developer settings → Personal access tokens
2. 生成新 Token（勾选 repo 权限）
3. push 时用 Token 代替密码

### Q: Vercel 部署失败
**A**: 查看部署日志
1. Vercel Dashboard → 项目 → Deployments
2. 点击失败的部署
3. 查看日志找错误

### Q: 注册后提示错误
**A**: 检查 Supabase 配置
1. 确认 SQL 已运行
2. 确认环境变量正确
3. 查看浏览器控制台错误

### Q: 图片上传失败
**A**: 配置 Supabase Storage
1. Supabase Dashboard → Storage
2. 创建新 Bucket：`avatars`
3. 设置为公开访问

---

## 📞 需要帮助？

遇到问题随时告诉我：
- 截图错误信息
- 告诉我进行到哪一步
- 我会帮你解决！

---

*认真脱单，不玩套路* 💖
