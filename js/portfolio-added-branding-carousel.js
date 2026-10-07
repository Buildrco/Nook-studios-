(function () {
  var categoryLabel = 'Branding & Design';
  var project = {
    title: 'Verikros — Cross-Border Business Carousel',
    teaser: 'A five-slide social campaign for Verikros and the teams behind cross-border business.',
    description: 'An illustrated five-slide Instagram carousel for Verikros, following the needs of importers, exporters, growing businesses, finance teams, and multi-market operations. Each 4:5 design reads on its own and continues the story as you swipe.',
    images: [
      { src: '/images/portfolio/verikros-global-business-carousel-01.webp', alt: 'Slide 1 of 5: The Importer — your next shipment depends on paying an overseas supplier.' },
      { src: '/images/portfolio/verikros-global-business-carousel-02.webp', alt: 'Slide 2 of 5: The Exporter — your customers are abroad, your business is here.' },
      { src: '/images/portfolio/verikros-global-business-carousel-03.webp', alt: 'Slide 3 of 5: The Growing Business — suppliers and partners are no longer in one country.' },
      { src: '/images/portfolio/verikros-global-business-carousel-04.webp', alt: 'Slide 4 of 5: The Finance Team — multiple payments, multiple currencies, one team managing it all.' },
      { src: '/images/portfolio/verikros-global-business-carousel-05.webp', alt: 'Slide 5 of 5: The Multi Market Business — your operations do not stop at the border.' }
    ]
  };

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

  if (!gallery || !allGrid || !brandingGrid || !dialog || !hero || !detailImage || !detailVideo) return;

  function updateDots(dots, index) {
    Array.prototype.forEach.call(dots.children, function (dot, dotIndex) {
      dot.classList.toggle('is-active', dotIndex === index);
      if (dot.tagName === 'BUTTON') {
        if (dotIndex === index) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      }
    });
  }

  function makeCard(isVisible) {
    var card = document.createElement('figure');
    var viewport = document.createElement('div');
    var dots = document.createElement('span');
    card.className = 'work-item branding-carousel-card';
    card.setAttribute('data-branding-carousel-index', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', isVisible ? '0' : '-1');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', 'Open ' + project.title + '. Swipe the preview or open to view all five slides.');
    viewport.className = 'branding-carousel-preview';
    viewport.setAttribute('aria-label', 'Swipe through five Verikros campaign slides');
    project.images.forEach(function (slide) {
      var image = document.createElement('img');
      image.src = slide.src;
      image.alt = slide.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      viewport.appendChild(image);
    });
    dots.className = 'branding-carousel-preview-dots';
    dots.setAttribute('aria-hidden', 'true');
    project.images.forEach(function (_, index) {
      var dot = document.createElement('span');
      if (index === 0) dot.className = 'is-active';
      dots.appendChild(dot);
    });
    viewport.addEventListener('scroll', function () {
      var index = viewport.clientWidth ? Math.round(viewport.scrollLeft / viewport.clientWidth) : 0;
      updateDots(dots, index);
    }, { passive: true });
    card.appendChild(viewport);
    card.appendChild(dots);
    return card;
  }

  allGrid.insertBefore(makeCard(true), allGrid.firstChild);
  brandingGrid.insertBefore(makeCard(false), brandingGrid.firstChild);

  function clearCarousel() {
    if (currentViewer && currentViewer.parentNode) currentViewer.parentNode.removeChild(currentViewer);
    currentViewer = null;
    var controls = hero.querySelector('.work-carousel-controls');
    if (controls) controls.remove();
    hero.classList.remove('has-branding-carousel');
    detailImage.hidden = false;
    detailVideo.hidden = true;
  }

  function openCarousel(trigger) {
    clearCarousel();
    currentTrigger = trigger;
    detailImage.hidden = true;
    detailVideo.hidden = true;
    hero.classList.add('has-branding-carousel');

    var viewer = document.createElement('div');
    var controls = document.createElement('div');
    var dots = document.createElement('div');
    var previous = document.createElement('button');
    var next = document.createElement('button');
    viewer.className = 'work-carousel-viewport';
    viewer.setAttribute('role', 'group');
    viewer.setAttribute('aria-label', 'Verikros carousel. Swipe or use the slide buttons to browse all five images.');
    project.images.forEach(function (slide, index) {
      var frame = document.createElement('div');
      var image = document.createElement('img');
      frame.className = 'work-carousel-slide';
      frame.setAttribute('aria-label', slide.alt);
      image.src = slide.src;
      image.alt = slide.alt;
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      frame.appendChild(image);
      viewer.appendChild(frame);
    });
    controls.className = 'work-carousel-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Carousel slide navigation');
    previous.type = 'button';
    previous.className = 'work-carousel-arrow is-previous';
    previous.setAttribute('aria-label', 'Previous slide');
    previous.textContent = '‹';
    next.type = 'button';
    next.className = 'work-carousel-arrow is-next';
    next.setAttribute('aria-label', 'Next slide');
    next.textContent = '›';
    dots.className = 'work-carousel-dots';
    project.images.forEach(function (_, index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = index === 0 ? 'is-active' : '';
      dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
      if (index === 0) dot.setAttribute('aria-current', 'true');
      dot.addEventListener('click', function () {
        viewer.scrollTo({ left: index * viewer.clientWidth, behavior: 'smooth' });
      });
      dots.appendChild(dot);
    });
    function syncControls() {
      var index = viewer.clientWidth ? Math.round(viewer.scrollLeft / viewer.clientWidth) : 0;
      updateDots(dots, index);
      previous.disabled = index <= 0;
      next.disabled = index >= project.images.length - 1;
    }
    previous.addEventListener('click', function () {
      var index = viewer.clientWidth ? Math.round(viewer.scrollLeft / viewer.clientWidth) : 0;
      viewer.scrollTo({ left: Math.max(0, index - 1) * viewer.clientWidth, behavior: 'smooth' });
    });
    next.addEventListener('click', function () {
      var index = viewer.clientWidth ? Math.round(viewer.scrollLeft / viewer.clientWidth) : 0;
      viewer.scrollTo({ left: Math.min(project.images.length - 1, index + 1) * viewer.clientWidth, behavior: 'smooth' });
    });
    viewer.addEventListener('scroll', syncControls, { passive: true });
    viewer.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') previous.click();
      if (event.key === 'ArrowRight') next.click();
    });
    controls.appendChild(previous);
    controls.appendChild(dots);
    controls.appendChild(next);
    hero.appendChild(viewer);
    hero.appendChild(controls);
    currentViewer = viewer;
    syncControls();

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
      openCarousel(card);
      return;
    }
    if (currentViewer && relatedGrid.contains(event.target)) {
      var suggestion = event.target.closest && event.target.closest('.work-item');
      if (!suggestion) return;
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      currentTrigger = null;
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
    clearCarousel();
    if (trigger && document.contains(trigger)) trigger.focus({ preventScroll: true });
  });
})();
