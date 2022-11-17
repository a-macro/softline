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

    if(results && results.length > 0) {
        hideResults(results);
    }

    function hideResults(results) {
        for(let i = 0; i < results.length; i++) {
            if(i >= 6) {
                results[i].classList.add("hide");
            }
        }
    }

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        initSlider();
    });
});




