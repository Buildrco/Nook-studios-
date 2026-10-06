(function () {
  "use strict";

  var whatsappNumber = "233557696771";
  var categoryContent = document.getElementById("shop-category-content");
  var activeUnlockCard = null;

  function whatsappUrl(message) {
    return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  function setWhatsAppLink(link, message, label) {
    link.href = whatsappUrl(message);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (label) link.textContent = label;
  }

  function productMessage(title) {
    return "Hello, I want to purchase " + title + ". Please confirm availability and the current price.";
  }

  function upgradeProductLinks(root) {
    root.querySelectorAll(".shop-product-action").forEach(function (link) {
      if (link.closest(".shop-account-detail")) return;
      var card = link.closest(".shop-product-card");
      var detail = link.closest(".shop-template-detail-info");
      var titleNode = detail && detail.querySelector("h1");
      if (!titleNode && card) titleNode = card.querySelector(".shop-product-info h2");
      if (!titleNode) titleNode = link.closest(".shop-product-info") && link.closest(".shop-product-info").querySelector("h2");
      if (!titleNode) return;
      setWhatsAppLink(link, productMessage(titleNode.textContent.trim()), "Buy on WhatsApp");
    });

    root.querySelectorAll(".shop-account-contact").forEach(function (link) {
      var title = root.querySelector(".shop-account-detail-copy h1");
      setWhatsAppLink(link, productMessage(title ? title.textContent.trim() : "this account"), "Buy on WhatsApp");
    });

    root.querySelectorAll(".shop-product-price,.shop-template-price,.shop-template-detail-price").forEach(function (price) {
      price.textContent = "Price on request";
    });
    root.querySelectorAll(".shop-product-meta > span:first-child").forEach(function (label) {
      if (label.textContent.trim() === "Sample listing") label.textContent = "Available on request";
    });
    root.querySelectorAll(".shop-price-disclaimer").forEach(function (note) {
      note.textContent = "Final price and availability are confirmed on WhatsApp.";
    });
  }

  function addSocialTargetField(panel) {
    var selectors = panel.querySelector(".smm-selectors");
    if (!selectors || selectors.querySelector("[data-whatsapp-target]")) return;
    var label = document.createElement("label");
    label.textContent = "Target account or post link";
    var input = document.createElement("input");
    input.type = "url";
    input.placeholder = "https://…";
    input.autocomplete = "url";
    input.setAttribute("data-whatsapp-target", "");
    label.appendChild(input);
    selectors.appendChild(label);
  }

  function enhanceSocialPanel(panel) {
    addSocialTargetField(panel);
    var platform = panel.querySelector(".smm-platform-header h2");
    var serviceSelect = panel.querySelector("[data-service-select]");
    var service = serviceSelect && serviceSelect.options[serviceSelect.selectedIndex];
    var serviceName = service ? service.textContent.trim() : "social media marketing";
    var description = panel.querySelector("[data-service-description]");
    if (description) {
      description.textContent = "Choose a quantity, then send the selected " +
        ((platform && platform.textContent.trim()) || "social") + " service for a WhatsApp quote.";
    }
    panel.querySelectorAll(".smm-package").forEach(function (button) {
      var amount = button.querySelector("strong");
      var note = button.querySelector("small");
      if (amount) amount.textContent = "Quote on WhatsApp";
      if (note) note.textContent = "Requested quantity";
    });
    var summary = panel.querySelector(".smm-price-summary");
    if (summary) {
      var labels = summary.querySelectorAll("span");
      if (labels[0]) labels[0].textContent = "Selected quantity · final quote in WhatsApp";
      var total = summary.querySelector("[data-price-total]");
      if (total) total.textContent = "Price on request";
      var formula = summary.querySelector("[data-price-formula]");
      if (formula) formula.textContent = "Choose a quantity; confirm the exact price before ordering.";
      var action = summary.querySelector("a");
      if (action) {
        var quantity = panel.querySelector('.smm-package[aria-pressed="true"]');
        var quantityText = quantity ? quantity.querySelector("span").textContent.trim() : "selected quantity";
        var target = panel.querySelector("[data-whatsapp-target]");
        var targetText = target && target.value.trim() ? target.value.trim() : "I will share my account or post link in this chat";
        var platformName = platform ? platform.textContent.trim() : "social media";
        var message = "Hello, I want to purchase " + platformName + " " + serviceName +
          " for this account.\nQuantity: " + quantityText +
          "\nTarget account/post: " + targetText +
          "\nPlease confirm the current price and delivery details.";
        setWhatsAppLink(action, message, "Buy on WhatsApp");
      }
    }

    var qualityNote = panel.querySelector(".smm-quality-note");
    if (qualityNote) {
      qualityNote.textContent = "Quantities are requested targets, not guaranteed results. Confirm the fulfilment method and delivery timing in WhatsApp.";
    }
    if (!panel.querySelector(".smm-market-benchmarks")) {
      var benchmarks = document.createElement("aside");
      benchmarks.className = "smm-market-benchmarks";
      benchmarks.innerHTML = '<strong>Ghana market reference for managed campaigns</strong>' +
        '<p>Published plans list Starter at GH₵3,000/month (2 platforms, 12 posts), Professional at GH₵5,500/month, and Enterprise at GH₵8,500/month. These are market benchmarks for campaign management—not fixed prices for likes, followers or views. Nook confirms each order price in WhatsApp.</p>' +
        '<a href="https://websysgh.com/digital-marketing-packages" target="_blank" rel="noopener noreferrer">View published price reference</a>';
      panel.querySelector(".smm-panel-shell").appendChild(benchmarks);
    }
  }

  function enhanceShop() {
    var root = categoryContent || document;
    upgradeProductLinks(root);
    root.querySelectorAll(".shop-category-heading").forEach(function (heading) {
      if (heading.querySelector("h1") && heading.querySelector("h1").textContent.trim() === "Choose your platform.") {
        var intro = heading.querySelector("p:last-child");
        if (intro) intro.textContent = "Choose a platform, service and quantity. Final prices are confirmed in WhatsApp.";
      }
    });
    root.querySelectorAll("[data-platform-panel]").forEach(enhanceSocialPanel);
  }

  document.addEventListener("click", function (event) {
    var listing = event.target.closest && event.target.closest("[data-unlock-order-open]");
    if (listing) {
      activeUnlockCard = listing;
      return;
    }

    var placeOrder = event.target.closest && event.target.closest("[data-place-order]");
    if (!placeOrder) return;
    var imei = document.querySelector(".unlock-imei-input");
    var value = imei ? imei.value.replace(/\D/g, "") : "";
    if (!/^\d{15}$/.test(value)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    var title = activeUnlockCard && (activeUnlockCard.getAttribute("data-order-title") ||
      (activeUnlockCard.querySelector(".unlock-listing-title") && activeUnlockCard.querySelector(".unlock-listing-title").textContent.trim()));
    var model = activeUnlockCard && activeUnlockCard.querySelector(".unlock-listing-subtitle");
    var message = "Hello, I want to purchase " + (title || "a phone unlock service") +
      (model ? ".\nDevice/model details: " + model.textContent.trim() : "") +
      "\nIMEI: " + value +
      "\nPlease confirm eligibility, price and delivery time.";
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }, true);

  function observe() {
    enhanceShop();
    if (categoryContent) new MutationObserver(enhanceShop).observe(categoryContent, { childList: true, subtree: true });
    var orderObserver = new MutationObserver(function () {
      var action = document.querySelector("[data-place-order]");
      var note = document.querySelector(".unlock-order-note");
      if (action) action.textContent = "Continue to WhatsApp";
      if (note) note.textContent = "Your selected service and 15-digit IMEI will be prefilled in WhatsApp. Tap Send there to submit.";
    });
    orderObserver.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", observe, { once: true });
  else observe();
})();
