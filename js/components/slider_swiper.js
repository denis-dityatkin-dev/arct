"use strict"
// Инициализация Swiper
let myImageSlider = new
	Swiper(".swiper-container", {
		// Стрелки
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		// Включение/отключение перетаскивания на пк
		simulateTouch: true,
		// Чувствительность свайпа
		touchRatio: 1,
		// Угол срабатывния свайпа/перетаскивания
		touchAngle: 45,
		// Курсор перетаскивания
		grabCursor: true,
		// Переключение при клике на слайд
		slideToClickedSlide: true,
		// Навигация по хешу
		// hashNavigation: {
		// 	// Отслеживать состояние
		// 	watchState: true,
		// },

		// Управление клавиатурой
		keyboard: {
			// включить/выключить
			enabled: true,
			// включить/выключить только,когда слайдер в пределах вьюпорта
			onlyInViewport: true,
			// включить/выключить управление клавишами pageUp, pageDown
			pageUpDown: true,
		},
		// Количество слайдов для показа
		slidesPerView: 1,

		// Отключение функционала, если слайдов меньше, чем нужно
		watchOverflow: true,

		// Отступ между слайдами
		spaceBetween: 56,

		// Количество пролистываемых слайдов
		slidesPerGroup: 1,

		// Активный слайд по центру
		// centeredSlides: true,

		// Стартовый слайд
		initialSlide: 0,

		// Мультирядность
		// slidesPerColumn: 1,

		// Бесконечный слайдер
		// loop: true,

		// Количество дублирующих слайдов
		// loopedSlides: 0,
		// Скорость
		speed: 800,
		// Брейк поинты (Адаптивность) ширины экрана
		// breakpoints: {
		// 	320: {
		// 		slidesPerView: 1,
		// 		spaceBetween: 10,
		// 		// autoHeight: true,
		// 	},
		// 	480: {
		// 		slidesPerView: 2,
		// 		spaceBetween: 20,
		// 	},
		// 	992: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 20,
		// 	},
		// 	1200: {
		// 		slidesPerView: 3,
		// 		spaceBetween: 56,
		// 	},
		// },
		// Автовысота
		// autoHeight: true,
		// Навигация
		// Буллеты,текущее положение. прогрессбар
		pagination: {
		  el: ".swiper-pagination",

		  // Буллеты
		  clickable: true,
		//   // Динамические буллеты
		//   dynamicBullets: true,
		//   // Кастомные буллеты
		//   renderBullet: function (index, className) {
		//     return '<span class="' + className + '">' + (index + 1) + '</span>';
		//   },


		// Фракция
		// type: "fraction",
		// // Кастомный вывод фракций
		// renderFraction: function (currentClass, totalClass) {
		//   return (
		//     'Фото <span class="' +
		//     currentClass +
		//     '"></span>' +
		//     " из " +
		//     '<span class="' +
		//     totalClass +
		//     '"</span>'
		//   );
		// },
		// // Прогрессбар
		// type: 'progressbar',
		// },

		// Скролл
		// scrollbar: {
		//   el: ".swiper-scrollbar",
		//   // Возможность перетаскивать скролл
		//   draggable: true,
		// },



		// Управление колесом мыши
		// mousewheel: {
		//   // Чувствительность колеса мыши
		//   sensitivity: 1,
		//   // Класс объекта, на котором будет срабатывать прокрутка мышью.
		//   eventsTarget: ".swiper-container",
		// },

		


		// Свободный режим
		// freeMode: true,

		// Автопрокрутка
		// autoplay: {
		//   // Пауза между прокруткой
		//   delay: 1000,
		//   // Закончить на последнем слайде
		//   stopOnLastSlide: false,
		//   // Отключить после ручного переключения
		//   disableOnInteraction: false,
		// },



		// Вертикальный слайдер
		// direction: "horizontal",

		// Эффекты переключения слайдов
		// Листание
		effect: "slide",

		// // Эффекты переключения слайдов
		// // Смена прозрачности
		// effect: 'fade',

		// // Дополнение к fade
		// fadeEffect: {
		//   // Параллельная смена прозрачности
		//   crossFade: true
		// },

		// // Эффекты переключения слайдов
		// // Переворот
		// effect: "flip",

		// // Дополнение к flip
		// flipEffect: {
		//   // Тень
		//   slideShadow: true,
		//   // Показ только активного слайда
		//   limitRotation: true
		// },

		// Эффекты переключения слайдов
		// Куб
		// effect: "cube",

		// // Дополнение к cube
		// cubeEffect: {
		//   // Настройка тени
		//   slideShadows: true,
		//   shadow: true,
		//   shadowOffset: 20,
		//   shadowScale: 0.94,
		// },

		// Эффекты переключения слайдов
		// Эффект потока
		// effect: "coverflow",

		// // Дополнение к coverflow
		// coverflowEffect: {
		//   // Угол
		//   rotate: 20,
		//   // Наложение
		//   stretch: 50,
		//   // Настройка тень
		//   slidehadows: true,
		// },

		

		// Отключить предзагрузку картинок
		// preloadImages: false,
		// // Lazy Loading (подгрузка картинок)
		// lazy: {
		//   // Подгружать на старте переключения слайда
		//   loadOnTransitionStart: false,
		//   // ПОдгружать предыдущую и следующую картинку
		//   loadPrevNext: false,
		// },
		// //  Слежка за видимыми слайдами
		// watchSlidesProgress: true,
		// // Добавление класса видимым слайдам
		// watchSlidesVisibility: true,

		// Зум картинки
		// zoom: {
		// 	// Максимальное увеличение
		// 	maxRatio: 5,
		// 	// Минимальное увеличение
		// 	minRatio: 1,
		// },

		// Миниатюры
		// thumbs: {
		//   // Свайпер с миниатюрами и его настройками
		//   swiper: {
		//     el: ".image-mini-slider",
		//     slidesPerView: 5,
		//   },
		// },
		//Передача управления
		// controller: {
		//   control: myTextSlider
		// },

		// Обновить свайпер при изменении элементов слайдера
		// observer: true,

		// // Обновить свайпер при изменении родительских элементов слайдера
		// observeParents: true,

		// // Обновить свайпер при изменении дочерних элементов слайдера
		// observeSlideChildren: true,

		
	});

 // Слайдер в слайдере
// new Swiper(".image-in-slider", {
//   // Курсор перетаскивания
//   grabCursor: true,
//   // Навигация
//   // Пагинация, текущее положение, прогрессбар
//   pagination: {
//     el: ".swiper-pagination",
//     // Буллеты
//     clickable: true,
//   },
//   // Корректная работа перетаскивания\свайпа для дочернего слайдера
//   nested: true,
// });

// Ещё один слайдер
// let myTextSlider = new Swiper(".text-slider", {
//   // Количество слайдов для показа
//   slidesPerView: 2,
//   // Отступ между слайдами
//   spaseBetween: 30,
// });

// Передача управления
// myImageSlider.controller.control = myTextSlider;
// myTextSlider.controller.control = myImageSlider;