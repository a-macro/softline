"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var height = window.innerHeight;
  var width = window.innerWidth;
  document.documentElement.style.setProperty('--h', height + "px");
  //document.documentElement.style.setProperty('--w', width + "px");
  //el.style.setProperty("--r", right + "px");
  //scrollLock.enablePageScroll(openedModal); отключить
  //scrollLock.disablePageScroll(mobMenu);

  var header = document.querySelector(".header");
  if (header) {
    var headerH = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--headerH', headerH + "px");
  }
  var headerSearch = document.querySelector(".header__search");
  var headerSearchBtn = document.querySelector(".btn__search-show");
  if (headerSearchBtn) {
    headerSearchBtn.onclick = function (e) {
      e.preventDefault();
      headerSearch.classList.add('active');
    };
  }
  var headerSearchClose = document.querySelector(".header__search_close");
  if (headerSearchClose) {
    headerSearchClose.onclick = function (e) {
      headerSearch.classList.remove('active');
    };
  }
  var searchInp = document.querySelector(".input__search");
  var btnSearch = document.querySelector(".btn__search");
  if (searchInp) {
    searchInp.oninput = function (e) {
      if (searchInp.value && btnSearch.classList.contains("disabled")) {
        btnSearch.classList.remove("disabled");
        btnSearch.removeAttribute("disabled");
      }
      if (!searchInp.value && !btnSearch.classList.contains("disabled")) {
        btnSearch.classList.add("disabled");
        btnSearch.setAttribute("disabled", "disabled");
      }
    };
  }
  var bodyTag = document.querySelector("body");
  var selectSingle = document.querySelectorAll('.__select');
  function selectFunc() {
    if (selectSingle) {
      selectSingle.forEach(function (selectSingle) {
        var selectSingle_title = selectSingle.querySelector('.__select__title');
        var selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
        selectSingle_title.onclick = function (e) {
          e.preventDefault();
          var prev = document.querySelector("[data-state=\"active\"]");
          if (prev && prev != e.target) {
            prev.setAttribute('data-state', '');
          }
          if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');
          } else {
            selectSingle.setAttribute('data-state', 'active');
          }
        };
        for (var i = 0; i < selectSingle_labels.length; i++) {
          selectSingle_labels[i].addEventListener('click', function (evt) {
            if (!selectSingle_title.classList.contains("chosen")) {
              selectSingle_title.classList.add("chosen");
            }
            selectSingle_title.textContent = evt.target.textContent;
            selectSingle.setAttribute('data-state', '');
          });
        }
      });
    }
  }
  selectFunc();
  bodyTag.onclick = function (e) {
    var openedSelect = document.querySelector("[data-state=\"active\"]");
    if (openedSelect && !e.target.classList.contains("__select")) {
      prev.setAttribute('data-state', '');
    }
  };
  new Swiper(".services__container", {
    navigation: {
      nextEl: ".services__container .swiper-button-next",
      prevEl: ".services__container .swiper-button-prev"
    },
    slidesPerView: 6,
    watchOverflow: true,
    spaceBetween: 0,
    loop: false,
    breakpoints: {
      300: {
        slidesPerView: "auto"
      },
      769: {
        slidesPerView: 6
      },
      1025: {
        slidesPerView: 6,
        spaceBetween: 0
      }
    }
  });
  new Swiper(".help__container", {
    navigation: {
      nextEl: ".help__container .swiper-button-next",
      prevEl: ".help__container .swiper-button-prev"
    },
    slidesPerView: 6,
    watchOverflow: true,
    spaceBetween: 40,
    loop: false,
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 20
      },
      769: {
        slidesPerView: 6,
        spaceBetween: 40
      },
      1025: {
        slidesPerView: 6
      }
    }
  });
  new Swiper(".solve__container", {
    navigation: {
      nextEl: ".solve__container .swiper-button-next",
      prevEl: ".solve__container .swiper-button-prev"
    },
    slidesPerView: 4,
    watchOverflow: true,
    spaceBetween: 40,
    freeMode: "false",
    loop: false,
    breakpoints: {
      300: {
        slidesPerView: "auto",
        spaceBetween: 20
      },
      769: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      1441: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1921: {
        slidesPerView: 4
      }
    }
  });
  new Swiper(".news__container", {
    navigation: {
      nextEl: ".news__container .swiper-button-next",
      prevEl: ".news__container .swiper-button-prev"
    },
    slidesPerView: "auto",
    watchOverflow: true,
    spaceBetween: 40,
    loop: false,
    breakpoints: {
      300: {
        spaceBetween: 20
      },
      769: {
        spaceBetween: 40
      },
      1025: {
        spaceBetween: 40
      }
    }
  });
  var init = false;
  var swiper;
  function initSlider() {
    if (width <= 480 && !init) {
      swiper = new Swiper(".partners__mobSlider", {
        loop: false,
        slidesPerView: 2.8,
        spaceBetween: 40,
        freeMode: true,
        autoHeight: false,
        watchOverflow: true,
        grid: {
          rows: 2
        },
        initialSlide: 1
      });
      init = true;
    }
    if (init && width > 480) {
      init = false;
      swiper.destroy();
    }
  }
  initSlider();
  var results = document.querySelectorAll(".search-result");
  var showMoreBtn = document.querySelector(".search__show-more");
  if (results && results.length > 0) {
    hideResults(results);
  }
  function hideResults(results) {
    showMoreBtn.classList.add("hide");
    for (var i = 0; i < results.length; i++) {
      if (i >= 6) {
        results[i].classList.add("hide");
        showMoreBtn.classList.remove("hide");
      }
    }
  }
  function changeResults(item) {
    var attr = item.getAttribute("data-item");
    var elems;
    if (attr != "all") {
      elems = document.querySelectorAll(".".concat(attr));
      results.forEach(function (result) {
        if (!result.classList.contains("".concat(attr))) {
          result.classList.add("hide");
        } else {
          result.classList.remove("hide");
        }
      });
    } else {
      elems = results;
      results.forEach(function (result) {
        result.classList.remove("hide");
      });
    }
    hideResults(elems);
  }
  var itemsSearch = document.querySelectorAll(".search-aside__item");
  var itemShowAll = document.querySelector(".search-aside__item[data-item='all']");
  if (itemsSearch && itemsSearch.length > 0) {
    var title = document.querySelector(".search__title");
    var num = document.querySelector(".search__title_num");
    itemsSearch.forEach(function (item) {
      item.onclick = function (e) {
        e.preventDefault();
        if (!item.classList.contains("active")) {
          var itemTitle = item.querySelector(".search-aside__title");
          var itemNum = item.querySelector(".search-aside__num");
          var prevActive = document.querySelector(".active.search-aside__item");
          prevActive.classList.remove("active");
          item.classList.add("active");
          title.innerHTML = itemTitle.innerHTML;
          num.innerHTML = itemNum.innerHTML;
          changeResults(item);
        } else {
          if (e.target.classList.contains("search-aside__item_close")) {
            var attr = item.getAttribute("data-item");
            if (attr != "all") {
              item.classList.remove("active");
              itemShowAll.classList.add("active");
              var _itemTitle = itemShowAll.querySelector(".search-aside__title");
              var _itemNum = itemShowAll.querySelector(".search-aside__num");
              title.innerHTML = _itemTitle.innerHTML;
              num.innerHTML = _itemNum.innerHTML;
            }
            changeResults(itemShowAll);
          }
        }
      };
    });
  }
  if (showMoreBtn) {
    showMoreBtn.onclick = function (e) {
      e.preventDefault();
      var activeItem = document.querySelector(".active.search-aside__item");
      var attr = activeItem.getAttribute("data-item");
      if (attr != "all") {
        var hiddenElems = document.querySelectorAll(".search-result.".concat(attr, ".hide"));
        for (var i = 0; i < hiddenElems.length; i++) {
          if (i < 6) {
            hiddenElems[i].classList.remove("hide");
          }
          if (hiddenElems.length < 6) {
            showMoreBtn.classList.add("hide");
          }
        }
      } else {
        var _hiddenElems = document.querySelectorAll(".search-result.hide");
        for (var _i = 0; _i < _hiddenElems.length; _i++) {
          if (_i < 6) {
            _hiddenElems[_i].classList.remove("hide");
          }
          if (_hiddenElems.length <= 6) {
            showMoreBtn.classList.add("hide");
          }
        }
      }
    };
  }
  var btnGrid = document.querySelector(".catalog__btn-grid");
  var btnList = document.querySelector(".catalog__btn-list");
  var catalogWrap = document.querySelector(".catalog__services");
  if (btnGrid && btnList && catalogWrap) {
    btnGrid.onclick = function (e) {
      e.preventDefault();
      btnList.classList.remove("active");
      btnGrid.classList.add("active");
      catalogWrap.setAttribute("data-type", "grid");
    };
    btnList.onclick = function (e) {
      e.preventDefault();
      btnGrid.classList.remove("active");
      btnList.classList.add("active");
      catalogWrap.setAttribute("data-type", "list");
    };
  }
  var swipeEl = document.querySelector('.search-aside');
  if (swipeEl) {
    var getTranslate3d = function getTranslate3d() {
      var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      values = setting.split(/\w+\(|\);?/);
      if (!values[1] || !values[1].length) {
        return [];
      }
      return values[1].split(/,\s?/g).map(function (value) {
        return parseInt(value, 10);
      });
    };
    var setTranslate3dPosY = function setTranslate3dPosY(posY) {
      return 'translate3d(0,' + posY + 'px, 0)';
    };
    var hideswipeEl = function hideswipeEl(elem) {
      isOpen = false;
      elem.classList.add("hide");
      elem.classList.remove("show");
      bodyTag.classList.remove("lock-modal");
      elem.classList.remove("canScroll");
      elem.style.transform = 'translate3d(0, 0px, 0)';
      lastPosY = getTranslate3d(elem.style.transform)[1];
    };
    var showNow = function showNow(elem) {
      setTimeout(function () {
        isOpen = true;
      }, 500);
      elem.classList.remove("hide");
      elem.classList.add("show");
      bodyTag.classList.add("lock-modal");
      var topPos = -window.innerHeight * .55;
      elem.style.transform = 'translate3d(0,' + topPos + 'px, 0)';
      lastPosY = getTranslate3d(elem.style.transform)[1];
    };
    var displayswipeEl = function displayswipeEl() {
      var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : swipeEl;
      elem.style.transform = 'translate3d(0, 0, 0)';
      elem.classList.remove("hide");
    };
    var handleDrag = function handleDrag(ev) {
      var direction = ev.offsetDirection;
      var directionDown = direction === 16;
      swipeEl.addEventListener('scroll', function () {
        var scrollTop = swipeEl.scrollTop;
        if (scrollTop == 0) {
          canSwipeUpDown = false;
          isOpen = false;
          swipeEl.classList.remove('canScroll');
        } else {
          canSwipeUpDown = true;
          isOpen = true;
          swipeEl.classList.add('canScroll');
        }
      }, false);

      /*if (isOpen && !directionDown) {
          setTranslate3dPosY(0);
          canSwipeUpDown = true;
          swipeEl.classList.add('canScroll');
      }
      else */
      if (!canSwipeUpDown) {
        swipeEl.classList.remove('canScroll');
        var elem = swipeEl;

        // DRAG STARTED
        if (!isDragging) {
          if (ev.target != elem) {
            return;
          }
          elem.classList.remove('anim');
          isDragging = true;
          var currentPosY = getTranslate3d(elem.style.transform)[1];
          lastPosY = currentPosY ? currentPosY : 0;
        }
        var posY = ev.deltaY + lastPosY;
        elem.style.transform = setTranslate3dPosY(posY);

        // DRAG ENDED
        if (ev.isFinal) {
          elem.classList.add('anim');
          isDragging = false;
          if (Math.abs(posY) < swipeThreshold) {
            hideswipeEl(elem);
          } else {
            showNow(elem);
          }
        }
      }
    };
    var mcSwipe = new Hammer.Manager(swipeEl);
    var swipeElHeight = window.innerHeight - 100;
    var swipeThreshold = swipeElHeight / 3.5;
    var lastPosY = 0;
    var isDragging = false;
    var canSwipeUpDown = false;
    var isOpen = false;
    var values;
    var asideClose = document.querySelector(".search-aside__close");
    if (asideClose) {
      asideClose.onclick = function (e) {
        e.preventDefault();
        hideswipeEl(swipeEl);
      };
    }
    mcSwipe.add(new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL,
      threshold: 0
    }));
    if (window.innerWidth <= 768) {
      mcSwipe.on("pan", handleDrag);
    }
  }
  window.addEventListener("resize", function () {
    width = window.innerWidth;
    initSlider();
  });
});