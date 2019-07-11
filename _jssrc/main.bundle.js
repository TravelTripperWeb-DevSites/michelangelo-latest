'use strict';

//fallback ready document
function readyDoc(fn) {
  var d = document;
  d.readyState == 'loading' ? d.addEventListener('DOMContentLoaded', fn) : fn();
}

readyDoc(function () {

  var log = console.log;

  //To add a margin on scroll to "main" body block
  var mainBlock = document.querySelector(".main");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
      mainBlock.classList.add("stky");
    } else {
      mainBlock.classList.remove("stky");
    }
  });

  // Prevent Double Click on ipad and iphone devices
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    var elements = document.getElementsByClassName('btn--secondary');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchend', function () {});
    }
  }

  setTimeout(function () {
    var roomsList = document.querySelectorAll(".c-room-list__items .c-room");
    for (var _i = 0; _i < roomsList.length; _i++) {
      var sizeInFeet = Number(roomsList[_i].querySelector(".ttweb-room-size__value").innerHTML);
      var sizeInMeters = Math.round(sizeInFeet / 10.764);
      //log(sizeInMeters);
      roomsList[_i].querySelector(".size_in_meters").innerHTML = sizeInMeters;
      roomsList[_i].querySelector(".ttweb-room-size__units").innerHTML = "";
    }
  }, 5000);

  setTimeout(function () {
    if (document.getElementById("preloader")) {
      document.getElementById("preloader").style.display = "none";
    }
  }, 5500);

  document.addEventListener('click', function (event) {

    //For Readmore hidden text
    if (event.target.classList.contains('readmore-btn')) {
      if (event.target.parentNode.classList.contains("expanded")) {
        event.target.parentNode.classList.remove("expanded");
        event.target.innerHTML = "Read More <span class='far fa-plus'></span>";
      } else {
        event.target.parentNode.classList.add("expanded");
        event.target.innerHTML = "Read Less <span class='far fa-minus'></span>";
      }
    }

    //For footer accordion
    if (window.innerWidth <= 768 && event.target.classList.contains('toggle-items')) {

      if (event.target.classList.contains("expanded")) {
        event.target.classList.remove("expanded");
      } else {
        event.target.classList.add("expanded");
      }

      var next = event.target.nextElementSibling;
      if (next.style.display == "block") {
        next.style.display = "none";
      } else {
        next.style.display = "block";
      }
    }
  }, false);

  if (document.getElementsByClassName("services-slider__wrap")[0]) {
    var roomSlider = tns({
      container: '.services-slider__wrap',
      "items": 1,
      "slideBy": "page",
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      navContainer: "#servicesSlider",
      prevButton: "#servicesSliderPrev",
      nextButton: "#servicesSliderNext"
    });
  }

  var dwidth = window.innerWidth;

  if (dwidth < 768) {

    if (document.getElementsByClassName("amenities-slider")[0]) {
      var amenitiesSlider = tns({
        container: '.amenities-slider',
        "items": 1,
        "slideBy": "page",
        "mouseDrag": true,
        "swipeAngle": false,
        "speed": 400,
        "autoHeight": true,
        navContainer: "#amenitiesSlider",
        prevButton: "#amenitiesSliderPrev",
        nextButton: "#amenitiesSliderNext"
      });
    }
  }
});

function pinterestShare(img, desc) {
  window.open("//www.pinterest.com/pin/create/button/" + "?url=" + window.location.href + "&media=" + img + "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
  return false;
}
