"use strict";

const STORAGE_KEY = "gdca-cms-demo-v1";
const reviewStatuses = ["first_review", "business_review", "signoff"];
const statusLabels = {
  draft: "草稿",
  editing: "编辑中",
  first_review: "编辑初审",
  business_review: "业务复核",
  signoff: "负责人签发",
  scheduled: "待发布",
  published: "已发布",
  returned: "已退回"
};
const riskLabels = { low: "低", medium: "中", high: "高" };
const sourceTypeLabels = {
  government: "政府网站",
  association: "协会原始材料",
  member: "会员证明材料",
  expert: "专家审阅材料",
  third_party: "第三方公开来源"
};
const sourceStatusLabels = { verified: "已核验", pending: "待核验", expired: "需更新" };
const viewLabels = {
  dashboard: "运营总览",
  content: "内容台账",
  review: "审核签发",
  sources: "来源证据",
  submissions: "会员报送",
  experts: "专家复核",
  topics: "专题与活动",
  publish: "SEO / GEO",
  media: "媒体资料",
  users: "用户与权限",
  audit: "操作日志",
  settings: "系统设置"
};

const seedState = {
  contents: [
    {
      id: "GDCA-2026-001",
      title: "协会参与花都区社会信用体系建设宣讲活动",
      type: "协会动态",
      channel: "协会动态",
      status: "business_review",
      owner: "内容编辑A",
      updated: "2026-07-17 10:20",
      risk: "medium",
      summary: "依据花都区政府公开报道建立资料索引，待协会业务部门复核参与信息、表述边界与发布口径。",
      body: "本稿件处于业务复核阶段。正式发布时，应保留原始来源、协会复核意见、图片授权与内容版本。",
      publisher: "外部公开资料索引",
      boundary: "可引用花都区政府原始报道，不得表述为广东省信用协会已签发稿件。",
      seoTitle: "广东省信用协会参与花都区社会信用体系建设宣讲活动",
      seoDescription: "花都区政府公开报道资料索引，内容待广东省信用协会复核后发布。",
      canonical: "",
      keyword: "社会信用体系，信用修复，花都区",
      schemaArticle: true,
      schemaBreadcrumb: true,
      schemaFaq: false,
      llmsInclude: false,
      sources: [
        {
          id: "SRC-001",
          name: "广州市花都区人民政府公开报道",
          url: "https://www.huadu.gov.cn/zfxxgkml/gzshdqfzhggj/content/post_10899951.html",
          type: "government",
          status: "verified",
          claim: "支持活动主题、参与主体和公开时间等基础事实。",
          fetchedAt: "2026-07-17 09:40",
          verifier: "资料核验岗"
        }
      ],
      history: [
        { time: "2026-07-17 10:20", actor: "内容编辑A", action: "提交业务复核", note: "初审确认来源可打开，标题保持资料索引边界。" },
        { time: "2026-07-17 09:45", actor: "资料核验岗", action: "登记来源", note: "政府网站来源已核验。" }
      ]
    },
    {
      id: "GDCA-2026-002",
      title: "文旅市场企业信用评级业务规范调研公开资料",
      type: "标准研究",
      channel: "标准研究",
      status: "first_review",
      owner: "标准研究岗",
      updated: "2026-07-17 09:36",
      risk: "medium",
      summary: "依据江门市文化广电旅游体育局公开报道，整理协会开展相关团体标准调研的资料索引。",
      body: "正式稿应补充调研背景、参与单位授权、标准项目阶段和协会内部确认材料。",
      publisher: "外部公开资料索引",
      boundary: "外部报道仅证明公开活动，不代表团体标准已经立项、发布或实施。",
      seoTitle: "文旅市场企业信用评级业务规范调研资料",
      seoDescription: "广东省信用协会相关团体标准调研公开资料索引。",
      canonical: "",
      keyword: "文旅市场，企业信用评级，团体标准",
      schemaArticle: true,
      schemaBreadcrumb: true,
      schemaFaq: false,
      llmsInclude: false,
      sources: [
        {
          id: "SRC-002",
          name: "江门市文化广电旅游体育局公开报道",
          url: "https://www.jiangmen.gov.cn/bmpd/jmswhgdlytyj/zwgk/gzdt/content/post_3267467.html",
          type: "government",
          status: "verified",
          claim: "支持团体标准调研活动及协会参与事实。",
          fetchedAt: "2026-07-17 09:10",
          verifier: "资料核验岗"
        }
      ],
      history: [
        { time: "2026-07-17 09:36", actor: "标准研究岗", action: "提交编辑初审", note: "等待核对标准项目阶段表述。" }
      ]
    },
    {
      id: "GDCA-2026-003",
      title: "《广东省社会信用条例》政策资料索引",
      type: "政策法规",
      channel: "政策法规",
      status: "signoff",
      owner: "政策编辑岗",
      updated: "2026-07-16 17:40",
      risk: "high",
      summary: "建立法规公开文本、施行时间、适用范围与后续政策解读的统一资料入口。",
      body: "法规条文应以权威公开文本为准。协会政策解读需要业务复核，并明确不替代主管部门解释。",
      publisher: "广东省信用协会",
      boundary: "政策解读不构成行政解释或法律意见，法规引用须链接权威原文。",
      seoTitle: "广东省社会信用条例政策资料索引",
      seoDescription: "《广东省社会信用条例》公开文本、施行信息与协会政策资料索引。",
      canonical: "",
      keyword: "广东省社会信用条例，信用建设，信用信息",
      schemaArticle: true,
      schemaBreadcrumb: true,
      schemaFaq: false,
      llmsInclude: true,
      sources: [
        {
          id: "SRC-003",
          name: "《广东省社会信用条例》公开文本",
          url: "https://www.zhanjiang.gov.cn/zjsfw/bmdh/gyxxhj/zwgk/tzgg/content/post_2056164.html",
          type: "government",
          status: "verified",
          claim: "支持条例通过、施行时间及法规条文。",
          fetchedAt: "2026-07-16 14:20",
          verifier: "政策复核岗"
        }
      ],
      history: [
        { time: "2026-07-16 17:40", actor: "业务复核岗", action: "提交负责人签发", note: "建议正式发布前补充权威法规数据库链接。" },
        { time: "2026-07-16 16:10", actor: "政策编辑岗", action: "完成编辑初审", note: "已核对施行时间与适用范围。" }
      ]
    },
    {
      id: "GDCA-2026-004",
      title: "会员信息报送与授权指引（草案）",
      type: "行业自律",
      channel: "行业自律",
      status: "draft",
      owner: "会员服务岗",
      updated: "2026-07-16 15:08",
      risk: "medium",
      summary: "拟规范会员动态、信用案例、图片、人物、数据与商业主张的报送材料和授权边界。",
      body: "草案需协会内部审定，不得在公开网站中表述为已生效制度。",
      publisher: "广东省信用协会",
      boundary: "草案未审定，不得对会员形成正式要求。",
      seoTitle: "",
      seoDescription: "",
      canonical: "",
      keyword: "会员报送，内容授权",
      schemaArticle: true,
      schemaBreadcrumb: true,
      schemaFaq: false,
      llmsInclude: false,
      sources: [],
      history: [
        { time: "2026-07-16 15:08", actor: "会员服务岗", action: "创建草稿", note: "等待内部制度材料。" }
      ]
    },
    {
      id: "GDCA-2026-005",
      title: "专家署名、审阅与利益关系披露规则（草案）",
      type: "行业自律",
      channel: "专家智库",
      status: "editing",
      owner: "专家联络岗",
      updated: "2026-07-16 11:22",
      risk: "high",
      summary: "拟明确专家身份核验、专业范围、审阅意见、授权期限与利益关系披露要求。",
      body: "规则需结合协会治理制度、个人信息保护和专家授权文件进一步审定。",
      publisher: "广东省信用协会",
      boundary: "草案未审定，不代表协会现行专家管理制度。",
      seoTitle: "",
      seoDescription: "",
      canonical: "",
      keyword: "专家智库，利益关系披露",
      schemaArticle: true,
      schemaBreadcrumb: true,
      schemaFaq: false,
      llmsInclude: false,
      sources: [],
      history: [
        { time: "2026-07-16 11:22", actor: "专家联络岗", action: "更新草稿", note: "补充利益关系披露字段。" }
      ]
    },
    {
      id: "GDCA-2026-006",
      title: "演示会员单位信用管理案例",
      type: "会员报送",
      channel: "会员资讯",
      status: "returned",
      owner: "会员内容岗",
      updated: "2026-07-15 16:30",
      risk: "high",
      summary: "演示会员单位提交的信用管理案例，当前缺少数据口径、图片授权和关键成效证明。",
      body: "不得使用缺乏证明材料的排名、增长、领先或效果性表述。",
      publisher: "会员单位报送",
      boundary: "会员材料不等于协会背书，成效数据须由会员主体负责并提供证明。",
      seoTitle: "",
      seoDescription: "",
      canonical: "",
      keyword: "会员案例，信用管理",
      schemaArticle: true,
      schemaBreadcrumb: true,
      schemaFaq: false,
      llmsInclude: false,
      sources: [
        {
          id: "SRC-004",
          name: "演示会员单位自述材料",
          url: "https://example.invalid/member-proof",
          type: "member",
          status: "pending",
          claim: "拟支持案例过程与成效数据，尚未核验。",
          fetchedAt: "2026-07-15 14:10",
          verifier: "待分配"
        }
      ],
      history: [
        { time: "2026-07-15 16:30", actor: "编辑初审岗", action: "退回修改", note: "缺少数据证明与图片授权，会员自述不能作为唯一证据。" }
      ]
    },
    {
      id: "GDCA-2026-007",
      title: "广东信用可信资讯中心建设说明",
      type: "信息公开",
      channel: "信息公开",
      status: "scheduled",
      owner: "项目运营岗",
      updated: "2026-07-17 11:05",
      risk: "low",
      summary: "说明可信资讯中心的内容边界、来源档案、审核流程和项目原型状态。",
      body: "正式上线前须补充主体授权、域名备案、联系方式、隐私政策与内容责任机制。",
      publisher: "广东省信用协会 × 牛媒信源（项目拟定）",
      boundary: "仅用于项目评审，不构成正式上线公告。",
      seoTitle: "广东省信用协会可信资讯中心建设说明",
      seoDescription: "介绍广东信用可信资讯中心的来源核验、审核流程与发布边界。",
      canonical: "",
      keyword: "可信资讯，内容治理，广东省信用协会",
      schemaArticle: true,
      schemaBreadcrumb: true,
      schemaFaq: false,
      llmsInclude: true,
      sources: [
        {
          id: "SRC-005",
          name: "广东省信用协会现有官网",
          url: "https://www.gd-credit.com/",
          type: "association",
          status: "verified",
          claim: "支持协会名称与现有公开网站入口。",
          fetchedAt: "2026-07-17 08:50",
          verifier: "资料核验岗"
        }
      ],
      history: [
        { time: "2026-07-17 11:05", actor: "负责人签发岗", action: "转入待发布", note: "仅批准作为项目原型说明。" }
      ]
    }
  ],
  submissions: [
    {
      id: "SUB-001",
      organization: "演示会员单位A",
      title: "企业信用风险管理培训活动材料",
      submittedAt: "2026-07-17 09:18",
      submitter: "会员联络人A",
      authorization: "partial",
      sourceCount: 2,
      status: "pending"
    },
    {
      id: "SUB-002",
      organization: "演示会员单位B",
      title: "信用建设案例与配图材料",
      submittedAt: "2026-07-16 16:42",
      submitter: "会员联络人B",
      authorization: "missing",
      sourceCount: 1,
      status: "pending"
    },
    {
      id: "SUB-003",
      organization: "演示会员单位C",
      title: "参与团体标准工作信息",
      submittedAt: "2026-07-16 10:05",
      submitter: "会员联络人C",
      authorization: "complete",
      sourceCount: 3,
      status: "converted"
    }
  ],
  experts: [
    { task: "信用修复政策资料专业复核", field: "社会信用与合规", expert: "专家候选A（演示）", conflict: "待披露", deadline: "2026-07-20", status: "待邀请" },
    { task: "文旅市场信用评级标准表述复核", field: "标准化与文旅市场", expert: "专家候选B（演示）", conflict: "无已知关系", deadline: "2026-07-22", status: "资料准备中" },
    { task: "会员案例数据口径复核", field: "企业信用管理", expert: "未分配", conflict: "未检查", deadline: "待定", status: "阻塞" }
  ],
  topics: [
    { title: "信用修复政策资料专题", description: "汇集法规、政策文本、办事入口与协会解读。", owner: "政策编辑岗", contentCount: 3, progress: "资料整理中", archive: "长期更新" },
    { title: "广东信用建设公开活动索引", description: "按地区、主题与来源归档公开活动资料。", owner: "内容编辑A", contentCount: 4, progress: "协会复核中", archive: "2026-12-31" },
    { title: "会员信用管理案例征集", description: "演示专题，真实征集规则尚未审定。", owner: "会员服务岗", contentCount: 1, progress: "规则待定", archive: "未设置" }
  ],
  media: [
    { name: "协会项目视觉示意图", type: "PNG 图片", rights: "项目生成素材", alt: "已填写", status: "可用于原型" },
    { name: "项目原型标识", type: "PNG 图片", rights: "非协会正式Logo", alt: "已填写", status: "仅限原型" },
    { name: "花都区活动图片", type: "待接入", rights: "未取得本站使用授权", alt: "未填写", status: "禁止发布" }
  ],
  activities: [
    { time: "2026-07-17 11:05", actor: "负责人签发岗", action: "转入待发布", object: "GDCA-2026-007", note: "仅批准作为项目原型说明。" },
    { time: "2026-07-17 10:20", actor: "内容编辑A", action: "提交业务复核", object: "GDCA-2026-001", note: "来源可打开，等待业务口径确认。" },
    { time: "2026-07-17 09:45", actor: "资料核验岗", action: "登记来源", object: "SRC-001", note: "花都区政府来源已核验。" },
    { time: "2026-07-16 17:40", actor: "业务复核岗", action: "提交负责人签发", object: "GDCA-2026-003", note: "政策解读边界已补充。" }
  ]
};

