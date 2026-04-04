"use strict";

// Получаем массив элементов
const menuLinkWrappers = document.querySelectorAll('[data-line-effect]');

// Если есть элементы - запускаем функцию
menuLinkWrappers.length ? menuEffect() : null;

// Основная функция 
function menuEffect() {
	// Перебор элементов и поиск пунктов меню
	menuLinkWrappers.forEach(menuLinkWrapper => {
		const menuLinks = menuLinkWrapper.querySelectorAll('a');
		// Получаем скорость эффекта(ms)
		const effectSpeed = menuLinkWrapper.dataset.lineEffect ? menuLinkWrapper.dataset.lineEffect : 200;
		// Если есть пункты меню - запускаем функцию
		menuLinks.length ? menuEffectItem(menuLinks, effectSpeed) : null;
	});

	function menuEffectItem(menuLinks, effectSpeed) {
		// Список констант со стилями разных состояний
		const effectTransition = `transition: transform ${effectSpeed}ms ease;`;
		const effectHover = `transform: translate3d(0,0,0);`;
		const effectTop = `transform: translate3d(0,-100%,0);`;
		const effectBottom = `transform: translate3d(0,100%,0);`;

		// Перебор элементов и добавление HTML-кода для работы эффекта
		menuLinks.forEach(menuLink => {
			menuLink.insertAdjacentHTML('beforeend', `
			<span style="transform: translate3d(0,100%,0);" class="hover">
				<span style="transform: translate3d(0,-100%,0);" class="hover__text">${menuLink.textContent}</span>
			</span>
			`);
			// При возникновении событий наведения та переведения курсора
			// вызываем функцию menuLinkActions()
			menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions;
		});

		// Функция события курсора
		function menuLinkActions(e) {
			// Константы элементов
			const menuLink = e.target;
			const menuLinkItem = menuLink.querySelector('.hover');
			const menuLinkText = menuLink.querySelector('.hover__text');

			// Получение половины высоты элемента
			const menuLinkHeight = menuLink.offsetHeight / 2;
			// Получение позиции курсора при взаимодействии с элементом
			const menuLinkPos = e.pageY - (menuLink.getBoundingClientRect().top + scrollY);

			// При наведении карсора
			if (e.type === 'mouseenter') {
				// В зависимости от позиции курсора добавляем определенные стили
				menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
				menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;

				// С определенной задержкой изменяем стили и отображаем эффект
				setTimeout(() => {
					menuLinkItem.style.cssText = effectHover + effectTransition;
					menuLinkText.style.cssText = effectHover + effectTransition;
				}, 5);
			}
			// При наведении курсора
			if (e.type === 'mouseleave') {
				// В зависимоти от позиции курсора добавляем определенные стили 
				menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
				menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
			}
		}
	}
}