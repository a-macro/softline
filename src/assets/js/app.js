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
                    if(prev && prev != e.target) {
                        prev.setAttribute('data-state', '');
                    }
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


    let init = false;
    let swiper;

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
                    rows: 2,
                  },
 
                initialSlide: 1,
            });
            init = true;
        }

        if (init && width > 480) {
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


    let swipeEl = document.querySelector('.search-aside');
    let mcSwipe = new Hammer.Manager(swipeEl);
    
    let swipeElHeight = window.innerHeight - 100;
    let swipeThreshold = swipeElHeight / 3.5;
    
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
    
    function hideswipeEl(elem) {
        isOpen = false;
        elem.classList.add("hide");
        elem.classList.remove("show");
        bodyTag.classList.remove("lock-modal");
        elem.classList.remove("canScroll");
        elem.style.transform = 'translate3d(0, 0px, 0)';
        lastPosY = getTranslate3d(elem.style.transform)[1];
    }

    let asideClose = document.querySelector(".search-aside__close");
    if(asideClose) {
        asideClose.onclick = (e) => {
            e.preventDefault();
            hideswipeEl(swipeEl);
        }
    }

    function showNow(elem) {
        setTimeout(function () { isOpen = true }, 500);
        elem.classList.remove("hide");
        elem.classList.add("show");
        bodyTag.classList.add("lock-modal");
        var topPos = - window.innerHeight * .55;
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
    



    window.addEventListener("resize", () => {
        width = window.innerWidth;
        initSlider();
    });
});




