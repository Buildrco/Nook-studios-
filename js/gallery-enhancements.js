(function () {
  "use strict";

  if (window.__nookGalleryEnhancementsInstalled) return;
  window.__nookGalleryEnhancementsInstalled = true;

  var windows = [
    {
      track: ".shop-template-preview-track",
      dots: ".shop-template-preview-dots",
      runner: ".shop-template-dot-runner",
    },
    {
      track: "[data-template-detail-track]",
      dots: ".shop-template-detail-dots",
      runner: ".shop-template-dot-runner",
    },
  ];
  var style = document.createElement("style");
  style.id = "nook-gallery-enhancements";
  style.textContent = [
    ".shop-template-detail-carousel{position:relative}",
    ".shop-template-detail-controls{position:absolute!important;z-index:3;right:0;bottom:14px;left:0;min-height:0!important;padding:0!important;background:transparent!important;pointer-events:none}",
    ".shop-template-detail-controls [data-template-carousel-step],.shop-template-detail-controls [data-template-slide-count]{display:none!important}",
    ".shop-template-preview-dots,.shop-template-detail-dots{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important}",
    ".shop-template-detail-controls .shop-template-detail-dots{flex:0 0 auto!important;width:auto!important;min-width:0!important;max-width:100%;padding:0!important;border-radius:0!important;background:transparent!important;backdrop-filter:none!important;pointer-events:auto}",
    ".shop-template-preview-dots>span:not(.shop-template-dot-runner),.shop-template-detail-dots>button{box-sizing:border-box!important;flex:0 0 8px!important;width:8px!important;height:8px!important;min-width:8px!important;margin:0!important;padding:0!important;border:0!important;border-radius:50%!important;background:rgba(226,230,233,.68)!important;box-shadow:0 1px 4px rgba(0,0,0,.42)!important;opacity:1!important;transform:none!important;transition:none!important}",
    ".shop-template-preview-dots>span.is-active,.shop-template-detail-dots>button.is-active{flex-basis:11px!important;width:11px!important;height:11px!important;min-width:11px!important;background:#fff!important}",
    ".shop-template-detail-dots>button:focus-visible{outline:2px solid #fff!important;outline-offset:3px!important}",
    ".shop-template-preview img,.shop-template-detail-track img,.work-grid img,.work-grid video{user-select:none;-webkit-user-drag:none;-webkit-touch-callout:none}",
  ].join("");
  document.head.appendChild(style);

  function getMarkers(dots, runnerSelector) {
    var runner = dots.querySelector(runnerSelector);
    if (runner) runner.remove();
    return Array.prototype.filter.call(dots.children, function (node) {
      return node.matches("button,span");
    });
  }

  function enhanceTrack(track, config) {
    if (track.hasAttribute("data-indicator-window-ready")) return;
    var dots = track.parentElement && track.parentElement.querySelector(config.dots);
    if (!dots) return;

    var markers = getMarkers(dots, config.runner);
    if (!markers.length) return;
    track.setAttribute("data-indicator-window-ready", "");

    function update() {
      var width = track.clientWidth;
      var active = width
        ? Math.max(0, Math.min(markers.length - 1, Math.round(track.scrollLeft / width)))
        : 0;

      markers.forEach(function (marker, index) {
        marker.classList.toggle("is-active", index === active);
        if (marker.tagName === "BUTTON") {
          if (index === active) marker.setAttribute("aria-current", "true");
          else marker.removeAttribute("aria-current");
        }
      });
    }

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function enhanceControls(root) {
    root.querySelectorAll(".shop-template-detail-controls [data-template-carousel-step]").forEach(function (button) {
      button.remove();
    });
    root.querySelectorAll(".shop-template-detail-controls [data-template-slide-count]").forEach(function (counter) {
      counter.remove();
    });

    windows.forEach(function (config) {
      root.querySelectorAll(config.track).forEach(function (track) {
        enhanceTrack(track, config);
      });
    });

    root.querySelectorAll(".work-grid img,.shop-template-preview img,.shop-template-detail-track img").forEach(function (image) {
      image.draggable = false;
    });
    root.querySelectorAll(".work-grid video").forEach(function (video) {
      video.setAttribute("controlslist", "nodownload noremoteplayback");
      video.setAttribute("disablepictureinpicture", "");
      video.setAttribute("disableremoteplayback", "");
      video.disablePictureInPicture = true;
      video.disableRemotePlayback = true;
    });
  }

  function isProtectedArtwork(target) {
    return !!(target && target.closest && target.closest(
      ".work-grid img,.shop-template-preview img,.shop-template-detail-track img"
    ));
  }

  document.addEventListener("contextmenu", function (event) {
    if (isProtectedArtwork(event.target)) event.preventDefault();
  }, true);
  document.addEventListener("dragstart", function (event) {
    if (isProtectedArtwork(event.target)) event.preventDefault();
  }, true);

  function observe() {
    enhanceControls(document);
    if (!document.body) return;
    new MutationObserver(function (records) {
      records.forEach(function (record) {
        record.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) enhanceControls(node);
        });
      });
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", observe, { once: true });
  } else {
    observe();
  }
})();
