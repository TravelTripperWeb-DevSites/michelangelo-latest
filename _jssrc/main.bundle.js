'use strict';

//fallback ready document
function readyDoc(fn) {
  var d = document;
  d.readyState == 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn();
}

readyDoc(function () {

  //To add a margin on scroll to "main" body block
  var mainBlock = document.querySelector(".main");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      mainBlock.classList.add("stky");
    } else {
      mainBlock.classList.remove("stky");
    }
  });
});

function pinterestShare(img, desc) {
  window.open("//www.pinterest.com/pin/create/button/" + "?url=" + window.location.href + "&media=" + img + "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
  return false;
}