function cloneSeed() {
  return JSON.parse(JSON.stringify(seedState));
}

function loadState() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return cloneSeed();
    const parsed = JSON.parse(saved);
    if (!parsed || !Array.isArray(parsed.contents)) return cloneSeed();
    return parsed;
  } catch (error) {
    return cloneSeed();
  }
}

let state = loadState();
let activeContentId = null;
let activeReviewFilter = "all";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nowLabel() {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) + " " + pad(now.getHours()) + ":" + pad(now.getMinutes());
}

function persistState() {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function sourceScore(content) {
  if (!content.sources || !content.sources.length) return 0;
  const points = content.sources.reduce((total, source) => {
    if (source.status === "verified") return total + 100;
    if (source.status === "pending") return total + 45;
    return total + 20;
  }, 0);
  return Math.round(points / content.sources.length);
}

function statusPill(status) {
  return '<span class="status-pill status-' + escapeHtml(status) + '">' + escapeHtml(statusLabels[status] || status) + "</span>";
}

function riskPill(risk) {
  return '<span class="risk-pill risk-' + escapeHtml(risk) + '">' + escapeHtml(riskLabels[risk] || risk) + "风险</span>";
}

function sourcePill(score) {
  const className = score >= 100 ? "complete" : score > 0 ? "partial" : "empty";
  return '<span class="source-score ' + className + '">' + score + "%</span>";
}

function addAudit(action, object, note, actor = "内容编辑") {
  state.activities.unshift({ time: nowLabel(), actor, action, object, note });
  state.activities = state.activities.slice(0, 40);
}

function showToast(message, type = "success") {
  const region = $("#toastRegion");
  if (!region) return;
  const toast = document.createElement("div");
  toast.className = "toast" + (type === "error" ? " error" : "");
  toast.innerHTML = '<i class="bi ' + (type === "error" ? "bi-exclamation-circle" : "bi-check2-circle") + '" aria-hidden="true"></i><span>' + escapeHtml(message) + "</span>";
  region.append(toast);
  window.setTimeout(() => toast.remove(), 3200);
}

function findContent(id) {
  return state.contents.find((item) => item.id === id);
}
function renderDashboard() {
  const reviewCount = state.contents.filter((item) => reviewStatuses.includes(item.status)).length;
  const editingCount = state.contents.filter((item) => ["draft", "editing", "returned"].includes(item.status)).length;
  const sourceGapCount = state.contents.filter((item) => sourceScore(item) < 100).length;
  const submissionCount = state.submissions.filter((item) => item.status === "pending").length;

  $("#metricReview").textContent = reviewCount;
  $("#metricEditing").textContent = editingCount;
  $("#metricSources").textContent = sourceGapCount;
  $("#metricSubmissions").textContent = submissionCount;
  $("#navContentCount").textContent = state.contents.length;
  $("#navReviewCount").textContent = reviewCount;
  $("#navSubmissionCount").textContent = submissionCount;

  const queue = state.contents
    .filter((item) => item.status !== "published")
    .sort((a, b) => {
      const riskOrder = { high: 0, medium: 1, low: 2 };
      return riskOrder[a.risk] - riskOrder[b.risk] || a.updated.localeCompare(b.updated);
    })
    .slice(0, 6);

  $("#dashboardQueue").innerHTML = queue.map((item) =>
    "<tr>" +
      '<td class="title-cell"><strong>' + escapeHtml(item.title) + "</strong><small>" + escapeHtml(item.id) + "</small></td>" +
      "<td>" + statusPill(item.status) + "</td>" +
      "<td>" + escapeHtml(item.owner) + "</td>" +
      "<td>" + riskPill(item.risk) + "</td>" +
      '<td><button class="row-action" type="button" data-open-content="' + escapeHtml(item.id) + '">处理</button></td>' +
    "</tr>"
  ).join("");

  const risks = [];
  const noSource = state.contents.filter((item) => sourceScore(item) === 0);
  const partial = state.contents.filter((item) => sourceScore(item) > 0 && sourceScore(item) < 100);
  const highRisk = state.contents.filter((item) => item.risk === "high" && item.status !== "published");
  const missingSeo = state.contents.filter((item) => ["signoff", "scheduled"].includes(item.status) && (!item.seoTitle || !item.seoDescription));

  if (noSource.length) risks.push({ icon: "bi-link-45deg", title: "无来源稿件", detail: noSource.length + " 条内容没有来源记录", view: "sources" });
  if (partial.length) risks.push({ icon: "bi-shield-exclamation", title: "来源待核验", detail: partial.length + " 条内容存在待核验或过期来源", view: "sources" });
  if (highRisk.length) risks.push({ icon: "bi-exclamation-triangle", title: "高风险内容", detail: highRisk.length + " 条内容需要业务或负责人判断", view: "review" });
  if (missingSeo.length) risks.push({ icon: "bi-search", title: "发布字段缺失", detail: missingSeo.length + " 条待签发内容缺少 SEO 字段", view: "publish" });
  if (!risks.length) risks.push({ icon: "bi-check2-circle", title: "暂无阻塞项", detail: "当前演示数据未发现发布阻塞", view: "content" });

  $("#riskList").innerHTML = risks.slice(0, 4).map((risk) =>
    "<li><i class=\"bi " + risk.icon + "\" aria-hidden=\"true\"></i><span><strong>" + escapeHtml(risk.title) + "</strong><small>" + escapeHtml(risk.detail) +
    '</small></span><button type="button" data-view-link="' + escapeHtml(risk.view) + '">处理</button></li>'
  ).join("");

  $("#recentActivity").innerHTML = state.activities.slice(0, 5).map((item) =>
    "<li><span><strong>" + escapeHtml(item.actor + " · " + item.action) + "</strong><small>" + escapeHtml(item.object + " " + item.note) +
    "</small></span><time>" + escapeHtml(item.time.slice(5)) + "</time></li>"
  ).join("");
}

function currentContentFilters() {
  return {
    query: ($("#contentSearch")?.value || "").trim().toLowerCase(),
    status: $("#statusFilter")?.value || "",
    channel: $("#channelFilter")?.value || "",
    sourceGap: Boolean($("#sourceGapFilter")?.checked)
  };
}

function filteredContents() {
  const filters = currentContentFilters();
  return state.contents.filter((item) => {
    const haystack = (item.id + " " + item.title + " " + item.owner + " " + item.channel).toLowerCase();
    if (filters.query && !haystack.includes(filters.query)) return false;
    if (filters.status && item.status !== filters.status) return false;
    if (filters.channel && item.channel !== filters.channel) return false;
    if (filters.sourceGap && sourceScore(item) >= 100) return false;
    return true;
  });
}

function renderChannelFilter() {
  const select = $("#channelFilter");
  const editorSelect = $("#editorChannel");
  if (!select || !editorSelect) return;
  const previous = select.value;
  const editorPrevious = editorSelect.value;
  const channels = Array.from(new Set(state.contents.map((item) => item.channel))).sort();
  select.innerHTML = '<option value="">全部栏目</option>' + channels.map((channel) =>
    '<option value="' + escapeHtml(channel) + '">' + escapeHtml(channel) + "</option>"
  ).join("");
  editorSelect.innerHTML = channels.map((channel) =>
    '<option value="' + escapeHtml(channel) + '">' + escapeHtml(channel) + "</option>"
  ).join("");
  select.value = channels.includes(previous) ? previous : "";
  if (channels.includes(editorPrevious)) editorSelect.value = editorPrevious;
}

function renderContentTable() {
  const items = filteredContents();
  const tbody = $("#contentTableBody");
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="9"><div class="empty-state">没有符合当前筛选条件的内容。</div></td></tr>';
  } else {
    tbody.innerHTML = items.map((item) => {
      const score = sourceScore(item);
      return "<tr>" +
        '<td><input type="checkbox" data-select-content="' + escapeHtml(item.id) + '" aria-label="选择 ' + escapeHtml(item.title) + '"></td>' +
        '<td class="title-cell"><strong>' + escapeHtml(item.title) + "</strong><small>" + escapeHtml(item.id + " · " + item.type) + "</small></td>" +
        "<td>" + escapeHtml(item.channel) + "</td>" +
        "<td>" + statusPill(item.status) + "</td>" +
        "<td>" + sourcePill(score) + "</td>" +
        "<td>" + riskPill(item.risk) + "</td>" +
        "<td>" + escapeHtml(item.owner) + "</td>" +
        "<td>" + escapeHtml(item.updated.slice(5)) + "</td>" +
        '<td><button class="row-action" type="button" data-open-content="' + escapeHtml(item.id) + '">编辑</button></td>' +
      "</tr>";
    }).join("");
  }

  $("#contentSummary").textContent = "显示 " + items.length + " / " + state.contents.length + " 条";
}

