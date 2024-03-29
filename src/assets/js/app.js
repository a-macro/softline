

document.addEventListener("DOMContentLoaded", () => {

    const mm = matchMedia("(max-width: 1024px)");
    const sm = matchMedia("(max-width: 480px)");

    const tables = document.querySelectorAll('.crm-block table, story-block table');
    if (tables.length) {
        tables.forEach(table => {

            // create wrapper container
            const wrapper = document.createElement('div');
            wrapper.classList.add('table-wrapper');

            // insert wrapper before el in the DOM tree
            table.parentNode.insertBefore(wrapper, table);

            // move el into wrapper
            wrapper.appendChild(table);
        })
    }

    let height = window.innerHeight;
    let width = window.innerWidth;
    // document.documentElement.style.setProperty('--h', height + "px");
    //document.documentElement.style.setProperty('--w', width + "px");
    //el.style.setProperty("--r", right + "px");
    //scrollLock.enablePageScroll(openedModal); отключить
    enableScroll();
    //scrollLock.disablePageScroll(mobMenu);

    let header = document.querySelector(".header");
    if (header) {
        let headerH = header.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--headerH', headerH + "px");
    }

    const stickyBlocks = document.querySelectorAll('.sticky')
    let prevScroll = 0;
    window.addEventListener('scroll', (e) => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        if (currentScroll < 0) {
            currentScroll = 0;
        }
        let delta = currentScroll - prevScroll;
        if (delta > 0 && currentScroll > 80 && header && window.innerWidth > 1024) {
            header.classList.add("hide-header");
            header.classList.add("start");
            if (stickyBlocks.length) {
                stickyBlocks.forEach(el => {
                    el.style.setProperty('--headerH', '0px');
                })
            }
        } else if (header && currentScroll > 80 && window.innerWidth > 1024) {
            header.classList.remove("hide-header");
            header.classList.add("start");
            if (stickyBlocks.length) {
                let headerH = header.getBoundingClientRect().height;
                stickyBlocks.forEach(el => {
                    if (headerH) {
                        el.style.setProperty('--headerH', headerH + "px");
                    }
                })
            }
        } else if (header && currentScroll < 20 && window.innerWidth > 1024) {
            header.classList.remove("hide-header");
            header.classList.remove("start");
        }
        prevScroll = currentScroll;
    })


    let headerSearch = document.querySelectorAll(".header__search");
    let headerSearchBtn = document.querySelectorAll(".btn__search-show");
    const menubutton = document.querySelector('.menu-button');

    if (mm.matches) {
        const links = document.querySelectorAll('a.header__link,a.menu__item:not(.list),a.menu__title,a.submenu__title,a.submenu__link,a.header__anchor,a.header__nav_link,a.header__top-button');
        if (links.length) {
            links.forEach(el => {
                el.addEventListener('click', () => {
                    if (menubutton) {
                        menubutton.click();
                    }
                })
            })
        }
    }

    let bodyTag = document.querySelector("body");

    if (headerSearchBtn) {
        headerSearchBtn.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const parent = btn.closest('.header__mid')
                if (parent) {
                    parent.classList.add('header__mid--active');
                }
                headerSearch.forEach(element => {
                    element.parentElement.style.position = 'static';
                    element.classList.add('active');
                });
                if (window.innerWidth <= 1024 && bodyTag.classList.contains("menu-open")) {
                    bodyTag.classList.remove("menu-open");
                    menubutton.classList.remove("menu-button--active")
                    headerBottom.style.display = "none";
                    setTimeout(() => {
                        headerBottom.classList.remove("show");
                    }, 100);
                    // scrollLock.enablePageScroll();
                    enableScroll();
                }
            }
        });
    }

    let headerSearchClose = document.querySelectorAll(".header__search_close");
    if (headerSearchClose.length > 0) {
        headerSearchClose.forEach(headerSearchClose => {
            headerSearchClose.onclick = (e) => {
                e.preventDefault();
                headerSearch.forEach(element => {
                    const parent = element.closest('.header__mid')
                    if (parent) {
                        parent.classList.remove('header__mid--active')
                    }
                    element.parentElement.style.position = null;
                    element.classList.remove('active');
                });
            }
        });
    }

    let menuItems = document.querySelectorAll(".header__item");
    let menuWrapper = document.querySelector(".menu-wrapper");
    function closeMenuButton() {
        let itemAct = document.querySelector(".header__item.active");
        itemAct.classList.remove("active");
        let attrPrev = itemAct.getAttribute("data-menu");
        let itemMenu = document.querySelector(`.${attrPrev}`);
        itemMenu.style.display = "none";
        menuWrapper.classList.remove("show");
        // scrollLock.enablePageScroll();
        enableScroll();
        document.body.classList.remove('overflow-hidden')
        document.removeEventListener('click', closeMenuAll)
        menuItems.forEach(item => {
            item.removeEventListener('click', closeMenuButton)
        })
    }

    function closeMenuAll() {
        if (!event.target.closest('.menu-wrapper')) {
            let targ = event.target;
            let attr = targ.getAttribute("data-menu");
            let parent = targ.closest(".menu-wrapper");
            let itemAct = document.querySelector(".header__item.active");
            let checkLink = targ.closest(".header__item.active");
            if (!attr && !parent && !targ.classList.contains("menu-wrapper") && itemAct && itemAct != targ && !checkLink && !targ.classList.contains("header__menu")) {
                itemAct.classList.remove("active");
                let attrPrev = itemAct.getAttribute("data-menu");
                let itemMenu = document.querySelector(`.${attrPrev}`);
                itemMenu.style.display = "none";
                menuWrapper.classList.remove("show");
                // scrollLock.enablePageScroll();
                enableScroll();
                document.body.classList.remove('overflow-hidden')
                document.removeEventListener('click', closeMenuAll)
                menuItems.forEach(item => {
                    item.removeEventListener('click', closeMenuButton)
                })
                return
            }
        }
    }
    if (menuItems && menuItems.length > 0) {
        menuItems.forEach(item => {
            let attr = item.getAttribute("data-menu");
            if (attr) {
                let itemMenu = document.querySelector(`.${attr}`);
                item.onclick = (e) => {
                    if (mm.matches) {
                        e.preventDefault()
                    }
                }
                item.onclick = (e) => {
                    if (!item.classList.contains("active")) {
                        menuItems.forEach(item => {
                            item.removeEventListener('click', closeMenuButton)
                        })
                        if (!mm.matches) {
                            item.addEventListener('click', closeMenuButton)
                            document.addEventListener('click', closeMenuAll)
                            document.body.classList.add('overflow-hidden')
                        }

                        let prev = document.querySelector(".active.header__item");
                        if (prev && prev != item) {
                            prev.classList.remove("active");
                            let attrPrev = prev.getAttribute("data-menu");
                            let itemMenuPrev = document.querySelector(`.${attrPrev}`);
                            itemMenuPrev.style.display = "none";
                        }
                        item.classList.add("active");
                        itemMenu.style.display = "flex";
                        menuWrapper.classList.add("show");
                        disableScroll()
                    } else {
                        /*item.classList.remove("active");
                        itemMenu.style.display = "none";
                        menuWrapper.classList.remove("show");    */
                    }
                }
            }
        });
    }

    let subMenuItems = document.querySelectorAll(".menu__item");
    if (subMenuItems && subMenuItems.length > 0) {
        sm.addEventListener('change', () => {
            if (sm.matches) {
                let menuActive = document.querySelector(".menu__item.active");
                if (menuActive) {
                    subMenuItems.forEach(itemRest => {
                        itemRest.classList.add("hide");
                    });
                }
            } else {
                subMenuItems.forEach(itemRest => {
                    itemRest.classList.remove("hide");
                });
            }
        })
        subMenuItems.forEach(item => {
            if (window.innerWidth <= 480) {
                item.classList.remove("active");
            }
            let parent = item.closest(".menu");
            item.onclick = (e) => {
                if (!item.classList.contains("active")) {
                    let prev = parent.querySelector(".menu__item.active");
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
                    if (!item.classList.contains('list')) {
                        return;
                    }

                    if (window.innerWidth <= 480 && !item.classList.contains("empty")) {
                        subMenuItems.forEach(itemRest => {
                            itemRest.classList.add("hide");
                        });
                    }
                } else {
                    if (window.innerWidth <= 480) {
                        item.classList.remove("active");
                        subMenuItems.forEach(itemRest => {
                            itemRest.classList.remove("hide");
                        });
                    }
                }
            }
        });
    }

    const menuLink = document.querySelectorAll('.menu__link')
    if (menuLink.length) {
        menuLink.forEach(el => {
            el.addEventListener('click', function () {
                if (mm.matches && this.parentElement.classList.contains('list')) {
                    event.preventDefault();
                } else {
                }
            })
        })
    }



    let headerBottom = document.querySelector(".header__bottom");

    if (menubutton && menuWrapper) {
        menubutton.addEventListener('click', () => {
            menubutton.classList.toggle('menu-button--active')
            if (!headerBottom.classList.contains("show")) {
                bodyTag.classList.add("menu-open");
                headerBottom.style.display = "block";
                setTimeout(() => {
                    headerBottom.classList.add("show");
                }, 10);
                disableScroll()
                // scrollLock.disablePageScroll();
                // scrollLock.addScrollableSelector('.header__bottom');
                // scrollLock.addScrollableSelector('.header__menu');
                // scrollLock.addScrollableSelector('.menu');
            } else {
                let active = document.querySelector(".header__item.active");
                if (active) {
                    active.classList.remove("active");
                }
                let prev = document.querySelectorAll(".menu__item.active");
                if (prev) {
                    prev.forEach(prev => {
                        prev.classList.remove("active");
                    });
                }
                const menus = document.querySelectorAll(".menu");
                if (menus.length) {
                    menus.forEach(el => el.style.display = null)
                }
                let subMenus = document.querySelectorAll(".menu__item.hide");
                if (subMenus) {
                    subMenus.forEach(itemRest => {
                        itemRest.classList.remove("hide");
                    });
                }
                menuWrapper.classList.remove("show");
                bodyTag.classList.remove("menu-open");
                headerBottom.style.display = "none";
                setTimeout(() => {
                    headerBottom.classList.remove("show");
                }, 10);
                // scrollLock.enablePageScroll();
                enableScroll();
            }
        })
    }

    mm.addEventListener('change', () => {
        if (!mm.matches) {
            headerBottom.style.display = "block";
        }
        if (mm.matches) {
        }
        header.classList.remove('start');
        header.classList.remove('hide-header');
    })

    const tabs = document.querySelectorAll('.tab-label');
    const navList = document.querySelectorAll('.main-nav__list-item')
    const backButton = document.querySelector('.back-panel')
    const menuSecond = document.querySelector('.menu-second')
    const innnerDiv = document.querySelector('#inner-menu');
    let menu = document.querySelectorAll(".menu");

    if (backButton) {
        backButton.onclick = (e) => {
            e.preventDefault();
            let act = document.querySelector(".menu__item.active");
            if (act) {
                act.classList.remove("active");
                if (window.innerWidth <= 480) {
                    subMenuItems.forEach(itemRest => {
                        itemRest.classList.remove("hide");
                    });
                    return;
                }
            }
            menuWrapper.classList.remove("show");

            let act2 = document.querySelector(".header__item.active");
            if (act2) {
                menu.forEach(menu => {
                    menu.style.display = "none";
                });
                act2.classList.remove("active");
            }
        }
    }



    const tabAccItems = document.querySelectorAll('.tab-accord__list-item')

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
                const mainButton = this.closest('.main-nav__list-item')
                if (mainButton) {
                    const but = mainButton.querySelector('.tab-label--active')
                    if (but) {
                        but.classList.add('tab-label--hidden')
                    }
                }
                if (subMenu && innnerDiv) {
                    innnerDiv.innerHTML = subMenu.innerHTML
                } else {
                    innnerDiv.innerHTML = ''
                }
            })
        })
    }

    function hideaftertransition() {
        this.hidden = true
        this.removeEventListener('transitionend', hideaftertransition)
    }

    let searchInp = document.querySelectorAll(".input__search");
    if (searchInp.length > 0) {
        searchInp.forEach(searchInp => {
            searchInp.oninput = (e) => {
                let parent = searchInp.closest(".header__search");
                let btnSearch = parent.querySelector(".btn__search");
                if (searchInp.value && btnSearch.classList.contains("disabled")) {
                    btnSearch.classList.remove("disabled");
                    btnSearch.removeAttribute("disabled");
                }
                if (!searchInp.value && !btnSearch.classList.contains("disabled")) {
                    btnSearch.classList.add("disabled");
                    btnSearch.setAttribute("disabled", "disabled");
                }
            }
        });
    }


    let selectSingle = document.querySelectorAll('.__select');
    function selectFunc() {
        if (selectSingle) {
            selectSingle.forEach(selectSingle => {
                let selectSingle_title = selectSingle.querySelector('.__select__title');
                let selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
                selectSingle_title.onclick = (e) => {
                    e.preventDefault();
                    let currentParent = selectSingle_title.closest(".__select");
                    let prev = document.querySelector(`[data-state="active"]`);
                    document.body.classList.add('select-open');
                    let prevParent;
                    if (prev) {
                        prevParent = prev.closest(".__select");
                    }
                    if (prev && prevParent && prevParent != currentParent) {
                        prev.setAttribute('data-state', '');
                        document.body.classList.remove('select-open');
                        enableScroll();
                    }
                    if ('active' === selectSingle.getAttribute('data-state')) {
                        selectSingle.setAttribute('data-state', '');
                        document.body.classList.remove('select-open');
                        enableScroll();
                    } else {
                        selectSingle.setAttribute('data-state', 'active');
                        document.body.classList.add('select-open');
                        disableScroll();
                    }
                };

                for (let i = 0; i < selectSingle_labels.length; i++) {
                    selectSingle_labels[i].addEventListener('click', (evt) => {
                        if (!selectSingle_title.classList.contains("chosen")) {
                            selectSingle_title.classList.add("chosen");
                        }
                        selectSingle_title.innerHTML = evt.currentTarget.innerHTML;
                        enableScroll();

                        selectSingle.setAttribute('data-state', '');
                        document.body.classList.remove('select-open');
                        const forEl = evt.currentTarget.getAttribute('for');

                        if (forEl) {
                            if (getCookie('city') === forEl) {
                                return;
                            } else {
                                setCookie('city', forEl, { expires: getOneYearFromNow() });
                                location.reload();
                            }
                        }

                    });
                }
            });
        }
    }

    selectFunc();

    function changeLocationOnCookie() {
        const locationInput = getCookie('city')
        if (locationInput) {

            const selects = document.querySelectorAll(`.__select__label[for="${locationInput}"]`);

            if (selects.length) {
                selects.forEach(el => {
                    el.click()
                })
            }
        } else {
            const label = document.querySelector(`.__select__label[for]`);
            if (label) {
                setCookie('city', label.getAttribute('for'), { expires: getOneYearFromNow() })
            }
        }
    }

    changeLocationOnCookie();


    bodyTag.onclick = (e) => {
        let openedSelect = document.querySelector(`[data-state="active"]`);
        let parent = e.target.closest(".__select");
        if (openedSelect && !parent) {
            openedSelect.setAttribute('data-state', '');
            enableScroll();
        }
    }

    document.addEventListener('mousedown', () => {
        if (event.which === 2) {
            event.preventDefault();
            return;
        }
        if (event.button === 1) {
            event.preventDefault();
        }
    })

    let servCont = document.querySelectorAll(".services__container");
    if (servCont.length > 0) {
        servCont.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");

            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 4,
                watchOverflow: true,
                spaceBetween: 0,
                loop: false,
                breakpoints: {
                    300: {
                        slidesPerView: "auto",
                    },
                    1025: {
                        slidesPerView: 4,
                        spaceBetween: 0,
                    },
                    1516: {
                        slidesPerView: 6,
                        spaceBetween: 0,
                    }
                },
            });
        });

    }

    let helpCont = document.querySelectorAll(".help__container");
    if (helpCont.length > 0) {
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
                1025: {
                    slidesPerView: 6,
                    spaceBetween: 40,
                },
                1025: {
                    slidesPerView: 6,
                }
            },
        });
    }

    let solveCont = document.querySelectorAll(".solve__container");
    if (solveCont.length > 0) {
        solveCont.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 4,
                watchOverflow: true,
                spaceBetween: 40,
                freeMode: "false",
                loop: false,
                // loop: true,
                breakpoints: {
                    300: {
                        slidesPerView: "auto",
                        spaceBetween: 20,
                    },
                    1025: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1516: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1921: {
                        slidesPerView: 4,
                    }
                },
            });

        });
    }

    let solveStoryCont = document.querySelectorAll(".solve-story__container");
    if (solveStoryCont.length > 0) {
        solveStoryCont.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
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
                    1025: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1516: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1921: {
                        slidesPerView: 3,
                    }
                },
            });
        });
    }

    let solveContStory = document.querySelectorAll(".solve-p__container");
    if (solveContStory.length > 0) {
        solveContStory.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");

            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 2,
                watchOverflow: true,
                spaceBetween: 40,
                freeMode: "false",
                loop: false,
                breakpoints: {
                    300: {
                        slidesPerView: "auto",
                        spaceBetween: 20,
                    },
                    1025: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1516: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1921: {
                        slidesPerView: 2,
                    }
                },
            });
        });
    }

    let projectsSlider = document.querySelectorAll(".projects__slider");
    if (projectsSlider.length > 0) {
        projectsSlider.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: "auto",
                watchOverflow: true,
                spaceBetween: 40,
                loop: false,
                breakpoints: {
                    300: {
                        spaceBetween: 20,
                    },
                    1025: {
                        spaceBetween: 40,
                    },
                    1025: {
                        spaceBetween: 40,
                    }
                },
            });
        });
    }

    let storiesSlider = document.querySelectorAll(".stories-slider");
    if (storiesSlider.length > 0) {
        storiesSlider.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 2,
                watchOverflow: true,
                spaceBetween: 40,
                loop: false,
                breakpoints: {
                    300: {
                        spaceBetween: 20,
                        slidesPerView: 1.1,
                    },
                    481: {
                        slidesPerView: 1.35,
                        spaceBetween: 20,
                    },
                    1025: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1025: {
                        spaceBetween: 40,
                    }
                },
            });
        });


    }

    let storiesSliderNew = document.querySelectorAll(".stories-slider-new");
    if (storiesSliderNew.length > 0) {
        storiesSliderNew.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 6,
                watchOverflow: true,
                spaceBetween: 40,
                loop: false,
                breakpoints: {
                    300: {
                        spaceBetween: 20,
                        slidesPerView: 1.7,
                    },
                    481: {
                        slidesPerView: 3.5,
                        spaceBetween: 20,
                    },
                    1025: {
                        slidesPerView: 6,
                        spaceBetween: 40,
                    },
                    1025: {
                        spaceBetween: 40,
                    }
                },
            });
        });


    }

    let featuresSlider = document.querySelectorAll(".features__slider");
    if (featuresSlider.length > 0) {
        featuresSlider.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 3,
                watchOverflow: true,
                spaceBetween: 40,
                loop: false,
                breakpoints: {
                    300: {
                        spaceBetween: 20,
                        slidesPerView: 1.1,
                    },
                    481: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1025: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1025: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    }
                },
            });
        });


    }

    let gallerySlider = document.querySelectorAll(".gallery-slider");
    if (gallerySlider.length > 0) {
        gallerySlider.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: 4,
                watchOverflow: true,
                spaceBetween: 40,
                loop: false,
                breakpoints: {
                    300: {
                        spaceBetween: 20,
                        slidesPerView: 1.1,
                    },
                    481: {
                        slidesPerView: 1.3,
                        spaceBetween: 20,
                    },
                    1025: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1516: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1921: {
                        slidesPerView: 4,
                        spaceBetween: 40,
                    }
                },
            });
        });


    }


    let solveCustomers = document.querySelectorAll(".customer__container");
    if (solveCustomers.length > 0) {
        solveCustomers.forEach(slider => {
            let btnPrev = slider.querySelector(".swiper-button-prev");
            let btnNext = slider.querySelector(".swiper-button-next");

            let swiper = new Swiper(slider, {
                navigation: {
                    nextEl: btnNext,
                    prevEl: btnPrev
                },
                slidesPerView: 3,
                watchOverflow: true,
                spaceBetween: 40,
                freeMode: "false",
                loop: false,
                breakpoints: {
                    300: {
                        slidesPerView: "auto",
                        spaceBetween: 20,
                    },
                    1025: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1516: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1921: {
                        slidesPerView: 3,
                    }
                },
            });
        });
    }

    let newsCont = document.querySelectorAll(".news__container");
    if (newsCont.length > 0) {
        newsCont.forEach(slider => {
            let prev = slider.querySelector(".swiper-button-prev");
            let next = slider.querySelector(".swiper-button-next");
            new Swiper(slider, {
                navigation: {
                    nextEl: next,
                    prevEl: prev
                },
                slidesPerView: "auto",
                watchOverflow: true,
                spaceBetween: 40,
                loop: false,
                breakpoints: {
                    300: {
                        spaceBetween: 20,
                    },
                    1025: {
                        spaceBetween: 40,
                    },
                    1025: {
                        spaceBetween: 40,
                    }
                },
            });
        });
    }


    let newsSliser = document.querySelector(".news-page__swiper");
    if (newsSliser) {
        let prev = newsSliser.querySelector(".swiper-button-prev");
        let next = newsSliser.querySelector(".swiper-button-next");

        new Swiper(newsSliser, {
            navigation: {
                nextEl: next,
                prevEl: prev
            },
            slidesPerView: "auto",
            watchOverflow: true,
            spaceBetween: 40,
            loop: false,
            breakpoints: {
                300: {
                    spaceBetween: 20,
                },
                1025: {
                    spaceBetween: 40,
                },
                1025: {
                    spaceBetween: 40,
                }
            },
        });
    }

    // const customPagination = document.querySelector('.swiper-pagination-custom__inner')
    const timelineSwiper = new Swiper(".timeline__swiper", {
        autoHeight: false,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false
        },

        speed: 500,
        direction: "horizontal",
        navigation: {
            nextEl: ".timeline .swiper-button-next",
            prevEl: ".timeline .swiper-button-prev"
        },
        slidesPerView: 'auto',
        pagination: {
            el: ".swiper-pagination",
            type: "custom",
            watchSlidesProgress: true,
            watchSlidesVisibility: true,
            renderCustom: function (_, cur, list) {
                const elcustom = document.querySelector('.progressbar__inner')
                const num = (cur / list)
                if (elcustom) {
                    elcustom.style.setProperty('transform', `scaleX(${num})`)
                }
            },
        },
        loop: true,
        effect: "slide",
    })
    const timeSwiper = new Swiper(".timeline__swiper-2",
        {
            slidesPerView: 'auto',
            speed: 500,
            direction: "horizontal",

            loop: true,
            effect: "slide",
            spaceBetween: 40,
        }
    )

    timelineSwiper.controller.control = timeSwiper

    const swiperNew = new Swiper('.mission__swiper', {
        direction: 'vertical',
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });

    let init = false;
    let swiper;
    let slider = document.querySelector(".partners__mobSlider");

    function initSlider() {
        if (width <= 1024 && !init && slider) {
            swiper = new Swiper(".partners__mobSlider", {
                loop: false,
                slidesPerView: 2.1,
                spaceBetween: 40,
                freeMode: true,
                autoHeight: false,

                watchOverflow: true,

                grid: {
                    rows: 2,
                    fill: "row",

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

        if (init && width > 1024) {
            init = false;
            swiper.destroy();
        }
    }
    initSlider();

    let initStoryRange = false;
    let swiperStoryRange;
    let sliderStoryRange = document.querySelector(".range-slider");

    function initSliderStoryRange() {
        if (width <= 480 && !initStoryRange && sliderStoryRange) {
            swiperStoryRange = new Swiper(".range-slider", {
                loop: false,
                slidesPerView: 1.1,
                spaceBetween: 20,
                freeMode: true,
                autoHeight: false,
                watchOverflow: true,
                initialSlide: 0,
            });
            initStoryRange = true;
        }

        if (initStoryRange && width > 480) {
            initStoryRange = false;
            swiperStoryRange.destroy();
        }
    }
    initSliderStoryRange();

    let initSuggestion = false;
    let swiperSuggestion;
    let sliderSuggestion = document.querySelector(".suggestion-slider");

    function initSliderSuggestion() {

        if (width <= 1024 && !initSuggestion && sliderSuggestion) {
            swiperSuggestion = new Swiper(".suggestion-slider", {
                loop: false,
                navigation: {
                    nextEl: ".suggestion-slider .swiper-button-next",
                    prevEl: ".suggestion-slider .swiper-button-prev"
                },
                slidesPerView: 1,
                spaceBetween: 20,
                freeMode: false,
                autoHeight: true,
                watchOverflow: true,
                initialSlide: 0,
            });
            initSuggestion = true;
        }

        if (initSuggestion && width > 1024) {
            initSuggestion = false;
            swiperSuggestion.destroy();
        }
    }
    initSliderSuggestion();

    let results = document.querySelectorAll(".search-result");
    const showMoreBtn = document.querySelector(".search__show-more");
    if (results && results.length > 0 && showMoreBtn) {
        hideResults(results);
    }

    function hideResults(results) {
        showMoreBtn.classList.add("hide");
        for (let i = 0; i < results.length; i++) {
            if (i >= 6) {
                results[i].classList.add("hide");
                showMoreBtn.classList.remove("hide");
            }
        }
    }

    function changeResults(item) {
        let attr = item.getAttribute("data-item");
        let elems;
        if (attr != "all") {
            elems = document.querySelectorAll(`.${attr}`);
            results.forEach(result => {
                if (!result.classList.contains(`${attr}`)) {
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

    if (itemsSearch && itemsSearch.length > 0) {
        let title = document.querySelector(".search__title");
        let num = document.querySelector(".search__title_num");
        itemsSearch.forEach(item => {
            item.onclick = (e) => {
                e.preventDefault();
                if (!item.classList.contains("active")) {
                    let itemTitle = item.querySelector(".search-aside__title");
                    let itemNum = item.querySelector(".search-aside__num");
                    let prevActive = document.querySelector(".active.search-aside__item");
                    prevActive.classList.remove("active");
                    item.classList.add("active");
                    title.innerHTML = itemTitle.innerHTML;
                    num.innerHTML = itemNum.innerHTML;
                    changeResults(item);
                } else {
                    if (e.target.classList.contains("search-aside__item_close")) {
                        let attr = item.getAttribute("data-item");
                        if (attr != "all") {
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

    let catalogList = document.querySelectorAll(".catalog-sidebar__item.side-list__item input");
    if (catalogList && catalogList.length > 0) {
        catalogList.forEach(item => {
            let parent = item.closest("ul");
            let elem = item.closest(".catalog-sidebar__item");
            item.onchange = (e) => {
                if (!elem.classList.contains("active")) {
                    let prevActive = parent.querySelector(".active.catalog-sidebar__item");
                    if (prevActive) {
                        prevActive.classList.remove("active");
                    }
                    elem.classList.add("active");
                }
            }
        });
    }

    let siteMapsTrigger = document.querySelectorAll(".site-map__category_name.trigger");
    if (siteMapsTrigger.length > 0) {
        siteMapsTrigger.forEach(trigger => {
            let parent = trigger.closest(".site-map__wrap");
            let block = parent.querySelector(".site-map__category");
            trigger.onclick = (e) => {
                e.preventDefault();
                parent.classList.toggle("active");
                block.style.cssText = `--elH: ${block.scrollHeight}px`;
            }
        });
    }

    let catalogClose = document.querySelectorAll(".catalog-sidebar__item .search-aside__item_close");
    if (catalogClose.length > 0) {
        catalogClose.forEach(close => {
            let elem = close.closest(".catalog-sidebar__item");
            let inp = elem.querySelector("input");
            close.onclick = (e) => {
                if (elem.classList.contains("active")) {
                    elem.classList.remove("active");
                    inp.setAttribute('checked', 'false');
                    inp.checked = false;
                    if (typeof smartFilter !== 'undefined') {
                        smartFilter.click(inp)
                    }
                }
            }
        });
    }

    let filterMobBtn = document.querySelector(".filters__mobile");
    let catalogSide = document.querySelector(".catalog-sidebar");
    if (filterMobBtn) {
        filterMobBtn.onclick = (e) => {
            e.preventDefault();
            showNow(catalogSide);
        }
    }

    if (showMoreBtn) {
        showMoreBtn.onclick = (e) => {
            e.preventDefault();
            let activeItem = document.querySelector(".active.search-aside__item");
            let attr = activeItem.getAttribute("data-item");
            if (attr != "all") {
                let hiddenElems = document.querySelectorAll(`.search-result.${attr}.hide`);
                for (let i = 0; i < hiddenElems.length; i++) {
                    if (i < 6) {
                        hiddenElems[i].classList.remove("hide");
                    }
                    if (hiddenElems.length < 6) {
                        showMoreBtn.classList.add("hide");
                    }
                }
            } else {
                let hiddenElems = document.querySelectorAll(`.search-result.hide`);
                for (let i = 0; i < hiddenElems.length; i++) {
                    if (i < 6) {
                        hiddenElems[i].classList.remove("hide");
                    }
                    if (hiddenElems.length <= 6) {
                        showMoreBtn.classList.add("hide");
                    }
                }
            }
        }
    }

    const changeGrid = () => {
        const target = event.target;


        let btnGrid = target.closest(".catalog__btn-grid");
        let btnList = target.closest(".catalog__btn-list");

        if (btnGrid) {
            event.preventDefault();
            let btnList = document.querySelector(".catalog__btn-list");
            if (btnList) {
                btnList.classList.remove("active");
                btnGrid.classList.add("active");
                let catalogWrap = document.querySelector(".catalog__services");
                if (catalogWrap) {
                    catalogWrap.setAttribute("data-type", "grid");
                }
            }

        }

        if (btnList) {
            event.preventDefault();
            let btnGrid = document.querySelector(".catalog__btn-grid");
            if (btnGrid) {
                btnGrid.classList.remove("active");
                btnList.classList.add("active");
                let catalogWrap = document.querySelector(".catalog__services");
                if (catalogWrap) {
                    catalogWrap.setAttribute("data-type", "list");
                }
            }
        }
    }

    document.addEventListener('click', changeGrid);



    let filters = document.querySelectorAll("[data-show]");
    if (filters && filters.length > 0) {
        filters.forEach(filter => {
            countHeight(filter);
        });
    }

    function countHeight(filter) {
        let num = filter.getAttribute("data-show");
        let elems = filter.querySelectorAll(".catalog-sidebar__item");
        let len = elems.length;
        if (num === "all" || !num || +num > len) {
            let parent = filter.closest(".filter__wrapper");
            let btn = parent.querySelector(".filter__show-more");
            if (btn) {
                btn.style.display = "none";
            }
            return;
        }
        let margin = +window.getComputedStyle(elems[0], null).getPropertyValue("margin-bottom").split("px")[0];
        let commonH = 0;
        for (let i = 0; i < +num; i++) {
            let h = +elems[i].getBoundingClientRect().height + margin;
            commonH += h;
        }
        filter.style.setProperty("--max-h", commonH + "px");
    }

    let showMoreFilters = document.querySelectorAll(".filter__show-more");
    if (showMoreFilters && showMoreFilters.length > 0) {
        showMoreFilters.forEach(btn => {
            let parent = btn.closest(".filter__wrapper");
            let list = parent.querySelector("ul");
            const listContent = list.innerHTML;
            btn.onclick = function (e) {
                e.preventDefault();
                let text = this.innerHTML;
                let hideText = this.dataset.hideText || 'Скрыть';
                this.innerHTML = hideText;
                this.dataset.hideText = text;
                if (list.children.length > 20) {
                    parent.classList.toggle('open');
                }
                list.classList.toggle('overflow-auto')
                if (list.style.maxHeight !== '') {
                    list.style.maxHeight = null;
                    list.innerHTML = listContent;
                    list.classList.remove('empty')
                    list.scrollTo(0, 0)
                } else {
                    if (list.children.length > 20) {
                        sortList(list);
                    }
                    list.style.maxHeight = "30rem";
                    list.classList.remove('empty')
                }
            }
        });
    }

    const radioButtons = document.querySelectorAll('.catalog-sidebar__item.side-list__item');

    if (radioButtons.length) {
        radioButtons.forEach(el => {
            el.addEventListener('click', function (event) {
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                    const input = this.querySelector('input[type="radio"]')
                    if (input) {
                        input.setAttribute('checked', 'false');
                        input.checked = false;
                        if (typeof smartFilter !== 'undefined') {
                            smartFilter.click(input)
                        }
                    }
                }
            })
        })
    }

    function sortList(list) {
        const arr = [...list.querySelectorAll('li')];
        if (arr) {
            const newArr = arr.sort((a, b) => {
                const textA = a.querySelector('.check-box__text');
                const textB = b.querySelector('.check-box__text');
                if (textA && textB) {
                    const textValueA = textA.innerHTML.toLowerCase().replace(/«/, '');
                    const textValueB = textB.innerHTML.toLowerCase().replace(/«/, '');
                    if (textValueA < textValueB) {
                        return -1;
                    }
                    if (textValueA > textValueB) {
                        return 1;
                    }
                    return 0;
                }
            })
            list.innerHTML = '';
            let prevLetter = null;
            let currentLetter = '';
            newArr.forEach((el) => {
                const text = el.innerText.trim().toUpperCase().replace(/^[«|"|=|'|\(]/, '')
                currentLetter = text[0];
                if (currentLetter !== prevLetter) {
                    const li = document.createElement('li');
                    li.classList.add('filter-number');
                    li.innerHTML = currentLetter;
                    list.appendChild(li);
                }
                prevLetter = currentLetter;
                list.appendChild(el);
            })
        }
    }

    function throttle(func, ms) {

        let isThrottled = false,
            savedArgs,
            savedThis;

        function wrapper() {

            if (isThrottled) { // (2)
                savedArgs = arguments;
                savedThis = this;
                return;
            }

            func.apply(this, arguments); // (1)

            isThrottled = true;

            setTimeout(function () {
                isThrottled = false; // (3)
                if (savedArgs) {
                    wrapper.apply(savedThis, savedArgs);
                    savedArgs = savedThis = null;
                }
            }, ms);
        }

        return wrapper;
    }

    const filterInputs = document.querySelectorAll('.filter-input-text');
    if (filterInputs.length) {
        filterInputs.forEach(el => {
            const list = el.parentElement.querySelector("ul");
            if (list) {
                el.addEventListener('input', function () {
                    const filterArr = throttle(filterList, 4000);
                    filterArr(list, this.value)
                })
            }
        })
    }

    function filterList(list, input) {
        const items = list.querySelectorAll('li');
        if (items.length) {
            const arr = [...items];
            const regExp = new RegExp(`${input.trim().toUpperCase()}`, 'g');
            let number = arr.length;
            arr.forEach(el => {
                const text = el.innerText.trim().toUpperCase();
                if (!regExp.test(text)) {
                    el.style.display = 'none';
                    number--;
                } else {
                    el.style.display = null;
                    number++;
                }
            })
            if (number === 0) {
                list.classList.add('empty')
            } else {
                list.classList.remove('empty')
            }

        }
    }



    let swipeEls = document.querySelectorAll('.swipe-el');
    let hideswipeEl;
    let showNow;

    if (swipeEls && swipeEls.length > 0) {
        swipeEls.forEach(swipeEl => {
            let mcSwipe = new Hammer.Manager(swipeEl);
            let swipeElHeight;
            let swipeThreshold;
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

            hideswipeEl = function (elem) {
                isOpen = false;
                elem.classList.add("hide");
                elem.classList.remove("show");
                bodyTag.classList.remove("lock-modal");
                elem.classList.remove("canScroll");
                if (elem.classList.contains("search-aside") && window.innerWidth <= 480) {
                    elem.style.transform = 'translate3d(0, -3.5rem, 0)';
                } else if (elem.classList.contains("search-aside") && window.innerWidth <= 1024) {
                    elem.style.transform = 'translate3d(0, -6rem, 0)';
                } else {
                    elem.style.transform = null;
                }
                lastPosY = getTranslate3d(elem.style.transform)[1];
                // scrollLock.enablePageScroll();
                enableScroll();
            }

            let asideClose = document.querySelectorAll(".swipe-el__close");
            if (asideClose && asideClose.length > 0) {
                asideClose.forEach(btn => {
                    let parent = btn.closest(".swipe-el")
                    btn.onclick = (e) => {
                        e.preventDefault();
                        hideswipeEl(parent);
                    }
                });
            }

            showNow = function (elem) {
                setTimeout(function () { isOpen = true }, 500);
                elem.classList.remove("hide");
                elem.classList.add("show");
                bodyTag.classList.add("lock-modal");
                disableScroll()
                // scrollLock.disablePageScroll();
                // scrollLock.addScrollableSelector(".search-aside__list");
                // scrollLock.addScrollableSelector(".swipe-el__inner");
                elem.style.transform = 'translate3d(0, 0, 0)';
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
                        if (ev.target != elem) {
                            return;
                        }
                        if (!swipeElHeight) {
                            swipeElHeight = swipeEl.clientHeight;
                        }
                        if (!swipeThreshold) {
                            ;
                            swipeThreshold = swipeElHeight / 1.3;
                        }
                        elem.classList.remove('anim');
                        isDragging = true;

                        let topPos = -swipeElHeight;
                        var currentPosY = topPos;
                        lastPosY = currentPosY ? currentPosY : topPos;
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

            // mcSwipe.add(new Hammer.Pan({
            //     direction: Hammer.DIRECTION_ALL,
            //     threshold: 0
            // }));
            // if (window.innerWidth <= 1024) {
            //     mcSwipe.on("pan", handleDrag);
            // }
        });
    }

    let observerV = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            let el = entry.target;
            if (el.classList.contains("end")) {
                return;
            }
            let attr = +el.getAttribute("data-num");
            if (entry.isIntersecting) {
                let i = 1,
                    num = attr,
                    step = 2500 / num,

                    int = setInterval(function () {
                        if (i <= num) {
                            el.innerHTML = `${i}+`
                        } else {
                            clearInterval(int);
                            el.classList.add("end");
                        }
                        i += 5;
                    }, step);
            }
        });
    });

    let changeNums = document.querySelectorAll(".rising-num__num");
    if (changeNums && changeNums.length > 0) {
        changeNums.forEach(element => {
            observerV.observe(element);
        });
    }



    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        // document.documentElement.style.setProperty('--h', height + "px");

        if (filters.length) {
            filters.forEach(filter => {
                countHeight(filter);
            });
        }
        initSlider();
        initSliderSuggestion();
        initSliderStoryRange();

        if (header) {
            let headerH = header.getBoundingClientRect().height;
            document.documentElement.style.setProperty('--headerH', headerH + "px");
        }
    });

    if (header) {
        if ('ResizeObserver' in window) {
            new ResizeObserver(function () {
                let headerH = header.getBoundingClientRect().height;
                document.documentElement.style.setProperty('--headerH', headerH + "px");
            }).observe(header);
        }

    }



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
            const wrapper = document.createElement('div')
            wrapper.setAttribute('class', 'select-wrapper')
            b.appendChild(wrapper)
            for (j = 0; j < ll; j++) {
                /* For each option in the original select element,
                create a new DIV that will act as an option item: */
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                if (selElmnt.options[j].value === 'own') {
                    c.dataset.own = true;
                }
                if (j === 0) {
                    c.classList.add('same-as-selected')
                }
                c.addEventListener("click", function (e) {
                    /* When an item is clicked, update the original select box,
                    and the selected item: */
                    if (this.dataset.own) {
                        const vacancyname = document.getElementById('form__vacancy_name');
                        if (vacancyname) {
                            vacancyname.style.display = 'block';
                        }
                    }
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.parentNode.previousSibling;
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
                            const filters = this.closest('.filters')
                            if (filters && typeof smartFilter !== 'undefined') {
                                s.options[s.selectedIndex].setAttribute('selected', 'selected');
                                smartFilter.click(s.options[s.selectedIndex])
                            }
                            break;
                        }
                    }
                    h.click();
                });
                wrapper.appendChild(c);
            }
            x[i].appendChild(b);
            const overlay = document.createElement('div')
            overlay.classList.add('overlay')
            x[i].appendChild(overlay)
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

    function clickHandler() {
        if (this.classList.contains('filter-button--active')) {
            document.documentElement.style.overflow = null
            this.classList.remove('filter-button--active')
        } else {
            filterButtons.forEach(el => {
                el.classList.remove('filter-button--active')
            })
            if (sm.matches) {
                document.documentElement.style.overflow = 'hidden'
            }
            this.classList.add('filter-button--active')
        }
    }

    function closeMenu() {
        filterButtons.forEach(el => {
            document.documentElement.style.overflow = null
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

    const newsButton = document.querySelector('.news__button')
    let hideItems = null
    const items = document.querySelectorAll('.events__item, .news__item');

    // if (sm.matches && newsButton) {
    //     if (items.length) {
    //         hideItems = [...items].slice(-8)
    //         hideItems.forEach(el => el.hidden = true)
    //     }
    //     newsButton.addEventListener('click', clickHandlerTabs)
    // }

    // if (newsButton) {
    //     sm.addEventListener('change', () => {
    //         if (sm.matches) {
    //             if (items.length) {
    //                 hideItems = [...items].slice(-8)
    //                 hideItems.forEach(el => el.hidden = true)
    //             }
    //             newsButton.addEventListener('click', clickHandlerTabs)
    //             newsButton.hidden = false
    //         } else {
    //             newsButton.removeEventListener('click', clickHandlerTabs)
    //             if (hideItems?.length) {
    //                 hideItems.forEach(el => el.hidden = false)
    //             }
    //         }
    //     })
    // }

    function clickHandlerTabs() {
        this.hidden = true
        hideItems.forEach(el => el.hidden = false)
    }

    const buttonsModal = document.querySelectorAll('[data-modal]')
    const regModal = document.querySelectorAll('.regModal')

    if (regModal.length) {
        regModal.forEach(el => {
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

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    function disableScroll() {
        // Get the current page scroll position;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollTop;
        document.documentElement.style.setProperty('scroll-behavior', 'auto');

        if (isMobile.any()) {
            document.body.style.overflow = 'hidden';
        }

        // if any scroll is attempted, set this to the previous value;
        window.onscroll = function () {
            window.scrollTo(scrollLeft, scrollTop);
        };
    };

    function enableScroll() {
        document.documentElement.style.setProperty('scroll-behavior', null);
        document.body.style.overflow = null;
        window.onscroll = function () { };
    };

    function modalHandler() {
        let pannel = document.querySelector(".map__panel");
        if (pannel) {
            pannel.classList.remove("open");
        }
        const modal = document.querySelector(`${this.dataset?.modal}`) || this
        if (modal.classList.contains('regModal') && modal.hidden) {
            disableScroll()
            // scrollLock.disablePageScroll();
            // scrollLock.addScrollableSelector('.regModal');
        } else {
            // scrollLock.enablePageScroll();
            enableScroll();
        }
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

    function hideaftertransition() {
        this.hidden = true
        this.removeEventListener('transitionend', hideaftertransition)
    }

    if (buttonsModal.length) {
        buttonsModal.forEach(el => el.addEventListener('click', modalHandler))
    }

    const forms = document.querySelectorAll("form");
    const feedBack = document.querySelector('.feedBack');

    if (feedBack) {
        const closeButton = feedBack.querySelectorAll('button')

        if (closeButton.length) {
            closeButton.forEach(el => el.addEventListener('click', modalHandler.bind(feedBack)))
        }

    }

    if (forms.length) {
        for (let form of forms) {
            form.addEventListener('submit', function () {
                let vacancyCheck = form.querySelector(".vacancy__send-agree input");
                if (vacancyCheck) {
                    vacancyCheck.parentNode.onanimationend = (e) => {
                        vacancyCheck.parentNode.classList.remove("animate");
                    }
                    if (!vacancyCheck.checked) {
                        vacancyCheck.parentNode.classList.add("animate");
                        event.preventDefault();
                    }
                }
                if (feedBack) {
                    modalHandler.apply(this.closest('.regModal'));
                    modalHandler.apply(feedBack);
                }
            })
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

    window.addEventListener('resize', () => {
        const activeAccords = document.querySelectorAll('.accordion .active .accordion__list-desc')
        if (activeAccords.length) {
            activeAccords.forEach(el => {
                el.style.maxHeight = el.scrollHeight + 'px';
            })
        }
    })

    const accordions = document.querySelectorAll('.accordion')
    const faqlist = document.querySelector('.faq__left-list')


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
                        console.log(this.dataset.visible, el.dataset.visible)
                        if (this.dataset.visible === el.dataset.visible) {
                            const fixed = this.closest('.fixed-mobile')
                            if (fixed && mm.matches) {
                                modalHandler.apply(fixed);
                            }
                            // const headerH = document.documentElement.style.getPropertyValue('--headerH') || '-200'

                            const yOffset = !mm.matches ? -200 : -150;
                            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

                            window.scrollTo({ top: y, behavior: 'smooth' });
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
                if (el.isIntersecting) {
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
        if (header) {
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
        return bytes / (1024 * 1024);
    }

    function deleteFile(element, index = 0) {
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

    function changeText(element, text, error = true) {
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
        actualBtn.addEventListener('change', function () {
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

            const arrayText = this.accept || '.doc,.xls,.txt';
            const types = arrayText.split(/,/)
            const typesTest = types.some(el => {
                const ext = this.files[0].name.match(/\.([^.]+)$/)[0]
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
    const swipeOn = document.querySelectorAll('.swipe-on')

    if (swipeOn.length) {

        swipeOn.forEach(el => {

            var mc = new Hammer(el);

            mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

            var lastPosY = 0;
            var isDragging = false;

            mc.on("pan", function (ev) {
                if (ev.target.classList.contains('swipe-on')) {

                    if (!isDragging) {
                        isDragging = true;
                        lastPosY = ev.target.offsetTop;
                    }
                    var posY = ev.deltaY + lastPosY;

                    ev.target.style.transition = 'none'
                    ev.target.style.top = posY + "px";

                    if (ev.isFinal) {
                        isDragging = false;
                        ev.target.style.transition = null
                        if (ev.target.getBoundingClientRect().top >= window.innerHeight - 50) {
                            const modal = ev.target.closest('.regModal')
                            if (modal) {
                                modalHandler.apply(modal)
                                setTimeout(() => {
                                    ev.target.style.top = null
                                }, 300)
                                return
                            }
                        }
                        ev.target.style.top = null
                    }
                }

            });

        })

    }

    const swipeOn2 = document.querySelectorAll('.swipe-on2')

    if (swipeOn2.length) {

        swipeOn2.forEach(el => {

            var mc = new Hammer(el);

            mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

            var lastPosY = 0;
            var isDragging = false;

            mc.on("pan", function (ev) {
                if (ev.target.classList.contains('swipe-on2') && mm.matches) {

                    if (!isDragging) {
                        isDragging = true;
                        lastPosY = ev.target.offsetTop;
                    }
                    var posY = ev.deltaY + lastPosY;

                    ev.target.style.transition = 'none'
                    ev.target.style.setProperty('transform', `translate3d(0, ${posY}px, 0)`)

                    if (ev.isFinal) {
                        isDragging = false;
                        ev.target.style.transition = null
                        if (ev.target.getBoundingClientRect().top >= window.innerHeight - 100) {
                            const modal = ev.target.closest('.regModal')
                            if (modal) {
                                modalHandler.apply(modal)
                                setTimeout(() => {
                                    ev.target.style.setProperty('transform', null)
                                }, 300)
                                return
                            }
                        }
                        ev.target.style.setProperty('transform', null)
                    }
                }

            });

        })

    }

    const selectSwipe = document.querySelectorAll('.filters .select-items')

    if (selectSwipe.length) {
        selectSwipe.forEach(el => {

            var mc = new Hammer(el);

            mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

            var lastPosY = 0;
            var isDragging = false;

            mc.on("pan", function (ev) {
                if (ev.target.classList.contains('select-items') && sm.matches) {

                    if (!isDragging) {
                        isDragging = true;
                        lastPosY = ev.target.offsetTop;
                    }
                    var posY = ev.deltaY + lastPosY;

                    ev.target.style.transition = 'none'
                    ev.target.style.setProperty('transform', `translate3d(0, ${posY}px, 0)`)

                    if (ev.isFinal) {
                        isDragging = false;
                        ev.target.style.transition = null
                        if (ev.target.getBoundingClientRect().top >= window.innerHeight - 100) {
                            const modal = ev.target.querySelector('.close-button')
                            if (modal) {
                                modal.click()
                                setTimeout(() => {
                                    ev.target.style.setProperty('transform', null)
                                }, 300)
                                return
                            }
                        }
                        ev.target.style.setProperty('transform', null)
                    }
                }

            });

        })

    }


    const filterSwipe = document.querySelectorAll('.filter-swipe')

    if (filterSwipe.length) {
        filterSwipe.forEach(el => {

            var mc = new Hammer(el);

            mc.add(new Hammer.Pan({ direction: Hammer.DIRECTION_ALL, threshold: 0 }));

            var lastPosY = 0;
            var isDragging = false;

            mc.on("pan", function (ev) {
                if (ev.target.classList.contains('filter-swipe') && sm.matches) {

                    if (!isDragging) {
                        isDragging = true;
                        lastPosY = ev.target.offsetTop;
                    }
                    var posY = ev.deltaY + lastPosY;
                    ev.target.style.transition = 'none'
                    ev.target.style.setProperty('transform', `translate3d(0, ${posY}px, 0)`)

                    if (ev.isFinal) {
                        isDragging = false;
                        ev.target.style.transition = null
                        if (ev.target.getBoundingClientRect().top >= window.innerHeight - 100) {
                            const modal = ev.target.querySelector('.close-button')
                            if (modal) {
                                modal.click()
                                setTimeout(() => {
                                    ev.target.style.setProperty('transform', null)
                                }, 300)
                                return
                            }
                        }
                        ev.target.style.setProperty('transform', null)
                    }
                }

            });

        })
    }


    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }
    const cookie = getCookie('softlineAccessCookie')
    const cookieForm = document.querySelector('.cookie.regModal')
    if (cookie && cookieForm) {
        cookieForm.hidden = true;
    }

    if (cookieForm) {
        const button = cookieForm.querySelector('.cookie__button')

        if (button) {
            button.addEventListener('click', function () {
                setCookie('softlineAccessCookie', 'true', { expires: getOneYearFromNow() })
                modalHandler.apply(cookieForm)
            })
        }
    }

    function getOneYearFromNow() {
        var oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
        return oneYearFromNow.toUTCString();
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

    //   function disableScroll() {
    //     // Get the current page scroll position;
    //     const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //     const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollTop;
    //     document.documentElement.style.setProperty('scroll-behavior', 'auto');

    //     if (isMobile.any()) {
    //         document.body.style.overflow='hidden';
    //     }

    //     // if any scroll is attempted, set this to the previous value;
    //     window.onscroll = function () {
    //         window.scrollTo(scrollLeft, scrollTop);
    //     };
    // };

    // function enableScroll() {
    //     document.documentElement.style.setProperty('scroll-behavior', null);
    //     document.body.style.overflow=null;
    //     window.onscroll = function () { };
    // };

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

    let programBtn = document.querySelector(".program-conditions");
    let programModal = document.querySelector(".program-modal");
    if (programBtn) {
        programBtn.onclick = (e) => {
            e.preventDefault();
            programModal.style.display = "block";
            // scrollLock.disablePageScroll(programModal);
            setTimeout(() => {
                programModal.classList.add("show");
            }, 10);
        }

        if (programModal) {
            let programClose = document.querySelector(".close-program");
            programClose.onclick = (e) => {
                e.preventDefault();
                programModal.classList.remove("show");
                // scrollLock.enablePageScroll(programModal);
                enableScroll();
                setTimeout(() => {
                    programModal.style.display = "none";
                }, 400);
            }
        }

    }

    let partnersBtn = document.querySelectorAll(".top-partner_name");
    let partnerModal = document.querySelector(".partner-modal");

    if (partnersBtn.length > 0) {
        partnersBtn.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                partnerModal.style.display = "block";
                // scrollLock.disablePageScroll(partnerModal);
                setTimeout(() => {
                    partnerModal.classList.add("show");
                }, 10);
            }
        });

        if (partnerModal) {
            let partnerClose = document.querySelector(".close-partner");
            partnerClose.onclick = (e) => {
                e.preventDefault();
                partnerModal.classList.remove("show");
                // scrollLock.enablePageScroll(partnerModal);
                enableScroll();
                setTimeout(() => {
                    partnerModal.style.display = "none";
                }, 400);
            }
        }
    }

    let employeeBtn = document.querySelectorAll(".employee-block__bottom");
    let employeeModal = document.querySelector(".employee-modal");

    if (employeeBtn.length > 0) {
        employeeBtn.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                employeeModal.style.display = "block";
                // scrollLock.disablePageScroll(employeeModal);
                setTimeout(() => {
                    employeeModal.classList.add("show");
                }, 10);
            }
        });

        if (employeeModal) {
            let employeeClose = document.querySelector(".close-employee");
            employeeClose.onclick = (e) => {
                e.preventDefault();
                employeeModal.classList.remove("show");
                // scrollLock.enablePageScroll(employeeModal);
                enableScroll();
                setTimeout(() => {
                    employeeModal.style.display = "none";
                }, 400);
            }
        }
    }


    let map = document.querySelector("#map");
    let body = document.querySelector("body");
    if (map) {
        let data;
        var pointsData = [];
        var baloonsInfo = [];
        var id = [];
        let pannel = document.querySelector(".map__panel");

        let btnBaloon = document.querySelector(".close__baloon");
        if (btnBaloon) {
            btnBaloon.onclick = (e) => {
                e.preventDefault();
                pannel.classList.remove("open");
                enableScroll();
            }
        }
        let zoom;
        if (window.innerWidth > 1920) {
            zoom = 3.5;
        } else if (window.innerWidth > 1440) {
            zoom = 3;
        } else if (window.innerWidth > 1024) {
            zoom = 2;
        } else if (window.innerWidth > 480) {
            zoom = 2;
        } else {
            zoom = 1.7;
        }

        let activePlacmark;

        ymaps.ready(function () {
            var myMap = new ymaps.Map('map', {
                center: [60.040454, 80.165935],
                zoom: zoom,
                behaviors: ['default', 'scrollZoom'],
                controls: ['geolocationControl', 'zoomControl', 'fullscreenControl']
            }, {
                searchControlProvider: 'yandex#search'
            }),
                getPointData = function (index) {
                    return {};
                },
                geoObjects = [];

            var colors = ['#ff0000', '#00000000', '#00000000', '#00000000'];

            var objectManager = new ymaps.ObjectManager();
            ymaps.borders.load('001', {
                lang: 'ru',
                quality: 2
            }).then(function (result) {
                var queue = [];
                var regions = result.features.reduce(function (acc, feature) {
                    var iso = feature.properties.iso3166;
                    feature.id = iso;
                    feature.options = {
                        fillOpacity: 1,
                        strokeColor: '#ffffff',
                        strokeOpacity: 1
                    };
                    acc[iso] = feature;
                    return acc;
                }, {});

                function paint(iso) {
                    var allowedColors = colors.slice();
                    var region = regions[iso];
                    var neighbors = region.properties.neighbors;
                    if (region.options.fillColor) {
                        return;
                    }
                    if (neighbors.length !== 0) {
                        neighbors.forEach(function (neighbor) {
                            var fillColor = regions[neighbor].options.fillColor;
                            if (queue.indexOf(neighbor) === -1) {
                                queue.push(neighbor);
                            }
                        });
                    }
                    if (region.id === "RU") {
                        region.options.fillColor = "#c9c9c94a";
                    } else {
                        region.options.fillColor = "#c9c9c9";
                    }
                }

                for (var iso in regions) {
                    if (!regions[iso].options.fillColor) {
                        queue.push(iso);
                    }
                    while (queue.length > 0) {
                        paint(queue.shift());
                    }
                }
                result.features = [];
                for (var reg in regions) {
                    result.features.push(regions[reg]);
                }
                objectManager.add(result);
                myMap.geoObjects.add(objectManager);
            })

            function render() {
                return new Promise((resolve, reject) => {
                    let req = new XMLHttpRequest();
                    req.onreadystatechange = () => {
                        if (req.readyState == 4) {
                            resolve(req);
                        }
                    };
                    req.open("GET", "/about/map/get-office-coordinates.php", true);
                    req.responseType = 'json';
                    req.send();
                })
            }

            setTimeout(() => {
                pannel.style.display = "block";
            }, 10);

            render().then((req) => {
                data = req.response.features;

                for (let j = 0; j < data.length; j++) {
                    pointsData[j] = data[j].coordinates;
                    baloonsInfo[j] = [data[j].balloonContentHeader];
                    id[j] = data[j].id;
                }

                let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<svg width="45" height="56" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 56C14.953 49.607 9.317 43.668 5.591 38.184 1.864 32.7 0 27.627 0 22.96c0-7 2.262-12.577 6.787-16.73C11.309 2.077 16.547 0 22.5 0c5.953 0 11.19 2.077 15.713 6.23C42.738 10.383 45 15.96 45 22.96c0 4.667-1.863 9.741-5.588 15.224C35.684 43.668 30.047 49.607 22.5 56z" fill="#A50F2D"/><circle cx="22.5" cy="22.5" r="17.5" fill="#fff"/><path d="M12 26.253l4.707-.454c.168.568.448.965.784 1.192.337.227 1.513.454 2.13.454.616 0 .392-.227.728-.454.28-.227.392-.454.392-.738 0-.34-.168-.624-.56-.794-.28-.114-.953-.284-2.017-.511-1.625-.284-2.802-.568-3.418-.795-.617-.227-1.177-.681-1.625-1.25a3.15 3.15 0 01-.673-1.986c0-.852.224-1.533.729-2.1.448-.568 1.12-1.022 1.96-1.363.841-.284 1.962-.454 3.307-.454 1.457 0 2.578.113 3.25.34.728.228 1.289.568 1.737 1.022.448.455.84 1.136 1.177 1.93l-4.483.455c-.112-.398-.28-.681-.56-.909-.393-.227-.785-.397-1.345-.397-.505 0-.897.114-1.177.284a.813.813 0 00-.336.681c0 .284.168.511.448.681.28.17 1.009.284 2.017.454 1.57.17 2.746.455 3.475.738.784.341 1.344.795 1.737 1.363.392.568.616 1.249.616 1.987s-.224 1.419-.616 2.1c-.449.681-1.121 1.25-2.018 1.646-.896.398-2.185.625-3.754.625-2.241 0-3.866-.34-4.819-.965-.896-.681-1.513-1.59-1.793-2.782z" fill="#A50F2D"/><path d="M32 13h-5v17h5V13z" fill="#B1B1B1"/></svg>', {
                });

                let baloons = document.querySelectorAll(".baloon");

                let size = myMap.getZoom();
                // console.log(size, this, event)


                for (var i = 0, len = pointsData.length; i < len; i++) {
                    let myPlacemark = new ymaps.Placemark(pointsData[i], getPointData(i), {
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: '/local/templates/softline/assets/images/map/Location.svg',
                        
                        // iconImageSize: [45 * 6, 56 * 8],
                        // iconImageOffset: [-22.5, -56],
                        // iconContentLayout: BalloonContentLayout,
                    });
                    myPlacemark.options.set("iconImageSize", [size * 10, size * 12])
                    myPlacemark.options.set("iconImageOffset", [(-size * 10) / 2, -size * 12])
                    myPlacemark.fakeId = id[i];
                    myMap.geoObjects.add(myPlacemark);
                    myPlacemark.events.add('click', function (e) {
                        map.scrollIntoView({ block: "center", behavior: "smooth" });
                        baloons.forEach(baloon => {
                            baloon.classList.remove("open");
                        });
                        let fakeId = myPlacemark.fakeId;
                        let div = document.querySelector(`.id${fakeId}`);
                        if (div) {
                            div.classList.add("open");
                        }

                        if (!pannel.classList.contains("open")) {
                            pannel.classList.add("open");
                        }
                        activePlacmark = myPlacemark;
                    });

                    myMap.events.add('boundschange', function () {
                        size = myMap.getZoom();
                        // console.log(size, this, event)
                        // myPlacemark.options.set("iconImageSize", [size * 10, size * 12])
                        // myPlacemark.options.set("iconImageOffset", [(-size * 10) / 2, -size * 12])
                    });
                    // myPlacemark.events.add('balloonclose', function (e) {
                    //     baloons.forEach(baloon => {
                    //         baloon.classList.remove("open");
                    //     });
                    //     if (pannel.classList.contains("open")) {
                    //         pannel.classList.remove("open");
                    //     }
                    //     activePlacmark = null;
                    // });
                }

                myMap.behaviors.disable('scrollZoom');
                myMap.behaviors.enable("dblClickZoom", "rightMouseButtonMagnifier", "multiTouch", "drag");
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                    //myMap.behaviors.disable('drag');
                }

                const buttons = document.querySelectorAll('.map__city');
                buttons.forEach(btn => {

                    btn.onclick = (e) => {
                        e.preventDefault();
                        const coord = btn.dataset.coord.split(',');
                        myMap.setCenter(coord, 11, {
                            duration: 400
                        });
                    }

                });

                if (buttons.length === 1) {
                    buttons[0].click();
                }

            })

        });
    }

    const videos = document.querySelectorAll('video')
    if (videos.length) {
        videos.forEach(video => {
            const parentNode = video.closest('.intro__pop-up')
            if (parentNode) {
                const playButton = parentNode.querySelector('.form-modal__play')
                if (playButton) {
                    playButton.addEventListener('click', () => {
                        togglePlay(video)
                    })
                    video.addEventListener('play', () => {
                        playButton.hidden = !playButton.hidden
                    })
                    video.addEventListener('pause', () => {
                        playButton.hidden = !playButton.hidden
                    })
                }

            }
        })
    }

    function togglePlay(video) {
        if (video.paused || video.ended) {
            video.play();
        } else {
            video.pause();
        }
    }

    const radioSelects = document.querySelectorAll('.radio-select .form-group label');

    if (radioSelects.length) {
        radioSelects.forEach(el => {
            el.addEventListener('click', () => {
                const parent = event.target.closest('.radio-select').querySelector('.filter-button > span');

                if (parent) {
                    parent.innerHTML = event.target.innerHTML;
                }
            })

            const input = el.previousElementSibling

            if (input.checked) {
                const parent = el.closest('.radio-select').querySelector('.filter-button > span');
                if (parent) {
                    parent.innerHTML = el.innerHTML;
                }
            }
        })
    }


    let scrToBtn = document.querySelectorAll(".anchors__link");
    let velocity = .1;
    let pos = 0,
        topOffset = 0;
    let elemToScr;
    let start;
    if (scrToBtn.length > 0) {
        scrToBtn.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                let winYOffset = window.pageYOffset,
                    hash = btn.getAttribute("href");
                elemToScr = document.querySelector(hash).getBoundingClientRect().top - topOffset,
                    start = null;
                requestAnimationFrame(step);
                function step(time) {
                    if (start === null) start = time;
                    let progress = time - start,
                        r = (elemToScr < 0 ? Math.max(winYOffset - progress / velocity, winYOffset + elemToScr) : Math.min(winYOffset + progress / velocity, winYOffset + elemToScr));
                    window.scrollTo(0, r);
                    if (r != winYOffset + elemToScr) {
                        requestAnimationFrame(step)
                    } else return;
                }
            }
        });
    }

    let solveInfo = document.querySelectorAll(".solve__info");
    if (solveInfo) {
        solveInfo.forEach(info => {
            let parent = info.closest(".section-top");
            let txt = parent.querySelector(".section-top__aside");
            info.onclick = (e) => {
                e.preventDefault();
                if (window.innerWidth <= 1024) {
                    txt.style.display = "flex";
                    setTimeout(() => {
                        txt.classList.add("show");
                    }, 10);
                }
            }
        });

        let close = document.querySelectorAll(".section-top__aside_close");
        close.forEach(btn => {
            let parent = btn.closest(".section-top__aside")
            btn.onclick = (e) => {
                if (window.innerWidth <= 1024) {
                    parent.classList.remove("show");
                    setTimeout(() => {
                        parent.style.display = "none";
                    }, 100);
                }
            }
        });
    }

    const block = document.querySelector('#developing__wrapper')
    if (block) {
        const items = block.querySelectorAll('.developing__item')
        const images = block.querySelectorAll('.developing__item .img-wrapper')
        const numbers = block.querySelector('#developing__numbers')
        const imagesBlock = block.querySelector('#block-images')

        images.forEach((img, index) => {
            img.parentNode.dataset.numberImg = index
            const clone = img.cloneNode(true)
            clone.style.opacity = 0
            clone.dataset.numberImg = index
            imagesBlock.appendChild(clone)
        })

        const observer = new IntersectionObserver((entryes) => {
            entryes.forEach(el => {
                if (el.isIntersecting && window.innerWidth > 1024) {
                    for (let img of imagesBlock.children) {
                        if (img.dataset.numberImg === el.target.dataset.numberImg) {
                            img.style.opacity = 1
                            numbers.innerHTML = `${+img.dataset.numberImg + 1}/${items.length}`
                        } else {
                            img.style.opacity = 0
                        }
                    }
                }
            })
        })

        items.forEach(el => {
            observer.observe(el)
        })
    }

    let vacancyLink = document.querySelector(".vacancy__link-send");
    let vacancyCheck = document.querySelector(".vacancy__send-agree input");
    if (vacancyLink) {
        vacancyCheck.parentNode.onanimationend = (e) => {
            vacancyCheck.parentNode.classList.remove("animate");
        }

        vacancyLink.onclick = (e) => {
            if (vacancyCheck && !vacancyCheck.checked) {
                vacancyCheck.parentNode.classList.add("animate");
                vacancyCheck.ona
                e.preventDefault();
            }
        }
    }

    let surveyForm = document.querySelector(".survey__form form");
    let surveyAgree = document.querySelector(".survey__form .vacancy__send-agree input");
    if (surveyForm) {
        surveyAgree.parentNode.onanimationend = (e) => {
            surveyAgree.parentNode.classList.remove("animate");
        }

        surveyForm.onsubmit = (e) => {
            if (!surveyAgree.checked) {
                surveyAgree.parentNode.classList.add("animate");
                e.preventDefault();
                return false;
            }
        }
    }

    document.addEventListener('click', (event) => {
        const dataset = event.target.dataset;
        const target = event.target;
        if (dataset.showtext) {
            const text = target.parentElement.querySelector('.top-partner_text');;
            if (text) {
                if (!text.style.maxHeight) {
                    text.style.maxHeight = text.scrollHeight + 'px';
                    target.innerHTML = target.dataset.hidetext;
                } else {
                    text.style.maxHeight = null;
                    target.innerHTML = target.dataset.showtext;
                }
            }
        }
    })

    const hideButton = () => {
        const partnersButtons = document.querySelectorAll('[data-showText]');

        if (partnersButtons.length) {
            partnersButtons.forEach(el => {
                const text = el.parentElement.querySelector('.top-partner_text');
                if (text.scrollHeight <= text.offsetHeight) {
                    el.hidden = true;
                    text.classList.remove('top-partner_text--gradient')
                } else {
                    text.classList.add('top-partner_text--gradient')
                }

            })
        }
    }

    hideButton();

    window.addEventListener('resize', function () {
        hideButton();
    })

    const serviceText = document.querySelectorAll('.service .service__text');
    if (serviceText.length) {
        window.addEventListener('load', () => {
            serviceText.forEach(el => {

                if (el.scrollHeight > el.offsetHeight) {
                    el.classList.add('service__text--gradient');
                }
            })
        })

    }
});




