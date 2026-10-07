(function(){
"use strict";
if(window.__nookLibraryPreloaderV3)return;window.__nookLibraryPreloaderV3=true;
var API="https://ui.watermelon.sh/api/v1/catalog/entries";
var MIRROR="https://raw.githubusercontent.com/WatermelonCorp/watermellon-registry/main/public/r/";
var CATALOG_KEY="buildr-code-library-catalog-v1";
var TIMES_KEY="buildr-watermelon-registry-cache-times-v1";
var REGISTRY_CACHE="buildr-watermelon-registry-v1";
var RUNTIME_CACHE="buildr-code-library-runtime-v1";
var SHELL_CACHE="nook-code-library-shell-v1";
var TTL=21600000;
var HIDDEN=new Set(["expand details","floating disclosure","feature tour","family wallet","family receive button","extended toolbar","dropdown disclosure","draw signature","discrete tabs","dialog stack","collection grid disclosure","card split accordian","card split accordion","aave swap component"]);
var CORE=["https://esm.sh/react@18.3.1","https://esm.sh/react-dom@18.3.1?external=react","https://esm.sh/react-dom@18.3.1/client?external=react","https://esm.sh/react@18.3.1/jsx-runtime","https://esm.sh/react@18.3.1/jsx-dev-runtime","https://esm.sh/clsx@2.1.1","https://esm.sh/tailwind-merge@2.6.0"];
var SCRIPTS=["https://unpkg.com/@babel/standalone@7/babel.min.js","https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4","https://cdn.jsdelivr.net/npm/tw-animate-css@1.3.0/dist/tw-animate.css"];
function normalize(value){return String(value||"").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();}
function visible(item){return !HIDDEN.has(normalize(item&&item.title))&&!HIDDEN.has(normalize(item&&item.slug));}
function titleSort(a,b){return String(a.title||"").localeCompare(String(b.title||""));}
function readStore(){try{return JSON.parse(localStorage.getItem(CATALOG_KEY)||"{}");}catch(error){return {};}}
function keyFor(kinds){return JSON.stringify([kinds,"",""]);}
function saved(key){var record=readStore()[key];return record&&Array.isArray(record.entries)?record.entries:null;}
function saveCatalog(components,animated){
  var comp=(components||[]).filter(visible).map(function(item){if(!item.kind)item.kind="components";return item;}).sort(titleSort);
  var anim=(animated||[]).filter(visible).map(function(item){if(!item.kind)item.kind="animated-components";return item;}).sort(titleSort);
  var now=Date.now(),store=readStore(),all=anim.concat(comp);
  store[keyFor(["components"]) ]={savedAt:now,entries:comp};
  store[keyFor(["animated-components"]) ]={savedAt:now,entries:anim};
  store[keyFor(["components","animated-components"]) ]={savedAt:now,entries:all};
  var keys=Object.keys(store).sort(function(a,b){return Number(store[b].savedAt||0)-Number(store[a].savedAt||0);}).slice(0,4),compact={};
  keys.forEach(function(key){compact[key]=store[key];});
  try{localStorage.setItem(CATALOG_KEY,JSON.stringify(compact));}catch(error){}
  return all;
}
function savedAll(){var all=saved(keyFor(["components","animated-components"]));if(all)return all;return (saved(keyFor(["animated-components"]))||[]).concat(saved(keyFor(["components"]))||[]);}
function readTimes(){try{return JSON.parse(localStorage.getItem(TIMES_KEY)||"{}");}catch(error){return {};}}
function saveTime(slug,time){var times=readTimes();times[slug]=time;try{localStorage.setItem(TIMES_KEY,JSON.stringify(times));}catch(error){}}
function sourceUrl(slug){return MIRROR+encodeURIComponent(slug)+".json";}
async function fetchRegistry(item,cache,times){
  var url=sourceUrl(item.slug),response=null,data=null,time=Number(times[item.slug]||0);
  try{response=await cache.match(url);if(response){data=await response.clone().json();time=Number(response.headers.get("X-Buildr-Cached-At"))||time;}}catch(error){}
  if(response&&data&&time&&Date.now()-time<TTL)return data;
  if(navigator.onLine===false)return data;
  try{var fresh=await fetch(url,{headers:{Accept:"application/json"},credentials:"omit",cache:response?"reload":"default"});if(fresh.ok){var next=await fresh.clone().json();if(next&&Array.isArray(next.files)){await cache.put(url,fresh.clone());saveTime(item.slug,Date.now());return next;}}}catch(error){}
  return data;
}
function sourceImports(code){var found=[],rx=/\bfrom\s*["']([^"']+)["']|^\s*import\s*["']([^"']+)["']/gm,match;while((match=rx.exec(code||"")))found.push(match[1]||match[2]);return found;}
function packageUrl(spec){var core={react:CORE[0],"react-dom":CORE[1],"react-dom/client":CORE[2],"react/jsx-runtime":CORE[3],"react/jsx-dev-runtime":CORE[4]};if(core[spec])return core[spec];if(/^https?:\/\//i.test(spec))return spec;if(spec.charAt(0)==="."||spec.charAt(0)==="/")return null;return "https://esm.sh/"+spec+"?external=react,react-dom";}
async function warmScript(url,cache){try{if(await cache.match(url))return;var mode=/\.css(?:\?|$)/i.test(url)?"cors":"no-cors";var response=await fetch(url,{mode:mode,credentials:"omit"});if(response.ok||response.type==="opaque")await cache.put(url,response.clone());}catch(error){}}
async function warmModuleGraph(roots,cache){
  var queue=roots.map(function(url){return{url:url,depth:0};}),seen=new Set(),cursor=0,maximum=500;
  async function worker(){
    while(cursor<queue.length&&seen.size<maximum){
      var task=queue[cursor++];if(seen.has(task.url))continue;seen.add(task.url);
      try{
        var response=await cache.match(task.url);
        if(!response){response=await fetch(task.url,{mode:"cors",credentials:"omit"});if(!response.ok)continue;await cache.put(task.url,response.clone());}
        if(task.depth>=7)continue;
        var text=await response.clone().text(),rx=/\b(?:from\s*|import\s*\(\s*|import\s*)["']([^"']+)["']/g,match;
        while((match=rx.exec(text))){
          var spec=match[1],next=null;
          try{next=packageUrl(spec)||new URL(spec,task.url).href;}catch(error){}
          if(next&&/^https:\/\/esm\.sh\//i.test(next)&&!seen.has(next))queue.push({url:next,depth:task.depth+1});
        }
      }catch(error){}
    }
  }
  await Promise.all([worker(),worker(),worker(),worker()]);
}
async function run(){
  try{if(navigator.serviceWorker)navigator.serviceWorker.register("/code-library-worker.js",{scope:"/"}).catch(function(){});}catch(error){}
  try{var shell=await caches.open(SHELL_CACHE);fetch("/code-library/",{credentials:"same-origin"}).then(function(response){if(response.ok)return shell.put("/code-library/",response.clone());}).catch(function(){});}catch(error){}
  var oldComponents=saved(keyFor(["components"])),oldAnimated=saved(keyFor(["animated-components"]));
  var lists=await Promise.all(["components","animated-components"].map(async function(kind){
    var url=API+"?kind="+encodeURIComponent(kind)+"&limit=50";
    try{
      var response=await fetch(url,{headers:{Accept:"application/json"},credentials:"omit",cache:"reload"});
      if(!response.ok)throw new Error("catalog unavailable");
      var runtime=await caches.open(RUNTIME_CACHE);await runtime.put(url,response.clone());
      var payload=await response.json();return Array.isArray(payload.entries)?payload.entries.map(function(item){if(!item.kind)item.kind=kind;return item;}):null;
    }catch(error){return null;}
  }));
  var components=lists[0]||oldComponents||[],animated=lists[1]||oldAnimated||[];
  var entries=saveCatalog(components,animated);if(!entries.length)return;
  var registryCache=await caches.open(REGISTRY_CACHE),runtimeCache=await caches.open(RUNTIME_CACHE),times=readTimes(),roots=new Set(CORE),sourceQueue=entries.slice(),queuedSlugs=new Set(entries.map(function(item){return item.slug;})),index=0;
  async function registryWorker(){
    while(index<sourceQueue.length){
      var item=sourceQueue[index++];if(!item||!item.slug)continue;
      var data=await fetchRegistry(item,registryCache,times);if(!data||!Array.isArray(data.files))continue;
      (data.registryDependencies||[]).forEach(function(dependency){var name=String(dependency||"").split("/").pop();if(name&&name!=="utils"&&/^[a-z0-9][a-z0-9-]*$/i.test(name)&&!queuedSlugs.has(name)){queuedSlugs.add(name);sourceQueue.push({slug:name,kind:item.kind});}});
      data.files.forEach(function(file){
        if(!file||typeof file.content!=="string")return;
        sourceImports(file.content).forEach(function(spec){
          if(spec.indexOf("@/")===0||spec.indexOf(".")===0){var local=spec.split("/").pop().replace(/\.(tsx?|jsx?)$/i,"");if(local&&local!=="utils"&&/^[a-z0-9][a-z0-9-]*$/i.test(local)&&!queuedSlugs.has(local)){queuedSlugs.add(local);sourceQueue.push({slug:local,kind:item.kind});}return;}
          if(/\.css$/i.test(spec)||/^https?:\/\//i.test(spec))return;
          if(["react","react-dom","react-dom/client","react/jsx-runtime","react/jsx-dev-runtime"].indexOf(spec)>=0)return;
          var url=packageUrl(spec);if(url)roots.add(url);
        });
      });
    }
  }
  var staticWarm=Promise.all(SCRIPTS.map(function(url){return warmScript(url,runtimeCache);}));
  await Promise.all([registryWorker(),registryWorker(),registryWorker(),registryWorker(),registryWorker()]);
  await staticWarm;await warmModuleGraph(Array.from(roots),runtimeCache);
}
var pending=null;
function start(){if(!pending)pending=run().catch(function(){}).finally(function(){pending=null;});return pending;}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",function(){setTimeout(start,120);},{once:true});else setTimeout(start,120);
window.addEventListener("online",start);
})();
(function(){
  var footerScript=document.createElement("script");
  footerScript.src="/js/site-footer.js";
  footerScript.defer=true;
  document.head.appendChild(footerScript);
})();
(function(){
  if(!document.getElementById("nook-growth-card-styles")){
    var style=document.createElement("style");
    style.id="nook-growth-card-styles";
    style.textContent=".nook-growth-section{height:auto!important;min-height:0!important}.nook-growth-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;justify-content:center!important;gap:24px!important;width:100%!important;max-width:488px!important;margin-left:auto!important;margin-right:auto!important}.nook-growth-grid>div{width:100%!important;max-width:100%!important;min-width:0!important}.nook-growth-grid>div>div:first-child{width:100%!important;height:312px!important;background:#f1f3f5!important}.nook-growth-grid h3,.nook-growth-grid p{color:#27313a!important}@media(max-width:540px){.nook-growth-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;max-width:100%!important;gap:12px!important;padding:0 10px!important;box-sizing:border-box!important}.nook-growth-grid>div>div:first-child{height:300px!important;padding:12px!important}.nook-growth-grid h3{font-size:16px!important;line-height:1.15!important}.nook-growth-grid p{font-size:12px!important;line-height:1.3!important}}";
    document.head.appendChild(style);
  }
  function apply(){
    var heading=Array.from(document.querySelectorAll("span")).find(function(node){return node.textContent.trim()==="Everything Your Brand Needs to Grow.";});
    if(!heading||!heading.parentElement)return;
    var section=heading.closest("section");
    var grid=heading.parentElement.nextElementSibling;
    if(!grid)return;
    if(section){section.classList.add("nook-growth-section");section.style.setProperty("height","auto","important");section.style.setProperty("min-height","0","important");}
    grid.classList.add("nook-growth-grid");
    grid.style.setProperty("display","grid","important");
    grid.style.setProperty("grid-template-columns","repeat(2,minmax(0,1fr))","important");
    grid.style.setProperty("justify-content","center","important");
    grid.style.setProperty("gap",window.innerWidth<=540?"12px":"24px","important");
    grid.style.setProperty("width","100%","important");
    grid.style.setProperty("max-width",window.innerWidth<=540?"100%":"488px","important");
    grid.style.setProperty("padding",window.innerWidth<=540?"0 10px":"0","important");
    grid.style.setProperty("box-sizing","border-box","important");
    grid.style.setProperty("margin-left","auto","important");
    grid.style.setProperty("margin-right","auto","important");
    Array.from(grid.children).forEach(function(card){
      card.style.setProperty("width","100%","important");
      card.style.setProperty("max-width","100%","important");
      card.style.setProperty("min-width","0","important");
      var face=card.firstElementChild;
      if(face){
        face.style.setProperty("width","100%","important");
        face.style.setProperty("height",window.innerWidth<=540?"300px":"312px","important");
        face.style.setProperty("background-color","#f1f3f5","important");
        if(window.innerWidth<=540){
          face.style.setProperty("padding","12px","important");
          var imageFrame=face.querySelector(".relative.z-10")&&face.querySelector(".relative.z-10").firstElementChild;
          if(imageFrame){imageFrame.style.setProperty("height","60%","important");imageFrame.style.setProperty("margin-bottom","8px","important");}
        }
      }
      card.querySelectorAll("h3,p").forEach(function(text){
        text.style.setProperty("color","#27313a","important");
        if(window.innerWidth<=540)text.style.setProperty("font-size",text.tagName==="H3"?"16px":"12px","important");
      });
    });
  }
  apply();
  window.addEventListener("resize",apply);
  if(document.body)new MutationObserver(apply).observe(document.body,{childList:true,subtree:true});
})();