function renderReviewTable() {
  let items = state.contents.filter((item) => reviewStatuses.includes(item.status));
  if (activeReviewFilter !== "all") items = items.filter((item) => item.status === activeReviewFilter);

  $("#reviewAllCount").textContent = state.contents.filter((item) => reviewStatuses.includes(item.status)).length;
  const tbody = $("#reviewTableBody");
  if (!items.length) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">当前审核队列为空。</div></td></tr>';
    return;
  }

  tbody.innerHTML = items.map((item) =>
    "<tr>" +
      '<td class="title-cell"><strong>' + escapeHtml(item.title) + "</strong><small>" + escapeHtml(item.id) + "</small></td>" +
      "<td>" + escapeHtml(item.owner) + "</td>" +
      "<td>" + statusPill(item.status) + "</td>" +
      "<td>" + sourcePill(sourceScore(item)) + "</td>" +
      "<td>" + escapeHtml(item.updated.slice(5)) + "</td>" +
      '<td><button class="row-action" type="button" data-open-content="' + escapeHtml(item.id) + '">打开审核</button></td>' +
    "</tr>"
  ).join("");
}

function flattenSources() {
  const rows = [];
  state.contents.forEach((content) => {
    (content.sources || []).forEach((source) => rows.push({ ...source, contentId: content.id, contentTitle: content.title }));
  });
  return rows;
}

