document.addEventListener("DOMContentLoaded", () => {
    let height = window.innerHeight;
    let width = window.innerWidth;
    document.documentElement.style.setProperty('--h', height + "px");
    //document.documentElement.style.setProperty('--w', width + "px");
    //el.style.setProperty("--r", right + "px");
    //scrollLock.enablePageScroll(openedModal); отключить
    //scrollLock.disablePageScroll(mobMenu);

    let header = document.querySelector(".header");
    if(header) {
        let headerH = header.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--headerH', headerH + "px");
    }

    let headerSearch = document.querySelector(".header__search");
    let headerSearchBtn = document.querySelector(".btn__search-show");
    if(headerSearchBtn) {
        headerSearchBtn.onclick = (e) => {
            e.preventDefault();
            headerSearch.classList.add('active');
        }
    }

    let headerSearchClose = document.querySelector(".header__search_close");
    if(headerSearchClose) {
        headerSearchClose.onclick = (e) => {
            headerSearch.classList.remove('active');
        }
    }

    let menuItems = document.querySelectorAll(".header__item");
    let menuWrapper = document.querySelector(".menu-wrapper");
    if(menuItems && menuItems.length > 0) {
        menuItems.forEach(item => {
            let attr = item.getAttribute("data-menu");
            if(attr) {
                let itemMenu = document.querySelector(`.${attr}`);
                item.onmouseover = (e) => {
                    item.classList.add("active");
                    itemMenu.style.display = "block";
                    menuWrapper.classList.add("show");
                }
            }
        });
    }

    const menubutton = document.querySelector('.menu-button')

    if (menubutton && menuWrapper) {
        menubutton.addEventListener('click', () => {
            menubutton.classList.toggle('menu-button--active')
            menuWrapper.classList.toggle('show')
        })
    }

    const tabs = document.querySelectorAll('.tab-label');
    const navList = document.querySelectorAll('.main-nav__list-item')
    const backButton = document.querySelector('.back-panel')
    const menuSecond = document.querySelector('.menu-second')

    if (tabs.length && navList.length && backButton) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                navList.forEach(navItem => {
                    navItem.hidden = !navItem.hidden
                })
                this.parentElement.hidden = !this.parentElement.hidden
                this.classList.toggle('tab-label--active')
                if (this.dataset.tab) {
                    const modal = document.querySelector(`${this.dataset.tab}`)
                    modalHandler.apply(modal)
                    backButton.dataset.back = this.dataset.tab
                }
                backButton.classList.toggle('back-panel--active')
                if (menuSecond) {
                    modalHandler.apply(menuSecond)
                }
            })
        })
        backButton.addEventListener('click', function () {
            this.classList.remove('back-panel--active')
            if (this.dataset.back) {
                const modal = document.querySelector(`${this.dataset.back}`)
                modalHandler.apply(modal)
                delete this.dataset.back
            }
            const active = document.querySelectorAll('.tab-label--active')
            if (active.length) {
                active.forEach(el => {
                    el.classList.remove('tab-label--active')
                })
            }
            navList.forEach(el => {
                el.hidden = false
            })
            if (menuSecond) {
                modalHandler.apply(menuSecond)
            }
        })
    }

    function modalHandler() {
        const modal = this
        
        if (modal) {
            if (modal.hidden) {
                modal.hidden = !modal.hidden
                modal.style.setProperty('pointer-events', 'auto')
                setTimeout(() => {
                    modal.style.opacity = 1
                }, 10)
            } else {
                modal.style.opacity = 0
                modal.style.setProperty('pointer-events', null)
                modal.addEventListener('transitionend', hideaftertransition)
            }
        }
    }

    const tabAccItems = document.querySelectorAll('.tab-accord__list li')
    const innnerDiv = document.querySelector('#inner-menu')

    if (tabAccItems.length) {
        tabAccItems.forEach(tab => {
            tab.addEventListener('click', function () {
                tabAccItems.forEach(el => {
                    el.classList.add('not-active')
                    el.classList.remove('active')
                })
                this.classList.remove('not-active')
                this.classList.toggle('active')
                const subMenu = this.querySelector('.main-nav__submenu')
                if (subMenu && innnerDiv) {
                    innnerDiv.innerHTML = subMenu.innerHTML
                } else {
                    innnerDiv.innerHTML = ''
                }
            })
        })
    }

    function hideaftertransition () {
        this.hidden = true
        this.removeEventListener('transitionend', hideaftertransition)
    }

    let searchInp = document.querySelector(".input__search");
    let btnSearch = document.querySelector(".btn__search");
    if(searchInp) {
        searchInp.oninput = (e) => {
            if(searchInp.value && btnSearch.classList.contains("disabled")) {
                btnSearch.classList.remove("disabled");
                btnSearch.removeAttribute("disabled");
            }
            if(!searchInp.value && !btnSearch.classList.contains("disabled")) {
                btnSearch.classList.add("disabled");
                btnSearch.setAttribute("disabled", "disabled");
            }
        }
    }

    let bodyTag = document.querySelector("body");

    let selectSingle = document.querySelectorAll('.__select');
    function selectFunc() {
        if(selectSingle) {
            selectSingle.forEach(selectSingle => {
                let selectSingle_title = selectSingle.querySelector('.__select__title');
                let selectSingle_labels = selectSingle.querySelectorAll('.__select__label');   
                selectSingle_title.onclick = (e) => {
                    e.preventDefault();
                    let prev = document.querySelector(`[data-state="active"]`);
                    if ('active' === selectSingle.getAttribute('data-state')) {
                        selectSingle.setAttribute('data-state', '');
                    } else {
                        selectSingle.setAttribute('data-state', 'active');
                    }
                };
                
                for (let i = 0; i < selectSingle_labels.length; i++) {
                    selectSingle_labels[i].addEventListener('click', (evt) => {
                        if(!selectSingle_title.classList.contains("chosen")) {
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

    bodyTag.onclick = (e) => {
        let openedSelect = document.querySelector(`[data-state="active"]`);
        if(openedSelect && !e.target.classList.contains("__select")) {
            prev.setAttribute('data-state', '');
        }
    }

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
                slidesPerView: "auto",
            },
            769: {
                slidesPerView: 6,
            },
            1025: {
                slidesPerView: 6,
                spaceBetween: 0,
            }
        },
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
                spaceBetween: 20,
            },
            769: {
                slidesPerView: 6,
                spaceBetween: 40,
            },
            1025: {
                slidesPerView: 6,
            }
        },
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
                spaceBetween: 20,
            },
            769: {
                slidesPerView: 2,
                spaceBetween: 40,
            },
            1441: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
            1921: {
                slidesPerView: 4,
            }
        },
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
                spaceBetween: 20,
            },
            769: {
                spaceBetween: 40,
            },
            1025: {
                spaceBetween: 40,
            }
        },
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
                spaceBetween: 20,
            },
            769: {
                spaceBetween: 40,
            },
            1025: {
                spaceBetween: 40,
            }
        },
    });


    let init = false;
    let swiper;

    function initSlider() {
        if (width <= 768 && !init) {
            swiper = new Swiper(".partners__mobSlider", {
                loop: false,
                slidesPerView: 2.8,
                    spaceBetween: 40,
                freeMode: true,
                autoHeight: false,

                watchOverflow: true, 
                grid: {
                    rows: 2,
                  },
 
                initialSlide: 1,
                breakpoints: {
                    // when window width is >= 320px
                    481: {
                        slidesPerView: 3.8,
                        spaceBetween: 40,
                    },
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

    let results = document.querySelectorAll(".search-result");
    let showMoreBtn = document.querySelector(".search__show-more");

    if(results && results.length > 0) {
        hideResults(results);
    }

    function hideResults(results) {
        showMoreBtn.classList.add("hide");
        for(let i = 0; i < results.length; i++) {
            if(i >= 6) {
                results[i].classList.add("hide");
                showMoreBtn.classList.remove("hide");
            }
        }
    }

    function changeResults(item) {
        let attr = item.getAttribute("data-item");
        let elems;
        if(attr != "all") {
            elems = document.querySelectorAll(`.${attr}`);
            results.forEach(result => {
                if(!result.classList.contains(`${attr}`)) {
                    result.classList.add("hide");
                } else {
                    result.classList.remove("hide");
                }
            });    
        } else {
            elems = results;
            results.forEach(result => {
                result.classList.remove("hide")
            });
        }
        hideResults(elems);
    }

    let itemsSearch = document.querySelectorAll(".search-aside__item");
    let itemShowAll = document.querySelector(".search-aside__item[data-item='all']");

    if(itemsSearch && itemsSearch.length > 0) {
        let title = document.querySelector(".search__title");
        let num = document.querySelector(".search__title_num");
        itemsSearch.forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                if(!item.classList.contains("active")) {
                    let itemTitle = item.querySelector(".search-aside__title");
                    let itemNum = item.querySelector(".search-aside__num");
                    let prevActive = document.querySelector(".active.search-aside__item");
                    prevActive.classList.remove("active");
                    item.classList.add("active");
                    title.innerHTML = itemTitle.innerHTML;
                    num.innerHTML = itemNum.innerHTML;
                    changeResults(item);
                } else {
                    if(e.target.classList.contains("search-aside__item_close")) {
                        let attr = item.getAttribute("data-item");
                        if(attr != "all") {
                            item.classList.remove("active");
                            itemShowAll.classList.add("active");
                            let itemTitle = itemShowAll.querySelector(".search-aside__title");
                            let itemNum = itemShowAll.querySelector(".search-aside__num");   
                            title.innerHTML = itemTitle.innerHTML;
                            num.innerHTML = itemNum.innerHTML;                                
                        }
                        changeResults(itemShowAll);
                    }
                }
            }
        });
    }

    let catalogList = document.querySelectorAll(".catalog-sidebar__item.side-list__item");
    if(catalogList && catalogList.length > 0) {
        catalogList.forEach(item => {
            let parent = item.closest("ul");
            item.onclick = (e) => {
                e.preventDefault();
                if(!item.classList.contains("active")) {
                    let prevActive = document.querySelector(".active.catalog-sidebar__item");
                    if(prevActive) {
                        prevActive.classList.remove("active");
                    }
                    item.classList.add("active");
                } else {
                    item.classList.remove("active");
                }
            }
        });
    }

    let filterMobBtn = document.querySelector(".filters__mobile");
    let catalogSide = document.querySelector(".catalog-sidebar");
    if(filterMobBtn) {
        filterMobBtn.onclick = (e) => {
            e.preventDefault();
            showNow(catalogSide);
        }
    }

    if(showMoreBtn) {
        showMoreBtn.onclick = (e) => {
            e.preventDefault();
            let activeItem = document.querySelector(".active.search-aside__item");
            let attr = activeItem.getAttribute("data-item");
            if(attr != "all") {
                let hiddenElems = document.querySelectorAll(`.search-result.${attr}.hide`);
                for(let i = 0; i < hiddenElems.length; i++) {
                    if(i < 6) {
                        hiddenElems[i].classList.remove("hide");
                    }
                    if(hiddenElems.length < 6) {
                        showMoreBtn.classList.add("hide");
                    }
                }
            } else {
                let hiddenElems = document.querySelectorAll(`.search-result.hide`);
                for(let i = 0; i < hiddenElems.length; i++) {
                    if(i < 6) {
                        hiddenElems[i].classList.remove("hide");
                    }
                    if(hiddenElems.length <= 6) {
                        showMoreBtn.classList.add("hide");
                    }
                }
            }
        }
    }

    let btnGrid = document.querySelector(".catalog__btn-grid");
    let btnList = document.querySelector(".catalog__btn-list");
    let catalogWrap = document.querySelector(".catalog__services");

    if(btnGrid && btnList && catalogWrap) {
        btnGrid.onclick = (e) => {
            e.preventDefault();
            btnList.classList.remove("active");
            btnGrid.classList.add("active");
            catalogWrap.setAttribute("data-type", "grid");
        }
        btnList.onclick = (e) => {
            e.preventDefault();
            btnGrid.classList.remove("active");
            btnList.classList.add("active");
            catalogWrap.setAttribute("data-type", "list");
        }
    }

    let filters = document.querySelectorAll("[data-show]");
    if(filters && filters.length > 0) {
        filters.forEach(filter => {
            countHeight(filter);
        });
    }

    function countHeight(filter) {
        let num = +filter.getAttribute("data-show");
        let elems = filter.querySelectorAll(".catalog-sidebar__item");
        let len = elems.length;
        let elemHeight = elems[0].getBoundingClientRect().height;
        let margin =  +window.getComputedStyle(elems[0], null).getPropertyValue("margin-bottom").split("px")[0];
        let commonH = num * (elemHeight + margin);
        filter.style.setProperty("--max-h", commonH + "px");
    }

    let showMoreFilters = document.querySelectorAll(".filter__show-more");
    if(showMoreFilters && showMoreFilters.length > 0) {
        showMoreFilters.forEach(btn => {
            let parent = btn.closest(".filter__wrapper");
            btn.onclick = (e) => {
                e.preventDefault();
                let list = parent.querySelector("ul");
                list.style.maxHeight = "200vh";
                btn.classList.add("hide");
            }
        });
    }

    let swipeEls = document.querySelectorAll('.swipe-el');
    let hideswipeEl;
    let showNow;

    if(swipeEls && swipeEls.length > 0) {
        swipeEls.forEach(swipeEl => {
            let mcSwipe = new Hammer.Manager(swipeEl);
            let swipeElHeight = window.innerHeight - 100;
            let swipeThreshold = swipeElHeight / 3.5;
            if(window.innerWidth <= 768 && window.innerWidth > 480) {
                swipeEl.style.maxHeight = window.innerHeight * .8 + "px";
            } else if(window.innerWidth <= 480) {
                swipeEl.style.maxHeight = window.innerHeight * .9 + "px";
            }
            
            let lastPosY = 0;
            let isDragging = false;
            let canSwipeUpDown = false;
            let isOpen = false;
        
            let values;
            
            function getTranslate3d(setting = '') {
                values = setting.split(/\w+\(|\);?/);
                if (!values[1] || !values[1].length) {
                    return [];
                }
            
                return values[1].split(/,\s?/g).map(value => parseInt(value, 10));
            }
            
            function setTranslate3dPosY(posY) {
                return 'translate3d(0,' + posY + 'px, 0)';
            }
            
            hideswipeEl = function(elem) {
                isOpen = false;
                elem.classList.add("hide");
                elem.classList.remove("show");
                bodyTag.classList.remove("lock-modal");
                elem.classList.remove("canScroll");
                elem.style.transform = 'translate3d(0, 0px, 0)';
                lastPosY = getTranslate3d(elem.style.transform)[1];
            }
        
            let asideClose = document.querySelectorAll(".swipe-el__close");
            if(asideClose && asideClose.length > 0) {
                asideClose.forEach(btn => {
                    let parent = btn.closest(".swipe-el")
                    btn.onclick = (e) => {
                        e.preventDefault();
                        hideswipeEl(parent);
                    }
                });
            }
        
            showNow = function(elem) {
                setTimeout(function () { isOpen = true }, 500);
                elem.classList.remove("hide");
                elem.classList.add("show");
                bodyTag.classList.add("lock-modal");
                if(window.innerWidth <= 768 && window.innerWidth > 480) {
                    var topPos = - window.innerHeight * .7;
                } else if(window.innerWidth <= 480) {
                    var topPos = - window.innerHeight * .9;
                }
                elem.style.transform = 'translate3d(0,' + topPos + 'px, 0)';
                lastPosY = getTranslate3d(elem.style.transform)[1];
            }
            
            function displayswipeEl(elem = swipeEl) {
                elem.style.transform = 'translate3d(0, 0, 0)';
                elem.classList.remove("hide");
            }
            
            function handleDrag(ev) {
                var direction = ev.offsetDirection;
                var directionDown = direction === 16;
            
                swipeEl.addEventListener(
                    'scroll',
                    function () {
                        var scrollTop = swipeEl.scrollTop;
                        if (scrollTop == 0) {
                            canSwipeUpDown = false;
                            isOpen = false;
                            swipeEl.classList.remove('canScroll');
                        }
                        else {
                            canSwipeUpDown = true;
                            isOpen = true;
            
                            swipeEl.classList.add('canScroll');
                        }
                    },
                    false
                )
            
                /*if (isOpen && !directionDown) {
                    setTranslate3dPosY(0);
                    canSwipeUpDown = true;
                    swipeEl.classList.add('canScroll');
                }
                else */if (!canSwipeUpDown) {
                    swipeEl.classList.remove('canScroll');
                    var elem = swipeEl;
            
                    // DRAG STARTED
                    if (!isDragging) {
                        if(ev.target != elem) {
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
                        }
                        else {
                            showNow(elem);
                        }
                    }
                }
            }
            
            mcSwipe.add(new Hammer.Pan({
                direction: Hammer.DIRECTION_ALL,
                threshold: 0
            }));
            if(window.innerWidth <= 768) {
                mcSwipe.on("pan", handleDrag);
            }    
        });
    }

    let observerV = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            let el = entry.target;
            let attr = +el.getAttribute("data-num");
            if(entry.isIntersecting) {
                numGrow(el, attr);
                observerV.disconnect();
            }
        });
    });

    function numGrow(el, end) {
        let i = 0;
        let time = 2500 / end;
        let int = setInterval(() => {
            if(i < end) {
                i += 5;
                el.innerHTML = `${i}+`;
            } else {
                clearInterval(int);
            }
        }, time);
    }

    let changeNums = document.querySelectorAll(".rising-num__num");
    if(changeNums && changeNums.length > 0) {
        changeNums.forEach(element => {
            observerV.observe(element);
        });
    }



    window.addEventListener("resize", () => {
        width = window.innerWidth;
        filters.forEach(filter => {
            countHeight(filter);
        });
        initSlider();
    });






