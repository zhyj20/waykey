# 正式发布模板

当前 GitHub Pages 地址是客户预览环境，因此源码继续使用 `noindex`，`robots.txt` 继续禁止抓取，空站点地图也不会向搜索引擎提交未经协会确认的页面。

正式发布流水线必须完成以下替换：

1. 使用已备案正式域名写入 `PUBLIC_BASE_URL`。
2. 根据已发布内容生成 `ARTICLE_URL_ENTRIES` 和 `BUILD_DATE`。
3. 将生产 robots 模板输出为站点根目录 `robots.txt`。
4. 将生产 sitemap 模板输出为站点根目录 `sitemap.xml`。
5. 删除公开页面中的 `noindex,nofollow,noarchive`，保留 `/admin/` 的 noindex 与访问控制。
6. 逐页验证 canonical、结构化数据、来源链接、状态码和站点地图。

未完成主体授权、正式域名、备案与内容签发前，不应启用生产索引。