function renderSources() {
  const sources = flattenSources();
  const verified = sources.filter((item) => item.status === "verified").length;
  const pending = sources.filter((item) => item.status === "pending").length;
  const expired = sources.filter((item) => item.status === "expired").length;
  const noSource = state.contents.filter((item) => !item.sources.length).length;

  $("#sourceSummary").innerHTML =
    "<div><span>来源记录</span><strong>" + sources.length + "</strong></div>" +
    "<div><span>已核验</span><strong>" + verified + "</strong></div>" +
    "<div><span>待核验 / 更新</span><strong>" + (pending + expired) + "</strong></div>" +
    "<div><span>无来源稿件</span><strong>" + noSource + "</strong></div>";

  const tbody = $("#sourceTableBody");
  if (!sources.length) {
    tbody.innerHTML = '<tr><td colspan="7"><div class="empty-state">暂无来源记录。</div></td></tr>';
    return;
  }

  tbody.innerHTML = sources.map((source) =>
    "<tr>" +
      '<td class="title-cell"><strong><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener">' + escapeHtml(source.name) +
      '</a></strong><small>' + escapeHtml(source.claim || "未填写主张映射") + "</small></td>" +
      '<td class="title-cell"><strong>' + escapeHtml(source.contentTitle) + "</strong><small>" + escapeHtml(source.contentId) + "</small></td>" +
      "<td>" + escapeHtml(sourceTypeLabels[source.type] || source.type) + "</td>" +
      "<td>" + escapeHtml(sourceStatusLabels[source.status] || source.status) + "</td>" +
      "<td>" + escapeHtml(source.fetchedAt || "未记录") + "</td>" +
      "<td>" + escapeHtml(source.verifier || "待分配") + "</td>" +
      '<td><button class="row-action" type="button" data-open-content="' + escapeHtml(source.contentId) + '">查看稿件</button></td>' +
    "</tr>"
  ).join("");
}
function renderSubmissions() {
  const container = $("#submissionList");
  container.innerHTML = state.submissions.map((item) => {
    const authLabel = item.authorization === "complete" ? "授权完整" : item.authorization === "partial" ? "授权待补" : "缺少授权";
    const status = item.status === "converted" ? '<span class="status-pill status-published">已转稿</span>' :
      item.status === "rejected" ? '<span class="status-pill status-returned">已退回</span>' :
      '<span class="status-pill status-first_review">待受理</span>';
    const actions = item.status === "pending"
      ? '<div class="submission-actions"><button class="row-action" type="button" data-submission-accept="' + escapeHtml(item.id) + '">转为稿件</button><button class="row-action" type="button" data-submission-reject="' + escapeHtml(item.id) + '">退回</button></div>'
      : '<div class="submission-actions">' + status + "</div>";
    return '<article class="submission-item"><div><h3>' + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.organization + " · " + item.id) +
      '</p></div><div class="submission-meta"><span>' + escapeHtml(authLabel) + "</span><small>" + item.sourceCount + " 份证明材料 · " +
      escapeHtml(item.submittedAt) + "</small></div>" + actions + "</article>";
  }).join("");
}

function renderExperts() {
  $("#expertTableBody").innerHTML = state.experts.map((item) =>
    "<tr><td class=\"title-cell\"><strong>" + escapeHtml(item.task) + "</strong></td><td>" + escapeHtml(item.field) + "</td><td>" +
    escapeHtml(item.expert) + "</td><td>" + escapeHtml(item.conflict) + "</td><td>" + escapeHtml(item.deadline) + "</td><td>" +
    escapeHtml(item.status) + "</td></tr>"
  ).join("");
}

