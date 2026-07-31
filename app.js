const menuButton = document.querySelector(".menu-button");
const primaryNav = document.querySelector("#primaryNav");
const contrastToggle = document.querySelector("#contrastToggle");
const serviceDialog = document.querySelector("#serviceDialog");
const serviceDialogTitle = document.querySelector("#serviceDialogTitle");
const serviceDialogText = document.querySelector("#serviceDialogText");
const dialogClose = document.querySelector("#dialogClose");
const dialogConfirm = document.querySelector("#dialogConfirm");
const recordDialog = document.querySelector("#recordDialog");
const recordDialogTitle = document.querySelector("#recordDialogTitle");
const recordDialogSummary = document.querySelector("#recordDialogSummary");
const recordStatus = document.querySelector("#recordStatus");
const recordPublisher = document.querySelector("#recordPublisher");
const recordSourceLink = document.querySelector("#recordSourceLink");
const recordReview = document.querySelector("#recordReview");
const recordVersion = document.querySelector("#recordVersion");
const recordBoundary = document.querySelector("#recordBoundary");
const recordDialogClose = document.querySelector("#recordDialogClose");
const recordDialogConfirm = document.querySelector("#recordDialogConfirm");
const globalSearch = document.querySelector("#globalSearch");
const globalSearchInput = document.querySelector("#globalSearchInput");
const searchDialog = document.querySelector("#searchDialog");
const searchDialogClose = document.querySelector("#searchDialogClose");
const searchSummary = document.querySelector("#searchSummary");
const searchResults = document.querySelector("#searchResults");
const newsTabs = Array.from(document.querySelectorAll("[data-news-tab]"));
const newsPanels = Array.from(document.querySelectorAll("[data-news-panel]"));
const slideButtons = Array.from(document.querySelectorAll("[data-slide]"));
const featureTitle = document.querySelector("#featureTitle");
const featureSummary = document.querySelector("#featureSummary");
const publishedFeed = document.querySelector("#publishedFeed");
const contentStore = window.TrustContentStore || null;
const dialogTriggers = new WeakMap();

const serviceDescriptions = {
  "英文版": "英文版内容正在整理，将在完成翻译与校对后开放。"
};

const sources = {
  official: { name: "广东省信用协会官网", url: "https://www.gd-credit.com/" },
  huadu: { name: "广州市花都区人民政府", url: "https://www.huadu.gov.cn/zfxxgkml/gzshdqfzhggj/content/post_10899951.html" },
  jiangmen: { name: "江门市文化广电旅游体育局", url: "https://www.jiangmen.gov.cn/bmpd/jmswhgdlytyj/zwgk/gzdt/content/post_3267467.html" },
  yuexiu: { name: "广州市越秀区人民政府", url: "https://www.yuexiu.gov.cn/tzyx/xyyx/xygg/cxwhxc/content/post_10289451.html" },
  baiyun: { name: "信用广州网", url: "https://credit.gz.gov.cn/csjswlxn/gzdt/content/post_10619892.html" },
  guangzhou: { name: "信用广州网", url: "https://credit.gz.gov.cn/csjswlxn/gzdt/content/spost_10577881.html" },
  regulation: { name: "《广东省社会信用条例》公开文本", url: "https://www.zhanjiang.gov.cn/zjsfw/bmdh/gyxxhj/zwgk/tzgg/content/post_2056164.html" }
};

const publicRecord = (label, summary, source) => ({
  label,
  status: "公开资料",
  publisher: "本页依据公开来源整理",
  summary,
  source,
  review: "已登记原始来源",
  version: "以原始来源发布日期为准",
  boundary: "转载或引用时请核对并优先使用原始来源"
});

const draftRecord = (label, summary) => ({
  label,
  status: "网页资料",
  publisher: "广东省信用协会资讯页面",
  summary,
  source: sources.official,
  review: "请以协会官网公布信息为准",
  version: "网页资料",
  boundary: "引用前请核对协会官网原文"
});

