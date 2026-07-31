# 广东省信用协会可信资讯中心

这是面向广东省信用协会的网站与 CMS 客户测试版本。前台保持专业协会门户、行业媒体与智库资讯平台的组合气质；CMS 后台以内容责任、来源证据、审核签发和长期运营为主线。

## 入口

- 网站首页：index.html
- 文章详情：article.html?id=huadu-credit-event
- CMS 客户测试后台：admin/index.html
- CMS 架构说明：cms-architecture.md
- 生产后端基线：backend/README.md

## 当前状态

- 项目状态：可交互客户测试版本，不是协会正式线上系统
- 索引策略：noindex、nofollow，robots.txt 禁止抓取
- 事实边界：政府公开报道只作为原始来源索引
- 数据状态：CMS 测试数据保存在当前浏览器 localStorage
- 业务状态：未连接协会账号、会员数据库、正式发布接口或微信生态

## 已实现

1. 首页、最新发布、独立文章页和 CMS 使用同一份公开内容数据。
2. 每篇文章提供独立 URL、来源台账、版本、更新时间、审核状态与引用边界。
3. CMS 包含运营总览、内容台账、审核签发、来源证据、会员报送、专家复核、专题、媒体、权限、日志和系统设置。
4. 稿件支持筛选、编辑、保存、提交、退回、审核流转和浏览器持久化。
5. 发布门禁校验标题、摘要、来源、发布主体、canonical、结构化数据和流程状态。
6. 通过检查的待发布稿件可以进入客户预览首页与文章页，也可撤下。
7. 测试数据支持 JSON 导出与导入，便于客户测试留档。
8. `backend/schema.sql` 和 `backend/README.md` 提供正式数据库、权限、版本、审计与 API 接入基线，但尚未部署。

## 主要源码

- index.html / styles.css / app.js：网站首页与最新发布
- article.html / article.css / article.js：独立文章详情、来源台账与结构化数据
- site-config.js / content-store.js：环境边界与前后台公开内容适配器
- admin/index.html：CMS 页面与工作区结构
- admin/admin.css：后台桌面与移动端样式
- admin/admin.js：数据模型、审核状态机、发布门禁、导入导出与持久化交互
- backend/：生产 PostgreSQL 与 API 接入基线
- release/：正式索引策略与站点地图生成模板
- llms.txt / robots.txt / sitemap.xml / site.webmanifest：客户预览阶段机器可读边界

## 正式上线前

必须由协会确认主体登记、正式Logo、组织架构、内容责任人、办公信息、制度文件、会员与专家数据。工程侧还需接入服务端数据库、对象存储、真实鉴权、不可抵赖审计日志、正式域名、网站发布、微信生态、索引提交和AI答案监测。