function renderTopics() {
  $("#topicList").innerHTML = state.topics.map((item) =>
    '<article class="topic-item"><div><h3>' + escapeHtml(item.title) + "</h3><p>" + escapeHtml(item.description) +
    "</p></div><dl><dt>责任人</dt><dd>" + escapeHtml(item.owner) + "</dd></dl><dl><dt>内容数</dt><dd>" + item.contentCount +
    "</dd></dl><dl><dt>归档时间</dt><dd>" + escapeHtml(item.archive) + '</dd></dl><button class="row-action" type="button" data-action="demo-only">' +
    escapeHtml(item.progress) + "</button></article>"
  ).join("");
}

function renderMedia() {
  $("#mediaList").innerHTML = state.media.map((item) =>
    '<article class="media-item"><div class="media-thumb"><i class="bi bi-image" aria-hidden="true"></i></div><div><h3>' +
    escapeHtml(item.name) + "</h3><p>" + escapeHtml(item.type) + "</p></div><dl><dt>版权 / 授权</dt><dd>" + escapeHtml(item.rights) +
    "</dd></dl><dl><dt>替代文本</dt><dd>" + escapeHtml(item.alt) + '</dd></dl><button class="row-action" type="button" data-action="demo-only">' +
    escapeHtml(item.status) + "</button></article>"
  ).join("");
}

function renderPermissions() {
  const roles = [
    ["内容编辑", true, true, false, false, false, false],
    ["编辑初审", true, true, true, false, false, false],
    ["业务复核", true, false, false, true, false, false],
    ["负责人签发", true, false, false, false, true, false],
    ["会员报送人", true, true, false, false, false, false],
    ["系统管理员", true, false, false, false, false, true]
  ];
  $("#permissionTableBody").innerHTML = roles.map((role) =>
    "<tr><td><strong>" + escapeHtml(role[0]) + "</strong></td>" + role.slice(1).map((allowed) =>
      '<td><i class="bi ' + (allowed ? "bi-check-circle-fill permission-yes" : "bi-dash-circle permission-no") + '" aria-label="' +
      (allowed ? "允许" : "不允许") + '"></i></td>'
    ).join("") + "</tr>"
  ).join("");
}

function publishChecks(content) {
  if (!content) return [];
  return [
    { label: "标题清晰且长度适当", detail: "建议 10-35 个中文字符", pass: content.title.length >= 10 && content.title.length <= 50 },
    { label: "摘要可独立说明内容", detail: "建议至少 30 个字符", pass: content.summary.length >= 30 },
    { label: "来源证据完成核验", detail: "所有关键来源应处于已核验状态", pass: sourceScore(content) === 100 },
    { label: "发布主体与引用边界", detail: "不得把会员或外部资料混同为协会背书", pass: Boolean(content.publisher && content.boundary) },
    { label: "SEO 标题与描述", detail: "发布前补齐机器可读摘要", pass: Boolean(content.seoTitle && content.seoDescription) },
    { label: "Canonical URL", detail: "正式域名确认后填写唯一规范地址", pass: Boolean(content.canonical) },
    { label: "结构化数据类型", detail: "仅输出与真实页面内容一致的 Schema", pass: Boolean(content.schemaArticle && content.schemaBreadcrumb) }
  ];
}

function renderPublish() {
  const select = $("#publishContentSelect");
  const previous = select.value;
  const candidates = state.contents.filter((item) => ["signoff", "scheduled", "published"].includes(item.status));
  select.innerHTML = candidates.map((item) =>
    '<option value="' + escapeHtml(item.id) + '">' + escapeHtml(item.id + " · " + item.title) + "</option>"
  ).join("");
  if (candidates.some((item) => item.id === previous)) select.value = previous;
  const selected = findContent(select.value) || candidates[0] || state.contents[0];
  if (selected) select.value = selected.id;

  $("#publishSelectedTitle").textContent = selected ? selected.title : "未选择内容";
  const checks = publishChecks(selected);
  $("#publishChecklist").innerHTML = checks.map((check) => {
    const stateClass = check.pass ? "check-pass" : "check-fail";
    const icon = check.pass ? "bi-check-lg" : "bi-x-lg";
    return '<li><span class="check-icon ' + stateClass + '"><i class="bi ' + icon + '" aria-hidden="true"></i></span><span><strong>' +
      escapeHtml(check.label) + "</strong><small>" + escapeHtml(check.detail) + "</small></span><em>" + (check.pass ? "通过" : "待处理") + "</em></li>";
  }).join("");

  const schema = selected ? {
    "@context": "https://schema.org",
    "@type": selected.type === "协会动态" ? "NewsArticle" : "Article",
    headline: selected.title,
    description: selected.summary,
    author: { "@type": "Organization", name: selected.publisher },
    isBasedOn: selected.sources.map((source) => source.url),
    creativeWorkStatus: statusLabels[selected.status],
    inLanguage: "zh-CN"
  } : {};
  $("#schemaPreview").textContent = JSON.stringify(schema, null, 2);
}

function renderAudit() {
  $("#auditTableBody").innerHTML = state.activities.map((item) =>
    "<tr><td>" + escapeHtml(item.time) + "</td><td>" + escapeHtml(item.actor) + "</td><td>" + escapeHtml(item.action) +
    "</td><td>" + escapeHtml(item.object) + "</td><td>" + escapeHtml(item.note) + "</td></tr>"
  ).join("");
}

function renderSettings() {
  const settings = [
    { icon: "bi-building", title: "协会主体与品牌授权", detail: "核验登记信息、正式Logo、组织架构与内容责任人", state: "待协会确认", pass: false },
    { icon: "bi-globe2", title: "正式域名与备案", detail: "确定新站域名、ICP备案、公安备案与 canonical 规则", state: "待配置", pass: false },
    { icon: "bi-person-lock", title: "账号、角色与多因素认证", detail: "接入真实身份认证并落实审核角色分离", state: "未接入", pass: false },
    { icon: "bi-database", title: "内容数据库与对象存储", detail: "服务端持久化稿件、版本、来源与媒体授权", state: "未接入", pass: false },
    { icon: "bi-journal-check", title: "三审三校与更正制度", detail: "由协会审定角色、权限、签发和撤稿规则", state: "待审定", pass: false },
    { icon: "bi-broadcast-pin", title: "发布与监测", detail: "接入网站、微信、站点地图、索引与AI答案监测", state: "未接入", pass: false }
  ];
  $("#deploymentChecklist").innerHTML = settings.map((item) =>
    '<div class="setting-row"><i class="bi ' + item.icon + '" aria-hidden="true"></i><span><strong>' + escapeHtml(item.title) +
    "</strong><small>" + escapeHtml(item.detail) + '</small></span><span class="status-pill status-first_review">' + escapeHtml(item.state) + "</span></div>"
  ).join("");
}

function renderAll() {
  renderChannelFilter();
  renderDashboard();
  renderContentTable();
  renderReviewTable();
  renderSources();
  renderSubmissions();
  renderExperts();
  renderTopics();
  renderPublish();
  renderMedia();
  renderPermissions();
  renderAudit();
  renderSettings();
}
let activeDraft = null;
let sourceTargetId = null;

