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
    if (window.scrollY > 0) {
      mainBlock.classList.add("stky");
    } else {
      mainBlock.classList.remove("stky");
    }
  });

  // converting room size from square feet to square meters in room listing page

  // Prevent Double Click on ipad and iphone devices
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    var elements = document.getElementsByClassName('btn--secondary');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('touchend', function() {});
    }
  }



  setTimeout(function() {
    var roomsList = document.querySelectorAll(".c-room");
    for (let i = 0; i < roomsList.length; i++) {
      var sizeInFeet = roomsList[i].querySelector(".c-room .size_in_feet .ttweb-room-size__value").innerHTML;
      //console.log(roomsList[i].querySelector(".c-room .size_in_feet").innerHTML);
      console.log(roomsList[i].querySelector(".c-room .size_in_feet .ttweb-room-size__value").innerHTML);
      var sizeInMeters = Math.round(sizeInFeet / 10.764);
      //log(sizeInMeters);
      roomsList[i].querySelector(".size_in_meters").innerHTML = sizeInMeters+"M<sup>2</sup>";
    //  roomsList[i].querySelector(".ttweb-room-size__units").innerHTML = "";
    }
  }, 5000);

  setTimeout(function() {
    if (document.getElementById("preloader")) {
      document.getElementById("preloader").style.display = "none";
    }
  }, 5500);

  // converting room size from square feet to square meters in room details page

  setTimeout(function() {
    if (document.querySelector(".room-details-intro")) {
      document.querySelector(".room-details-intro .size_in_meters").innerHTML = Math.round(document.querySelector(".room-details-intro .size_in_feet")
        .innerText.match(/\d+/g)
        .map(Number)[0] / 10.764)+"M<sup>2</sup>";
    }
  }, 2000);

  document.addEventListener('click', function(event) {

    //For Readmore hidden text
    if (event.target.classList.contains('readmore-btn')) {
      if (event.target.parentNode.classList.contains("expanded")) {
        event.target.parentNode.classList.remove("expanded");
        event.target.innerHTML = "Read More <span class='far fa-plus'></span>";
      } else {
        event.target.parentNode.classList.add("expanded");
        event.target.innerHTML = "Read Less <span class='far fa-minus'></span>";
        event.target.parentNode.getElementsByClassName("morecontent")[0].focus();
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

  //TopBar DropDown
  document.querySelector('.dropnav-button').addEventListener('click', function() {
    // Toggle the CSS closed class which reduces the height of the UL thus
    // hiding all LI apart from the first
    this.parentNode.parentNode.classList.toggle('closed')
  }, false);

  setTimeout(function() {
    if (document.getElementsByClassName("room-item")[0]) {
      var bannerSlider = tns({
        container: '.room-item',
        "items": 1,
        "slideBy": "page",
        "mouseDrag": true,
        "swipeAngle": false,
        "speed": 400,
        navContainer: "#bannerSlider",
        prevButton: "#bannerSliderPrev",
        nextButton: "#bannerSliderNext",
      });
    }
  }, 2000);
  setTimeout(function() {
    if (document.getElementById("arrival-date")) {
      var arrivalDateField = document.getElementById("arrival-date");
      var departureDateField = document.getElementById("departure-date");

      var todaysDate = new Date();
      var todaysDateFormatted = formatDate(todaysDate);

      var tomorrowsDate = todaysDate.setDate(todaysDate.getDate() + 1);
      var tomorrowsDateFormatted = formatDate(tomorrowsDate);

      arrivalDateField.value = todaysDateFormatted;
      departureDateField.value = tomorrowsDateFormatted;

      arrivalDateField.onchange = function() {
        var updatedArrivalDate = new Date(arrivalDateField.value);
        var updatedDepartureDate = updatedArrivalDate.setDate(updatedArrivalDate.getDate() + 1);
        var updatedDepartureDateFormatted = formatDate(updatedDepartureDate);
        departureDateField.value = updatedDepartureDateFormatted;
      }

    }
  }, 2000);
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
      nextButton: "#servicesSliderNext",
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
        nextButton: "#amenitiesSliderNext",
      });
    }
  }

});

// Pinterest Share

function pinterestShare(img, desc) {
  window.open("//www.pinterest.com/pin/create/button/" +
    "?url=" + window.location.href +
    "&media=" + img +
    "&description=" + desc, "pinIt", "toolbar=no, scrollbars=no, resizable=no, top=0, right=0");
  return false;
}


function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
