(function () {
  var categoryLabel = 'Web/app & Softwares';
  var projects = [
    {
      image: '/images/portfolio/dnl-electricals-website.webp',
      title: 'DNL Electricals Website Design',
      teaser: 'A responsive online store for electrical products.',
      description: 'We designed a responsive storefront that makes electrical products, categories and service benefits easy to scan on desktop and mobile. The main challenge was fitting a broad catalogue into a clear shopping flow.',
      link: 'https://dnldelectricals.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/chrisdem-logistics-website.webp',
      title: 'Chrisdem Logistics Website Design',
      teaser: 'A clear, mobile-ready website for logistics services.',
      description: 'We designed a responsive logistics site that highlights freight services, shipment tracking and quote requests. The challenge was making several service paths easy to navigate on desktop and mobile.',
      link: 'https://chrisdemlogistics.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/sifin-mart-website.webp',
      title: 'Sifin Mart Website Design',
      teaser: 'A mobile-ready storefront for everyday shopping.',
      description: 'We designed a grocery storefront with clear product categories, deals and delivery information. The main challenge was helping shoppers find everyday essentials quickly across desktop and mobile.',
      link: 'https://sifinmartgh.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/chrisdem-logistics-services-website.webp',
      title: 'Chrisdem Logistics Services Website',
      teaser: 'A responsive presentation of Chrisdem’s freight services.',
      description: 'We created a service-focused layout for Chrisdem Logistics, bringing its freight options, global coverage and quote path together. The challenge was keeping key logistics information clear at every screen size.',
      link: 'https://chrisdemlogistics.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/seewest-consult-website.webp',
      title: 'Seewest Consult Website Design',
      teaser: 'A responsive website for engineering and construction services.',
      description: 'We designed a responsive consultancy website that brings engineering, procurement, construction and sustainability services into one place. The main challenge was giving each service a clear path without crowding the page.',
      link: 'https://seewestconsult.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/ericann-engineering-website.webp',
      title: 'Ericann Engineering Website Design',
      teaser: 'A mobile-friendly website for an engineering company.',
      description: 'We designed a mobile-friendly engineering website that organizes project expertise, services and quote enquiries. The challenge was turning technical information into a straightforward, easy-to-scan experience.',
      link: 'https://ericannengineering.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/tpwci-website.webp',
      title: 'TPWCI Website Design',
      teaser: 'A product-focused website for TPWCI.',
      description: 'We designed a responsive website that brings TPWCI’s products, service categories and community benefits into one place. The challenge was balancing a varied catalogue with the brand’s people-first mission.',
      link: 'https://tpwci.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/dawig-energy-website.webp',
      title: 'Dawig Energy Website Design',
      teaser: 'A responsive website for energy services.',
      description: 'We designed a responsive energy-sector website that makes expertise, safety commitments and service areas easy to find. The challenge was presenting complex services clearly on desktop and mobile.',
      link: 'https://dawigenergy.com',
      linkLabel: 'View live site'
    },
    {
      image: '/images/portfolio/ceee-website.webp',
      title: 'CEEE Website Design',
      teaser: 'A mobile-ready storefront for a broad product range.',
      description: 'We designed an online storefront with clear product categories, search and shopper support. The challenge was making a varied product range simple to browse on small screens.',
      link: 'https://ceee.wuaze.com',
      linkLabel: 'View live site'
    }
  ];

  var gallery = document.getElementById('work-gallery');
  var allGrid = document.querySelector('#work-panel-all .work-grid');
  var webPanel = document.getElementById('work-panel-web-software');
  var webGrid = webPanel && webPanel.querySelector('.work-grid');
  var filter = document.getElementById('work-tab-web-software');

  if (!gallery || !allGrid || !webGrid || !filter) return;

  filter.textContent = categoryLabel;
  webGrid.setAttribute('aria-label', categoryLabel + ' selected work');
  window.dispatchEvent(new Event('resize'));

  var extraCards = [];
  function createCard(project, index) {
    var card = document.createElement('figure');
    var image = document.createElement('img');
    card.className = 'work-item';
    card.setAttribute('data-extra-work-index', String(index));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '-1');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', 'Open ' + project.title);
    image.src = project.image;
    image.alt = project.title;
    image.loading = 'lazy';
    image.decoding = 'async';
    card.appendChild(image);
    return card;
  }

  projects.forEach(function (project, index) {
    var allCard = createCard(project, index);
    var webCard = createCard(project, index);
    allGrid.appendChild(allCard);
    webGrid.appendChild(webCard);
    extraCards.push(allCard, webCard);
  });

  function syncTabStops() {
    extraCards.forEach(function (card) {
      var panel = card.closest('[data-category-panel]');
      card.tabIndex = panel && panel.getAttribute('aria-hidden') === 'false' ? 0 : -1;
    });
  }
  syncTabStops();
  new MutationObserver(syncTabStops).observe(gallery, {
    attributes: true,
    attributeFilter: ['aria-hidden'],
    subtree: true
  });

  var dialog = document.getElementById('work-detail-dialog');
  var detailImage = document.getElementById('work-detail-image');
  var detailVideo = document.getElementById('work-detail-video');
  var detailHeading = document.getElementById('work-detail-heading');
  var detailCategory = document.getElementById('work-detail-category');
  var detailTeaser = document.getElementById('work-detail-teaser');
  var detailDescription = document.getElementById('work-detail-full-description');
  var detailDisclosure = document.getElementById('work-description-disclosure');
  var detailLink = document.getElementById('work-detail-link');
  var relatedHeading = document.getElementById('work-related-heading');
  var relatedGrid = document.getElementById('work-detail-suggestions');
  var relatedEmpty = document.getElementById('work-detail-empty');
  var lastTrigger = null;

  function getExtraIndex(target) {
    var card = target.closest('[data-extra-work-index]');
    return card ? Number(card.getAttribute('data-extra-work-index')) : -1;
  }

  function openProject(index, trigger) {
    var project = projects[index];
    if (!project || !dialog) return;
    lastTrigger = trigger;
    detailImage.hidden = false;
    detailImage.src = project.image;
    detailImage.alt = project.title;
    detailImage.loading = 'eager';
    detailVideo.hidden = true;
    detailVideo.pause();
    detailVideo.removeAttribute('src');
    detailVideo.load();
    detailHeading.textContent = project.title;
    detailCategory.textContent = categoryLabel;
    detailTeaser.textContent = project.teaser;
    detailDescription.textContent = project.description;
    detailDisclosure.open = false;
    detailLink.removeAttribute('href');
    detailLink.hidden = !project.link;
    if (project.link) {
      detailLink.href = project.link;
      detailLink.textContent = project.linkLabel || 'View live site';
    }
    relatedHeading.textContent = 'More from ' + categoryLabel;
    relatedGrid.replaceChildren();

    projects.forEach(function (relatedProject, relatedIndex) {
      if (relatedIndex === index) return;
      var relatedCard = createCard(relatedProject, relatedIndex);
      relatedCard.tabIndex = 0;
      relatedGrid.appendChild(relatedCard);
    });
    relatedEmpty.hidden = relatedGrid.childElementCount > 0;
    dialog.showModal();
  }

  function interceptExtraWork(event) {
    var index = getExtraIndex(event.target);
    if (index < 0) return;
    if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
    if (event.type === 'keydown') event.preventDefault();
    event.preventDefault();
    event.stopImmediatePropagation();
    openProject(index, event.target.closest('[data-extra-work-index]'));
  }

  gallery.addEventListener('click', interceptExtraWork, true);
  gallery.addEventListener('keydown', interceptExtraWork, true);
  relatedGrid.addEventListener('click', interceptExtraWork, true);
  relatedGrid.addEventListener('keydown', interceptExtraWork, true);
  var legacyWebsiteIndexes = [13, 14, 23, 24];
  function includeWebsiteSuggestions(event) {
    var card = event.target.closest && event.target.closest('[data-project-index]');
    if (!card || card.hasAttribute('data-extra-work-index')) return;
    if (legacyWebsiteIndexes.indexOf(Number(card.getAttribute('data-project-index'))) === -1) return;
    window.setTimeout(function () {
      if (!dialog.open || relatedGrid.querySelector('[data-web-related-suggestion]')) return;
      projects.forEach(function (project, index) {
        var relatedCard = createCard(project, index);
        relatedCard.setAttribute('data-web-related-suggestion', '');
        relatedCard.tabIndex = 0;
        relatedGrid.appendChild(relatedCard);
      });
      relatedEmpty.hidden = relatedGrid.childElementCount > 0;
    }, 0);
  }
  gallery.addEventListener('click', includeWebsiteSuggestions);
  relatedGrid.addEventListener('click', includeWebsiteSuggestions);
  [detailCategory, relatedHeading].forEach(function (element) {
    if (!element) return;
    new MutationObserver(function () {
      var updatedText = element.textContent.replace('Web & Software', categoryLabel);
      if (updatedText !== element.textContent) element.textContent = updatedText;
    }).observe(element, {
      childList: true,
      characterData: true,
      subtree: true
    });
  });
  dialog.addEventListener('close', function () {
    if (lastTrigger && document.contains(lastTrigger)) {
      lastTrigger.focus({ preventScroll: true });
    }
  });
})();

(function () {
  var script = document.createElement('script');
  script.src = '/js/portfolio-added-photography.js';
  document.body.appendChild(script);
})();
(function () {
  var footerScript = document.createElement('script');
  footerScript.src = '/js/site-footer.js';
  document.head.appendChild(footerScript);
})();
