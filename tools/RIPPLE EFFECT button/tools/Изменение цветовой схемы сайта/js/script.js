"use strict";

window.addEventListener("load", windowLoad);

function windowLoad() {
	// HTML
	const htmlBlock = document.documentElement;

	// Получаем сохраненную тему
	const saveUserTheme = localStorage.getItem('user-theme');

	// Работа с системными настройками
	let userTheme;
	if (window.matchMedia) {
		userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	
	// Слушаем изменения системной темы
	if (window.matchMedia) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			!saveUserTheme ? changeTheme() : null;
		});
	}

	// Изменение темы по клику 
	const themeButton = document.querySelector('.page__theme');
	const resetButton = document.querySelector('.page__reset');
	
	if (themeButton) {
		themeButton.addEventListener("click", function (e) {
			changeTheme(true);
		});
	}
	
	if (resetButton) {
		resetButton.addEventListener("click", function (e) {
			resetTheme();
		});
	}

	// Функция добавления класса темы
	function setThemeClass() {
		if (saveUserTheme) {
			htmlBlock.classList.add(saveUserTheme);
			if (resetButton) resetButton.classList.add('active');
		} else {
			htmlBlock.classList.add(userTheme);
		}
	}

	// Добавляем класс темы
	setThemeClass();

	// Функция смены темы
	function changeTheme(saveTheme = false) {
		let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
		let newTheme = currentTheme === 'light' ? 'dark' : 'light';
		
		htmlBlock.classList.remove(currentTheme);
		htmlBlock.classList.add(newTheme);
		
		if (saveTheme) {
			localStorage.setItem('user-theme', newTheme);
			if (resetButton) resetButton.classList.add('active');
		}
	}
	
	// Функция сброса темы
	function resetTheme() {
		const currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
		htmlBlock.classList.remove(currentTheme);
		localStorage.removeItem('user-theme');
		if (resetButton) resetButton.classList.remove('active');
		
		// Возвращаем системную тему
		if (window.matchMedia) {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			htmlBlock.classList.add(systemTheme);
		} else {
			htmlBlock.classList.add('light'); // fallback
		}
	}
}