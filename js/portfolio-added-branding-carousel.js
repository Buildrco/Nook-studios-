(function () {
  var categoryLabel = 'Branding & Design';
  var projects = [
    {
      title: 'Verikros — Cross-Border Business Carousel',
      teaser: 'A five-slide social campaign for Verikros and the teams behind cross-border business.',
      description: 'An illustrated five-slide Instagram carousel for Verikros, following the needs of importers, exporters, growing businesses, finance teams, and multi-market operations. Each 4:5 design reads on its own and continues the story as you swipe.',
      cover: '/images/portfolio/verikros-global-business-carousel-01.webp',
      images: [
        { src: '/images/portfolio/verikros-global-business-carousel-01.webp', alt: 'Slide 1 of 5: The Importer — your next shipment depends on paying an overseas supplier.' },
        { src: '/images/portfolio/verikros-global-business-carousel-02.webp', alt: 'Slide 2 of 5: The Exporter — your customers are abroad, your business is here.' },
        { src: '/images/portfolio/verikros-global-business-carousel-03.webp', alt: 'Slide 3 of 5: The Growing Business — suppliers and partners are no longer in one country.' },
        { src: '/images/portfolio/verikros-global-business-carousel-04.webp', alt: 'Slide 4 of 5: The Finance Team — multiple payments, multiple currencies, one team managing it all.' },
        { src: '/images/portfolio/verikros-global-business-carousel-05.webp', alt: 'Slide 5 of 5: The Multi Market Business — your operations do not stop at the border.' }
      ]
    },
    {
      title: 'SellQuic — Midnight Shopping & Always-On Selling',
      teaser: 'An eight-slide social carousel on midnight shopping, online selling, and SellQuic tools.',
      description: 'An eight-slide SellQuic campaign, moving from the midnight-shopping headline through shopping trends, overnight selling, what shoppers buy after dark, getting a business online, and dashboard updates. The upload order is preserved, including the two connected opening panels.',
      cover: '/images/portfolio/sellquic-midnight-carousel-cover.webp',
      images: [
        { src: '/images/portfolio/sellquic-midnight-carousel-01.webp', alt: 'Slide 1 of 8: More people shop at midnight than you think.' },
        { src: '/images/portfolio/sellquic-midnight-carousel-02.webp', alt: 'Slide 2 of 8: That is where SellQuic AI, built for every vendor, comes in.' },
        { src: '/images/portfolio/sellquic-midnight-carousel-03.webp', alt: 'Slide 3 of 8: Midnight shopping trends.' },
        { src: '/images/portfolio/sellquic-midnight-carousel-04.webp', alt: 'Slide 4 of 8: Night time shopping habits.' },
        { src: '/images/portfolio/sellquic-midnight-carousel-05.webp', alt: 'Slide 5 of 8: Can your business sell while you sleep?' },
        { src: '/images/portfolio/sellquic-midnight-carousel-06.webp', alt: 'Slide 6 of 8: What shoppers buy after dark, and why.' },
        { src: '/images/portfolio/sellquic-midnight-carousel-07.webp', alt: 'Slide 7 of 8: Launch your business in minutes with SellQuic.' },
        { src: '/images/portfolio/sellquic-midnight-carousel-08.webp', alt: 'Slide 8 of 8: What is new on your SellQuic dashboard? October updates.' }
      ]
    }
  ];

  var gallery = document.getElementById('work-gallery');
  var allGrid = document.querySelector('#work-panel-all .work-grid');
  var brandingPanel = document.getElementById('work-panel-branding-design');
  var brandingGrid = brandingPanel && brandingPanel.querySelector('.work-grid');
  var dialog = document.getElementById('work-detail-dialog');
  var hero = dialog && dialog.querySelector('.work-detail-hero');
  var detailImage = document.getElementById('work-detail-image');
  var detailVideo = document.getElementById('work-detail-video');
  var detailLink = document.getElementById('work-detail-link');
  var detailHeading = document.getElementById('work-detail-heading');
  var detailCategory = document.getElementById('work-detail-category');
  var detailTeaser = document.getElementById('work-detail-teaser');
  var detailDescription = document.getElementById('work-detail-full-description');
  var detailDisclosure = document.getElementById('work-description-disclosure');
  var relatedHeading = document.getElementById('work-related-heading');
  var relatedGrid = document.getElementById('work-detail-suggestions');
  var relatedEmpty = document.getElementById('work-detail-empty');
  var currentViewer = null;
  var currentTrigger = null;
  var currentMode = '';

  if (!gallery || !allGrid || !brandingGrid || !dialog || !hero || !detailImage || !detailVideo) return;

  function makeCard(project, index, isVisible) {
    var card = document.createElement('figure');
    var preview = document.createElement('div');
    var image = document.createElement('img');
    var dots = document.createElement('span');
    card.className = 'work-item branding-carousel-card';
    card.setAttribute('data-branding-carousel-index', String(index));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', isVisible ? '0' : '-1');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', 'Open ' + project.title + ', a ' + project.images.length + '-slide carousel.');
    preview.className = 'branding-carousel-preview';
    image.src = project.cover;
    image.alt = project.title + ' carousel cover';
    image.loading = 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    preview.appendChild(image);
    dots.className = 'branding-carousel-preview-dots';
    dots.setAttribute('aria-hidden', 'true');
    project.images.forEach(function (_, dotIndex) {
      var dot = document.createElement('span');
      if (dotIndex === 0) dot.className = 'is-active';
      dots.appendChild(dot);
    });
    card.appendChild(preview);
    card.appendChild(dots);
    return card;
  }

  var verikrosCard = makeCard(projects[0], 0, true);
  var sellquicCard = makeCard(projects[1], 1, false);
  allGrid.insertBefore(verikrosCard, allGrid.firstChild);
  allGrid.insertBefore(sellquicCard, verikrosCard.nextSibling);
  brandingGrid.insertBefore(makeCard(projects[0], 0, false), brandingGrid.firstChild);
  var brandingVerikrosCard = brandingGrid.firstChild;
  brandingGrid.insertBefore(makeCard(projects[1], 1, false), brandingVerikrosCard.nextSibling);

  function clearCarousel() {
    if (currentViewer && currentViewer.parentNode) currentViewer.parentNode.removeChild(currentViewer);
    currentViewer = null;
    var controls = hero.querySelector('.work-carousel-controls');
    if (controls) controls.remove();
    hero.classList.remove('has-branding-carousel');
    detailImage.hidden = false;
    detailVideo.hidden = true;
  }

  function openCarousel(index, trigger) {
    var project = projects[index];
    if (!project) return;
    clearCarousel();
    currentTrigger = trigger;
    currentMode = 'carousel';
    detailImage.hidden = true;
    detailVideo.hidden = true;
    hero.classList.add('has-branding-carousel');

    var viewer = document.createElement('div');
    var controls = document.createElement('div');
    var dots = document.createElement('div');
    viewer.className = 'work-carousel-viewport';
    viewer.setAttribute('role', 'group');
    viewer.setAttribute('tabindex', '0');
    viewer.setAttribute('aria-label', project.title + '. Swipe to browse ' + project.images.length + ' slides.');
    project.images.forEach(function (slide) {
      var frame = document.createElement('div');
      var image = document.createElement('img');
      frame.className = 'work-carousel-slide';
      frame.setAttribute('aria-label', slide.alt);
      image.src = slide.src;
      image.alt = slide.alt;
      image.loading = 'eager';
      image.decoding = 'async';
      image.draggable = false;
      frame.appendChild(image);
      viewer.appendChild(frame);
    });
    controls.className = 'work-carousel-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Carousel slides');
    dots.className = 'work-carousel-dots';
    project.images.forEach(function (_, dotIndex) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = dotIndex === 0 ? 'is-active' : '';
      dot.setAttribute('aria-label', 'Go to slide ' + (dotIndex + 1));
      if (dotIndex === 0) dot.setAttribute('aria-current', 'true');
      dot.addEventListener('click', function () {
        viewer.scrollTo({ left: dotIndex * viewer.clientWidth, behavior: 'smooth' });
      });
      dots.appendChild(dot);
    });
    function syncDots() {
      var activeIndex = viewer.clientWidth ? Math.round(viewer.scrollLeft / viewer.clientWidth) : 0;
      Array.prototype.forEach.call(dots.children, function (dot, dotIndex) {
        dot.classList.toggle('is-active', dotIndex === activeIndex);
        if (dotIndex === activeIndex) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    }
    viewer.addEventListener('scroll', syncDots, { passive: true });
    viewer.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      var activeIndex = viewer.clientWidth ? Math.round(viewer.scrollLeft / viewer.clientWidth) : 0;
      var nextIndex = Math.max(0, Math.min(project.images.length - 1, activeIndex + (event.key === 'ArrowRight' ? 1 : -1)));
      viewer.scrollTo({ left: nextIndex * viewer.clientWidth, behavior: 'smooth' });
    });
    controls.appendChild(dots);
    hero.appendChild(viewer);
    hero.appendChild(controls);
    currentViewer = viewer;
    syncDots();

    detailHeading.textContent = project.title;
    detailCategory.textContent = categoryLabel;
    detailTeaser.textContent = project.teaser;
    detailDescription.textContent = project.description;
    detailDisclosure.open = false;
    detailLink.removeAttribute('href');
    detailLink.hidden = true;
    relatedHeading.textContent = 'More from ' + categoryLabel;
    relatedGrid.replaceChildren();
    Array.prototype.forEach.call(brandingGrid.querySelectorAll('.work-item:not([data-branding-carousel-index])'), function (item) {
      var suggestion = item.cloneNode(true);
      suggestion.tabIndex = 0;
      relatedGrid.appendChild(suggestion);
    });
    relatedEmpty.hidden = relatedGrid.childElementCount > 0;
    dialog.showModal();
  }

  function intercept(event) {
    var card = event.target.closest && event.target.closest('[data-branding-carousel-index]');
    if (card && (gallery.contains(card) || relatedGrid.contains(card))) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openCarousel(Number(card.getAttribute('data-branding-carousel-index')), card);
      return;
    }
    if (currentMode === 'carousel' && relatedGrid.contains(event.target)) {
      var suggestion = event.target.closest && event.target.closest('.work-item');
      if (!suggestion) return;
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      currentTrigger = null;
      currentMode = '';
      clearCarousel();
      if (window.__openPortfolioDetail) window.__openPortfolioDetail(suggestion, 'branding-design');
    }
  }

  gallery.addEventListener('click', intercept, true);
  gallery.addEventListener('keydown', intercept, true);
  relatedGrid.addEventListener('click', intercept, true);
  relatedGrid.addEventListener('keydown', intercept, true);
  dialog.addEventListener('close', function () {
    var trigger = currentTrigger;
    currentTrigger = null;
    currentMode = '';
    clearCarousel();
    if (trigger && document.contains(trigger)) trigger.focus({ preventScroll: true });
  });
})();
