"use strict" 
// Меню бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}
// Многоуровневое меню
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
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};
if (isMobile.any()) {
  document.body.classList.add("_touch");
  let menuArrows = document.querySelectorAll(".menu__arrow");
  if (menuArrows.length > 0) {
    for (let index = 0; index < menuArrows.length; index++) {
      const menuArrow = menuArrows[index];
      menuArrow.addEventListener("click", function (e) {
        menuArrow.parentElement.classList.toggle("_active");
      });
    }
  }
} else {
  document.body.classList.add("_pc");
}

// Прокрутка при клике

document.addEventListener('click',documentActions);

function documentActions(e){
	const targetElement = e.target;

	if(targetElement.closest('.icon-menu')){
		document.documentElement.classList.toggle('menu-open');
	}

	if(targetElement.closest('[data-goto]')){
		document.documentElement.classList.contains('menu-open') ? 
		document.documentElement.classList.remove('menu-open') : null;

		const goTo = targetElement.closest('[data-goto]').dataset.goto;
		const goToElement = document.querySelector(goTo);
		const headerHeight = document.querySelector('.header').offsetHeight;

		if(goToElement){
			window.scrollTo({
				top: goToElement.offsetTop - (headerHeight + 5),
				behavior: "smooth"
			});
		}
		e.preventDefault();
	}
}