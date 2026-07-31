(function () {
  "use strict";

  const config = window.TRUSTSITE_CONFIG || {};
  const STORAGE_KEY = config.cms?.publicStorageKey || "gdca-public-content-v2";
  const SCHEMA_VERSION = 2;

  const seedArticles = [
    {
      id: "huadu-credit-event",
      cmsId: "GDCA-PUBLIC-001",
      title: "协会参与花都区社会信用体系建设宣讲活动",
      type: "协会动态",
      channel: "协会动态",
      summary: "花都区政府公开信息显示，活动围绕信用修复、企业合规经营和社会信用体系建设展开。",
      body: "花都区政府公开报道介绍了社会信用体系建设主题宣讲活动，并记录了相关参与单位与活动议题。\n\n本页面对公开报道进行资料索引，帮助读者快速核对活动主题、公开时间和原始出处。涉及协会参与方式、现场发言和后续工作安排的表述，仍应以协会正式材料或原始报道为准。\n\n转载或引用时，应保留原始来源链接，不得将外部公开报道改写为协会正式签发文件。",
      publisher: "本页依据公开来源整理",
      publishedAt: "2026-07-14",
      updatedAt: "2026-07-31",
      sourcePublishedAt: "2026-07-14",
      version: "v1.0",
      reviewStatus: "外部来源已登记",
      boundary: "可引用公开报道中的基础事实，不得表述为广东省信用协会正式签发稿件。",
      keywords: ["社会信用体系", "信用修复", "花都区", "企业合规"],
      sources: [
        {
          name: "广州市花都区人民政府公开报道",
          url: "https://www.huadu.gov.cn/zfxxgkml/gzshdqfzhggj/content/post_10899951.html",
          claim: "支持活动主题、参与主体和公开时间等基础事实。",
          status: "verified"
        }
      ]
    },
    {
      id: "culture-tourism-standard",
      cmsId: "GDCA-PUBLIC-002",
      title: "文旅市场企业信用评级业务规范调研公开资料",
      type: "标准研究",
      channel: "标准研究",
      summary: "江门市相关部门公开报道介绍了文旅市场企业信用评级业务规范团体标准调研活动。",
      body: "江门市文化广电旅游体育局公开报道记录了文旅市场企业信用评级业务规范相关调研活动。\n\n本页面仅整理调研活动及公开来源，不据此判断团体标准已经立项、发布或实施。标准项目阶段、技术内容和参与单位职责，应以正式立项文件、征求意见稿或发布公告为准。\n\n对外使用该资料时，应明确“调研活动”与“标准发布”之间的区别。",
      publisher: "本页依据公开来源整理",
      publishedAt: "2025-03-21",
      updatedAt: "2026-07-31",
      sourcePublishedAt: "2025-03-21",
      version: "v1.0",
      reviewStatus: "外部来源已登记",
      boundary: "外部报道仅证明公开调研活动，不代表团体标准已经立项、发布或实施。",
      keywords: ["文旅市场", "企业信用评级", "团体标准", "标准调研"],
      sources: [
        {
          name: "江门市文化广电旅游体育局公开报道",
          url: "https://www.jiangmen.gov.cn/bmpd/jmswhgdlytyj/zwgk/gzdt/content/post_3267467.html",
          claim: "支持团体标准调研活动及协会参与事实。",
          status: "verified"
        }
      ]
    },
    {
      id: "gd-credit-regulation",
      cmsId: "GDCA-PUBLIC-003",
      title: "《广东省社会信用条例》政策资料索引",
      type: "政策法规",
      channel: "政策法规",
      summary: "提供《广东省社会信用条例》公开文本入口，并说明法规引用、政策解读和办事信息的使用边界。",
      body: "本页面提供《广东省社会信用条例》公开文本的资料入口，便于会员单位和社会公众查阅。\n\n法规条文、施行时间和适用范围应以权威公开文本为准。协会或专家对条例的说明不替代主管部门解释，也不构成法律意见。\n\n在企业经营、信用修复或合规决策中引用具体条款时，建议同时核对最新法规文本和主管部门公开口径。",
      publisher: "本页依据公开来源整理",
      publishedAt: "2026-07-16",
      updatedAt: "2026-07-31",
      sourcePublishedAt: "2021-06-01",
      version: "v1.0",
      reviewStatus: "法规来源已登记",
      boundary: "政策资料索引不构成行政解释或法律意见，法规引用须链接权威原文。",
      keywords: ["广东省社会信用条例", "信用建设", "信用信息", "政策法规"],
      sources: [
        {
          name: "《广东省社会信用条例》公开文本",
          url: "https://www.zhanjiang.gov.cn/zjsfw/bmdh/gyxxhj/zwgk/tzgg/content/post_2056164.html",
          claim: "支持条例公开文本、施行信息和法规条文。",
          status: "verified"
        }
      ]
    },
    {
      id: "yuexiu-credit-exchange",
      cmsId: "GDCA-PUBLIC-004",
      title: "中小企业信用管理与能力提升交流活动资料",
      type: "活动培训",
      channel: "活动培训",
      summary: "越秀区政府公开报道介绍了中小企业信用管理与能力提升交流活动。",
      body: "越秀区政府公开资料记录了中小企业信用管理与能力提升相关交流活动。\n\n本页面用于索引活动公开信息，不扩展推断活动成效、企业评价或后续服务承诺。涉及具体政策、课程内容和参会主体的信息，应以原始报道为准。\n\n引用活动信息时，请保留来源机构、原始链接和来源发布时间。",
      publisher: "本页依据公开来源整理",
      publishedAt: "2025-05-27",
      updatedAt: "2026-07-31",
      sourcePublishedAt: "2025-05-27",
      version: "v1.0",
      reviewStatus: "外部来源已登记",
      boundary: "公开报道仅支持活动事实，不代表对参会企业、课程效果或后续服务作出背书。",
      keywords: ["中小企业", "信用管理", "能力提升", "越秀区"],
      sources: [
        {
          name: "广州市越秀区人民政府公开报道",
          url: "https://www.yuexiu.gov.cn/tzyx/xyyx/xygg/cxwhxc/content/post_10289451.html",
          claim: "支持活动主题、公开时间和交流内容等基础事实。",
          status: "verified"
        }
      ]
    }
  ];

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadCustomArticles() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
      if (parsed.schemaVersion !== SCHEMA_VERSION || !Array.isArray(parsed.records)) return [];
      return parsed.records.filter((item) => item && item.id && item.status === "published");
    } catch (error) {
      return [];
    }
  }

  function persistCustomArticles(records) {
    const payload = {
      schemaVersion: SCHEMA_VERSION,
      generatedAt: new Date().toISOString(),
      records: clone(records)
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent("trustsource:content-change", { detail: payload }));
    return payload;
  }

  function getPublished() {
    const merged = new Map();
    seedArticles.forEach((item) => merged.set(item.id, { ...clone(item), status: "published", origin: "seed" }));
    loadCustomArticles().forEach((item) => merged.set(item.id, { ...clone(item), origin: "cms" }));
    return Array.from(merged.values()).sort((a, b) =>
      String(b.publishedAt || b.updatedAt || "").localeCompare(String(a.publishedAt || a.updatedAt || ""))
    );
  }

  function getById(id) {
    return getPublished().find((item) => item.id === id || item.cmsId === id) || null;
  }

  function articleUrl(id, absolute) {
    const basePath = window.location.pathname
      .replace(/\/admin\/(?:index\.html)?$/, "/")
      .replace(/\/(?:index|article)\.html$/, "/");
    const relative = basePath + "article.html?id=" + encodeURIComponent(id);
    return absolute ? window.location.origin + relative : relative.replace(basePath, "");
  }

  function fromCmsContent(content) {
    const now = new Date();
    const publishedAt = content.publishedAt || now.toISOString().slice(0, 10);
    return {
      id: content.id,
      cmsId: content.id,
      title: content.title,
      type: content.type,
      channel: content.channel,
      summary: content.summary,
      body: content.body,
      publisher: content.publisher,
      publishedAt,
      updatedAt: now.toISOString().slice(0, 10),
      sourcePublishedAt: content.sourcePublishedAt || "",
      version: content.version || "v1.0",
      reviewStatus: "三审三校流程完成",
      boundary: content.boundary,
      keywords: String(content.keyword || "").split(/[，,]/).map((item) => item.trim()).filter(Boolean),
      canonical: content.canonical || articleUrl(content.id, true),
      status: "published",
      sources: clone(content.sources || [])
    };
  }

  function publish(content) {
    const record = fromCmsContent(content);
    const custom = loadCustomArticles();
    const index = custom.findIndex((item) => item.id === record.id);
    if (index >= 0) custom[index] = record;
    else custom.unshift(record);
    persistCustomArticles(custom);
    return clone(record);
  }

  function unpublish(id) {
    const custom = loadCustomArticles().filter((item) => item.id !== id);
    persistCustomArticles(custom);
  }

  function exportSnapshot() {
    return {
      schemaVersion: SCHEMA_VERSION,
      exportedAt: new Date().toISOString(),
      records: loadCustomArticles()
    };
  }

  function importSnapshot(payload) {
    if (!payload || payload.schemaVersion !== SCHEMA_VERSION || !Array.isArray(payload.records)) {
      throw new Error("公开内容数据格式不兼容");
    }
    const records = payload.records.filter((item) => item && item.id && item.status === "published");
    return persistCustomArticles(records);
  }

  window.TrustContentStore = Object.freeze({
    storageKey: STORAGE_KEY,
    schemaVersion: SCHEMA_VERSION,
    getPublished,
    getById,
    articleUrl,
    publish,
    unpublish,
    exportSnapshot,
    importSnapshot
  });
})();

