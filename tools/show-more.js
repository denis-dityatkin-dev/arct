document.addEventListener('DOMContentLoaded', function() {
	let spoilerInitialized = false;
	const breakpoint = 479.98;
	
	function initSpoiler() {
			if (window.innerWidth <= breakpoint && !spoilerInitialized) {
					const textCells = document.querySelectorAll('.table-service__text');
					
					textCells.forEach((cell, index) => {
							if (!cell.hasAttribute('data-spoiler-init')) {
									// Сохраняем оригинальный контент
									const originalContent = cell.innerHTML;
									const fullText = cell.querySelector('p').innerText;
									
									// Добавляем data атрибуты
									cell.setAttribute('data-spoiler-id', `spoiler-${index}`);
									cell.setAttribute('data-spoiler-state', 'collapsed');
									cell.setAttribute('data-spoiler-original', originalContent);
									cell.setAttribute('data-spoiler-fulltext', fullText);
									
									// Создаем структуру для плавного раскрытия - показываем больше текста
									const words = fullText.split(' ');
									let shortText = words.slice(0, 25).join(' '); // Увеличил с 12 до 25 слов
									if (words.length > 25) shortText += '...';
									
									cell.innerHTML = `
											<div class="text-content" data-spoiler-content="true" 
													 style="overflow: hidden; transition: max-height 0.3s ease; max-height: 80px;"> <!-- Увеличил высоту -->
													<p style="margin: 0;">${shortText}</p>
											</div>
											<button class="spoiler-btn" data-spoiler-btn="true" data-spoiler-id="${index}"
															style="background: none; border: none; cursor: pointer; padding: 8px 0 0 0; font-size: inherit; font-family: inherit;">
													Show More
											</button>
									`;
									
									cell.setAttribute('data-spoiler-init', 'true');
							}
					});
					
					spoilerInitialized = true;
					
					// Добавляем обработчики
					document.querySelectorAll('[data-spoiler-btn="true"]').forEach(btn => {
							btn.removeEventListener('click', handleSpoilerClick);
							btn.addEventListener('click', handleSpoilerClick);
					});
			}
	}
	
	function handleSpoilerClick(e) {
			e.preventDefault();
			const btn = e.target;
			const cell = btn.closest('.table-service__text');
			const contentDiv = cell.querySelector('[data-spoiler-content="true"]');
			const fullText = cell.getAttribute('data-spoiler-fulltext');
			const currentState = cell.getAttribute('data-spoiler-state');
			
			// Блокируем множественные клики
			if (cell.classList.contains('animating')) return;
			cell.classList.add('animating');
			
			if (currentState === 'collapsed') {
					// Раскрываем
					cell.setAttribute('data-spoiler-state', 'expanded');
					
					// Сохраняем сокращенный текст
					const shortText = contentDiv.querySelector('p').innerText;
					cell.setAttribute('data-spoiler-shorttext', shortText);
					
					// Получаем текущую высоту для плавной анимации
					const startHeight = contentDiv.scrollHeight;
					contentDiv.style.maxHeight = startHeight + 'px';
					
					// Вставляем полный текст
					contentDiv.innerHTML = `<p style="margin: 0;">${fullText}</p>`;
					
					// Получаем полную высоту
					const fullHeight = contentDiv.scrollHeight + 'px';
					
					// Форсируем перерисовку
					contentDiv.offsetHeight;
					
					// Анимируем раскрытие
					contentDiv.style.maxHeight = fullHeight;
					btn.textContent = 'Hide';
					
					// Снимаем блокировку и убираем max-height после анимации
					setTimeout(() => {
							contentDiv.style.maxHeight = 'none';
							cell.classList.remove('animating');
					}, 300);
					
			} else {
					// Сворачиваем
					cell.setAttribute('data-spoiler-state', 'collapsed');
					
					// Получаем сокращенный текст
					const shortText = cell.getAttribute('data-spoiler-shorttext');
					
					// Получаем текущую высоту для плавного схлопывания
					const startHeight = contentDiv.scrollHeight;
					contentDiv.style.maxHeight = startHeight + 'px';
					
					// Форсируем перерисовку
					contentDiv.offsetHeight;
					
					// Анимируем схлопывание до исходной высоты
					contentDiv.style.maxHeight = '80px'; // Та же высота, что и при инициализации
					btn.textContent = 'Show More';
					
					// Меняем текст и снимаем блокировку после анимации
					setTimeout(() => {
							if (cell.getAttribute('data-spoiler-state') === 'collapsed') {
									contentDiv.innerHTML = `<p style="margin: 0;">${shortText}</p>`;
									contentDiv.style.maxHeight = '80px';
							}
							cell.classList.remove('animating');
					}, 300);
			}
	}
	
	function resetSpoiler() {
			document.querySelectorAll('.table-service__text[data-spoiler-init="true"]').forEach(cell => {
					const originalText = cell.getAttribute('data-spoiler-original');
					cell.innerHTML = originalText;
					cell.removeAttribute('data-spoiler-init');
					cell.removeAttribute('data-spoiler-id');
					cell.removeAttribute('data-spoiler-state');
					cell.removeAttribute('data-spoiler-original');
					cell.removeAttribute('data-spoiler-fulltext');
					cell.removeAttribute('data-spoiler-shorttext');
					cell.classList.remove('animating');
			});
			spoilerInitialized = false;
	}
	
	// Инициализация
	setTimeout(() => {
			initSpoiler();
	}, 100);
	
	// Следим за resize
	let resizeTimeout;
	window.addEventListener('resize', function() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(function() {
					if (window.innerWidth > breakpoint) {
							resetSpoiler();
					} else if (!spoilerInitialized) {
							initSpoiler();
					}
			}, 150);
	});
});