function nextContentId() {
  const numbers = state.contents.map((item) => Number(item.id.split("-").pop())).filter(Number.isFinite);
  const next = (numbers.length ? Math.max(...numbers) : 0) + 1;
  return "GDCA-2026-" + String(next).padStart(3, "0");
}

function createDraftContent() {
  return {
    id: nextContentId(),
    title: "",
    type: "协会动态",
    channel: state.contents[0]?.channel || "协会动态",
    status: "draft",
    owner: "内容编辑",
    updated: nowLabel(),
    risk: "low",
    summary: "",
    body: "",
    publisher: "广东省信用协会",
    boundary: "",
    seoTitle: "",
    seoDescription: "",
    canonical: "",
    keyword: "",
    schemaArticle: true,
    schemaBreadcrumb: true,
    schemaFaq: false,
    llmsInclude: false,
    sources: [],
    history: []
  };
}

function getActiveEditorContent() {
  return activeContentId ? findContent(activeContentId) : activeDraft;
}

function updateCharacterCounts() {
  $("#titleCount").textContent = $("#editorTitleInput").value.length;
  $("#summaryCount").textContent = $("#editorSummary").value.length;
  $("#seoTitleCount").textContent = $("#editorSeoTitle").value.length;
  $("#seoDescriptionCount").textContent = $("#editorSeoDescription").value.length;
}

function renderEditorSources(content) {
  const container = $("#editorSourceList");
  if (!content.sources.length) {
    container.innerHTML = '<div class="empty-state">尚未登记来源。草稿可以保存，但提交审核前必须补充至少一条可追溯来源。</div>';
    return;
  }

  container.innerHTML = content.sources.map((source) =>
    '<article class="editor-source-item"><i class="bi bi-link-45deg" aria-hidden="true"></i><div><strong>' + escapeHtml(source.name) +
    "</strong><small>" + escapeHtml((sourceTypeLabels[source.type] || source.type) + " · " + (sourceStatusLabels[source.status] || source.status)) +
    '</small><a href="' + escapeHtml(source.url) + '" target="_blank" rel="noopener">' + escapeHtml(source.url) +
    '</a></div><button class="row-action" type="button" data-remove-source="' + escapeHtml(source.id) + '">移除</button></article>'
  ).join("");
}

function renderEditorTimeline(content) {
  const history = content.history.length ? content.history : [
    { time: nowLabel(), actor: "内容编辑", action: "创建草稿", note: "尚未提交审核。" }
  ];
  $("#editorTimeline").innerHTML = history.map((item) =>
    "<li><strong>" + escapeHtml(item.actor + " · " + item.action) + "</strong><small>" + escapeHtml(item.time + " " + item.note) + "</small></li>"
  ).join("");
}

function workflowCopy(status) {
  const map = {
    draft: ["编辑初审", "提交后由初审角色检查事实、标题、授权与敏感信息。"],
    editing: ["编辑初审", "完成稿件与来源后提交初审。"],
    returned: ["编辑初审", "根据退回意见修改后重新提交。"],
    first_review: ["业务复核", "通过后由业务角色确认政策与专业口径。"],
    business_review: ["负责人签发", "通过后由负责人确认发布主体、渠道和时间。"],
    signoff: ["待发布", "签发后进入发布检查与排期。"],
    scheduled: ["发布校验", "检查URL、结构化数据、索引与更正入口。"],
    published: ["版本维护", "修改已发布内容必须生成新版本和更正记录。"]
  };
  return map[status] || map.draft;
}

function syncEditorActions(content) {
  const copy = workflowCopy(content.status);
  $("#workflowNext").textContent = copy[0];
  $("#workflowHint").textContent = copy[1];
  $("#editorStatus").className = "status-pill status-" + content.status;
  $("#editorStatus").textContent = statusLabels[content.status] || content.status;

  const submit = $("#submitReview");
  const labels = {
    draft: "提交初审",
    editing: "提交初审",
    returned: "重新提交初审",
    first_review: "通过并提交复核",
    business_review: "通过并提交签发",
    signoff: "签发并转待发布",
    scheduled: "运行发布检查",
    published: "保存新版本"
  };
  submit.textContent = labels[content.status] || "提交审核";
  $("#returnContent").hidden = !reviewStatuses.includes(content.status);
}

function openEditor(id = null) {
  activeDraft = id ? null : createDraftContent();
  activeContentId = id;
  const content = getActiveEditorContent();
  if (!content) return;

  $("#editorRecordId").textContent = content.id;
  $("#editorTitle").textContent = content.title || "新建稿件";
  $("#editorType").value = content.type;
  $("#editorChannel").value = content.channel;
  $("#editorTitleInput").value = content.title;
  $("#editorSummary").value = content.summary;
  $("#editorBody").value = content.body;
  $("#editorOwner").value = content.owner;
  $("#editorRisk").value = content.risk;
  $("#editorPublisher").value = content.publisher;
  $("#editorBoundary").value = content.boundary;
  $("#editorSeoTitle").value = content.seoTitle;
  $("#editorSeoDescription").value = content.seoDescription;
  $("#editorCanonical").value = content.canonical;
  $("#editorKeyword").value = content.keyword;
  $("#schemaArticle").checked = content.schemaArticle !== false;
  $("#schemaBreadcrumb").checked = content.schemaBreadcrumb !== false;
  $("#schemaFaq").checked = Boolean(content.schemaFaq);
  $("#llmsInclude").checked = Boolean(content.llmsInclude);
  $("#reviewNote").value = "";

  updateCharacterCounts();
  renderEditorSources(content);
  renderEditorTimeline(content);
  syncEditorActions(content);
  setEditorTab("content");

  $("#editorDrawer").classList.add("open");
  $("#editorDrawer").setAttribute("aria-hidden", "false");
  $("#drawerScrim").hidden = false;
  document.body.classList.add("drawer-open");
  window.setTimeout(() => $("#editorTitleInput").focus(), 150);
}

function closeEditor() {
  $("#editorDrawer").classList.remove("open");
  $("#editorDrawer").setAttribute("aria-hidden", "true");
  $("#drawerScrim").hidden = true;
  document.body.classList.remove("drawer-open");
  activeContentId = null;
  activeDraft = null;
}

