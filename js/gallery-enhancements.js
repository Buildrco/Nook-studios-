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
  var papillonImages = [
    { src: "/images/portfolio/papillon-reach-brand-collage.webp", alt: "Papillon Reach brand identity and campaign collage." },
    { src: "/images/portfolio/papillon-reach-conversation.webp", alt: "Papillon Reach campaign: Be part of the conversation." },
    { src: "/images/portfolio/papillon-reach-bulk-messages.webp", alt: "Papillon Reach bulk messaging campaign artwork." },
    { src: "/images/portfolio/papillon-reach-phone-preview.webp", alt: "Papillon Reach messaging app displayed on a phone." },
    { src: "/images/portfolio/papillon-reach-logo-green.webp", alt: "Papillon Reach logo on a pale green background." },
    { src: "/images/portfolio/papillon-reach-logo-light.webp", alt: "Papillon Reach logo on a deep green background." },
    { src: "/images/portfolio/papillon-reach-mark-dark.webp", alt: "Papillon Reach message mark on a pale green background." },
    { src: "/images/portfolio/papillon-reach-mark-light.webp", alt: "Papillon Reach message mark on a deep green background." },
  ];

  var style = document.createElement("style");
  style.id = "nook-gallery-enhancements";
  style.textContent = [
    ".shop-template-detail-carousel{position:relative}",
    ".shop-template-detail-controls{position:absolute!important;z-index:3;right:0;bottom:12px;left:0;min-height:32px!important;padding:0!important;background:transparent!important;pointer-events:none}",
    ".shop-template-detail-controls [data-template-carousel-step]{display:none!important}",
    ".shop-template-detail-controls [data-template-slide-count]{position:absolute;top:50%;right:12px;min-width:0!important;padding:6px 9px;border-radius:999px;background:rgba(15,24,32,.48);color:#fff!important;text-shadow:0 1px 3px rgba(0,0,0,.6);transform:translateY(-50%);pointer-events:none}",
    ".shop-template-preview-dots,.shop-template-detail-dots{display:flex!important;align-items:center!important;justify-content:center!important;gap:6px!important}",
    ".shop-template-detail-controls .shop-template-detail-dots{flex:0 0 auto!important;width:auto!important;min-width:74px!important;max-width:calc(100% - 86px);padding:6px 10px;border-radius:999px;background:rgba(15,24,32,.48);backdrop-filter:blur(8px);pointer-events:auto}",
    ".shop-template-preview-dots>span:not(.shop-template-dot-runner),.shop-template-detail-dots>button{box-sizing:border-box!important;flex:0 0 8px!important;width:8px!important;height:8px!important;min-width:8px!important;margin:0!important;padding:0!important;border:0!important;border-radius:50%!important;background:rgba(255,255,255,.62)!important;opacity:.72!important;transform:none!important;transition:none!important}",
    ".shop-template-preview-dots>[data-indicator-distance=\"0\"],.shop-template-detail-dots>[data-indicator-distance=\"0\"]{flex-basis:10px!important;width:10px!important;height:10px!important;background:#fff!important;opacity:1!important}",
    ".shop-template-preview-dots>[data-indicator-distance=\"1\"],.shop-template-detail-dots>[data-indicator-distance=\"1\"]{opacity:.72!important}",
    ".shop-template-preview-dots>[data-indicator-distance=\"2\"],.shop-template-detail-dots>[data-indicator-distance=\"2\"]{flex-basis:5px!important;width:5px!important;height:5px!important;min-width:5px!important;opacity:.35!important}",
    ".shop-template-preview-dots>[data-indicator-hidden=\"true\"],.shop-template-detail-dots>[data-indicator-hidden=\"true\"]{display:none!important}",
    ".shop-template-preview img,.shop-template-detail-track img,.work-grid img,.work-grid video{user-select:none;-webkit-user-drag:none}",
    "html,body,body *{-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important}",
  ].join("");
  document.head.appendChild(style);

  function getMarkers(dots, runnerSelector) {
    var runner = dots.querySelector(runnerSelector);
    if (runner) runner.remove();
    return Array.prototype.filter.call(dots.children, function (node) {
      return node.matches("button,span");
    });
  }

  function updatePapillonGallery(root) {
    var selector = '.papillon-brand-carousel-card[data-project-title="Papillon Reach Brand Identity"]';
    var cards = [];
    if (root.nodeType === 1 && root.matches(selector)) cards.push(root);
    if (root.querySelectorAll) {
      Array.prototype.forEach.call(root.querySelectorAll(selector), function (card) {
        cards.push(card);
      });
    }

    cards.forEach(function (card) {
      if (card.hasAttribute("data-supplied-gallery-ready")) return;
      var track = card.querySelector(".papillon-card-track");
      var dots = card.querySelector(".papillon-carousel-dots");
      if (!track || !dots) return;

      var slides = Array.prototype.slice.call(track.querySelectorAll(".papillon-slide"));
      var markers = Array.prototype.filter.call(dots.children, function (node) {
        return !node.classList.contains("papillon-dot-runner");
      });
      if (!slides.length || !markers.length) return;

      card.setAttribute("data-brand-carousel-images", JSON.stringify(papillonImages));
      track.setAttribute("aria-label", "Papillon Reach Brand Identity carousel. Swipe to browse.");

      papillonImages.forEach(function (image, index) {
        if (slides[index]) {
          var img = slides[index].querySelector("img");
          if (img) {
            img.src = image.src;
            img.alt = image.alt;
          }
          return;
        }

        var slide = document.createElement("div");
        var img = document.createElement("img");
        slide.className = "papillon-slide";
        img.src = image.src;
        img.alt = image.alt;
        img.loading = "lazy";
        img.decoding = "async";
        slide.appendChild(img);
        track.appendChild(slide);

        var marker = document.createElement("span");
        var runner = dots.querySelector(".papillon-dot-runner");
        if (runner) dots.insertBefore(marker, runner);
        else dots.appendChild(marker);
      });

      card.setAttribute("data-supplied-gallery-ready", "");
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
        var distance = Math.abs(index - active);
        var hidden = distance > 2;
        marker.setAttribute("data-indicator-distance", String(Math.min(distance, 2)));
        marker.setAttribute("data-indicator-hidden", String(hidden));
        if (marker.tagName === "BUTTON") {
          marker.setAttribute("aria-hidden", String(hidden));
          marker.tabIndex = hidden ? -1 : 0;
        }
        marker.classList.toggle("is-active", index === active);
      });
    }

    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  function enhanceControls(root) {
    updatePapillonGallery(root);

    root.querySelectorAll(".shop-template-detail-controls [data-template-carousel-step]").forEach(function (button) {
      button.remove();
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

  document.addEventListener(
    "contextmenu",
    function (event) {
      event.preventDefault();
    },
    true
  );
  document.addEventListener(
    "dragstart",
    function (event) {
      event.preventDefault();
    },
    true
  );

  function blockClipboardEvent(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }

  document.addEventListener("copy", blockClipboardEvent, true);
  document.addEventListener("cut", blockClipboardEvent, true);
  document.addEventListener("selectstart", blockClipboardEvent, true);
  document.addEventListener(
    "keydown",
    function (event) {
      var key = String(event.key || "").toLowerCase();
      var modifier = event.ctrlKey || event.metaKey;
      var copyShortcut = modifier && ["a", "c", "x", "s", "u", "p"].indexOf(key) !== -1;
      var inspectShortcut =
        modifier &&
        ((event.shiftKey && ["i", "j", "c"].indexOf(key) !== -1) ||
          (event.altKey && ["i", "j", "c"].indexOf(key) !== -1));
      if (copyShortcut || inspectShortcut || event.key === "F12") {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true
  );

  try {
    if (navigator.clipboard) {
      ["writeText", "write"].forEach(function (method) {
        try {
          Object.defineProperty(navigator.clipboard, method, {
            configurable: false,
            value: function () {
              return Promise.reject(new DOMException("Copy is disabled on this site.", "NotAllowedError"));
            },
          });
        } catch (error) {}
      });
    }
  } catch (error) {}

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
