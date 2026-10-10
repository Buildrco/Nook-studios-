(function(){
  "use strict";
  var projects=[
    {category:"motion-graphics",title:"Motion Graphics/Animation — Project 2",teaser:"Motion graphics and animation portfolio video.",description:"Motion graphics and animation work from Nook Studios.",src:"/images/motion/2.....mp4"},
    {category:"motion-graphics",title:"Motion Graphics/Animation — October 1, 2026",teaser:"Motion graphics and animation portfolio video.",description:"Motion graphics and animation work from Nook Studios.",src:"/images/motion/2026-10-01-011035676.mp4"},
    {category:"motion-graphics",title:"Motion Graphics/Animation — October 10, 2026",teaser:"Motion graphics and animation portfolio video.",description:"Motion graphics and animation work from Nook Studios.",src:"/images/motion/lv_0_20261010020622.mp4"},
    {category:"video-production",title:"Video Production — Project 1",teaser:"Video production portfolio project.",description:"Video production work from Nook Studios.",src:"/images/motion/e2b6364cbe523164a51b026d0d357358_720w.mp4"},
    {category:"video-production",title:"Video Production — Project 2",teaser:"Video production portfolio project.",description:"Video production work from Nook Studios.",src:"/images/motion/lv_0_20261010020323.mp4"},
    {category:"video-production",title:"Video Production — @jedibwoy",teaser:"Video production project supplied to Nook Studios.",description:"A video production project supplied to Nook Studios.",src:"/images/motion/video-production-jedibwoy-2026-10-10.mp4"},
    {category:"video-production",title:"Video Production — @graceisabundance07",teaser:"Video production project supplied to Nook Studios.",description:"A video production project supplied to Nook Studios.",src:"/images/motion/video-production-graceisabundance07-2026-10-10.mp4"}
  ];
  var gallery=document.getElementById("work-gallery"),allGrid=document.querySelector("#work-panel-all .work-grid");
  if(!gallery||!allGrid)return;
  function makeCard(project,visible){
    var card=document.createElement("figure"),video=document.createElement("video");
    card.className="work-item print-video-card";card.setAttribute("data-work-category",project.category);card.setAttribute("data-project-title",project.title);card.setAttribute("data-project-teaser",project.teaser);card.setAttribute("data-project-description",project.description);card.setAttribute("role","button");card.setAttribute("tabindex",visible?"0":"-1");card.setAttribute("aria-haspopup","dialog");card.setAttribute("aria-label","Open "+project.title);
    video.className="print-video-preview";video.src=project.src;video.setAttribute("aria-label",project.title);video.autoplay=true;video.muted=true;video.loop=true;video.playsInline=true;video.preload="metadata";video.draggable=false;card.appendChild(video);return card;
  }
  var observer="IntersectionObserver" in window?new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting)entry.target.play().catch(function(){});else entry.target.pause();});},{root:gallery,threshold:0.15}):null;
  projects.forEach(function(project){var panel=document.getElementById("work-panel-"+project.category),grid=panel&&panel.querySelector(".work-grid");if(!grid)return;if(project.category==="video-production"){var empty=grid.querySelector(".work-empty");if(empty)empty.remove();}var allCard=makeCard(project,true),categoryCard=makeCard(project,false);allGrid.appendChild(allCard);grid.appendChild(categoryCard);if(observer){observer.observe(allCard.querySelector("video"));observer.observe(categoryCard.querySelector("video"));}});
})();