function setEditorTab(name) {
  $$("[data-editor-tab]").forEach((button) => button.classList.toggle("active", button.dataset.editorTab === name));
  $$("[data-editor-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.editorPanel === name));
}

function collectEditorValues(content) {
  content.type = $("#editorType").value;
  content.channel = $("#editorChannel").value;
  content.title = $("#editorTitleInput").value.trim();
  content.summary = $("#editorSummary").value.trim();
  content.body = $("#editorBody").value.trim();
  content.owner = $("#editorOwner").value.trim() || "待分配";
  content.risk = $("#editorRisk").value;
  content.publisher = $("#editorPublisher").value;
  content.boundary = $("#editorBoundary").value.trim();
  content.seoTitle = $("#editorSeoTitle").value.trim();
  content.seoDescription = $("#editorSeoDescription").value.trim();
  content.canonical = $("#editorCanonical").value.trim();
  content.keyword = $("#editorKeyword").value.trim();
  content.schemaArticle = $("#schemaArticle").checked;
  content.schemaBreadcrumb = $("#schemaBreadcrumb").checked;
  content.schemaFaq = $("#schemaFaq").checked;
  content.llmsInclude = $("#llmsInclude").checked;
  content.updated = nowLabel();
  return content;
}

function ensureStored(content) {
  if (!activeContentId) {
    state.contents.unshift(content);
    activeContentId = content.id;
    activeDraft = null;
  }
}

function saveCurrentContent(showMessage = true) {
  const content = getActiveEditorContent();
  if (!content) return null;
  collectEditorValues(content);
  ensureStored(content);
  content.history.unshift({ time: nowLabel(), actor: "内容编辑", action: "保存稿件", note: "演示数据已写入本机浏览器存储。" });
  addAudit("保存稿件", content.id, content.title || "未命名稿件");
  persistState();
  renderAll();
  $("#editorRecordId").textContent = content.id;
  $("#editorTitle").textContent = content.title || "未命名稿件";
  $("#saveState").innerHTML = '<i class="bi bi-cloud-check" aria-hidden="true"></i> 已保存在本机';
  renderEditorTimeline(content);
  if (showMessage) showToast("稿件已保存到本机演示数据。");
  return content;
}

function validateForReview(content) {
  if (!content.title || content.title.length < 6) return "标题至少需要 6 个字符。";
  if (!content.summary || content.summary.length < 20) return "摘要至少需要 20 个字符。";
  if (!content.sources.length) return "提交审核前必须登记至少一条来源。";
  if (!content.boundary) return "请填写引用边界，说明内容可以怎样被使用。";
  return "";
}

function submitCurrentContent() {
  let content = getActiveEditorContent();
  if (!content) return;
  collectEditorValues(content);

  if (content.status === "scheduled") {
    ensureStored(content);
    persistState();
    closeEditor();
    switchView("publish");
    $("#publishContentSelect").value = content.id;
    renderPublish();
    showToast("已打开发布检查。");
    return;
  }

  const error = validateForReview(content);
  if (error) {
    showToast(error, "error");
    if (!content.sources.length || !content.boundary) setEditorTab("evidence");
    else setEditorTab("content");
    return;
  }

  ensureStored(content);
  const nextMap = {
    draft: "first_review",
    editing: "first_review",
    returned: "first_review",
    first_review: "business_review",
    business_review: "signoff",
    signoff: "scheduled",
    published: "editing"
  };
  const previous = content.status;
  content.status = nextMap[content.status] || "first_review";
  content.updated = nowLabel();
  const note = $("#reviewNote").value.trim() || "未填写额外备注。";
  content.history.unshift({
    time: content.updated,
    actor: "内容编辑",
    action: statusLabels[previous] + " → " + statusLabels[content.status],
    note
  });
  addAudit("流转稿件", content.id, statusLabels[previous] + " → " + statusLabels[content.status] + "；" + note);
  persistState();
  renderAll();
  syncEditorActions(content);
  renderEditorTimeline(content);
  showToast("稿件已流转到“" + statusLabels[content.status] + "”。");
}

function returnCurrentContent() {
  const content = getActiveEditorContent();
  if (!content || !reviewStatuses.includes(content.status)) return;
  const note = $("#reviewNote").value.trim();
  if (!note) {
    showToast("退回前请填写明确的修改意见。", "error");
    setEditorTab("workflow");
    $("#reviewNote").focus();
    return;
  }
  const previous = content.status;
  content.status = "returned";
  content.updated = nowLabel();
  content.history.unshift({ time: content.updated, actor: "审核角色", action: "退回修改", note });
  addAudit("退回稿件", content.id, statusLabels[previous] + "退回；" + note, "审核角色");
  persistState();
  renderAll();
  syncEditorActions(content);
  renderEditorTimeline(content);
  showToast("稿件已退回编辑。");
}

function openSourceDialog() {
  const content = getActiveEditorContent();
  sourceTargetId = content ? content.id : (state.contents[0]?.id || null);
  $("#sourceForm").reset();
  $("#sourceStatus").value = "verified";
  const dialog = $("#sourceDialog");
  if (typeof dialog.showModal === "function") dialog.showModal();
}

function addSourceFromDialog(event) {
  event.preventDefault();
  const form = $("#sourceForm");
  if (!form.reportValidity()) return;

  let content = getActiveEditorContent();
  if (!content && sourceTargetId) content = findContent(sourceTargetId);
  if (!content) {
    showToast("请先创建或打开一条稿件。", "error");
    return;
  }

  const source = {
    id: "SRC-" + String(Date.now()).slice(-6),
    name: $("#sourceName").value.trim(),
    url: $("#sourceUrl").value.trim(),
    type: $("#sourceType").value,
    status: $("#sourceStatus").value,
    claim: $("#sourceClaim").value.trim(),
    fetchedAt: nowLabel(),
    verifier: "内容编辑"
  };
  content.sources.push(source);
  content.updated = nowLabel();
  content.history.unshift({ time: content.updated, actor: "内容编辑", action: "登记来源", note: source.name });

  if (activeContentId) {
    addAudit("登记来源", source.id, content.id + " · " + source.name);
    persistState();
    renderAll();
  }
  renderEditorSources(content);
  renderEditorTimeline(content);
  $("#sourceDialog").close();
  showToast("来源已关联到 " + content.id + "。");
}
function ensureSelectOption(select, value) {
  if (!select || !value) return;
  const exists = Array.from(select.options).some((option) => option.value === value);
  if (!exists) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    select.append(option);
  }
}

function closeSidebar() {
  $("#sidebar").classList.remove("open");
  $("#sidebarScrim").hidden = true;
  $("#menuToggle").setAttribute("aria-expanded", "false");
  document.body.classList.remove("sidebar-open");
}

function openSidebar() {
  $("#sidebar").classList.add("open");
  $("#sidebarScrim").hidden = false;
  $("#menuToggle").setAttribute("aria-expanded", "true");
  document.body.classList.add("sidebar-open");
}

function switchView(view) {
  if (!viewLabels[view]) return;
  $$("[data-view]").forEach((section) => section.classList.toggle("active", section.dataset.view === view));
  $$("[data-view-target]").forEach((button) => button.classList.toggle("active", button.dataset.viewTarget === view));
  $("#currentViewLabel").textContent = viewLabels[view];
  if (window.innerWidth <= 900) closeSidebar();
  if (history.replaceState) history.replaceState(null, "", "#" + view);
  window.scrollTo({ top: 0, behavior: "smooth" });
  $("#workspace").focus({ preventScroll: true });
  if (view === "publish") renderPublish();
}

