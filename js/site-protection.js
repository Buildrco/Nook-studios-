(function(){
  "use strict";
  if(window.__nookCopyDeterrentsInstalled)return;
  window.__nookCopyDeterrentsInstalled=true;
  function isEditable(target){return !!(target&&target.closest&&target.closest("input,textarea,select,[contenteditable=true],[role=textbox]"));}
  function stopOutsideForms(event){if(!isEditable(event.target))event.preventDefault();}
  document.addEventListener("contextmenu",stopOutsideForms,true);
  document.addEventListener("copy",stopOutsideForms,true);
  document.addEventListener("cut",stopOutsideForms,true);
  document.addEventListener("selectstart",stopOutsideForms,true);
  document.addEventListener("dragstart",function(event){var target=event.target; if(target&&target.closest&&target.closest("img,video,a[href]"))event.preventDefault();},true);
  document.addEventListener("keydown",function(event){
    if(isEditable(event.target))return;
    var key=String(event.key||"").toLowerCase(),mod=event.ctrlKey||event.metaKey;
    if(event.key==="F12"||(mod&&["u","s","p"].includes(key))||(mod&&event.shiftKey&&["i","j","c"].includes(key))){event.preventDefault();event.stopImmediatePropagation();}
  },true);
  function protectMedia(node){if(!node||node.nodeType!==1)return;var media=[];if(node.matches&&node.matches("img,video"))media.push(node);if(node.querySelectorAll)media=media.concat(Array.prototype.slice.call(node.querySelectorAll("img,video")));media.forEach(function(item){item.draggable=false;item.setAttribute("draggable","false");if(item.tagName==="VIDEO"){item.setAttribute("controlslist","nodownload noremoteplayback");item.setAttribute("disablepictureinpicture","");item.setAttribute("disableremoteplayback","");item.disablePictureInPicture=true;item.disableRemotePlayback=true;}});}
  var style=document.createElement("style");style.id="nook-site-copy-deterrents";style.textContent="img,video{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-user-drag:none}";document.head.appendChild(style);
  protectMedia(document.documentElement);
  if(document.body&&window.MutationObserver)new MutationObserver(function(records){records.forEach(function(record){record.addedNodes.forEach(protectMedia);});}).observe(document.body,{childList:true,subtree:true});
})();
