// Dynamic Adapt v.1
// HTML data-da="where(uniq class name), position(digi), when(breakpoint)"
// e.x. data-da="item,2,992"

// Поднимаем наверх список контактов
//  Объявляем переменные
const parent_original1 = document.querySelector(".actions-header");
const parent1 = document.querySelector(".top-header__container");
const item1 = document.querySelector(".phones-header");
const item2 = document.querySelector(".actions-header__favorite");
const item3 = document.querySelector(".cart-header");
//  Слушаем изменения размера экрана
window.addEventListener('resize', function (event) {
    const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    if (viewport_width <= 991.98) {
        if (
          !item1.classList.contains("done")
        ) {
            parent1.insertBefore(item1, parent1.children[1]);
            parent1.insertBefore(item2, parent1.children[3]);
            parent1.insertBefore(item3, parent1.children[4]);
            item1.classList.add("done");
            item2.classList.add("done");
            item3.classList.add("done");
        }
    } else {
        if (item1.classList.contains('done')) {
            parent_original1.insertBefore(item1, parent_original1.children[1]);
            parent_original1.insertBefore(item2, parent_original1.children[3]);
            parent_original1.insertBefore(item3, parent_original1.children[4]);
            item1.classList.remove('done');
            item2.classList.remove("done");
            item3.classList.remove("done");
        }
    }
});
// ==========================================================================

// ======================================================================================
// Прячем в бургер верхнее меню
//Объявляем переменные
const parent_original = document.querySelector(".top-header");
const parent = document.querySelector(".menu__body");
const item = document.querySelector(".menu-top-header__list");

//Слушаем изменение размера экрана
window.addEventListener('resize', move);

//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 991.98) {
    if (!item.classList.contains("done")) {
      parent.insertBefore(item, parent.children[2]);
      item.classList.add("done");
    }
  } else {
    if (item.classList.contains("done")) {
      parent_original.insertBefore(item, parent_original.children[2]);
      item.classList.remove("done");
    }
  }
}

//Вызываем функцию
move();

// ==========================================================================
// let originalPositions = [];
// let daElements = document.querySelectorAll("[data-da]");
// let daElementsArray = [];
// let daMatchMedia = [];
// //Заполняем массивы
// if (daElements.length > 0) {
//   let number = 0;
//   for (let index = 0; index < daElements.length; index++) {
//     const daElement = daElements[index];
//     const daMove = daElement.getAttribute("data-da");
//     if (daMove != "") {
//       const daArray = daMove.split(",");
//       const daPlace = daArray[1] ? daArray[1].trim() : "last";
//       const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
//       const daDestination = document.querySelector("." + daArray[0].trim());
//       if (daArray.length > 0 && daDestination) {
//         daElement.setAttribute("data-da-index", number);
//         //Заполняем массив первоначальных позиций
//         originalPositions[number] = {
//           parent: daElement.parentNode,
//           index: indexInParent(daElement),
//         };
//         //Заполняем массив элементов
//         daElementsArray[number] = {
//           element: daElement,
//           destination: document.querySelector("." + daArray[0].trim()),
//           place: daPlace,
//           breakpoint: daBreakpoint,
//         };
//         number++;
//       }
//     }
//   }
//   dynamicAdaptSort(daElementsArray);

//   //Создаем события в точке брейкпоинта
//   for (let index = 0; index < daElementsArray.length; index++) {
//     const el = daElementsArray[index];
//     const daBreakpoint = el.breakpoint;
//     const daType = "max"; //Для MobileFirst поменять на min

//     daMatchMedia.push(
//       window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)")
//     );
//     daMatchMedia[index].addListener(dynamicAdapt);
//   }
// }

// //Основная функция
// function dynamicAdapt(e) {
// 	for (let index = 0; index < daElementsArray.length; index++) {
// 		const el = daElementsArray[index];
// 		const daElement = el.element;
// 		const daDestination = el.destination;
// 		const daPlace = el.place;
// 		const daBreakpoint = el.breakpoint;
// 		const daClassname = "_dynamic_adapt_" + daBreakpoint;

// 		if (daMatchMedia[index].matches) {
// 			//Перебрасываем элементы
// 			if (!daElement.classList.contains(daClassname)) {
// 				let actualIndex = indexOfElements(daDestination)[daPlace];
// 				if (daPlace === 'first') {
// 					actualIndex = indexOfElements(daDestination)[0];
// 				} else if (daPlace === 'last') {
// 					actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
// 				}
// 				daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
// 				daElement.classList.add(daClassname);
// 			}
// 		} else {
// 			//Возвращаем на место
// 			if (daElement.classList.contains(daClassname)) {
// 				dynamicAdaptBack(daElement);
// 				daElement.classList.remove(daClassname);
// 			}
// 		}
// 	}
// 	customAdapt();
// }

// //Функция возврата на место
// function dynamicAdaptBack(el) {
// 	const daIndex = el.getAttribute('data-da-index');
// 	const originalPlace = originalPositions[daIndex];
// 	const parentPlace = originalPlace['parent'];
// 	const indexPlace = originalPlace['index'];
// 	const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
// 	parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
// }

// //Сортировка объекта
// 	function dynamicAdaptSort(arr) {
// 		arr.sort(function (a, b) {
// 			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 } //Для MobileFirst поменять
// 		});
// 		arr.sort(function (a, b) {
// 			if (a.place > b.place) { return 1 } else { return -1 }
// 		});
// }
    
// //Функция получения массива индексов элементов внутри родителя 
// function indexOfElements(parent, back) {
// 	const children = parent.children;
// 	const childrenArray = [];
// 	for (let i = 0; i < children.length; i++) {
// 		const childrenElement = children[i];
// 		if (back) {
// 			childrenArray.push(i);
// 		} else {
// 			//Исключая перенесенный элемент
// 			if (childrenElement.getAttribute('data-da') == null) {
// 				childrenArray.push(i);
// 			}
// 		}
// 	}
// 	return childrenArray;
// }
