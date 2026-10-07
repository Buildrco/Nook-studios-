(function () {
  "use strict";

  if (window.__nookUnifiedFooterInstalled) return;
  window.__nookUnifiedFooterInstalled = true;

  var helpUrl = "https://wa.me/233557696771?text=" +
    encodeURIComponent("Hi Nook Studios, I need help with [briefly describe what you need help with].");

  function replaceBrandLogos() {
    document.querySelectorAll("img").forEach(function (image) {
      var source = image.getAttribute("src") || "";
      if (!/(^|\/)(logo\.svg|logo\.png)$/.test(source)) return;
      image.setAttribute("src", "/images/nook-studios-logo.png");
      image.setAttribute("alt", "Nook Studios");
      image.style.objectFit = "contain";
    });
    document.querySelectorAll('link[rel~="icon"]').forEach(function (icon) {
      icon.href = "/images/nook-studios-logo.png";
      icon.type = "image/png";
    });
  }

  function installFooter() {
    var footers = Array.prototype.slice.call(document.querySelectorAll("footer"));
    if (!footers.length) return;
    var footer = footers[0];
    var copyright = "© 2026 Nook Studios. All rights reserved.";
    if (footer.getAttribute("data-nook-unified-footer") === "true" &&
        footer.textContent.indexOf(copyright) !== -1) {
      footers.slice(1).forEach(function (extra) { extra.remove(); });
      return;
    }
    footers.slice(1).forEach(function (extra) { extra.remove(); });
    footer.className = "nook-site-footer";
    footer.setAttribute("data-nook-unified-footer", "true");
    footer.setAttribute("aria-label", "Nook Studios footer");
    footer.innerHTML =
      '<div class="nook-footer-inner">' +
        '<div class="nook-footer-columns">' +
          '<a class="nook-footer-brand" href="/" aria-label="Nook Studios home">' +
            '<img src="/images/nook-studios-logo.png" alt="Nook Studios logo">' +
          '</a>' +
          '<nav class="nook-footer-nav" aria-label="Nook Studios">' +
            '<h2>Nook Studios</h2><a href="/">Nook Studios</a>' +
            '<a href="/about/">About us</a>' +
            '<a href="' + helpUrl + '" target="_blank" rel="noopener noreferrer">Help center</a>' +
          '</nav>' +
          '<div class="nook-footer-contact">' +
            '<h2>Contact us</h2>' +
            '<a href="mailto:nookstudiosofficial@gmail.com">nookstudiosofficial@gmail.com</a>' +
          '</div>' +
          '<nav class="nook-footer-social" aria-label="Social media">' +
            '<h2>Follow us</h2>' +
            '<a href="https://twitter.com/usedivest" target="_blank" rel="noopener noreferrer">X</a>' +
            '<a href="https://youtube.com/@Use_Divest" target="_blank" rel="noopener noreferrer">YouTube</a>' +
            '<a href="https://www.instagram.com/use_divestapp" target="_blank" rel="noopener noreferrer">Instagram</a>' +
            '<a href="https://www.linkedin.com/company/divest" target="_blank" rel="noopener noreferrer">LinkedIn</a>' +
          '</nav>' +
          '<nav class="nook-footer-legal" aria-label="Legal">' +
            '<h2>Information</h2><a href="/privacy-policy">Privacy Policy</a>' +
            '<a href="/terms-of-use">Terms of Use</a>' +
          '</nav>' +
        '</div>' +
        '<div class="nook-footer-copyright">' + copyright + '</div>' +
      '</div>';
  }

  function start() {
    if (!document.body) return;
    if (!document.getElementById("nook-unified-footer-styles")) {
      var style = document.createElement("style");
      style.id = "nook-unified-footer-styles";
      style.textContent =
        ".nook-site-footer{display:block!important;width:100%!important;margin:0!important;padding:64px 24px 24px!important;background:#2873a2!important;color:#fff!important;border:0!important;font:400 14px/1.55 Arial,sans-serif!important;box-sizing:border-box!important}" +
        ".nook-site-footer *{box-sizing:border-box!important}" +
        ".nook-footer-inner{width:min(1220px,100%);margin:0 auto}" +
        ".nook-footer-columns{display:grid;grid-template-columns:minmax(150px,1.1fr) repeat(4,minmax(130px,1fr));gap:28px;padding-bottom:40px}" +
        ".nook-footer-brand{display:inline-flex;align-items:flex-start;max-width:220px}" +
        ".nook-footer-brand img{display:block;width:210px;height:95px;object-fit:contain;object-position:left center}" +
        ".nook-site-footer h2{margin:0 0 14px;color:#fff!important;font:700 15px/1.3 Arial,sans-serif!important}" +
        ".nook-site-footer a{color:#fff!important;text-decoration:none!important;opacity:.92}" +
        ".nook-site-footer a:hover,.nook-site-footer a:focus-visible{opacity:1;text-decoration:underline!important}" +
        ".nook-footer-nav,.nook-footer-contact,.nook-footer-social,.nook-footer-legal{display:flex;flex-direction:column;align-items:flex-start;gap:10px}" +
        ".nook-footer-copyright{padding-top:18px;border-top:1px solid rgba(255,255,255,.28);font-size:13px}" +
        "@media(max-width:720px){.nook-site-footer{padding:44px 20px 20px!important}.nook-footer-columns{grid-template-columns:repeat(2,minmax(0,1fr));gap:30px 20px}.nook-footer-brand{grid-column:1/-1}.nook-footer-brand img{width:185px;height:82px}}" +
        "@media(max-width:420px){.nook-footer-columns{grid-template-columns:1fr;gap:26px}.nook-footer-brand{grid-column:auto}}";
      document.head.appendChild(style);
    }
    replaceBrandLogos();
    installFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
  if (document.body) {
    new MutationObserver(start).observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      new MutationObserver(start).observe(document.body, { childList: true, subtree: true });
    }, { once: true });
  }
})();