const recordDescriptions = {
  "huadu-credit-event": publicRecord(
    "花都区社会信用体系建设宣讲活动",
    "花都区政府公开报道介绍了活动主题、参与单位以及信用修复、企业合规经营等相关内容。",
    sources.huadu
  ),
  "culture-tourism-standard": publicRecord(
    "文旅市场企业信用评级业务规范调研",
    "江门市相关部门公开报道介绍了文旅市场企业信用评级业务规范团体标准调研活动。",
    sources.jiangmen
  ),
  "yuexiu-credit-exchange": publicRecord(
    "越秀区中小企业信用能力交流活动",
    "越秀区政府公开报道介绍了中小企业信用管理与能力提升交流活动。",
    sources.yuexiu
  ),
  "baiyun-credit-training": publicRecord(
    "信用赋能企业高质量发展培训",
    "信用广州网公开资料介绍了企业信用建设与风险管理相关培训活动。",
    sources.baiyun
  ),
  "guangzhou-credit-event": publicRecord(
    "广州信用建设活动资料",
    "信用广州网公开资料记录了企业信用建设与风险管理相关交流内容。",
    sources.guangzhou
  ),
  "gd-credit-regulation": publicRecord(
    "《广东省社会信用条例》资料索引",
    "本页提供条例公开文本入口，具体条文和施行信息以权威原文为准。",
    sources.regulation
  ),
  "credit-repair-policy": publicRecord(
    "信用修复政策与办事资料",
    "本页汇集信用修复相关公开资料入口，具体办理要求以主管部门公布内容为准。",
    sources.huadu
  ),
  "research-report": publicRecord(
    "《广东省社会信用条例》",
    "本页提供条例公开文本入口，具体条文和施行信息以权威原文为准。",
    sources.regulation
  ),
  "benchmark-report": publicRecord(
    "文旅市场企业信用评级业务规范调研",
    "江门市相关部门公开报道介绍了相关团体标准调研活动。",
    sources.jiangmen
  ),
  "technology-report": publicRecord(
    "企业信用风险管理培训资料",
    "信用广州网公开资料介绍了企业信用建设与风险管理相关培训活动。",
    sources.baiyun
  ),
  "whitepaper": publicRecord(
    "信用修复政策资料",
    "本页汇集信用修复相关公开资料入口，具体办理要求以主管部门公布内容为准。",
    sources.huadu
  )
};

const featureSlides = [
  {
    title: "信用资讯、政策服务与行业交流",
    summary: "关注社会信用体系建设，服务会员与行业高质量发展"
  },
  {
    title: "聚焦信用政策与企业信用管理",
    summary: "汇集政策法规、信用修复、风险管理与办事资料"
  },
  {
    title: "连接标准研究、专家智库与活动培训",
    summary: "持续发布协会动态和广东信用领域公开信息"
  }
];

function openDialog(dialog, trigger) {
  if (!dialog || typeof dialog.showModal !== "function" || dialog.open) return;
  dialogTriggers.set(dialog, trigger || document.activeElement);
  dialog.showModal();
  window.requestAnimationFrame(() => dialog.querySelector(".dialog-close")?.focus());
}

function closeDialog(dialog) {
  if (dialog?.open) dialog.close();
}

[serviceDialog, recordDialog, searchDialog].forEach((dialog) => {
  dialog?.addEventListener("close", () => {
    const trigger = dialogTriggers.get(dialog);
    if (trigger instanceof HTMLElement && document.contains(trigger)) trigger.focus();
    dialogTriggers.delete(dialog);
  });
});

function closeMenu({ restoreFocus = false } = {}) {
  const wasOpen = primaryNav?.classList.contains("open");
  primaryNav?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  if (wasOpen && restoreFocus) menuButton?.focus();
}

menuButton?.addEventListener("click", () => {
  const isOpen = primaryNav?.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(Boolean(isOpen)));
  document.body.classList.toggle("menu-open", Boolean(isOpen));
  if (isOpen) window.requestAnimationFrame(() => primaryNav?.querySelector("a")?.focus());
});