function convertSubmission(id) {
  const submission = state.submissions.find((item) => item.id === id);
  if (!submission || submission.status !== "pending") return;
  const content = createDraftContent();
  content.title = submission.title;
  content.type = "会员报送";
  content.channel = "会员资讯";
  content.status = "editing";
  content.owner = "会员内容岗";
  content.risk = submission.authorization === "complete" ? "medium" : "high";
  content.summary = submission.organization + "提交的演示材料，需完成主体、授权、事实证明和商业主张检查。";
  content.publisher = "会员单位报送";
  content.boundary = "会员材料不等于协会背书，正式发布前须核验主体授权与事实证明。";
  content.sources.push({
    id: "SRC-" + String(Date.now()).slice(-6),
    name: submission.organization + "报送材料（演示）",
    url: "https://example.invalid/submission/" + submission.id.toLowerCase(),
    type: "member",
    status: "pending",
    claim: "支持会员报送事实，材料内容尚未核验。",
    fetchedAt: nowLabel(),
    verifier: "待分配"
  });
  content.history.push({ time: nowLabel(), actor: "会员内容岗", action: "报送转稿", note: submission.id + " 已进入内容台账。" });
  state.contents.unshift(content);
  submission.status = "converted";
  addAudit("会员报送转稿", content.id, submission.id + " · " + submission.organization);
  persistState();
  renderAll();
  showToast("会员报送已转为稿件 " + content.id + "。");
  switchView("content");
  openEditor(content.id);
}

function rejectSubmission(id) {
  const submission = state.submissions.find((item) => item.id === id);
  if (!submission || submission.status !== "pending") return;
  submission.status = "rejected";
  addAudit("退回会员报送", submission.id, "材料授权或证明信息不完整。");
  persistState();
  renderAll();
  showToast("报送材料已标记退回。");
}

document.addEventListener("click", (event) => {
  const viewTarget = event.target.closest("[data-view-target]");
  if (viewTarget) {
    switchView(viewTarget.dataset.viewTarget);
    return;
  }

  const viewLink = event.target.closest("[data-view-link]");
  if (viewLink) {
    event.preventDefault();
    switchView(viewLink.dataset.viewLink);
    return;
  }

  const openButton = event.target.closest("[data-open-content]");
  if (openButton) {
    const content = findContent(openButton.dataset.openContent);
    if (content) {
      ensureSelectOption($("#editorType"), content.type);
      ensureSelectOption($("#editorPublisher"), content.publisher);
      openEditor(content.id);
    }
    return;
  }

  const actionButton = event.target.closest("[data-action]");
  if (actionButton) {
    const action = actionButton.dataset.action;
    if (action === "new-content") {
      openEditor();
      return;
    }
    if (action === "add-source") {
      openSourceDialog();
      return;
    }
    if (action === "demo-only") {
      showToast("此控件已保留为下一阶段接口位置，当前演示环境不会提交真实业务数据。");
      return;
    }
  }

  const editorTab = event.target.closest("[data-editor-tab]");
  if (editorTab) {
    setEditorTab(editorTab.dataset.editorTab);
    return;
  }

  const removeSourceButton = event.target.closest("[data-remove-source]");
  if (removeSourceButton) {
    const content = getActiveEditorContent();
    if (!content) return;
    const index = content.sources.findIndex((source) => source.id === removeSourceButton.dataset.removeSource);
    if (index >= 0) {
      const removed = content.sources.splice(index, 1)[0];
      content.history.unshift({ time: nowLabel(), actor: "内容编辑", action: "移除来源", note: removed.name });
      if (activeContentId) {
        addAudit("移除来源", removed.id, content.id + " · " + removed.name);
        persistState();
        renderAll();
      }
      renderEditorSources(content);
      renderEditorTimeline(content);
      showToast("来源已从当前稿件移除。");
    }
    return;
  }

  const acceptButton = event.target.closest("[data-submission-accept]");
  if (acceptButton) {
    convertSubmission(acceptButton.dataset.submissionAccept);
    return;
  }

  const rejectButton = event.target.closest("[data-submission-reject]");
  if (rejectButton) {
    rejectSubmission(rejectButton.dataset.submissionReject);
  }
});

$$("[data-review-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeReviewFilter = button.dataset.reviewFilter;
    $$("[data-review-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderReviewTable();
  });
});

["contentSearch", "statusFilter", "channelFilter", "sourceGapFilter"].forEach((id) => {
  $("#" + id)?.addEventListener(id === "contentSearch" ? "input" : "change", renderContentTable);
});

$("#selectAll")?.addEventListener("change", (event) => {
  $$("[data-select-content]").forEach((checkbox) => {
    checkbox.checked = event.target.checked;
  });
});

$("#topSearch")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = $("#topSearchInput").value.trim();
  if (!query) {
    $("#topSearchInput").focus();
    return;
  }
  switchView("content");
  $("#contentSearch").value = query;
  renderContentTable();
});

$("#menuToggle")?.addEventListener("click", () => {
  const isOpen = $("#sidebar").classList.contains("open");
  if (isOpen) closeSidebar();
  else openSidebar();
});

$("#sidebarScrim")?.addEventListener("click", closeSidebar);
$("#closeEditor")?.addEventListener("click", closeEditor);
$("#drawerScrim")?.addEventListener("click", closeEditor);
$("#saveDraft")?.addEventListener("click", () => saveCurrentContent());
$("#submitReview")?.addEventListener("click", submitCurrentContent);
$("#returnContent")?.addEventListener("click", returnCurrentContent);
$("#sourceForm")?.addEventListener("submit", addSourceFromDialog);
$$('#sourceForm [value="cancel"]').forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    $("#sourceDialog").close();
  });
});

["editorTitleInput", "editorSummary", "editorSeoTitle", "editorSeoDescription"].forEach((id) => {
  $("#" + id)?.addEventListener("input", updateCharacterCounts);
});

$("#editorForm")?.addEventListener("input", () => {
  $("#saveState").innerHTML = '<i class="bi bi-cloud-slash" aria-hidden="true"></i> 有未保存修改';
});

$("#publishContentSelect")?.addEventListener("change", renderPublish);
$("#runPublishCheck")?.addEventListener("click", () => {
  renderPublish();
  const content = findContent($("#publishContentSelect").value);
  const failures = publishChecks(content).filter((item) => !item.pass).length;
  showToast(failures ? "检查完成，仍有 " + failures + " 项需要处理。" : "发布检查全部通过。", failures ? "error" : "success");
});

$("#notificationButton")?.addEventListener("click", () => {
  const reviewCount = state.contents.filter((item) => reviewStatuses.includes(item.status)).length;
  showToast("当前有 " + reviewCount + " 条审核待办；演示环境不会发送真实通知。");
});

$("#resetDemo")?.addEventListener("click", () => {
  const confirmed = window.confirm("确定重置 CMS 演示数据吗？本机浏览器中的修改将被清除。");
  if (!confirmed) return;
  state = cloneSeed();
  persistState();
  renderAll();
  switchView("dashboard");
  showToast("演示数据已重置。");
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if ($("#sourceDialog")?.open) {
    $("#sourceDialog").close();
    return;
  }
  if ($("#editorDrawer").classList.contains("open")) {
    closeEditor();
    return;
  }
  if ($("#sidebar").classList.contains("open")) closeSidebar();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeSidebar();
});

renderAll();
const initialView = window.location.hash.slice(1);
switchView(viewLabels[initialView] ? initialView : "dashboard");
document.body.dataset.ready = "true";