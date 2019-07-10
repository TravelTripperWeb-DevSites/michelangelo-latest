//fallback ready document
function readyDoc(fn) {
  var d = document;
  (d.readyState == 'loading') ? d.addEventListener('DOMContentLoaded', fn): fn();
}

readyDoc(function() {

  var log = console.log;

  //To add a margin on scroll to "main" body block
  var mainBlock = document.querySelector(".main");
  window.addEventListener("scroll", function() {
    if(window.scrollY > 0) {
      mainBlock.classList.add("stky");
    } else {
      mainBlock.classList.remove("stky");
    }
  });

  // Prevent Double Click on ipad and iphone devices
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    var elements = document.getElementsByClassName('btn--secondary');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchend', function() {});
    }
  }

  //Footer Accordion Menu
  function toggleDocs(event) {
    if (window.innerWidth <= 768 && event.target && event.target.className == 'accordion') {
      var next = event.target.nextElementSibling;
      if (next.style.display == "block") {
        next.style.display = "none";
      } else {
        next.style.display = "block";
      }
    }
  }
  document.addEventListener('click', toggleDocs, true);

  setTimeout(function() {
    var roomsList = document.querySelectorAll(".c-room-list__items .c-room");
    for(let i = 0; i < roomsList.length; i++ ) {
      var sizeInFeet = Number(roomsList[i].querySelector(".ttweb-room-size__value").innerHTML);
      var sizeInMeters = Math.round(sizeInFeet/10.764);
      //log(sizeInMeters);
      roomsList[i].querySelector(".size_in_meters").innerHTML = sizeInMeters;
      roomsList[i].querySelector(".ttweb-room-size__units").innerHTML = "";
    }
  }, 5000);

  setTimeout(function() {
    if(document.getElementById("preloader")) {
      document.getElementById("preloader").style.display = "none";
    }
  }, 5500);

  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('readmore-btn')) {
      if (event.target.parentNode.classList.contains("expanded")) {
        event.target.parentNode.classList.remove("expanded");
        event.target.innerHTML = "Read More +";
      } else {
        event.target.parentNode.classList.add("expanded");
        event.target.innerHTML = "Read Less -";
      }
    }
  }, false);

});
