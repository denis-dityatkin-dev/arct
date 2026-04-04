"use strict"

// let documentActions = (e) => {
// 	const targetElement = e.target
// 	if (targetElement.closest('.icon-menu')) {
// 		document.documentElement.classList.toggle('open-menu')
// 	}
// }
// document.addEventListener('click', documentActions)


const options = {
	root: null,
	rootMargin: "0px 0px 0px 0px",
	// Відсоток від розміру об'єкту.
	// При появі якого спрацьовує подія
	// Де 0 це будь яка поява
	// 1 це повна поява об'кта в в'юпорті
	threshold: 0.2,
}
const callback = (entries, observer) => {
	entries.forEach(entry => {
		const currentElement = entry.target
		if (entry.isIntersecting) {
			currentElement.classList.add('--animate')
			//console.log('я тебе бачу')
		} else {
			currentElement.classList.remove('--animate')
			//console.log('я тебе не бачу')
		}
	})
}
const observer = new IntersectionObserver(callback, options)

const animElements = document.querySelectorAll('[class*="--anim"]')
animElements.forEach(animElement => {
	observer.observe(animElement)
})