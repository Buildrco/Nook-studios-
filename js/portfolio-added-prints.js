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
  var printImages = [
    {
      title: 'MPhil Real Estate Branded Construction T-Shirt Mockup',
      teaser: 'A blue branded staff T-shirt for MPhil’s Real Estate.',
      description: 'A branded apparel mockup for MPhil’s Real Estate, with the company logo and construction, sales and rentals service details on a blue T-shirt.',
      src: '/images/portfolio/mphils-real-estate-branded-shirt.webp',
      alt: 'Blue MPhil’s Real Estate branded T-shirt with construction, sales and rentals details.'
    }
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

  function makeCarouselCard(project, index, visible) {
    var card = document.createElement('figure');
    var preview = document.createElement('div');
    var dots = document.createElement('span');
    card.className = 'work-item branding-carousel-card prints-carousel-card';
    card.setAttribute('data-prints-carousel-index', String(index));
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', visible ? '0' : '-1');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', 'Open ' + project.title + ', a ' + project.images.length + ' image carousel.');
    preview.className = 'prints-carousel-preview';
    project.images.forEach(function (slide) {
      var image = document.createElement('img');
      image.src = slide.src;
      image.alt = slide.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.draggable = false;
      preview.appendChild(image);
    });
    dots.className = 'branding-carousel-preview-dots';
    dots.setAttribute('aria-hidden', 'true');
    project.images.forEach(function (_, dotIndex) {
      var dot = document.createElement('span');
      if (dotIndex === 0) dot.className = 'is-active';
      dots.appendChild(dot);
    });
    card.appendChild(preview);
    card.appendChild(dots);
    preview.addEventListener('scroll', function () {
      var activeIndex = preview.clientWidth ? Math.round(preview.scrollLeft / preview.clientWidth) : 0;
      Array.prototype.forEach.call(dots.children, function (dot, dotIndex) { dot.classList.toggle('is-active', dotIndex === activeIndex); });
    }, { passive: true });
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
  function makeImageCard(project, index) {
    var card = document.createElement('figure');
    var image = document.createElement('img');
    card.className = 'work-item print-image-card';
    card.setAttribute('data-prints-image-index', String(index));
    card.setAttribute('data-project-title', project.title);
    card.setAttribute('data-project-teaser', project.teaser);
    card.setAttribute('data-project-description', project.description);
    card.setAttribute('data-work-category', 'prints');
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', 'Open ' + project.title);
    image.src = project.src;
    image.alt = project.alt;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.draggable = false;
    card.appendChild(image);
    return card;
  }
  var playerObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) entry.target.play().catch(function () {});
      else entry.target.pause();
    });
  }, { root: gallery, threshold: 0.15 }) : null;

  function setDetails(project, selectedType, selectedIndex) {
    detailHeading.textContent = project.title;
    detailCategory.textContent = categoryLabel;
    detailTeaser.textContent = project.teaser;
    detailDescription.textContent = project.description;
    detailDisclosure.open = false;
    detailLink.removeAttribute('href');
    detailLink.hidden = true;
    relatedHeading.textContent = 'More from Prints';
    relatedGrid.replaceChildren();
    groups.forEach(function (suggestion, index) {
      if (selectedType === 'group' && index === selectedIndex) return;
      var card = makeCarouselCard(suggestion, index, true);
      card.setAttribute('data-prints-suggestion-index', String(index));
      card.setAttribute('data-prints-suggestion-kind', 'group');
      relatedGrid.appendChild(card);
    });
    videos.forEach(function (suggestion, index) {
      if (selectedType === 'video' && index === selectedIndex) return;
      var card = makeVideoCard(suggestion, index, true);
      card.setAttribute('data-prints-suggestion-index', String(index));
      card.setAttribute('data-prints-suggestion-kind', 'video');
      var preview = card.querySelector('video');
      preview.autoplay = false;
      preview.preload = 'metadata';
      relatedGrid.appendChild(card);
    });
    relatedEmpty.hidden = relatedGrid.childElementCount > 0;
  }
  function openCarousel(project, index, trigger) {
    var wasOpen = dialog.open;
    clearPrintCarousel();
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
    setDetails(project, 'group', index);
    if (!wasOpen) dialog.showModal();
    if (!wasOpen && trigger) trigger.focus({ preventScroll: true });
    else viewer.focus({ preventScroll: true });
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
    clearPrintCarousel();
    hero.classList.remove('has-branding-carousel');
    if (window.__openPortfolioDetail) window.__openPortfolioDetail(card, 'prints');
    detailVideo.controls = true;
    setDetails(project, 'video', index);
    detailVideo.play().catch(function () {});
  }
  var printEmpty = printPanel.querySelector('.work-empty');
  if (printEmpty) printEmpty.remove();
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
  printImages.forEach(function (project, index) {
    allGrid.appendChild(makeImageCard(project, index));
    printGrid.appendChild(makeImageCard(project, index));
  });
  function intercept(event) {
    var suggestionCard = event.target.closest && event.target.closest('[data-prints-suggestion-index]');
    if (suggestionCard && relatedGrid.contains(suggestionCard)) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      var suggestionIndex = Number(suggestionCard.getAttribute('data-prints-suggestion-index'));
      if (suggestionCard.getAttribute('data-prints-suggestion-kind') === 'video') openVideo(suggestionIndex, suggestionCard);
      else openCarousel(groups[suggestionIndex], suggestionIndex, suggestionCard);
      return;
    }
    var imageCard = event.target.closest && event.target.closest('[data-prints-image-index]');
    if (imageCard && gallery.contains(imageCard)) {
      if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      clearPrintCarousel();
      hero.classList.remove('has-branding-carousel');
      if (window.__openPortfolioDetail) window.__openPortfolioDetail(imageCard, 'prints');
      return;
    }
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
  relatedGrid.addEventListener('click', intercept, true);
  relatedGrid.addEventListener('keydown', intercept, true);
  dialog.addEventListener('close', clearPrintCarousel);
})();
