# CMS 生产后端接入基线

本目录定义从客户测试环境切换到正式 CMS 所需的服务端边界。`schema.sql` 是 PostgreSQL 16 建库基线，当前未连接或迁移到任何生产数据库。

## 当前可验证能力

- `admin/` 已实现稿件编辑、来源登记、三审三校流转、发布检查、前台发布预览、撤下、导入与导出。
- `content-store.js` 让 CMS 已发布内容进入首页和独立文章页。
- 客户测试数据仅保存在当前浏览器，不具备多人协作、账号隔离、可靠备份或服务端审计能力。

## 正式服务接口

### 公开读取

- `GET /api/public/articles?channel=&cursor=`
- `GET /api/public/articles/{public_id}`
- `GET /api/public/sitemap.xml`

公开接口只返回 `published` 状态和对应已签发版本。数据库不直接开放匿名访问，由服务端输出经过字段白名单处理的公开数据。

### CMS 工作区

- `GET /api/cms/articles`
- `POST /api/cms/articles`
- `PATCH /api/cms/articles/{id}`
- `POST /api/cms/articles/{id}/sources`
- `POST /api/cms/articles/{id}/transition`
- `POST /api/cms/articles/{id}/publish`
- `POST /api/cms/articles/{id}/withdraw`
- `GET /api/cms/audit`

每个写入请求必须包含登录会话、角色、请求编号和幂等键。状态流转由服务端校验，前端传入的状态值不能直接覆盖数据库。

## 安全与治理

1. 身份认证采用 OIDC 或协会现有 SSO，签发角色强制 MFA。
2. 编辑、业务复核和负责人签发角色分离；同一账号不得完成全部环节。
3. 来源快照与授权附件进入 S3 兼容对象存储，并记录 SHA-256、上传人和授权期限。
4. 审核与发布动作写入追加式日志；普通业务账号没有删除审计记录的权限。
5. 正式发布先生成不可变版本，再写入发布记录、刷新缓存并更新站点地图。
6. 撤稿保留稿件、版本、签发链和撤下原因，不物理删除历史责任记录。

## 环境变量

```text
DATABASE_URL
OIDC_ISSUER
OIDC_CLIENT_ID
OIDC_CLIENT_SECRET
SESSION_SIGNING_KEY
OBJECT_STORAGE_ENDPOINT
OBJECT_STORAGE_BUCKET
OBJECT_STORAGE_ACCESS_KEY
OBJECT_STORAGE_SECRET_KEY
PUBLIC_BASE_URL
CMS_ALLOWED_ORIGINS
```

环境变量只进入服务端密钥管理系统，不写入前端文件、Git 仓库或导出的客户测试数据。

## 上线顺序

1. 协会确认正式域名、主体信息、Logo、角色与审核制度。
2. 在隔离环境执行 `schema.sql`，创建首个管理员并完成权限复核。
3. 实现服务端 API 与对象存储，将 `admin/admin.js` 的 localStorage 适配器替换为 API 适配器。
4. 导入经协会确认的稿件和来源记录，进行角色分离与撤稿演练。
5. 切换 robots、sitemap 和 canonical，完成正式域名、备案、缓存与监测验证。

