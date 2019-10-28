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
    for (var i = 0; i < roomsList.length; i++) {
      var sizeInFeet = "";
      if(roomsList[i].querySelector(".c-room .size_in_feet .ttweb-room-size__value")) {
        sizeInFeet = roomsList[i].querySelector(".c-room .size_in_feet .ttweb-room-size__value").innerText.replace(" FT2", "");
      } else {
        sizeInFeet = roomsList[i].querySelector(".c-room .size_in_feet").innerText.replace(" FT2", "");
      }
    //  console.log(sizeInFeet);
      //console.log(roomsList[i].querySelector(".c-room .size_in_feet .ttweb-room-size__value").innerHTML);
      var sizeInMeters = Math.round(sizeInFeet / 10.764);
      //log(sizeInMeters);
      roomsList[i].querySelector(".size_in_meters").innerHTML = sizeInMeters+"M<sup>2</sup>";
    //  roomsList[i].querySelector(".ttweb-room-size__units").innerHTML = "";
    }
  }, 3000);

  setTimeout(function() {
    if (document.getElementById("preloader")) {
      document.getElementById("preloader").style.display = "none";
    }
  }, 2500);

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

  function roomSlider() {
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
    },2000);
  };
  roomSlider();

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

  ttwebHotel.ready(function() {
    // dynamic offer details
    if(window.location.href.indexOf('/offers/offer/#') != -1) {
      var dynamicOfferCode = window.location.hash.toString().replace("#","");
      var offerDetailComponentDivs = document.querySelectorAll('[data-dynamic-offer-details=true]');
      if(offerDetailComponentDivs && offerDetailComponentDivs.length > 0 && dynamicOfferCode && dynamicOfferCode != '') {

            var offers = ttwebHotel.offersList;
            var nextOffer = null;
            if (offers.length > 1) {
              for(var i=0,ii=offers.length;i<ii;i++) {
                if(offers[i].ratePlanCode == dynamicOfferCode) {
                  setTimeout(function() {
                    var pinterestLink = document.querySelector(".pinterestShare");
                    pinterestLink.addEventListener('click', function (event) {
                      pinterestShare(offers[i].images[0].urls.large, encodeURI(offers[i].ratePlanName));
                    });
                  }, 1000)

                  var offerCodeInput = document.querySelector(".room-booking-widget [name='rate_code']");
                  if(offerCodeInput) {
                    offerCodeInput.value = dynamicOfferCode;
                  }
                }
              }
            }
            for (var i=0,ii=offerDetailComponentDivs.length;i<ii;i++) {
              var props = {
                hotel: ttwebHotel,
                rateCode: dynamicOfferCode,
                innerHTML: offerDetailComponentDivs[i].innerHTML
              }
              var offerItem = TTRender.e(TTRender.Offer, props)
              TTRender.renderInElement(offerDetailComponentDivs[i], offerItem)
            }
      }

    }
    // dynamic room details
    if(window.location.href.indexOf('/rooms/room/#') != -1) {
      var dynamicRoomCode = window.location.hash.toString().replace("#","");
      var roomDetailComponentDivs = document.querySelectorAll('[data-dynamic-room-details=true]');

      var roomDetailADADivs  = document.querySelectorAll('[data-dynamic-room-check-ada=true]')
      var roomImageSlider    = document.getElementById('bannerSlider');
      var roomImageSliderNav = roomImageSlider.innerHTML.trim();

      if(roomDetailComponentDivs && roomDetailComponentDivs.length > 0 && dynamicRoomCode && dynamicRoomCode != '') {
        var rooms = ttwebHotel.roomsList;
        if (rooms.length > 1) {
          for(var i=0,ii=rooms.length;i<ii;i++) {
            if(rooms[i].code == dynamicRoomCode) {
              var updatedNav = '';
              for(var k=0,kk=3; k<kk; k++) {
                updatedNav = updatedNav + roomImageSliderNav
              }
              roomImageSlider.innerHTML = updatedNav;

              var adaTextVisibility = rooms[i].category.toLowerCase().indexOf('accessible') == -1 ? 'hidden' : 'visible';
              for (var i=0,ii=roomDetailADADivs.length;i<ii;i++) {
                roomDetailADADivs[i].style.visibility= adaTextVisibility
              }

              var roomCodeInput = document.querySelector(".room-booking-widget [name='selected_room']");
              if(roomCodeInput) {
                roomCodeInput.value = dynamicRoomCode;
              }
            }
          }
        }
        for (var i=0,ii=roomDetailComponentDivs.length;i<ii;i++) {
          var props = {
            hotel: ttwebHotel,
            selectedRoom: dynamicRoomCode,
            innerHTML: roomDetailComponentDivs[i].innerHTML
          };
          var roomItem = TTRender.e(TTRender.Room, props);
          TTRender.renderInElement(roomDetailComponentDivs[i], roomItem, roomSlider);
        }
      }
    }
  });
  redirectRoomOfferNoHashUrls();
});

function redirectRoomOfferNoHashUrls() {
  var pageUrl = window.location.href;
  var pageHash = window.location.hash;
  if(pageUrl.indexOf('/rooms/room/') != -1 && pageHash == '') {
    pageUrl = pageUrl.replace('/rooms/room/', '/rooms/');
    console.log('NOHSH',pageUrl);
    window.location.href = pageUrl;
  } else if(pageUrl.indexOf('/offers/offer/') != -1 && pageHash == '') {
    pageUrl = pageUrl.replace('/offers/offer/', '/offers/');
    window.location.href = pageUrl;
  }
}
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
