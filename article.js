(function () {
  "use strict";

  const store = window.TrustContentStore;
  const params = new URLSearchParams(window.location.search);
  const article = store?.getById(params.get("id") || "");
  const layout = document.querySelector("#articleLayout");
  const notFound = document.querySelector("#articleNotFound");

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node) node.textContent = value || "";
  }

  function formatDate(value) {
    if (!value) return "未标注";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" }).format(date);
  }

  function renderMeta(item) {
    const meta = document.querySelector("#articleMeta");
    const entries = [
      ["bi-building", "内容整理：" + item.publisher],
      ["bi-calendar3", "资料更新：" + formatDate(item.updatedAt)],
      ["bi-file-earmark-check", "版本：" + item.version],
      ["bi-shield-check", item.reviewStatus]
    ];
    entries.forEach(([icon, label]) => {
      const span = document.createElement("span");
      const i = document.createElement("i");
      i.className = "bi " + icon;
      i.setAttribute("aria-hidden", "true");
      span.append(i, document.createTextNode(label));
      meta.append(span);
    });
  }

  function renderBody(item) {
    const body = document.querySelector("#articleBody");
    String(item.body || item.summary || "")
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .forEach((paragraph) => {
        const p = document.createElement("p");
        p.textContent = paragraph;
        body.append(p);
      });
  }

  function renderSources(item) {
    const list = document.querySelector("#articleSources");
    (item.sources || []).forEach((source) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = source.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = source.name || "查看原始来源";
      const claim = document.createElement("p");
      claim.textContent = source.claim || "该来源用于支持本页基础事实。";
      li.append(link, claim);
      list.append(li);
    });
  }

  function renderRelated(item) {
    const list = document.querySelector("#relatedList");
    store.getPublished().filter((candidate) => candidate.id !== item.id).slice(0, 4).forEach((candidate) => {
      const link = document.createElement("a");
      link.href = store.articleUrl(candidate.id);
      const title = document.createElement("strong");
      title.textContent = candidate.title;
      const meta = document.createElement("span");
      meta.textContent = candidate.channel + " · " + formatDate(candidate.updatedAt);
      link.append(title, meta);
      list.append(link);
    });
  }

  function setStructuredData(item) {
    const canonical = item.canonical || store.articleUrl(item.id, true);
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.href = canonical;
    document.title = item.title + " | 广东省信用协会";
    document.querySelector('meta[name="description"]')?.setAttribute("content", item.summary);

    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": item.type === "协会动态" ? "NewsArticle" : "Article",
          headline: item.title,
          description: item.summary,
          datePublished: item.publishedAt,
          dateModified: item.updatedAt,
          inLanguage: "zh-CN",
          mainEntityOfPage: canonical,
          author: { "@type": "Organization", name: item.publisher },
          publisher: { "@type": "Organization", name: "广东省信用协会" },
          isBasedOn: (item.sources || []).map((source) => source.url),
          keywords: item.keywords
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "首页", item: window.location.origin + window.location.pathname.replace("article.html", "") },
            { "@type": "ListItem", position: 2, name: item.channel },
            { "@type": "ListItem", position: 3, name: item.title, item: canonical }
          ]
        }
      ]
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.append(script);
  }

  if (!article) {
    if (layout) layout.hidden = true;
    if (notFound) notFound.hidden = false;
    document.title = "未找到资料 | 广东省信用协会";
    document.body.dataset.ready = "true";
    return;
  }

  setText("#breadcrumbChannel", article.channel);
  setText("#articleChannel", article.channel + " · 公开资料");
  setText("#articleTitle", article.title);
  setText("#articleSummary", article.summary);
  setText("#dossierPublisher", article.publisher);
  setText("#dossierReview", article.reviewStatus);
  setText("#dossierVersion", article.version);
  setText("#dossierUpdated", formatDate(article.updatedAt));
  setText("#dossierBoundary", article.boundary);
  renderMeta(article);
  renderBody(article);
  renderSources(article);
  renderRelated(article);
  setStructuredData(article);
  document.body.dataset.ready = "true";
})();

