# 💖 认真 - 严肃年轻人的交友平台

**Slogan**: 认真脱单，不玩套路

---

## 📖 项目介绍

「认真」是一个面向严肃交友年轻人的平台，主打真实、高效、安全的脱单体验。

### 核心特点

- ✅ **实名认证**：所有用户必须实名认证，杜绝虚假
- ✅ **每日限量**：每天推荐 5-10 人，宁缺毋滥
- ✅ **认真导向**：明确恋爱/结婚导向，过滤不认真用户
- ✅ **AI 辅助**：AI 帮助破冰，降低尬聊

---

## 🚀 快速开始

### 前置要求

- Node.js 20+
- npm 或 yarn
- Supabase 账号
- Vercel 账号（部署用）

### 本地开发

```bash
# 克隆项目
git clone https://github.com/renzhen-dating/renzhen-app.git
cd renzhen-app

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入你的 Supabase 配置

# 启动开发服务器
npm run dev
```

访问 http://localhost:3000

---

## 📁 项目结构

```
renzhen-app/
├── apps/
│   ├── web/              # 前端应用（Next.js）
│   └── api/              # 后端 API（Cloudflare Workers）
├── packages/
│   ├── database/         # 数据库 Schema
│   └── ui/               # 共享 UI 组件
├── docs/                 # 文档
└── scripts/              # 脚本工具
```

---

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14
- **UI**: Vant 4
- **状态管理**: Zustand
- **样式**: Tailwind CSS

### 后端
- **运行时**: Cloudflare Workers
- **数据库**: Supabase (PostgreSQL)
- **实时**: Supabase Realtime
- **存储**: Cloudflare R2

### 部署
- **前端**: Vercel
- **后端**: Cloudflare Workers
- **域名**: 自定义域名

---

## 📱 功能清单

### MVP 版本（v1.0）

- [x] 用户注册/登录
- [x] 个人资料编辑
- [x] 照片上传
- [x] 滑动匹配
- [x] 每日推荐
- [x] 即时聊天
- [x] 举报/拉黑
- [x] 后台审核

### 后续版本

- [ ] VIP 会员
- [ ] 超级喜欢
- [ ] 线下活动
- [ ] AI 聊天助手
- [ ] 视频认证

---

## 📊 数据库设计

主要数据表：

- `profiles` - 用户资料
- `likes` - 喜欢记录
- `matches` - 匹配记录
- `messages` - 消息记录
- `reports` - 举报记录

详细设计见 [数据库文档](./docs/database.md)

---

## 🔐 环境变量

需要配置以下环境变量：

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token

# 其他
NEXT_PUBLIC_APP_ENV=development
```

---

## 📖 文档

- [部署教程](./docs/deployment.md)
- [API 文档](./docs/api.md)
- [数据库设计](./docs/database.md)
- [开发规范](./docs/contributing.md)

---

## 📝 开发规范

### 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

### 分支管理

- `main` - 主分支，随时可部署
- `develop` - 开发分支
- `feature/*` - 功能分支
- `fix/*` - 修复分支

---

## 🆘 常见问题

见 [FAQ](./docs/faq.md)

---

## 📞 联系方式

- 项目地址：https://github.com/renzhen-dating/renzhen-app
- 问题反馈：[GitHub Issues](https://github.com/renzhen-dating/renzhen-app/issues)

---

## 📄 许可证

MIT License

---

*认真脱单，不玩套路* 💖