let currentActiveButton = document.querySelector('.filter-button--active')

const no = () => {
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
    a.setAttribute('tabindex', '0')
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    const closeButton = document.createElement('div')
    closeButton.classList.add('close-button')
    b.appendChild(closeButton)
    if (x[i].dataset.text) {
        const title = document.createElement('div')
        title.classList.add('custom-select__title')
        title.innerHTML = x[i].dataset.text
        b.appendChild(title)
    }
    for (j = 0; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      if (j === 0) {
        c.classList.add('same-as-selected')
      }
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          h.classList.add('filter-button--active')
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
    const overlay = document.createElement('div')
    overlay.classList.add('overlay')
    x[i].appendChild(overlay)
    a.addEventListener("click", function(e) {
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
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
        y[i].classList.remove('select-selected--light')
      } else {
        y[i].classList.remove("filter-button--active");
        currentActiveButton = null
      }
    }
    for (i = 0; i < xl; i++) {
      if (!x[i].querySelector('.same-as-selected')) {
        x[i].previousSibling.classList.add('select-selected--light')
      }
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  
  /* If the user clicks anywhere outside the select box,
  then close all select boxes: */
  document.addEventListener("click", closeAllSelect);
}
no()



const filterButtons = document.querySelectorAll('.filter-button, .select-selected')
const overlay = document.querySelector('.filter-wrapper .overlay')
let closeButtons = document.querySelectorAll('.close-button')

function clickHandler () {
    if (this.classList.contains('filter-button--active')) {
        this.classList.remove('filter-button--active')
    } else {
        filterButtons.forEach(el => {
            el.classList.remove('filter-button--active')
        })
        this.classList.add('filter-button--active')
    }
}

function closeMenu () {
    filterButtons.forEach(el => {
        el.classList.remove('filter-button--active')
    })
}

if (filterButtons.length && closeButtons.length) {
    if (overlay) {
        overlay.addEventListener('click', closeMenu)
    }
    filterButtons.forEach(el => {
        el.addEventListener('click', clickHandler)
    })
    closeButtons.forEach(el => {
        el.addEventListener('click', closeMenu)
    })
}


var acc = document.querySelectorAll(".panel .panel__title");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

const sm = matchMedia("(max-width: 480px)")
const newsButton = document.querySelector('.news__button')
let hideItems = null
const items = document.querySelectorAll('.events__item, .news__item');

if (sm.matches && newsButton) {
    if (items.length) {
        hideItems = [...items].slice(-8)
        hideItems.forEach(el => el.hidden = true)
    }
    newsButton.addEventListener('click', clickHandlerTabs)
} 

if (newsButton) {
    sm.addEventListener('change', () => {
        if (sm.matches) {
            if (items.length) {
                hideItems = [...items].slice(-8)
                hideItems.forEach(el => el.hidden = true)
            }
            newsButton.addEventListener('click', clickHandlerTabs)
            newsButton.hidden = false
        } else {
            newsButton.removeEventListener('click', clickHandlerTabs)
            if (hideItems?.length) {
                hideItems.forEach(el => el.hidden = false)
            }
        }
    })
}

function clickHandlerTabs () {
    this.hidden = true
    hideItems.forEach(el => el.hidden = false)
}

const buttonsModal = document.querySelectorAll('[data-modal]')
const regModal = document.querySelectorAll('.regModal')

if (regModal.length) {
    regModal.forEach(el =>  {
        el.addEventListener('click', function () {
        if (event.target.classList.contains('regModal')) {
            modalHandler.apply(event.target)
        }
    })
    const closeButton = el.querySelector('.close-button')

    if (closeButton) {
        closeButton.addEventListener('click', function () {
            const modal = this.closest('.regModal')
            if (modal) {
                modalHandler.apply(modal)
            }
        })
    }
})
}

function modalHandler() {
    const modal = document.querySelector(`${this.dataset?.modal}`) || this

    if (modal) {
        if (modal.hidden) {
            modal.hidden = !modal.hidden
            modal.style.setProperty('pointer-events', 'auto')
            setTimeout(() => {
                modal.style.opacity = 1
            }, 10)
        } else {
            modal.style.opacity = 0
            modal.style.setProperty('pointer-events', null)
            modal.addEventListener('transitionend', hideaftertransition)
        }
    }
}

function hideaftertransition () {
    this.hidden = true
    this.removeEventListener('transitionend', hideaftertransition)
}

if (buttonsModal.length) {
    buttonsModal.forEach(el => el.addEventListener('click', modalHandler))
}

const forms = document.forms
const feedBack = document.querySelector('.feedBack')

if (feedBack) {
    const closeButton = feedBack.querySelectorAll('button')

    if (closeButton.length) {
        closeButton.forEach(el => el.addEventListener('click', modalHandler.bind(feedBack)))
    }

}

if (forms.length && feedBack) {
    for(let form of forms) {
        form.addEventListener('submit', function () {
            event.preventDefault()
            modalHandler.apply(this.closest('.regModal'))
            modalHandler.apply(feedBack)
        })
    }
}

var acc = document.getElementsByClassName("accordion__list-title");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.parentNode.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

const accordions = document.querySelectorAll('.accordion')
const faqlist = document.querySelector('.faq__left-list')

const mm = matchMedia("(max-width: 768px)")

if (accordions.length && faqlist) {
    accordions.forEach(el => {
        const title = el.querySelector('.accordion__title')?.innerHTML

        if (title) {
            el.setAttribute('data-visible', title)
            const li = document.createElement('li')
            li.setAttribute('data-visible', title)
            li.innerHTML = title
            li.addEventListener('click', function () {
                accordions.forEach(el => {
                    if (this.dataset.visible === el.dataset.visible) {
                        // const headerH = document.documentElement.style.getPropertyValue('--headerH') || '-200'

                        const yOffset = !mm.matches ? -200 : -150; 
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        
                        window.scrollTo({top: y, behavior: 'smooth'});
                    }
                })
            })
            faqlist.appendChild(li)
        }
    })
}

const navBar = document.querySelectorAll('.faq__left-list li')
const stickyBar = document.querySelector('.sticky-mobile')

const callback = (entry) => {
    if (entry.length) {
        entry.forEach(el => {
            if (el.isIntersecting ) {
                el.target.classList.add('accordion--visible')
                const data = el.target.dataset.visible
                if (data) {
                    navBar.forEach(navItem => {
                        if (navItem.dataset.visible === data) {
                            navItem.classList.add('active')
                            if (stickyBar) {
                                stickyBar.innerHTML = data
                            }
                        } else {
                            navItem.classList.remove('active')
                        }
                    })
                }
            } else {
                el.target.classList.remove('accordion--visible')
            }
        })
    }
}

if (stickyBar && navBar.length) {
    stickyBar.addEventListener('click', function () {
        const nav = navBar[0].closest('.fixed-mobile')
        modalHandler.apply(nav)
    })
}

const options = {
    threshold: 0.5 // half of item height
  }

const observer = new IntersectionObserver(callback, options)


const fixedBlock = document.querySelector('.fixed-mobile')
if (fixedBlock) {
    mm.addEventListener('change', () => {
        if (mm.matches) {
            fixedBlock.hidden = true
        } else {
            fixedBlock.style.opacity = null
            fixedBlock.hidden = false
        }
    })
    if (mm.matches) {
        fixedBlock.hidden = true
    } else {
        fixedBlock.style.opacity = null
        fixedBlock.hidden = false
    }
}

document.addEventListener('resize', () => {
    if(header) {
        let headerH = header.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--headerH', headerH + "px");
    }
})

if (accordions.length && navBar.length) {
    accordions.forEach(el => observer.observe(el))
}

const accCloseButtons = document.querySelectorAll('.accordion .close-button')

if (accCloseButtons.length) {
    accCloseButtons.forEach(el => {
        el.addEventListener('click', function () {
            this.parentNode.previousElementSibling.click()
        })
    })
}

const actualBtn = document.getElementById('actual-btn');

function bytesToMegaBytes(bytes) { 
    return bytes / (1024*1024); 
  }

function deleteFile (element, index = 0) {
    const dt = new DataTransfer()
    const input = element
    const files = input.files
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (index !== i)
        dt.items.add(file)
    }
    
    input.files = dt.files // Assign the updates list
}

function changeText (element, text, error = true) {
    if (element) {
        element.innerHTML = text
        if (error) {
            element.classList.add('error')
        } else {
            element.classList.remove('error')
        }
    }
}

if (actualBtn) {
    const label = actualBtn.nextElementSibling
    actualBtn.addEventListener('change', function(){
        let filechosen = this.parentElement.querySelector('.file-chosen')
        if (!this.files[0]) {
            return
        }
        const mb = bytesToMegaBytes(this.files[0].size)
        const ourText = this.parentElement.querySelector('.canText')
        if (mb > 1) {

            deleteFile(this)

            if (filechosen) {
                filechosen.remove()
            }
            
            if (ourText) {
                const text = ourText.dataset.error
                if (text) {
                    changeText(ourText, text)
                }
            }

            return
        }

        const arrayText = 'doc, txt, rtf, pfd'
        const types = arrayText.split(/[^\w+]+/)
        const typesTest = types.some(el => {
            const ext = this.files[0].name.match(/\.([^.]+)$/)[0].slice(1)
            return el === ext
        })


        if (!typesTest) {

            deleteFile(this)

            if (filechosen) {
                filechosen.remove()
            }

            if (ourText) {
                const text = ourText.dataset.error
                if (text) {
                    changeText(ourText, text)
                }
            }
            return
        }

        if (!filechosen) {
            filechosen = document.createElement('span')
            filechosen.classList.add('file-chosen')
            filechosen.innerHTML = this.files[0].name
            label.appendChild(filechosen)
            filechosen.addEventListener('click', () => {
                filechosen.remove()
                deleteFile(this)
            })
        } else {
            filechosen.innerText = this.files[0].name
        }

        if (ourText) {
            const text = ourText.dataset.submit
            if (text) {
                changeText(ourText, text, false)
            }
        }
        })
}



});




