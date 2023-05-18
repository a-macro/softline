"use strict";

function disableScroll() {
  // Get the current page scroll position;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollTop;
  document.documentElement.style.setProperty('scroll-behavior', 'auto');
  if (isMobile.any()) {
    document.body.style.overflow = 'hidden';
  }

  // if any scroll is attempted, set this to the previous value;
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}
;
function enableScroll() {
  document.documentElement.style.setProperty('scroll-behavior', null);
  document.body.style.overflow = null;
  window.onscroll = function () {};
}
;
var leadershipCards = document.querySelectorAll(".leader__card");
var leadershipModal = document.querySelector("#leadership-modal");
if (leadershipCards && leadershipModal) {
  leadershipCards.forEach(function (card) {
    card.onclick = function (e) {
      e.preventDefault();
      var content = this.querySelector('.leader__content');
      var modalWrapper = leadershipModal.querySelector('.leadership-modal__wrapper');
      if (content && modalWrapper) {
        modalWrapper.innerHTML = content.innerHTML;
      } else {
        return;
      }
      leadershipModal.style.display = "block";
      disableScroll();
      // scrollLock.disablePageScroll(leadershipModal);
      // scrollLock.addScrollableSelector('.leadership__text-block');
      if (window.innerWidth <= 1024) {
        // scrollLock.addScrollableSelector(".leadership__wrapper");
      }
      setTimeout(function () {
        leadershipModal.classList.add("show");
      }, 10);
    };
  });
  if (leadershipModal) {
    var leadershipClose = document.querySelector(".close-leadership");
    leadershipClose.onclick = function (e) {
      e.preventDefault();
      leadershipModal.classList.remove("show");
      enableScroll();
      // scrollLock.enablePageScroll(leadershipModal);
      setTimeout(function () {
        leadershipModal.style.display = "none";
      }, 400);
    };
  }
}