"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
document.addEventListener("DOMContentLoaded", function () {
  var height = window.innerHeight;
  var width = window.innerWidth;
  document.documentElement.style.setProperty('--h', height + "px");
  //document.documentElement.style.setProperty('--w', width + "px");
  //el.style.setProperty("--r", right + "px");
  //scrollLock.enablePageScroll(openedModal); ??????????????????
  //scrollLock.disablePageScroll(mobMenu);

  var header = document.querySelector(".header");
  if (header) {
    var headerH = header.getBoundingClientRect().height;
    document.documentElement.style.setProperty('--headerH', headerH + "px");
  }
  var prevScroll = 0;
  window.onscroll = function (e) {
    var delta = pageYOffset - prevScroll;
    if (delta > 0 && pageYOffset > 80 && header && window.innerWidth > 768) {
      header.classList.add("hide-header");
      header.classList.add("start");
    } else if (header && pageYOffset > 80 && window.innerWidth > 768) {
      header.classList.remove("hide-header");
      header.classList.add("start");
    } else if (header && pageYOffset < 20 && window.innerWidth > 768) {
      header.classList.remove("start");
    }
    prevScroll = pageYOffset;
  };
  var headerSearch = document.querySelector(".header__search");
  var headerSearchBtn = document.querySelectorAll(".btn__search-show");
  var menubutton = document.querySelector('.menu-button');
  if (headerSearchBtn) {
    headerSearchBtn.forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        headerSearch.classList.add('active');
        if (window.innerWidth <= 768 && bodyTag.classList.contains("menu-open")) {
          bodyTag.classList.remove("menu-open");
          menubutton.classList.remove("menu-button--active");
          headerBottom.style.display = "none";
          setTimeout(function () {
            headerBottom.classList.remove("show");
          }, 100);
          scrollLock.enablePageScroll();
        }
      };
    });
  }
  var headerSearchClose = document.querySelector(".header__search_close");
  if (headerSearchClose) {
    headerSearchClose.onclick = function (e) {
      headerSearch.classList.remove('active');
    };
  }
  var menuItems = document.querySelectorAll(".header__item");
  var menuWrapper = document.querySelector(".menu-wrapper");
  if (menuItems && menuItems.length > 0) {
    menuItems.forEach(function (item) {
      var attr = item.getAttribute("data-menu");
      if (attr) {
        var itemMenu = document.querySelector(".".concat(attr));
        item.onmouseover = function (e) {
          if (!item.classList.contains("active")) {
            var prev = document.querySelector(".active.header__item");
            if (prev && prev != item) {
              prev.classList.remove("active");
              var attrPrev = prev.getAttribute("data-menu");
              var itemMenuPrev = document.querySelector(".".concat(attrPrev));
              itemMenuPrev.style.display = "none";
            }
            item.classList.add("active");
            itemMenu.style.display = "flex";
            menuWrapper.classList.add("show");
          } else {
            /*item.classList.remove("active");
            itemMenu.style.display = "none";
            menuWrapper.classList.remove("show");    */
          }
        };
      }
    });
  }
  var subMenuItems = document.querySelectorAll(".menu__item");
  if (subMenuItems && subMenuItems.length > 0) {
    subMenuItems.forEach(function (item) {
      if (window.innerWidth <= 480) {
        item.classList.remove("active");
      }
      var parent = item.closest(".menu");
      item.onclick = function (e) {
        e.preventDefault();
        if (!item.classList.contains("active")) {
          var prev = parent.querySelector(".menu__item.active");
          if (prev) {
            prev.classList.remove("active");
          }
          item.classList.add("active");
          /*let submenu = item.querySelector(".submenu");
          let toBottom = window.innerHeight - item.getBoundingClientRect().bottom;
          let h = submenu.getBoundingClientRect().height;
          if(h >= toBottom) {
              submenu.style.cssText = `top: -${h >= toBottom}px`;
          }*/
          if (window.innerWidth <= 480 && !item.classList.contains("empty")) {
            subMenuItems.forEach(function (itemRest) {
              itemRest.classList.add("hide");
            });
          }
        } else {
          if (window.innerWidth <= 480) {
            item.classList.remove("active");
            subMenuItems.forEach(function (itemRest) {
              itemRest.classList.remove("hide");
            });
          }
        }
      };
    });
  }
  var headerBottom = document.querySelector(".header__bottom");
  if (menubutton && menuWrapper) {
    menubutton.addEventListener('click', function () {
      menubutton.classList.toggle('menu-button--active');
      if (!headerBottom.classList.contains("show")) {
        bodyTag.classList.add("menu-open");
        headerBottom.style.display = "block";
        setTimeout(function () {
          headerBottom.classList.add("show");
        }, 10);
        scrollLock.disablePageScroll();
        scrollLock.addScrollableSelector('.header__bottom');
        scrollLock.addScrollableSelector('.header__menu');
        scrollLock.addScrollableSelector('.menu');
      } else {
        var active = document.querySelector(".header__item.active");
        if (active) {
          active.classList.remove("active");
        }
        var prev = document.querySelectorAll(".menu__item.active");
        if (prev) {
          prev.forEach(function (prev) {
            prev.classList.remove("active");
          });
        }
        var subMenus = document.querySelectorAll(".menu__item.hide");
        if (subMenus) {
          subMenus.forEach(function (itemRest) {
            itemRest.classList.remove("hide");
          });
        }
        menuWrapper.classList.remove("show");
        bodyTag.classList.remove("menu-open");
        headerBottom.style.display = "none";
        setTimeout(function () {
          headerBottom.classList.remove("show");
        }, 10);
        scrollLock.enablePageScroll();
      }
    });
  }
  var tabs = document.querySelectorAll('.tab-label');
  var navList = document.querySelectorAll('.main-nav__list-item');
  var backButton = document.querySelector('.back-panel');
  var menuSecond = document.querySelector('.menu-second');
  var innnerDiv = document.querySelector('#inner-menu');
  var menu = document.querySelectorAll(".menu");
  backButton.onclick = function (e) {
    e.preventDefault();
    var act = document.querySelector(".menu__item.active");
    if (act) {
      act.classList.remove("active");
      if (window.innerWidth <= 480) {
        subMenuItems.forEach(function (itemRest) {
          itemRest.classList.remove("hide");
        });
        return;
      }
    }
    menuWrapper.classList.remove("show");
    var act2 = document.querySelector(".header__item.active");
    if (act2) {
      menu.forEach(function (menu) {
        menu.style.display = "none";
      });
      act2.classList.remove("active");
    }
  };
  var tabAccItems = document.querySelectorAll('.tab-accord__list-item');
  if (tabAccItems.length) {
    tabAccItems.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabAccItems.forEach(function (el) {
          el.classList.add('not-active');
          el.classList.remove('active');
        });
        this.classList.remove('not-active');
        this.classList.toggle('active');
        var subMenu = this.querySelector('.main-nav__submenu');
        var mainButton = this.closest('.main-nav__list-item');
        if (mainButton) {
          var but = mainButton.querySelector('.tab-label--active');
          if (but) {
            but.classList.add('tab-label--hidden');
          }
        }
        if (subMenu && innnerDiv) {
          innnerDiv.innerHTML = subMenu.innerHTML;
        } else {
          innnerDiv.innerHTML = '';
        }
      });
    });
  }
  function hideaftertransition() {
    this.hidden = true;
    this.removeEventListener('transitionend', hideaftertransition);
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
          var currentParent = selectSingle_title.closest(".__select");
          var prev = document.querySelector("[data-state=\"active\"]");
          var prevParent;
          if (prev) {
            prevParent = prev.closest(".__select");
          }
          if (prev && prevParent && prevParent != currentParent) {
            prev.setAttribute('data-state', '');
          }
          if ('active' === selectSingle.getAttribute('data-state')) {
            selectSingle.setAttribute('data-state', '');
          } else {
            selectSingle.setAttribute('data-state', 'active');
          }
        };
        for (var _i = 0; _i < selectSingle_labels.length; _i++) {
          selectSingle_labels[_i].addEventListener('click', function (evt) {
            if (!selectSingle_title.classList.contains("chosen")) {
              selectSingle_title.classList.add("chosen");
            }
            selectSingle_title.innerHTML = evt.currentTarget.innerHTML;
            selectSingle.setAttribute('data-state', '');
          });
        }
      });
    }
  }
  selectFunc();
  bodyTag.onclick = function (e) {
    var openedSelect = document.querySelector("[data-state=\"active\"]");
    var parent = e.target.closest(".__select");
    if (openedSelect && !parent) {
      openedSelect.setAttribute('data-state', '');
    }
  };
  bodyTag.onmousemove = function (e) {
    if (menuWrapper.classList.contains("show")) {
      var targ = e.target;
      var attr = targ.getAttribute("data-menu");
      var parent = targ.closest(".menu-wrapper");
      var itemAct = document.querySelector(".header__item.active");
      var checkLink = targ.closest(".header__item.active");
      if (!attr && !parent && !targ.classList.contains("menu-wrapper") && itemAct && itemAct != targ && !checkLink && !targ.classList.contains("header__menu")) {
        itemAct.classList.remove("active");
        var attrPrev = itemAct.getAttribute("data-menu");
        var itemMenu = document.querySelector(".".concat(attrPrev));
        itemMenu.style.display = "none";
        menuWrapper.classList.remove("show");
      }
    }
    /*if(item.classList.contains("active")) {
        item.classList.remove("active");
        itemMenu.style.display = "none";
        menuWrapper.classList.remove("show");    
    } */
  };

  new Swiper(".services__container", {
    navigation: {
      nextEl: ".services__container .swiper-button-next",
      prevEl: ".services__container .swiper-button-prev"
    },
    slidesPerView: 6,
    watchOverflow: true,
    spaceBetween: 0,
    loop: true,
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
    loop: true,
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
    loop: true,
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
  var solveCustomers = document.querySelectorAll(".customer__container");
  if (solveCustomers.length > 0) {
    solveCustomers.forEach(function (slider) {
      var btnPrev = slider.querySelector(".swiper-button-prev");
      var btnNext = slider.querySelector(".swiper-button-next");
      var swiper = new Swiper(slider, {
        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev
        },
        slidesPerView: 3,
        watchOverflow: true,
        spaceBetween: 40,
        freeMode: "false",
        loop: true,
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
            slidesPerView: 2,
            spaceBetween: 40
          },
          1921: {
            slidesPerView: 3
          }
        }
      });
    });
  }
  new Swiper(".news__container", {
    navigation: {
      nextEl: ".news__container .swiper-button-next",
      prevEl: ".news__container .swiper-button-prev"
    },
    slidesPerView: "auto",
    watchOverflow: true,
    spaceBetween: 40,
    loop: true,
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
  new Swiper(".news-page__swiper", {
    navigation: {
      nextEl: ".news-page .swiper-container .swiper-button-next",
      prevEl: ".news-page .swiper-container .swiper-button-prev"
    },
    slidesPerView: "auto",
    watchOverflow: true,
    spaceBetween: 40,
    loop: true,
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
  var timelineSwiper = new Swiper(".timeline__swiper", {
    autoHeight: true,
    // autoplay: {
    // delay: 5000,
    // disableOnInteraction: false },

    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30
  });
  var timeSwiper = new Swiper(".timeline__swiper-2", {
    autoHeight: true,
    // autoplay: {
    // delay: 5000,
    // disableOnInteraction: false },

    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30
  });
  timelineSwiper.controller.control = timeSwiper;
  timeSwiper.controller.control = timelineSwiper;
  var init = false;
  var swiper;
  var slider = document.querySelector(".partners__mobSlider");
  function initSlider() {
    if (width <= 768 && !init && slider) {
      swiper = new Swiper(".partners__mobSlider", {
        loop: true,
        slidesPerView: 2.8,
        spaceBetween: 40,
        freeMode: true,
        autoHeight: false,
        watchOverflow: true,
        grid: {
          rows: 2
        },
        initialSlide: 1,
        breakpoints: {
          // when window width is >= 320px
          481: {
            slidesPerView: 3.8,
            spaceBetween: 40
          }
        }
      });
      init = true;
    }
    if (init && width > 768) {
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
    for (var _i2 = 0; _i2 < results.length; _i2++) {
      if (_i2 >= 6) {
        results[_i2].classList.add("hide");
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
  var catalogList = document.querySelectorAll(".catalog-sidebar__item.side-list__item");
  if (catalogList && catalogList.length > 0) {
    catalogList.forEach(function (item) {
      var parent = item.closest("ul");
      item.onclick = function (e) {
        e.preventDefault();
        if (!item.classList.contains("active")) {
          var prevActive = document.querySelector(".active.catalog-sidebar__item");
          if (prevActive) {
            prevActive.classList.remove("active");
          }
          item.classList.add("active");
        } else {
          item.classList.remove("active");
        }
      };
    });
  }
  var filterMobBtn = document.querySelector(".filters__mobile");
  var catalogSide = document.querySelector(".catalog-sidebar");
  if (filterMobBtn) {
    filterMobBtn.onclick = function (e) {
      e.preventDefault();
      showNow(catalogSide);
    };
  }
  if (showMoreBtn) {
    showMoreBtn.onclick = function (e) {
      e.preventDefault();
      var activeItem = document.querySelector(".active.search-aside__item");
      var attr = activeItem.getAttribute("data-item");
      if (attr != "all") {
        var hiddenElems = document.querySelectorAll(".search-result.".concat(attr, ".hide"));
        for (var _i3 = 0; _i3 < hiddenElems.length; _i3++) {
          if (_i3 < 6) {
            hiddenElems[_i3].classList.remove("hide");
          }
          if (hiddenElems.length < 6) {
            showMoreBtn.classList.add("hide");
          }
        }
      } else {
        var _hiddenElems = document.querySelectorAll(".search-result.hide");
        for (var _i4 = 0; _i4 < _hiddenElems.length; _i4++) {
          if (_i4 < 6) {
            _hiddenElems[_i4].classList.remove("hide");
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
  var filters = document.querySelectorAll("[data-show]");
  if (filters && filters.length > 0) {
    filters.forEach(function (filter) {
      countHeight(filter);
    });
  }
  function countHeight(filter) {
    var num = +filter.getAttribute("data-show");
    var elems = filter.querySelectorAll(".catalog-sidebar__item");
    var len = elems.length;
    var margin = +window.getComputedStyle(elems[0], null).getPropertyValue("margin-bottom").split("px")[0];
    var commonH = 0;
    for (var _i5 = 0; _i5 < num; _i5++) {
      var h = +elems[_i5].getBoundingClientRect().height + margin;
      commonH += h;
    }
    filter.style.setProperty("--max-h", commonH + "px");
  }
  var showMoreFilters = document.querySelectorAll(".filter__show-more");
  if (showMoreFilters && showMoreFilters.length > 0) {
    showMoreFilters.forEach(function (btn) {
      var parent = btn.closest(".filter__wrapper");
      btn.onclick = function (e) {
        e.preventDefault();
        var list = parent.querySelector("ul");
        list.style.maxHeight = "200vh";
        btn.classList.add("hide");
      };
    });
  }
  var swipeEls = document.querySelectorAll('.swipe-el');
  var hideswipeEl;
  var showNow;
  if (swipeEls && swipeEls.length > 0) {
    swipeEls.forEach(function (swipeEl) {
      var mcSwipe = new Hammer.Manager(swipeEl);
      var swipeElHeight = window.innerHeight - 100;
      var swipeThreshold = swipeElHeight / 3.5;
      if (window.innerWidth <= 768 && window.innerWidth > 480) {
        swipeEl.style.maxHeight = window.innerHeight * .8 + "px";
      } else if (window.innerWidth <= 480) {
        swipeEl.style.maxHeight = window.innerHeight * .9 + "px";
      }
      var lastPosY = 0;
      var isDragging = false;
      var canSwipeUpDown = false;
      var isOpen = false;
      var values;
      function getTranslate3d() {
        var setting = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        values = setting.split(/\w+\(|\);?/);
        if (!values[1] || !values[1].length) {
          return [];
        }
        return values[1].split(/,\s?/g).map(function (value) {
          return parseInt(value, 10);
        });
      }
      function setTranslate3dPosY(posY) {
        return 'translate3d(0,' + posY + 'px, 0)';
      }
      hideswipeEl = function hideswipeEl(elem) {
        isOpen = false;
        elem.classList.add("hide");
        elem.classList.remove("show");
        bodyTag.classList.remove("lock-modal");
        elem.classList.remove("canScroll");
        elem.style.transform = 'translate3d(0, 0px, 0)';
        lastPosY = getTranslate3d(elem.style.transform)[1];
        scrollLock.enablePageScroll();
      };
      var asideClose = document.querySelectorAll(".swipe-el__close");
      if (asideClose && asideClose.length > 0) {
        asideClose.forEach(function (btn) {
          var parent = btn.closest(".swipe-el");
          btn.onclick = function (e) {
            e.preventDefault();
            hideswipeEl(parent);
          };
        });
      }
      showNow = function showNow(elem) {
        setTimeout(function () {
          isOpen = true;
        }, 500);
        elem.classList.remove("hide");
        elem.classList.add("show");
        bodyTag.classList.add("lock-modal");
        if (window.innerWidth <= 768 && window.innerWidth > 480) {
          var topPos = -window.innerHeight * .7;
        } else if (window.innerWidth <= 480) {
          var topPos = -window.innerHeight * .85;
        }
        scrollLock.disablePageScroll();
        scrollLock.addScrollableSelector(".search-aside__list");
        elem.style.transform = 'translate3d(0,' + topPos + 'px, 0)';
        lastPosY = getTranslate3d(elem.style.transform)[1];
      };
      function displayswipeEl() {
        var elem = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : swipeEl;
        elem.style.transform = 'translate3d(0, 0, 0)';
        elem.classList.remove("hide");
      }
      function handleDrag(ev) {
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
      }
      mcSwipe.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
      }));
      if (window.innerWidth <= 768) {
        mcSwipe.on("pan", handleDrag);
      }
    });
  }
  var observerV = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var el = entry.target;
      if (el.classList.contains("end")) {
        return;
      }
      var attr = +el.getAttribute("data-num");
      if (entry.isIntersecting) {
        var _i6 = 1,
          _num = attr,
          step = 2500 / _num,
          int = setInterval(function () {
            if (_i6 <= _num) {
              el.innerHTML = "".concat(_i6, "+");
            } else {
              clearInterval(int);
              el.classList.add("end");
            }
            _i6 += 5;
          }, step);
      }
    });
  });
  var changeNums = document.querySelectorAll(".rising-num__num");
  if (changeNums && changeNums.length > 0) {
    changeNums.forEach(function (element) {
      observerV.observe(element);
    });
  }
  window.addEventListener("resize", function () {
    width = window.innerWidth;
    height = window.innerHeight;
    document.documentElement.style.setProperty('--h', height + "px");
    if (header) {
      var _headerH = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--headerH', _headerH + "px");
    }
    filters.forEach(function (filter) {
      countHeight(filter);
    });
    initSlider();
  });
  var currentActiveButton = document.querySelector('.filter-button--active');
  var no = function no() {
    var x, i, j, l, ll, selElmnt, a, b, c;
    /* Look for any elements with the class "custom-select": */
    x = document.getElementsByClassName("custom-select");
    l = x.length;
    for (i = 0; i < l; i++) {
      selElmnt = x[i].getElementsByTagName("select")[0];
      ll = selElmnt.length;
      /* For each element, create a new DIV that will act as the selected item: */
      a = document.createElement("DIV");
      a.setAttribute("class", "select-selected select-selected--light");
      a.setAttribute('tabindex', '0');
      a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
      x[i].appendChild(a);
      /* For each element, create a new DIV that will contain the option list: */
      b = document.createElement("DIV");
      b.setAttribute("class", "select-items select-hide");
      var closeButton = document.createElement('div');
      closeButton.classList.add('close-button');
      b.appendChild(closeButton);
      if (x[i].dataset.text) {
        var _title = document.createElement('div');
        _title.classList.add('custom-select__title');
        _title.innerHTML = x[i].dataset.text;
        b.appendChild(_title);
      }
      var wrapper = document.createElement('div');
      wrapper.setAttribute('class', 'select-wrapper');
      b.appendChild(wrapper);
      for (j = 0; j < ll; j++) {
        /* For each option in the original select element,
        create a new DIV that will act as an option item: */
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        if (j === 0) {
          c.classList.add('same-as-selected');
        }
        c.addEventListener("click", function (e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.parentNode.previousSibling;
          h.classList.add('filter-button--active');
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
        });
        wrapper.appendChild(c);
      }
      x[i].appendChild(b);
      var _overlay = document.createElement('div');
      _overlay.classList.add('overlay');
      x[i].appendChild(_overlay);
      a.addEventListener("click", function (e) {
        /* When the select box is clicked, close any other select boxes,
        and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        //   this.classList.toggle("filter-button--active");
      });
    }

    function closeAllSelect(elmnt) {
      /* A function that will close all select boxes in the document,
      except the current select box: */
      var x,
        y,
        i,
        xl,
        yl,
        arrNo = [];
      x = document.getElementsByClassName("select-items");
      y = document.getElementsByClassName("select-selected");
      xl = x.length;
      yl = y.length;
      for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
          arrNo.push(i);
          y[i].classList.remove('select-selected--light');
        } else {
          y[i].classList.remove("filter-button--active");
          currentActiveButton = null;
        }
      }
      for (i = 0; i < xl; i++) {
        if (!x[i].querySelector('.same-as-selected')) {
          x[i].previousSibling.classList.add('select-selected--light');
        }
        if (arrNo.indexOf(i)) {
          x[i].classList.add("select-hide");
        }
      }
    }

    /* If the user clicks anywhere outside the select box,
    then close all select boxes: */
    document.addEventListener("click", closeAllSelect);
  };
  no();
  var filterButtons = document.querySelectorAll('.filter-button, .select-selected');
  var overlay = document.querySelector('.filter-wrapper .overlay');
  var closeButtons = document.querySelectorAll('.close-button');
  function clickHandler() {
    if (this.classList.contains('filter-button--active')) {
      document.documentElement.style.overflow = null;
      this.classList.remove('filter-button--active');
    } else {
      filterButtons.forEach(function (el) {
        el.classList.remove('filter-button--active');
      });
      if (sm.matches) {
        document.documentElement.style.overflow = 'hidden';
      }
      this.classList.add('filter-button--active');
    }
  }
  function closeMenu() {
    filterButtons.forEach(function (el) {
      document.documentElement.style.overflow = null;
      el.classList.remove('filter-button--active');
    });
  }
  if (filterButtons.length && closeButtons.length) {
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
    filterButtons.forEach(function (el) {
      el.addEventListener('click', clickHandler);
    });
    closeButtons.forEach(function (el) {
      el.addEventListener('click', closeMenu);
    });
  }
  var acc = document.querySelectorAll(".panel .panel__title");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
  var sm = matchMedia("(max-width: 480px)");
  var newsButton = document.querySelector('.news__button');
  var hideItems = null;
  var items = document.querySelectorAll('.events__item, .news__item');
  if (sm.matches && newsButton) {
    if (items.length) {
      hideItems = _toConsumableArray(items).slice(-8);
      hideItems.forEach(function (el) {
        return el.hidden = true;
      });
    }
    newsButton.addEventListener('click', clickHandlerTabs);
  }
  if (newsButton) {
    sm.addEventListener('change', function () {
      if (sm.matches) {
        if (items.length) {
          hideItems = _toConsumableArray(items).slice(-8);
          hideItems.forEach(function (el) {
            return el.hidden = true;
          });
        }
        newsButton.addEventListener('click', clickHandlerTabs);
        newsButton.hidden = false;
      } else {
        var _hideItems;
        newsButton.removeEventListener('click', clickHandlerTabs);
        if ((_hideItems = hideItems) !== null && _hideItems !== void 0 && _hideItems.length) {
          hideItems.forEach(function (el) {
            return el.hidden = false;
          });
        }
      }
    });
  }
  function clickHandlerTabs() {
    this.hidden = true;
    hideItems.forEach(function (el) {
      return el.hidden = false;
    });
  }
  var buttonsModal = document.querySelectorAll('[data-modal]');
  var regModal = document.querySelectorAll('.regModal');
  if (regModal.length) {
    regModal.forEach(function (el) {
      el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
          modalHandler.apply(event.target);
        }
      });
      var closeButton = el.querySelector('.close-button');
      if (closeButton) {
        closeButton.addEventListener('click', function () {
          var modal = this.closest('.regModal');
          if (modal) {
            modalHandler.apply(modal);
          }
        });
      }
    });
  }
  function modalHandler() {
    var _this$dataset;
    var pannel = document.querySelector(".map__panel");
    if (pannel) {
      pannel.classList.remove("open");
    }
    var modal = document.querySelector("".concat((_this$dataset = this.dataset) === null || _this$dataset === void 0 ? void 0 : _this$dataset.modal)) || this;
    if (modal.classList.contains('regModal') && modal.hidden) {
      scrollLock.disablePageScroll();
      scrollLock.addScrollableSelector('.regModal');
    } else {
      scrollLock.enablePageScroll();
    }
    if (modal) {
      if (modal.hidden) {
        modal.hidden = !modal.hidden;
        modal.style.setProperty('pointer-events', 'auto');
        setTimeout(function () {
          modal.style.opacity = 1;
        }, 10);
      } else {
        modal.style.opacity = 0;
        modal.style.setProperty('pointer-events', null);
        modal.addEventListener('transitionend', hideaftertransition);
      }
    }
  }
  function hideaftertransition() {
    this.hidden = true;
    this.removeEventListener('transitionend', hideaftertransition);
  }
  if (buttonsModal.length) {
    buttonsModal.forEach(function (el) {
      return el.addEventListener('click', modalHandler);
    });
  }
  var forms = document.forms;
  var feedBack = document.querySelector('.feedBack');
  if (feedBack) {
    var closeButton = feedBack.querySelectorAll('button');
    if (closeButton.length) {
      closeButton.forEach(function (el) {
        return el.addEventListener('click', modalHandler.bind(feedBack));
      });
    }
  }
  if (forms.length && feedBack) {
    var _iterator = _createForOfIteratorHelper(forms),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var form = _step.value;
        form.addEventListener('submit', function () {
          event.preventDefault();
          modalHandler.apply(this.closest('.regModal'));
          modalHandler.apply(feedBack);
        });
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  var acc = document.getElementsByClassName("accordion__list-title");
  var i;
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.parentNode.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
  window.addEventListener('resize', function () {
    var activeAccords = document.querySelectorAll('.accordion .active .accordion__list-desc');
    if (activeAccords.length) {
      activeAccords.forEach(function (el) {
        el.style.maxHeight = el.scrollHeight + 'px';
      });
    }
  });
  var accordions = document.querySelectorAll('.accordion');
  var faqlist = document.querySelector('.faq__left-list');
  var mm = matchMedia("(max-width: 768px)");
  if (accordions.length && faqlist) {
    accordions.forEach(function (el) {
      var _el$querySelector;
      var title = (_el$querySelector = el.querySelector('.accordion__title')) === null || _el$querySelector === void 0 ? void 0 : _el$querySelector.innerHTML;
      if (title) {
        el.setAttribute('data-visible', title);
        var li = document.createElement('li');
        li.setAttribute('data-visible', title);
        li.innerHTML = title;
        li.addEventListener('click', function () {
          var _this = this;
          accordions.forEach(function (el) {
            if (_this.dataset.visible === el.dataset.visible) {
              // const headerH = document.documentElement.style.getPropertyValue('--headerH') || '-200'

              var yOffset = !mm.matches ? -200 : -150;
              var y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
              window.scrollTo({
                top: y,
                behavior: 'smooth'
              });
            }
          });
        });
        faqlist.appendChild(li);
      }
    });
  }
  var navBar = document.querySelectorAll('.faq__left-list li');
  var stickyBar = document.querySelector('.sticky-mobile');
  var callback = function callback(entry) {
    if (entry.length) {
      entry.forEach(function (el) {
        if (el.isIntersecting) {
          el.target.classList.add('accordion--visible');
          var data = el.target.dataset.visible;
          if (data) {
            navBar.forEach(function (navItem) {
              if (navItem.dataset.visible === data) {
                navItem.classList.add('active');
                if (stickyBar) {
                  stickyBar.innerHTML = data;
                }
              } else {
                navItem.classList.remove('active');
              }
            });
          }
        } else {
          el.target.classList.remove('accordion--visible');
        }
      });
    }
  };
  if (stickyBar && navBar.length) {
    stickyBar.addEventListener('click', function () {
      var nav = navBar[0].closest('.fixed-mobile');
      modalHandler.apply(nav);
    });
  }
  var options = {
    threshold: 0.5 // half of item height
  };

  var observer = new IntersectionObserver(callback, options);
  var fixedBlock = document.querySelector('.fixed-mobile');
  if (fixedBlock) {
    mm.addEventListener('change', function () {
      if (mm.matches) {
        fixedBlock.hidden = true;
      } else {
        fixedBlock.style.opacity = null;
        fixedBlock.hidden = false;
      }
    });
    if (mm.matches) {
      fixedBlock.hidden = true;
    } else {
      fixedBlock.style.opacity = null;
      fixedBlock.hidden = false;
    }
  }
  document.addEventListener('resize', function () {
    if (header) {
      var _headerH2 = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--headerH', _headerH2 + "px");
    }
  });
  if (accordions.length && navBar.length) {
    accordions.forEach(function (el) {
      return observer.observe(el);
    });
  }
  var accCloseButtons = document.querySelectorAll('.accordion .close-button');
  if (accCloseButtons.length) {
    accCloseButtons.forEach(function (el) {
      el.addEventListener('click', function () {
        this.parentNode.previousElementSibling.click();
      });
    });
  }
  var actualBtn = document.getElementById('actual-btn');
  function bytesToMegaBytes(bytes) {
    return bytes / (1024 * 1024);
  }
  function deleteFile(element) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var dt = new DataTransfer();
    var input = element;
    var files = input.files;
    for (var _i7 = 0; _i7 < files.length; _i7++) {
      var file = files[_i7];
      if (index !== _i7) dt.items.add(file);
    }
    input.files = dt.files; // Assign the updates list
  }

  function changeText(element, text) {
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    if (element) {
      element.innerHTML = text;
      if (error) {
        element.classList.add('error');
      } else {
        element.classList.remove('error');
      }
    }
  }
  if (actualBtn) {
    var label = actualBtn.nextElementSibling;
    actualBtn.addEventListener('change', function () {
      var _this2 = this;
      var filechosen = this.parentElement.querySelector('.file-chosen');
      if (!this.files[0]) {
        return;
      }
      var mb = bytesToMegaBytes(this.files[0].size);
      var ourText = this.parentElement.querySelector('.canText');
      if (mb > 1) {
        deleteFile(this);
        if (filechosen) {
          filechosen.remove();
        }
        if (ourText) {
          var text = ourText.dataset.error;
          if (text) {
            changeText(ourText, text);
          }
        }
        return;
      }
      var arrayText = 'doc, txt, rtf, pfd';
      var types = arrayText.split(/[^\w+]+/);
      var typesTest = types.some(function (el) {
        var ext = _this2.files[0].name.match(/\.([^.]+)$/)[0].slice(1);
        return el === ext;
      });
      if (!typesTest) {
        deleteFile(this);
        if (filechosen) {
          filechosen.remove();
        }
        if (ourText) {
          var _text = ourText.dataset.error;
          if (_text) {
            changeText(ourText, _text);
          }
        }
        return;
      }
      if (!filechosen) {
        filechosen = document.createElement('span');
        filechosen.classList.add('file-chosen');
        filechosen.innerHTML = this.files[0].name;
        label.appendChild(filechosen);
        filechosen.addEventListener('click', function () {
          filechosen.remove();
          deleteFile(_this2);
        });
      } else {
        filechosen.innerText = this.files[0].name;
      }
      if (ourText) {
        var _text2 = ourText.dataset.submit;
        if (_text2) {
          changeText(ourText, _text2, false);
        }
      }
    });
  }
  var swipeOn = document.querySelectorAll('.swipe-on');
  if (swipeOn.length) {
    swipeOn.forEach(function (el) {
      var mc = new Hammer(el);
      mc.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
      }));
      var lastPosY = 0;
      var isDragging = false;
      mc.on("pan", function (ev) {
        if (ev.target.classList.contains('swipe-on')) {
          if (!isDragging) {
            isDragging = true;
            lastPosY = ev.target.offsetTop;
          }
          var posY = ev.deltaY + lastPosY;
          ev.target.style.transition = 'none';
          ev.target.style.top = posY + "px";
          if (ev.isFinal) {
            isDragging = false;
            ev.target.style.transition = null;
            if (ev.target.getBoundingClientRect().top >= window.innerHeight - 50) {
              var modal = ev.target.closest('.regModal');
              if (modal) {
                modalHandler.apply(modal);
                setTimeout(function () {
                  ev.target.style.top = null;
                }, 300);
                return;
              }
            }
            ev.target.style.top = null;
          }
        }
      });
    });
  }
  var swipeOn2 = document.querySelectorAll('.swipe-on2');
  if (swipeOn2.length) {
    swipeOn2.forEach(function (el) {
      var mc = new Hammer(el);
      mc.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
      }));
      var lastPosY = 0;
      var isDragging = false;
      mc.on("pan", function (ev) {
        if (ev.target.classList.contains('swipe-on2') && mm.matches) {
          if (!isDragging) {
            isDragging = true;
            lastPosY = ev.target.offsetTop;
          }
          var posY = ev.deltaY + lastPosY;
          ev.target.style.transition = 'none';
          ev.target.style.setProperty('transform', "translate3d(0, ".concat(posY, "px, 0)"));
          if (ev.isFinal) {
            isDragging = false;
            ev.target.style.transition = null;
            if (ev.target.getBoundingClientRect().top >= window.innerHeight - 100) {
              var modal = ev.target.closest('.regModal');
              if (modal) {
                modalHandler.apply(modal);
                setTimeout(function () {
                  ev.target.style.setProperty('transform', null);
                }, 300);
                return;
              }
            }
            ev.target.style.setProperty('transform', null);
          }
        }
      });
    });
  }
  var selectSwipe = document.querySelectorAll('.filters .select-items');
  if (selectSwipe.length) {
    selectSwipe.forEach(function (el) {
      var mc = new Hammer(el);
      mc.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
      }));
      var lastPosY = 0;
      var isDragging = false;
      mc.on("pan", function (ev) {
        if (ev.target.classList.contains('select-items') && sm.matches) {
          if (!isDragging) {
            isDragging = true;
            lastPosY = ev.target.offsetTop;
          }
          var posY = ev.deltaY + lastPosY;
          ev.target.style.transition = 'none';
          ev.target.style.setProperty('transform', "translate3d(0, ".concat(posY, "px, 0)"));
          if (ev.isFinal) {
            isDragging = false;
            ev.target.style.transition = null;
            if (ev.target.getBoundingClientRect().top >= window.innerHeight - 100) {
              var modal = ev.target.querySelector('.close-button');
              if (modal) {
                modal.click();
                setTimeout(function () {
                  ev.target.style.setProperty('transform', null);
                }, 300);
                return;
              }
            }
            ev.target.style.setProperty('transform', null);
          }
        }
      });
    });
  }
  var filterSwipe = document.querySelectorAll('.filter-swipe');
  if (filterSwipe.length) {
    filterSwipe.forEach(function (el) {
      var mc = new Hammer(el);
      mc.add(new Hammer.Pan({
        direction: Hammer.DIRECTION_ALL,
        threshold: 0
      }));
      var lastPosY = 0;
      var isDragging = false;
      mc.on("pan", function (ev) {
        if (ev.target.classList.contains('filter-swipe') && sm.matches) {
          if (!isDragging) {
            isDragging = true;
            lastPosY = ev.target.offsetTop;
          }
          var posY = ev.deltaY + lastPosY;
          ev.target.style.transition = 'none';
          ev.target.style.setProperty('transform', "translate3d(0, ".concat(posY, "px, 0)"));
          if (ev.isFinal) {
            isDragging = false;
            ev.target.style.transition = null;
            if (ev.target.getBoundingClientRect().top >= window.innerHeight - 100) {
              var modal = ev.target.querySelector('.close-button');
              if (modal) {
                modal.click();
                setTimeout(function () {
                  ev.target.style.setProperty('transform', null);
                }, 300);
                return;
              }
            }
            ev.target.style.setProperty('transform', null);
          }
        }
      });
    });
  }
  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  function setCookie(name, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    options = _objectSpread({
      path: '/'
    }, options);
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    var updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (var optionKey in options) {
      updatedCookie += "; " + optionKey;
      var optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
  var cookie = getCookie('softlineAccessCookie');
  var cookieForm = document.querySelector('.cookie.regModal');
  if (cookie && cookieForm) {
    modalHandler.apply(cookieForm);
  }
  if (cookieForm) {
    var button = cookieForm.querySelector('.cookie__button');
    if (button) {
      button.addEventListener('click', function () {
        setCookie('softlineAccessCookie', 'true');
        modalHandler.apply(cookieForm);
      });
    }
  }
  /*
        const mapButton = document.querySelector('#map-button');
        const map = document.querySelector('#yandex-map');
        const offices = document.querySelector('#offices-list');
        let oldText = '';
  
        if (mapButton, map, offices) {
          mapButton.addEventListener('click', function () {
              modalHandler.apply(map)
              modalHandler.apply(offices)
              const text = this.querySelector('[data-text]')
              if (text) {
                  oldText = text.innerHTML
                  text.innerHTML = text.dataset.text
                  text.dataset.text = oldText
              }
          })
        }*/

  var leadershipCards = document.querySelectorAll(".leader__card");
  var leadershipModal = document.querySelector("#leadership-modal");
  if (leadershipCards && leadershipModal) {
    leadershipCards.forEach(function (card) {
      card.onclick = function (e) {
        e.preventDefault();
        leadershipModal.style.display = "block";
        scrollLock.disablePageScroll(leadershipModal);
        scrollLock.addScrollableSelector('.leadership__text-block');
        if (window.innerWidth <= 768) {
          scrollLock.addScrollableSelector(".leadership__wrapper");
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
        scrollLock.enablePageScroll(leadershipModal);
        setTimeout(function () {
          leadershipModal.style.display = "none";
        }, 400);
      };
    }
  }
  var map = document.querySelector("#map");
  var body = document.querySelector("body");
  if (map) {
    var data;
    var pointsData = [];
    var baloonsInfo = [];
    var id = [];
    var pannel = document.querySelector(".map__panel");
    var btnBaloon = document.querySelector(".close__baloon");
    if (btnBaloon) {
      btnBaloon.onclick = function (e) {
        e.preventDefault();
        pannel.classList.remove("open");
        if (activePlacmark) {
          activePlacmark.options.set('iconImageHref', 'assets/images/map/default.svg');
          activePlacmark.balloon.close();
        }
      };
    }
    var activePlacmark;
    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
          center: [55.751574, 37.573856],
          zoom: 5,
          behaviors: ['default', 'scrollZoom']
        }, {
          searchControlProvider: 'yandex#search'
        }),
        clusterer = new ymaps.Clusterer({
          clusterIcons: [{
            href: 'assets/images/map/default.svg',
            size: [30, 30],
            offset: [-15, -15]
          }],
          groupByCoordinates: false,
          clusterDisableClickZoom: false,
          clusterHideIconOnBalloonOpen: false,
          geoObjectHideIconOnBalloonOpen: false,
          hasBalloon: false
        }),
        getPointData = function getPointData(index) {
          return {};
        },
        geoObjects = [];
      clusterer.events.add(['click'], function (e) {
        var target = e.get('target'),
          type = e.get('type');
        if (typeof target.getGeoObjects != 'undefined') {
          // ?????????????? ?????????????????? ???? ????????????????.
          myMap.setCenter(target.properties._data.geoObjects[0].geometry._coordinates, myMap.getZoom() + 1, {
            duration: 300
          });
        }
      });
      function render() {
        return new Promise(function (resolve, reject) {
          /*let req = new XMLHttpRequest();
          req.onreadystatechange = () => {
              if(req.readyState == 4) {
                  resolve( req );
              }
          };  
          req.open("GET", "/local/ajax/map.php", true);
          req.responseType = 'json';
          req.send();*/
          var req = new XMLHttpRequest();
          req.onreadystatechange = function () {
            if (req.readyState == 4) {
              resolve(req);
            }
          };
          req.open("GET", "https://api.jsonbin.io/v3/b/63a9a90215ab31599e25552a", true);
          req.setRequestHeader("X-Master-Key", "$2b$10$2vK1es0DlNZIjjLMRFSAEuqLKa67nVqo9xGycFQi3bVKqhwkMHgA6");
          req.responseType = 'json';
          req.send();
        });
      }
      setTimeout(function () {
        pannel.style.display = "block";
      }, 10);
      render().then(function (req) {
        //data = req.response.features;
        data = req.response.record.features;
        for (var j = 0; j < data.length; j++) {
          pointsData[j] = data[j].geometry.coordinates;
          baloonsInfo[j] = [data[j].properties.balloonContentHeader];
          id[j] = data[j].id;
        }
        var BalloonContentLayout = ymaps.templateLayoutFactory.createClass('<div style="display: none;">' + '</div>', {});
        var baloons = document.querySelectorAll(".baloon");
        var _loop = function _loop() {
          var myPlacemark = new ymaps.Placemark(pointsData[i], getPointData(i), {
            iconLayout: 'default#image',
            iconImageHref: 'assets/images/map/default.svg',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15],
            balloonContentLayout: BalloonContentLayout,
            balloonPanelMaxMapArea: 0,
            balloonLayout: "default#imageWithContent",
            balloonShadow: false,
            balloonImageSize: [0, 0]
          });
          myPlacemark.fakeId = id[i];
          geoObjects[i] = myPlacemark;
          myPlacemark.events.add('balloonopen', function (e) {
            /*myMap.setCenter(myPlacemark.geometry._coordinates, 16, {
                duration: 500
            });*/

            var fakeId = myPlacemark.fakeId;
            myPlacemark.options.set('iconImageHref', 'assets/images/map/pressed.svg');
            var div = document.querySelector(".id".concat(fakeId));
            if (div) {
              div.classList.add("open");
            }
            if (!pannel.classList.contains("open")) {
              pannel.classList.add("open");
            }
            activePlacmark = myPlacemark;
          });
          myPlacemark.events.add('balloonclose', function (e) {
            myPlacemark.options.set('iconImageHref', 'assets/images/map/default.svg');
            baloons.forEach(function (baloon) {
              baloon.classList.remove("open");
            });
            if (pannel.classList.contains("open")) {
              pannel.classList.remove("open");
            }
            activePlacmark = null;
          });
        };
        for (var i = 0, len = pointsData.length; i < len; i++) {
          _loop();
        }
        clusterer.options.set({
          gridSize: 80,
          clusterDisableClickZoom: true
        });
        clusterer.add(geoObjects);
        myMap.behaviors.disable('scrollZoom');
        myMap.geoObjects.add(clusterer);
        myMap.controls.add('geolocationControl');
        myMap.controls.remove('searchControl');
        myMap.setBounds(clusterer.getBounds(), {
          checkZoomRange: true
        });
        myMap.behaviors.enable("dblClickZoom", "rightMouseButtonMagnifier", "multiTouch", "drag");
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          //myMap.behaviors.disable('drag');
        }
      });
    });
  }
  var videos = document.querySelectorAll('video');
  if (videos.length) {
    videos.forEach(function (video) {
      var parentNode = video.closest('.intro__pop-up');
      if (parentNode) {
        var playButton = parentNode.querySelector('.form-modal__play');
        if (playButton) {
          playButton.addEventListener('click', function () {
            togglePlay(video);
          });
          video.addEventListener('play', function () {
            playButton.hidden = !playButton.hidden;
          });
          video.addEventListener('pause', function () {
            playButton.hidden = !playButton.hidden;
          });
        }
      }
    });
  }
  function togglePlay(video) {
    if (video.paused || video.ended) {
      video.play();
    } else {
      video.pause();
    }
  }
  var scrToBtn = document.querySelectorAll(".anchors__link");
  var velocity = .1;
  var pos = 0,
    topOffset = 0;
  var elemToScr;
  var start;
  if (scrToBtn.length > 0) {
    scrToBtn.forEach(function (btn) {
      btn.onclick = function (e) {
        e.preventDefault();
        var winYOffset = window.pageYOffset,
          hash = btn.getAttribute("href");
        elemToScr = document.querySelector(hash).getBoundingClientRect().top - topOffset, start = null;
        requestAnimationFrame(step);
        function step(time) {
          if (start === null) start = time;
          var progress = time - start,
            r = elemToScr < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemToScr) : Math.min(winYOffset + progress / velocity, winYOffset + elemToScr);
          window.scrollTo(0, r);
          if (r != winYOffset + elemToScr) {
            requestAnimationFrame(step);
          } else return;
        }
      };
    });
  }
  var solveInfo = document.querySelectorAll(".solve__info");
  if (solveInfo) {
    solveInfo.forEach(function (info) {
      var parent = info.closest(".section-top");
      var txt = parent.querySelector(".section-top__aside");
      info.onclick = function (e) {
        e.preventDefault();
        if (window.innerWidth <= 768) {
          txt.style.display = "flex";
          setTimeout(function () {
            txt.classList.add("show");
          }, 10);
        }
      };
    });
    var close = document.querySelectorAll(".section-top__aside_close");
    close.forEach(function (btn) {
      var parent = btn.closest(".section-top__aside");
      btn.onclick = function (e) {
        if (window.innerWidth <= 768) {
          parent.classList.remove("show");
          setTimeout(function () {
            parent.style.display = "none";
          }, 100);
        }
      };
    });
  }
});