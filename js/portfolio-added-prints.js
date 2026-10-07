(function () {
  var categoryLabel = 'Prints';
  var groups = [
    {
      title: 'Product Labels',
      teaser: 'Colourful labels made these drinks easy to spot.',
      description: 'Bright labels give these drinks their own look, from bottled sobolo to fresh juice and yoghurt.',
      images: [
        { src: '/images/portfolio/print-label-drink-bottle.jpg', alt: 'A drink bottle with a bright red floral label.' },
        { src: '/images/portfolio/print-label-sobolo-pack.jpg', alt: 'Bottles of sobolo with matching product labels.' },
        { src: '/images/portfolio/print-label-fresh-juice.jpg', alt: 'Fresh juice bottles with round branded labels.' },
        { src: '/images/portfolio/print-label-yoghurt.jpg', alt: 'Yoghurt cups and a bottle with matching labels.' }
      ]
    },
    {
      title: 'Banner & SAV Printing',
      teaser: 'Large format prints for menus, events and storefronts.',
      description: 'From a restaurant menu to an event banner, these prints bring big, clear colour to the job.',
      images: [
        { src: '/images/portfolio/print-banner-menu.jpg', alt: 'A printed restaurant menu banner coming off the press.' },
        { src: '/images/portfolio/print-banner-event.jpg', alt: 'A large photo banner printed for an event.' },
        { src: '/images/portfolio/print-brand-sticker-sheets.jpg', alt: 'Sheets of custom brand stickers fresh from the printer.' }
      ]
    },
    {
      title: 'UV Souvenir Printing',
      teaser: 'Custom photos and logos on everyday keepsakes.',
      description: 'Personalised cases, bottles, clocks and earbuds turn everyday items into thoughtful souvenirs.',
      images: [
        { src: '/images/portfolio/print-uv-phone-cases.jpg', alt: 'Phone cases with custom photo prints.' },
        { src: '/images/portfolio/print-uv-branded-bottles.jpg', alt: 'White bottles with a custom green and blue logo.' },
        { src: '/images/portfolio/print-uv-photo-clock.jpg', alt: 'A blue photo clock printed with a family portrait.' },
        { src: '/images/portfolio/print-uv-earbuds-case.jpg', alt: 'Branded earbuds and cases with a colourful logo.' },
        { src: '/images/portfolio/print-uv-pink-bottle.jpg', alt: 'A pink bottle with a custom photo and name.' }
      ]
    }
  ];
  var videos = [
    { src: '/images/portfolio/print-custom-invitation-cards.mp4', title: 'Invitation Card Printing', teaser: 'A fresh batch of custom invitations, printed and ready to share.', description: 'Custom invitation cards roll off the press, ready for a special day.' },
    { src: '/images/portfolio/print-custom-tshirts.mp4', title: 'Custom T Shirt Printing', teaser: 'Bold logos printed on shirts for the whole team.', description: 'A closer look at bright logo prints on custom shirts.' },
    { src: '/images/portfolio/print-banner-printing.mp4', title: 'Banner Printing', teaser: 'A large portrait banner printed with care for a family tribute.', description: 'A family portrait banner comes together on the printer.' },
    { src: '/images/portfolio/print-branded-apparel.mp4', title: 'Branded Apparel Printing', teaser: 'A finished custom printed shirt, ready to wear.', description: 'The finished shirt shows off a clean custom logo print.' }
  ];
  var order = [
    { type: 'group', index: 0 }, { type: 'video', index: 0 },
    { type: 'group', index: 1 }, { type: 'video', index: 1 },
    { type: 'group', index: 2 }, { type: 'video', index: 2 }, { type: 'video', index: 3 }
  ];
  var gallery = document.getElementById('work-gallery');
  var allGrid = document.querySelector('#work-panel-all .work-grid');
  var printPanel = document.getElementById('work-panel-prints');
  var printGrid = printPanel && printPanel.querySelector('.work-grid');
  var dialog = document.getElementById('work-detail-dialog');
  var hero = dialog && dialog.querySelector('.work-detail-hero');
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
  if (!gallery || !allGrid || !printGrid || !dialog || !hero || !detailImage || !detailVideo) return;

  function updatePreview(image, dots, project, index) {
    var slideIndex = (index + project.images.length) % project.images.length;
    image.src = project.images[slideIndex].src;
    image.alt = project.images[slideIndex].alt;
    Array.prototype.forEach.call(dots.children, function (dot, i) {
      dot.classList.toggle('is-active', i === slideIndex);
    });
  }
  function makeCarouselCard(project, index, visible) {
    var card = document.createElement('figure');
    var preview = document.createElement('div');
    var image = document.createElement('img');
    var dots = document.createElement('span');
    card.className = 'work-item branding-carousel-card prints-carousel-card';
    card.setAttribute('data-prints-carousel-index', String(index));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', visible ? '0' : '-1');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', 'Open ' + project.title + ', a ' + project.images.length + ' image carousel.');
    preview.className = 'prints-carousel-preview';
    image.src = project.images[0].src;
    image.alt = project.images[0].alt;
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
    var start = null;
    card.__carouselSwipeClick = false;
    preview.addEventListener('pointerdown', function (event) {
      if (event.isPrimary === false || (event.pointerType === 'mouse' && event.button !== 0)) return;
      start = { x: event.clientX, y: event.clientY };
    }, { passive: true });
    preview.addEventListener('pointerup', function (event) {
      if (!start) return;
      var dx = event.clientX - start.x;
      var dy = event.clientY - start.y;
      start = null;
      if (Math.abs(dx) < 30 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
      event.preventDefault();
      card.__carouselSwipeClick = true;
      window.setTimeout(function () { card.__carouselSwipeClick = false; }, 700);
      var active = Array.prototype.findIndex.call(dots.children, function (dot) { return dot.classList.contains('is-active'); });
      updatePreview(image, dots, project, active + (dx < 0 ? 1 : -1));
    });
    preview.addEventListener('pointercancel', function () { start = null; });
    return card;
  }
  function makeVideoCard(project, index, visible) {
    var card = document.createElement('figure');
    var video = document.createElement('video');
    card.className = 'work-item print-video-card';
    card.setAttribute('data-prints-video-index', String(index));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', visible ? '0' : '-1');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', 'Open ' + project.title);
    video.className = 'print-video-preview';
    video.src = project.src;
    video.setAttribute('aria-label', project.title);
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'metadata';
    card.appendChild(video);
    return card;
  }
  var playerObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.play().catch(function () {});
      else entry.target.pause();
    });
  }, { root: gallery, threshold: 0.15 }) : null;

  function setDetails(project) {
    detailHeading.textContent = project.title;
    detailCategory.textContent = categoryLabel;
    detailTeaser.textContent = project.teaser;
    detailDescription.textContent = project.description;
    detailDisclosure.open = false;
    detailLink.removeAttribute('href');
    detailLink.hidden = true;
    relatedHeading.textContent = 'More from Prints';
    relatedGrid.replaceChildren();
    relatedEmpty.hidden = true;
  }
  function openCarousel(project, index, trigger) {
    var viewer = document.createElement('div');
    var controls = document.createElement('div');
    var dots = document.createElement('div');
    detailImage.hidden = true;
    detailVideo.pause();
    detailVideo.removeAttribute('src');
    detailVideo.load();
    detailVideo.hidden = true;
    hero.classList.add('has-branding-carousel', 'has-prints-carousel');
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
    setDetails(project);
    dialog.showModal();
    if (trigger) trigger.focus({ preventScroll: true });
  }
  function clearPrintCarousel() {
    var viewer = hero.querySelector('.work-carousel-viewport');
    var controls = hero.querySelector('.work-carousel-controls');
    if (viewer) viewer.remove();
    if (controls) controls.remove();
    hero.classList.remove('has-prints-carousel');
  }
  function openVideo(index, card) {
    var project = videos[index];
    if (!project) return;
    if (window.__openPortfolioDetail) window.__openPortfolioDetail(card, 'prints');
    detailVideo.controls = true;
    setDetails(project);
    detailVideo.play().catch(function () {});
  }
  order.forEach(function (entry) {
    var panelVisible = printPanel.getAttribute('aria-hidden') === 'false';
    var allCard = entry.type === 'group'
      ? makeCarouselCard(groups[entry.index], entry.index, true)
      : makeVideoCard(videos[entry.index], entry.index, true);
    var printCard = entry.type === 'group'
      ? makeCarouselCard(groups[entry.index], entry.index, panelVisible)
      : makeVideoCard(videos[entry.index], entry.index, panelVisible);
    allGrid.appendChild(allCard);
    printGrid.appendChild(printCard);
    if (playerObserver) {
      [allCard, printCard].forEach(function (card) {
        var video = card.querySelector('video');
        if (video) playerObserver.observe(video);
      });
    }
  });
  function intercept(event) {
    var videoCard = event.target.closest && event.target.closest('[data-prints-video-index]');
    var carouselCard = event.target.closest && event.target.closest('[data-prints-carousel-index]');
    if (videoCard && gallery.contains(videoCard)) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      if (event.type === 'keydown') event.preventDefault();
      event.preventDefault();
      event.stopImmediatePropagation();
      openVideo(Number(videoCard.getAttribute('data-prints-video-index')), videoCard);
      return;
    }
    if (carouselCard && gallery.contains(carouselCard)) {
      if (event.type === 'click' && carouselCard.__carouselSwipeClick) {
        carouselCard.__carouselSwipeClick = false;
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      if (event.type === 'keydown') event.preventDefault();
      event.preventDefault();
      event.stopImmediatePropagation();
      var index = Number(carouselCard.getAttribute('data-prints-carousel-index'));
      openCarousel(groups[index], index, carouselCard);
    }
  }
  gallery.addEventListener('click', intercept, true);
  gallery.addEventListener('keydown', intercept, true);
  dialog.addEventListener('close', clearPrintCarousel);
})();