primaryNav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) closeMenu();
});

document.addEventListener("click", (event) => {
  if (!primaryNav?.classList.contains("open")) return;
  const target = event.target;
  if (target instanceof Node && !primaryNav.contains(target) && !menuButton?.contains(target)) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && primaryNav?.classList.contains("open")) {
    event.preventDefault();
    closeMenu({ restoreFocus: true });
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) closeMenu();
});

contrastToggle?.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("high-contrast");
  contrastToggle.setAttribute("aria-pressed", String(enabled));
});

document.querySelectorAll("[data-service]").forEach((button) => {
  button.addEventListener("click", () => {
    const service = button.getAttribute("data-service") || "在线服务";
    if (serviceDialogTitle) serviceDialogTitle.textContent = service;
    if (serviceDialogText) serviceDialogText.textContent = serviceDescriptions[service] || "该服务暂未在本页面开放，请通过协会现有官网查询。";
    openDialog(serviceDialog, button);
  });
});

dialogClose?.addEventListener("click", () => closeDialog(serviceDialog));
dialogConfirm?.addEventListener("click", () => closeDialog(serviceDialog));

function openRecord(recordId, trigger) {
  const fallback = draftRecord(
    trigger?.textContent?.trim().replace(/\s+/g, " ") || "网页资料",
    "请通过协会官网或页面标注的原始来源核对完整信息。"
  );
  const record = recordDescriptions[recordId] || fallback;

  if (recordDialogTitle) recordDialogTitle.textContent = "资料说明：" + record.label;
  if (recordDialogSummary) recordDialogSummary.textContent = record.summary;
  if (recordStatus) recordStatus.textContent = record.status;
  if (recordPublisher) recordPublisher.textContent = record.publisher;
  if (recordReview) recordReview.textContent = record.review;
  if (recordVersion) recordVersion.textContent = record.version;
  if (recordBoundary) recordBoundary.textContent = record.boundary;

  if (recordSourceLink) {
    if (record.source) {
      recordSourceLink.textContent = record.source.name;
      recordSourceLink.href = record.source.url;
      recordSourceLink.removeAttribute("aria-disabled");
    } else {
      recordSourceLink.textContent = "广东省信用协会官网";
      recordSourceLink.href = "https://www.gd-credit.com/";
      recordSourceLink.setAttribute("aria-disabled", "true");
    }
  }

  openDialog(recordDialog, trigger);
}

document.querySelectorAll("[data-record]").forEach((button) => {
  button.addEventListener("click", () => {
    const recordId = button.getAttribute("data-record");
    if (contentStore?.getById(recordId)) {
      window.location.href = contentStore.articleUrl(recordId, false);
      return;
    }
    openRecord(recordId, button);
  });
});

recordDialogClose?.addEventListener("click", () => closeDialog(recordDialog));
recordDialogConfirm?.addEventListener("click", () => closeDialog(recordDialog));

function activateNewsTab(tab, focusTab = false) {
  const selected = tab.getAttribute("data-news-tab");
  newsTabs.forEach((item) => {
    const active = item === tab;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    item.setAttribute("tabindex", active ? "0" : "-1");
  });
  newsPanels.forEach((panel) => {
    panel.hidden = panel.getAttribute("data-news-panel") !== selected;
  });
  if (focusTab) tab.focus();
}

newsTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateNewsTab(tab));
  tab.addEventListener("keydown", (event) => {
    let nextIndex = null;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % newsTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + newsTabs.length) % newsTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = newsTabs.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    activateNewsTab(newsTabs[nextIndex], true);
  });
});

slideButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const slide = featureSlides[Number(button.getAttribute("data-slide") || 0)];
    if (!slide) return;
    slideButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    if (featureTitle) featureTitle.textContent = slide.title;
    if (featureSummary) featureSummary.textContent = slide.summary;
  });
});

