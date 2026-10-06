(function () {
  "use strict";

  var whatsappNumber = "233557696771";
  var categoryContent = document.getElementById("shop-category-content");
  var activeUnlockCard = null;

  function whatsappUrl(message) {
    return "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(message);
  }

  function setText(node, value) {
    if (node && node.textContent !== value) node.textContent = value;
  }

  function setWhatsAppLink(link, message, label) {
    var url = whatsappUrl(message);
    if (link.href !== url) link.href = url;
    if (link.target !== "_blank") link.target = "_blank";
    if (link.rel !== "noopener noreferrer") link.rel = "noopener noreferrer";
    if (label) setText(link, label);
  }

  function productMessage(title) {
    return "Hello, I want to purchase " + title + ". Please confirm availability and the current price.";
  }

  function socialServiceDescription(serviceName) {
    var name = (serviceName || "social media service").trim().toLowerCase();
    if (name.indexOf("view") !== -1) {
      return "Original service for organic " + name + " to help more people see your content.";
    }
    if (name.indexOf("like") !== -1) {
      return "Original service for organic " + name + " to support post engagement.";
    }
    if (name.indexOf("follower") !== -1) {
      return "Original service for organic followers and gradual profile growth.";
    }
    return "Original " + name + " service to support your social content.";
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
      setWhatsAppLink(link, productMessage(titleNode.textContent.trim()), "Buy");
    });

    root.querySelectorAll(".shop-account-contact").forEach(function (link) {
      var title = root.querySelector(".shop-account-detail-copy h1");
      setWhatsAppLink(link, productMessage(title ? title.textContent.trim() : "this account"), "Buy");
    });

    root.querySelectorAll(".shop-product-price,.shop-template-price,.shop-template-detail-price").forEach(function (price) {
      setText(price, "Price on request");
    });
    root.querySelectorAll(".shop-product-meta > span:first-child").forEach(function (label) {
      if (label.textContent.trim() === "Sample listing") setText(label, "Available on request");
    });
    root.querySelectorAll(".shop-price-disclaimer").forEach(function (note) {
      setText(note, "Final price and availability are confirmed before ordering.");
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
    var description = panel.querySelector("[data-service-description]");
    if (description) setText(description, socialServiceDescription(service && service.textContent));
    panel.querySelectorAll(".smm-package").forEach(function (button) {
      var amount = button.querySelector("strong");
      var note = button.querySelector("small");
      setText(amount, "Price on request");
      setText(note, "Requested quantity");
    });
    var summary = panel.querySelector(".smm-price-summary");
    if (summary) {
      var labels = summary.querySelectorAll("span");
      setText(labels[0], "Selected quantity");
      var total = summary.querySelector("[data-price-total]");
      setText(total, "Price on request");
      var formula = summary.querySelector("[data-price-formula]");
      setText(formula, "Confirm the final price before ordering.");
      var action = summary.querySelector("a");
      if (action) setText(action, "Buy");
    }

    panel.querySelectorAll(".smm-market-benchmarks,.smm-quality-note").forEach(function (note) { note.remove(); });
  }

  function enhanceShop() {
    var root = categoryContent || document;
    upgradeProductLinks(root);
    root.querySelectorAll(".shop-category-heading").forEach(function (heading) {
      if (heading.querySelector("h1") && heading.querySelector("h1").textContent.trim() === "Choose your platform.") {
        var intro = heading.querySelector("p:last-child");
        setText(intro, "Choose a platform, service and quantity.");
      }
    });
    root.querySelectorAll("[data-platform-panel]").forEach(enhanceSocialPanel);
    var orderAction = root.querySelector("[data-place-order]");
    var orderNote = root.querySelector(".unlock-order-note");
    setText(orderAction, "Continue to WhatsApp");
    setText(orderNote, "Your selected service and 15-digit IMEI will be prefilled in WhatsApp. Tap Send there to submit.");
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

  if (categoryContent) categoryContent.addEventListener("click", function (event) {
    var action = event.target.closest && event.target.closest(".smm-price-summary a");
    if (!action) return;
    var panel = action.closest("[data-platform-panel]");
    if (!panel) return;
    event.preventDefault();
    var platform = panel.querySelector(".smm-platform-header h2");
    var serviceSelect = panel.querySelector("[data-service-select]");
    var service = serviceSelect && serviceSelect.options[serviceSelect.selectedIndex];
    var quantity = panel.querySelector('.smm-package[aria-pressed="true"]');
    var target = panel.querySelector("[data-whatsapp-target]");
    var quantityText = quantity ? quantity.querySelector("span").textContent.trim() : "selected quantity";
    var targetText = target && target.value.trim() ? target.value.trim() : "I will share my account or post link in this chat";
    var message = "Hello, I want to purchase " +
      ((platform && platform.textContent.trim()) || "social media") + " " +
      ((service && service.textContent.trim()) || "marketing service") +
      " for this account.\nQuantity: " + quantityText +
      "\nTarget account/post: " + targetText +
      "\nPlease confirm the current price and delivery details.";
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  });

  function observe() {
    enhanceShop();
    if (categoryContent) new MutationObserver(enhanceShop).observe(categoryContent, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", observe, { once: true });
  else observe();
})();
