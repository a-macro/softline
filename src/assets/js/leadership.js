function disableScroll() {
  // Get the current page scroll position;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollTop;
  document.documentElement.style.setProperty('scroll-behavior', 'auto');

  if (isMobile.any()) {
      document.body.style.overflow='hidden';
  }

  // if any scroll is attempted, set this to the previous value;
  window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
  };
};

function enableScroll() {
  document.documentElement.style.setProperty('scroll-behavior', null);
  document.body.style.overflow=null;
  window.onscroll = function () { };
};

let leadershipCards = document.querySelectorAll(".leader__card");
let leadershipModal = document.querySelector("#leadership-modal");
if (leadershipCards && leadershipModal) {
leadershipCards.forEach(card => {
  card.onclick = function (e) {
      e.preventDefault();
      const content = this.querySelector('.leader__content');
      const modalWrapper = leadershipModal.querySelector('.leadership-modal__wrapper')
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
      setTimeout(() => {
          leadershipModal.classList.add("show");
      }, 10);
  }
});

if (leadershipModal) {
  let leadershipClose = document.querySelector(".close-leadership");
  leadershipClose.onclick = (e) => {
      e.preventDefault();
      leadershipModal.classList.remove("show");
      enableScroll();
      // scrollLock.enablePageScroll(leadershipModal);
      setTimeout(() => {
          leadershipModal.style.display = "none";
      }, 400);
  }
}
}