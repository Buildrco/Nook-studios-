(function () {
  var categoryLabel = 'Photography';
  var projects = [
    {
      image: '/images/portfolio/portrait-session-red-backdrop-01.webp',
      title: 'Studio Portrait in White and Gold — Standing',
      teaser: 'A studio portrait framed by a vivid red backdrop and white-and-gold styling.',
      description: 'We captured the portrait against a bold red backdrop, balancing soft studio light with detailed white-and-gold styling. The challenge was keeping the vivid color and accessories clear without pulling focus from the subject.'
    },
    {
      image: '/images/portfolio/portrait-session-red-backdrop-02.webp',
      title: 'Studio Portrait in White and Gold — Seated',
      teaser: 'A seated portrait with soft studio light and a rich red backdrop.',
      description: 'We framed a seated portrait to highlight the outfit and gold details against the red background. The challenge was balancing the strong backdrop and layered accessories while keeping the composition natural.'
    },
    {
      image: '/images/portfolio/portrait-session-red-backdrop-03.webp',
      title: 'Studio Portrait in White and Gold — Close Frame',
      teaser: 'A closer portrait focused on expression, styling and detail.',
      description: 'We used a tighter composition to bring attention to expression and the outfit’s gold details. The challenge was keeping the red background bold while preserving a clean portrait.'
    },
    {
      image: '/images/portfolio/podcast-studio-portrait.webp',
      title: 'Podcast Studio Portrait',
      teaser: 'A relaxed portrait that keeps the microphone and studio setting in frame.',
      description: 'We photographed the subject in the recording setup, using the microphone and lettered backdrop to preserve the studio’s character. The challenge was balancing the close frame with the surrounding equipment.'
    },
    {
      image: '/images/portfolio/outdoor-lifestyle-portrait.webp',
      title: 'Outdoor Portrait',
      teaser: 'A natural-light portrait framed by greenery and a tropical setting.',
      description: 'We used natural light and the surrounding greenery for a relaxed outdoor portrait. The challenge was keeping the subject crisp while retaining the detail and color of the leafy background.'
    }
  ];

  var gallery = document.getElementById('work-gallery');
  var allGrid = document.querySelector('#work-panel-all .work-grid');
  var photoPanel = document.getElementById('work-panel-photography');
  var photoGrid = photoPanel && photoPanel.querySelector('.work-grid');
  var filter = document.getElementById('work-tab-photography');

  if (!gallery || !allGrid || !photoGrid || !filter) return;

  photoGrid.querySelectorAll('.work-empty').forEach(function (empty) {
    empty.remove();
  });

  function createCard(project, index) {
    var card = document.createElement('figure');
    var image = document.createElement('img');
    card.className = 'work-item';
    card.setAttribute('data-photography-index', String(index));
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

  var cards = [];
  projects.forEach(function (project, index) {
    var allCard = createCard(project, index);
    var photoCard = createCard(project, index);
    allGrid.appendChild(allCard);
    photoGrid.appendChild(photoCard);
    cards.push(allCard, photoCard);
  });

  function syncTabStops() {
    cards.forEach(function (card) {
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

  function getIndex(target) {
    var card = target.closest('[data-photography-index]');
    return card ? Number(card.getAttribute('data-photography-index')) : -1;
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
    detailLink.hidden = true;
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

  function intercept(event) {
    var index = getIndex(event.target);
    if (index < 0) return;
    if (event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ') return;
    if (event.type === 'keydown') event.preventDefault();
    event.preventDefault();
    event.stopImmediatePropagation();
    openProject(index, event.target.closest('[data-photography-index]'));
  }

  gallery.addEventListener('click', intercept, true);
  gallery.addEventListener('keydown', intercept, true);
  relatedGrid.addEventListener('click', intercept, true);
  relatedGrid.addEventListener('keydown', intercept, true);
  dialog.addEventListener('close', function () {
    if (lastTrigger && document.contains(lastTrigger)) {
      lastTrigger.focus({ preventScroll: true });
    }
  });
})();
