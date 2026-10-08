(function () {
  "use strict";

  var allowedCarouselTitles = {
    "Hamamat Shea Butter Labels": true,
    "Restored Faith Tabernacle Logo Design": true,
  };

  var projectCopy = {
    "No Kobe (No One but You) Album Cover": {
      title: "No Kobe (No One but You) Album Cover — Patience Angmor",
      teaser: "Single-cover artwork for Patience Angmor’s “No Kobe (No One but You)”.",
      description: "A square album-cover design for Patience Angmor’s “No Kobe (No One but You)”, pairing the gold title treatment with a warm outdoor portrait.",
      alt: "No Kobe (No One but You) album cover artwork for Patience Angmor.",
    },
    "No Kobe Album Release Promo": {
      title: "No Kobe (No One but You) Music Release Promo",
      teaser: "A release promotion for Patience Angmor’s “No Kobe (No One but You)”.",
      description: "A music-release promotion for Patience Angmor’s “No Kobe (No One but You)”, with cover artwork and streaming-platform availability.",
      alt: "No Kobe (No One but You) release artwork with music-streaming platform details.",
    },
    "Nook Visuals Invoice Design": {
      title: "Nook Visuals Branded Invoice Design",
      teaser: "A branded invoice layout for Nook Visuals.",
      description: "A Nook Visuals invoice design for Bans Fed Star Ltd, combining the service breakdown, totals, payment options and Accra contact details.",
      alt: "Nook Visuals invoice design with service totals and payment options.",
    },
    "MPhil’s Real Estate Campaign Flyer": {
      title: "MPhil’s Real Estate House-Hunting Campaign Flyer",
      teaser: "A property and construction-services campaign for MPhil’s Real Estate.",
      description: "A house-hunting campaign flyer for MPhil’s Real Estate, promoting property rentals, sales and construction services with enquiry details.",
      alt: "MPhil’s Real Estate house-hunting campaign flyer with property and enquiry details.",
    },
    "Ezze Ride Brand Identity Presentation": {
      title: "Ezze Ride Brand Identity and Mockup Presentation",
      teaser: "Ezze Ride branding shown across delivery vehicles, apparel, bags and digital products.",
      description: "A brand-identity presentation for Ezze Ride, showing the logo applied to a delivery truck, uniform, courier bag, packaging and app screens.",
      alt: "Ezze Ride brand identity presentation with vehicle, uniform, delivery bag and app mockups.",
    },
    "The Undoubted Event Poster": {
      title: "The Undoubted Music and Entertainment Event Poster",
      teaser: "A Gold Coast Clique event poster featuring Jedibwoy.",
      description: "A music and entertainment poster for The Gold Coast Clique’s Friday event, featuring guest artist Jedibwoy.",
      alt: "The Undoubted event poster featuring guest artist Jedibwoy.",
    },
    "Hamamat Shea Butter Labels": {
      title: "Hamamat Golden Shea Butter Product Label Design",
      teaser: "Four coordinated package-label designs for Hamamat Golden Shea Butter.",
      description: "A coordinated four-piece label set for Hamamat Golden Shea Butter, with front and product-information designs in multiple colour treatments.",
      alt: "Hamamat Golden Shea Butter product-label carousel.",
    },
    "Restored Faith Tabernacle Logo Design": {
      title: "Restored Faith Tabernacle Church Logo Design",
      teaser: "Two colour treatments of the Restored Faith Tabernacle logo.",
      description: "A two-image logo presentation for Restored Faith Tabernacle, showing the church mark in brown and blue colour treatments.",
      alt: "Restored Faith Tabernacle church logo in two colour treatments.",
    },
    "MPhil Real Estate Branded Construction T-Shirt Mockup": {
      title: "MPhil Real Estate Branded Construction T-Shirt Mockup",
      teaser: "A blue branded staff T-shirt for MPhil’s Real Estate.",
      description: "A branded apparel mockup for MPhil’s Real Estate, with the company logo and construction, sales and rentals service details on a blue T-shirt.",
      alt: "Blue MPhil’s Real Estate branded T-shirt with construction, sales and rentals details.",
    },
  };

  var style = document.createElement("style");
  style.id = "nook-work-carousel-alignment";
  style.textContent = [
    ".papillon-card-track,.papillon-detail-track{touch-action:pan-x pan-y;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;overscroll-behavior-x:contain}",
    ".papillon-slide{scroll-snap-align:start;scroll-snap-stop:always}",
    ".papillon-carousel-dots{display:flex;align-items:center;justify-content:center;gap:8px}",
    ".papillon-carousel-dots>span:not(.papillon-dot-runner),.papillon-carousel-dots>button{box-sizing:border-box;flex:0 0 8px;width:8px;height:8px;min-width:8px;margin:0;padding:0;border:0;border-radius:50%;background:rgba(226,230,233,.68);box-shadow:0 1px 4px rgba(0,0,0,.42);transition:none}",
    ".papillon-carousel-dots>.is-active{flex-basis:11px;width:11px;height:11px;min-width:11px;background:#fff}",
    ".papillon-dot-runner{display:none!important}",
    ".papillon-detail-carousel{position:relative}",
    ".papillon-detail-controls{position:absolute!important;right:0;bottom:14px;left:0;display:flex!important;align-items:center;justify-content:center;padding:0!important;pointer-events:none}",
    ".papillon-detail-controls>button,.papillon-detail-count{display:none!important}",
    ".papillon-detail-controls .papillon-carousel-dots{pointer-events:auto}",
  ].join("");
  document.head.appendChild(style);

  function updateCard(card) {
    if (!card || card.nodeType !== 1) return;

    var sourceTitle = card.getAttribute("data-work-copy-source-title") || card.getAttribute("data-project-title") || "";
    var copy = projectCopy[sourceTitle];
    var isAllowedCarousel = !!allowedCarouselTitles[sourceTitle];

    if (copy && !card.hasAttribute("data-work-copy-updated")) {
      card.setAttribute("data-work-copy-source-title", sourceTitle);
      card.setAttribute("data-project-title", copy.title);
      card.setAttribute("data-project-teaser", copy.teaser);
      card.setAttribute("data-project-description", copy.description);
      card.setAttribute("aria-label", copy.title + (isAllowedCarousel ? ". Swipe to browse images." : ""));
      var image = card.querySelector(".papillon-slide img,.papillon-card-preview img,img");
      if (image) image.alt = copy.alt;
      card.setAttribute("data-work-copy-updated", "");
    }

    if (!card.classList.contains("papillon-brand-carousel-card")) return;

    if (!isAllowedCarousel) {
      var firstSlide = card.querySelector(".papillon-slide img,.papillon-card-preview img");
      if (firstSlide) {
        firstSlide.loading = "lazy";
        firstSlide.decoding = "async";
        firstSlide.draggable = false;
        card.replaceChildren(firstSlide);
      }
      card.classList.remove("papillon-brand-carousel-card");
      card.removeAttribute("data-brand-carousel-images");
      card.setAttribute("aria-label", card.getAttribute("data-project-title") || sourceTitle);
      return;
    }

    var dots = card.querySelector(".papillon-carousel-dots");
    if (dots) dots.setAttribute("aria-hidden", "true");
    var track = card.querySelector(".papillon-card-track");
    if (track) track.setAttribute("aria-label", (card.getAttribute("data-project-title") || sourceTitle) + " carousel. Swipe to browse.");
  }

  function updateDetailControls() {
    var dialog = document.getElementById("work-detail-dialog");
    if (!dialog) return;
    dialog.querySelectorAll(".papillon-detail-controls").forEach(function (controls) {
      controls.querySelectorAll(":scope > button,.papillon-detail-count").forEach(function (control) {
        control.remove();
      });
    });
  }

  function reorderGrid(grid, titles) {
    if (!grid || grid.hasAttribute("data-new-artwork-interleaved")) return;

    var cards = Array.prototype.slice.call(grid.children).filter(function (node) {
      return node.classList && node.classList.contains("work-item");
    });
    var selected = titles.map(function (title) {
      return cards.find(function (card) {
        return card.getAttribute("data-project-title") === title;
      });
    });
    if (selected.some(function (card) { return !card; })) return;

    var selectedSet = new Set(selected);
    var existing = cards.filter(function (card) { return !selectedSet.has(card); });
    selected.forEach(function (card, index) {
      var position = Math.min(4 + index * 6, existing.length);
      grid.insertBefore(card, existing[position] || null);
    });
    grid.setAttribute("data-new-artwork-interleaved", "");
  }

  function reconcile() {
    document.querySelectorAll(".work-grid .work-item").forEach(updateCard);
    updateDetailControls();

    var allGrid = document.querySelector("#work-panel-all .work-grid");
    var brandingGrid = document.querySelector("#work-panel-branding-design .work-grid");
    var artworkTitles = [
      "No Kobe (No One but You) Album Cover — Patience Angmor",
      "MPhil’s Real Estate House-Hunting Campaign Flyer",
      "The Undoubted Music and Entertainment Event Poster",
      "Nook Visuals Branded Invoice Design",
      "Ezze Ride Brand Identity and Mockup Presentation",
      "No Kobe (No One but You) Music Release Promo",
      "MPhil Real Estate Branded Construction T-Shirt Mockup",
    ];
    var brandingTitles = artworkTitles.slice(0, -1);
    reorderGrid(allGrid, artworkTitles);
    reorderGrid(brandingGrid, brandingTitles);
  }

  var timer = 0;
  function scheduleReconcile() {
    window.clearTimeout(timer);
    timer = window.setTimeout(reconcile, 60);
  }

  var observer = new MutationObserver(scheduleReconcile);
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });
  scheduleReconcile();
})();
