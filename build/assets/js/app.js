"use strict";

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
  var menuItems = document.querySelectorAll(".header__item");
  var menuWrapper = document.querySelector(".menu-wrapper");
  if (menuItems && menuItems.length > 0) {
    menuItems.forEach(function (item) {
      var attr = item.getAttribute("data-menu");
      if (attr) {
        var itemMenu = document.querySelector(".".concat(attr));
        item.onmouseover = function (e) {
          item.classList.add("active");
          itemMenu.style.display = "block";
          menuWrapper.classList.add("show");
        };
      }
    });
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
    var elemHeight = elems[0].getBoundingClientRect().height;
    var margin = +window.getComputedStyle(elems[0], null).getPropertyValue("margin-bottom").split("px")[0];
    var commonH = num * (elemHeight + margin);
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
          var topPos = -window.innerHeight * .9;
        }
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
      var attr = +el.getAttribute("data-num");
      if (entry.isIntersecting) {
        numGrow(el, attr);
        observerV.disconnect();
      }
    });
  });
  function numGrow(el, end) {
    var i = 0;
    var time = 2500 / end;
    var int = setInterval(function () {
      if (i < end) {
        i += 5;
        el.innerHTML = "".concat(i, "+");
      } else {
        clearInterval(int);
      }
    }, time);
  }
  var changeNums = document.querySelectorAll(".rising-num__num");
  if (changeNums && changeNums.length > 0) {
    changeNums.forEach(function (element) {
      observerV.observe(element);
    });
  }
  window.addEventListener("resize", function () {
    width = window.innerWidth;
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
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
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
        b.appendChild(c);
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
      this.classList.remove('filter-button--active');
    } else {
      filterButtons.forEach(function (el) {
        el.classList.remove('filter-button--active');
      });
      this.classList.add('filter-button--active');
    }
  }
  function closeMenu() {
    filterButtons.forEach(function (el) {
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
});