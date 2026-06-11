document.addEventListener('DOMContentLoaded', function() {
	let spoilerInitialized = false;
	const breakpoint = 479.98;
	let ignoreBreakpoint = true; // по умолчанию спойлер активен всегда

	// ---------- Панель управления ----------
	const controlPanel = document.createElement('div');
	controlPanel.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #fff; padding: 8px 12px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.2); z-index: 9999; font-size: 14px; font-family: sans-serif;';
	controlPanel.innerHTML = `
		<label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
			<input type="checkbox" id="toggleBreakpointMode" ${ignoreBreakpoint ? 'checked' : ''}>
			<span>Игнорировать ширину экрана (спойлер всегда активен)</span>
		</label>
	`;
	document.body.appendChild(controlPanel);
	const toggleCheckbox = document.getElementById('toggleBreakpointMode');
	toggleCheckbox.addEventListener('change', function(e) {
		ignoreBreakpoint = e.target.checked;
		if (ignoreBreakpoint) {
			if (!spoilerInitialized) initSpoiler();
		} else {
			if (window.innerWidth > breakpoint) resetSpoiler();
			else if (!spoilerInitialized) initSpoiler();
		}
	});
	// ----------------------------------------

	function initSpoiler() {
		// Запускаем, если игнорируем брейкпоинт ИЛИ ширина подходит
		if ((ignoreBreakpoint || window.innerWidth <= breakpoint) && !spoilerInitialized) {
			const textCells = document.querySelectorAll('.item-blog__text');
			textCells.forEach((cell, index) => {
				if (!cell.hasAttribute('data-spoiler-init')) {
					const originalContent = cell.innerHTML;
					const fullText = cell.querySelector('p').innerText;
					cell.setAttribute('data-spoiler-id', `spoiler-${index}`);
					cell.setAttribute('data-spoiler-state', 'collapsed');
					cell.setAttribute('data-spoiler-original', originalContent);
					cell.setAttribute('data-spoiler-fulltext', fullText);
					const words = fullText.split(' ');
					let shortText = words.slice(0, 20).join(' ');
					if (words.length > 20) shortText += '...';
					cell.innerHTML = `
						<div class="text-content" data-spoiler-content="true" style="overflow: hidden; transition: max-height 0.3s ease; max-height: 60px;">
							<p style="margin: 0;">${shortText}</p>
						</div>
						<button class="spoiler-btn" data-spoiler-btn="true" data-spoiler-id="${index}" style="background: none; border: none; cursor: pointer; padding: 8px 0 0 0; font-size: inherit; font-family: inherit;">Read More</button>
					`;
					cell.setAttribute('data-spoiler-init', 'true');
				}
			});
			spoilerInitialized = true;
			document.querySelectorAll('[data-spoiler-btn="true"]').forEach(btn => {
				btn.removeEventListener('click', handleSpoilerClick);
				btn.addEventListener('click', handleSpoilerClick);
			});
		}
	}

	function handleSpoilerClick(e) {
		e.preventDefault();
		const btn = e.target;
		const cell = btn.closest('.item-blog__text');
		const contentDiv = cell.querySelector('[data-spoiler-content="true"]');
		const fullText = cell.getAttribute('data-spoiler-fulltext');
		const currentState = cell.getAttribute('data-spoiler-state');
		
		if (cell.classList.contains('animating')) return;
		cell.classList.add('animating');
		
		if (currentState === 'collapsed') {
			cell.setAttribute('data-spoiler-state', 'expanded');
			const shortText = contentDiv.querySelector('p').innerText;
			cell.setAttribute('data-spoiler-shorttext', shortText);
			const startHeight = contentDiv.scrollHeight;
			contentDiv.style.maxHeight = startHeight + 'px';
			contentDiv.innerHTML = `<p style="margin: 0;">${fullText}</p>`;
			const fullHeight = contentDiv.scrollHeight + 'px';
			contentDiv.offsetHeight;
			contentDiv.style.maxHeight = fullHeight;
			btn.textContent = 'Hide';
			setTimeout(() => {
				contentDiv.style.maxHeight = 'none';
				cell.classList.remove('animating');
			}, 300);
		} else {
			cell.setAttribute('data-spoiler-state', 'collapsed');
			const shortText = cell.getAttribute('data-spoiler-shorttext');
			const startHeight = contentDiv.scrollHeight;
			contentDiv.style.maxHeight = startHeight + 'px';
			contentDiv.offsetHeight;
			contentDiv.style.maxHeight = '60px';
			btn.textContent = 'Read More';
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
		document.querySelectorAll('.item-blog__text[data-spoiler-init="true"]').forEach(cell => {
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
	setTimeout(() => initSpoiler(), 100);

	let resizeTimeout;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function() {
			if (ignoreBreakpoint) {
				if (!spoilerInitialized) initSpoiler();
			} else {
				if (window.innerWidth > breakpoint) resetSpoiler();
				else if (!spoilerInitialized) initSpoiler();
			}
		}, 150);
	});
});