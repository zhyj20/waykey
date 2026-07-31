(function () {
  "use strict";

  window.TRUSTSITE_CONFIG = Object.freeze({
    projectName: "广东省信用协会可信资讯中心",
    mode: "client-preview",
    publicBaseUrl: "https://zhyj20.github.io/waykey/",
    indexingEnabled: false,
    indexingReason: "协会正式授权、域名与备案信息尚未完成确认",
    cms: Object.freeze({
      adapter: "localStorage",
      productionReady: false,
      publicStorageKey: "gdca-public-content-v2"
    })
  });
})();

