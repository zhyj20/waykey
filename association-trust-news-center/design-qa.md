# 广东省信用协会网站与 CMS 质检记录

质检日期：2026-07-17

## 首页

### 桌面端

- 视口：1440 × 1000、1078 × 738
- 页面可见宽度与滚动宽度一致，无页面级横向溢出
- 广东省信用协会品牌、协会资讯、政策服务与公开资料索引正常显示
- 首页未出现项目原型、上线验收、CMS、部署状态或待接入信息
- 政府公开资料条目均保留原始来源说明
- 控制台 error / warning：0

### 移动端

- 视口：390 × 844
- 页面可见宽度与滚动宽度一致
- 品牌、搜索、焦点内容、公共服务和公开资料按单列显示
- 移动导航打开后 aria-expanded 为 true，页面滚动锁定
- 页面底部只保留政策法规、专家智库、活动培训和协会公开信息
- 控制台 error / warning：0

### 资料说明

- 花都区活动资料可打开资料说明
- 原始来源链接指向广州市花都区人民政府公开页面
- 页面明确标注依据公开来源整理，并提示优先核对原始来源

## CMS 后台

### 桌面端

- 视口：1440 × 1000
- 页面可见宽度与滚动宽度一致
- 运营总览、工作队列、风险、三审流程和审计记录正常显示
- 初始演示数据为 7 条内容、3 条审核待办、2 条会员报送待办
- 控制台 error / warning：0

### 移动端

- 视口：390 × 844
- 页面级无横向溢出
- 宽表格保留在内部滚动容器，不撑开页面
- 侧边导航可打开并在切换工作区后自动关闭
- 编辑抽屉宽度与 390px 视口一致，无错位或遮挡

### 核心流程

1. 新建稿件并填写标题、摘要和正文。
2. 未登记来源时提交审核，被正确阻止并提示“提交审核前必须登记至少一条来源”。
3. 填写引用边界并登记广东省信用协会现有官网来源。
4. 来源关联成功，弹窗关闭，可信档案出现 1 条来源。
5. 提交后状态从“草稿”流转为“编辑初审”。
6. 刷新页面后内容总数仍为 8，证明 localStorage 演示持久化生效。

## 静态检查

- app.js：node --check 通过
- admin/admin.js：node --check 通过
- 旧协会名称占位和虚构行业统计未进入当前页面源码
- robots.txt 继续禁止原型抓取
- 首页不展示内部项目状态；CMS 仍作为独立开发模块保留

## 截图

- qa/final/home-desktop.png
- qa/final/home-mobile.png
- qa/final/home-mobile-menu.png
- qa/final/home-record-dialog.png
- qa/final-public/home-desktop.jpg
- qa/final-public/home-mobile.jpg
- qa/final-public/corrected-bottom-1078x738.jpg
- qa/final-public/before-after-bottom.jpg
- qa/final/cms-desktop-viewport.png
- qa/final/cms-mobile.png
- qa/final/cms-mobile-menu.png
- qa/final/cms-mobile-editor.png

## 剩余边界

本轮验证的是静态设计预览与浏览器本地交互。正式账号、数据库、文件存储、正式域名、网站发布、微信生态、搜索收录和 AI 答案监测尚未接入，不能以页面可用替代生产环境验收。
