"use strict";
var SHELL_CACHE="nook-code-library-shell-v1";
var RUNTIME_CACHE="buildr-code-library-runtime-v1";
var REGISTRY_CACHE="buildr-watermelon-registry-v1";
var LIBRARY_ROUTE="/code-library/";
function cacheFor(url){
  if(url.origin===self.location.origin&&(url.pathname==="/code-library-preload.js"||url.pathname==="/logo.svg"||url.pathname==="/favicon.svg"))return RUNTIME_CACHE;
  if(url.hostname==="raw.githubusercontent.com"&&url.pathname.indexOf("/WatermelonCorp/watermellon-registry/")>=0)return REGISTRY_CACHE;
  if(url.hostname==="ui.watermelon.sh"&&url.pathname.indexOf("/api/v1/catalog/entries")===0)return RUNTIME_CACHE;
  if(url.hostname==="esm.sh"||url.hostname==="unpkg.com"||url.hostname==="cdn.jsdelivr.net")return RUNTIME_CACHE;
  return null;
}
self.addEventListener("install",function(event){
  event.waitUntil((async function(){
    try{var cache=await caches.open(SHELL_CACHE);var response=await fetch(LIBRARY_ROUTE,{cache:"reload"});if(response.ok)await cache.put(LIBRARY_ROUTE,response.clone());}catch(error){}
    try{var assets=await caches.open(RUNTIME_CACHE);await Promise.all(["/code-library-preload.js","/logo.svg","/favicon.svg"].map(async function(path){try{var response=await fetch(path,{cache:"reload"});if(response.ok)await assets.put(path,response.clone());}catch(error){}}));}catch(error){}
    await self.skipWaiting();
  })());
});
self.addEventListener("activate",function(event){
  event.waitUntil((async function(){
    var keys=await caches.keys();
    await Promise.all(keys.filter(function(key){return key.indexOf("nook-code-library-shell-")===0&&key!==SHELL_CACHE;}).map(function(key){return caches.delete(key);}));
    await self.clients.claim();
  })());
});
self.addEventListener("fetch",function(event){
  var request=event.request;if(request.method!=="GET")return;var url=new URL(request.url);
  if(request.mode==="navigate"&&url.origin===self.location.origin&&(url.pathname==="/code-library"||url.pathname.indexOf("/code-library/")===0)){
    event.respondWith((async function(){var cache=await caches.open(SHELL_CACHE);try{var response=await fetch(request);if(response.ok)await cache.put(LIBRARY_ROUTE,response.clone());return response;}catch(error){var saved=await cache.match(LIBRARY_ROUTE);return saved||new Response("This device has not cached the Code Library yet. Open it once online to prepare offline use.",{status:503,headers:{"Content-Type":"text/plain; charset=utf-8"}});}})());return;
  }
  var bucket=cacheFor(url);if(!bucket)return;
  event.respondWith((async function(){
    var cache=await caches.open(bucket);var saved=await cache.match(request);
    if(saved&&request.cache!=="reload")return saved;
    try{var response=await fetch(request);if(response.ok||response.type==="opaque")try{await cache.put(request,response.clone());}catch(error){}return response;}catch(error){return saved||Response.error();}
  })());
});