function renderPublishedFeed() {
  if (!publishedFeed || !contentStore) return;
  const items = contentStore.getPublished().slice(0, 4);
  publishedFeed.replaceChildren();

  items.forEach((item) => {
    const link = document.createElement("a");
    link.className = "release-card searchable";
    link.href = contentStore.articleUrl(item.id, false);
    link.dataset.search = [item.title, item.summary, item.channel, ...(item.keywords || [])].join(" ");

    const meta = document.createElement("div");
    meta.className = "release-card-meta";
    const channel = document.createElement("span");
    channel.textContent = item.channel || item.type || "资讯";
    const date = document.createElement("time");
    date.dateTime = item.publishedAt || "";
    date.textContent = item.publishedAt || "待更新";
    meta.append(channel, date);

    const title = document.createElement("h3");
    title.textContent = item.title;
    const summary = document.createElement("p");
    summary.textContent = item.summary;

    const footer = document.createElement("div");
    footer.className = "release-card-footer";
    const source = document.createElement("span");
    source.textContent = (item.sources?.length || 0) + " 条来源记录";
    const action = document.createElement("span");
    action.textContent = "查看全文";
    footer.append(source, action);

    link.append(meta, title, summary, footer);
    publishedFeed.append(link);
  });
}

function collectSearchResults(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  const matches = [];
  const seen = new Set();
  document.querySelectorAll(".searchable").forEach((item) => {
    const searchText = ((item.getAttribute("data-search") || "") + " " + (item.textContent || "")).toLowerCase();
    if (!searchText.includes(normalizedQuery)) return;

    const control = item.matches("a, button[data-record]") ? item : item.querySelector("a, button[data-record]");
    const heading = item.querySelector("h1, h2, h3");
    const title = (heading?.textContent || control?.textContent || item.textContent || "").trim().replace(/\s+/g, " ");
    if (!title || seen.has(title)) return;

    seen.add(title);
    matches.push({
      title,
      href: control instanceof HTMLAnchorElement ? control.getAttribute("href") : null,
      recordId: control instanceof HTMLButtonElement ? control.getAttribute("data-record") : null
    });
  });
  return matches.slice(0, 8);
}

globalSearch?.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = globalSearchInput?.value.trim() || "";
  if (!query) {
    globalSearchInput?.focus();
    return;
  }

  const matches = collectSearchResults(query);
  if (searchSummary) {
    searchSummary.textContent = matches.length
      ? "站内搜索：关键词“" + query + "”找到 " + matches.length + " 条内容。"
      : "站内搜索：关键词“" + query + "”暂无匹配内容。";
  }

  if (searchResults) {
    searchResults.replaceChildren();
    if (!matches.length) {
      const empty = document.createElement("li");
      empty.className = "search-empty";
      empty.textContent = "可尝试搜索“信用”“修复”“会员”“政策”或“标准”。";
      searchResults.append(empty);
    } else {
      matches.forEach((match) => {
        const item = document.createElement("li");
        const control = match.recordId ? document.createElement("button") : document.createElement("a");
        control.textContent = match.title;
        if (control instanceof HTMLAnchorElement) {
          control.href = match.href || "#main-content";
          control.addEventListener("click", () => closeDialog(searchDialog));
        } else {
          control.type = "button";
          control.addEventListener("click", () => {
            closeDialog(searchDialog);
            window.setTimeout(() => openRecord(match.recordId, globalSearchInput), 0);
          });
        }
        item.append(control);
        searchResults.append(item);
      });
    }
  }
  openDialog(searchDialog, globalSearchInput);
});

searchDialogClose?.addEventListener("click", () => closeDialog(searchDialog));

[serviceDialog, recordDialog, searchDialog].forEach((dialog) => {
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
});

renderPublishedFeed();
window.addEventListener("trustsource:content-change", renderPublishedFeed);
window.addEventListener("storage", (event) => {
  if (event.key === contentStore?.storageKey) renderPublishedFeed();
});

document.body.dataset.ready = "true";

