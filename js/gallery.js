(function() {
	const links = document.querySelectorAll('.gallery-portfolio__link');
	const items = Array.from(links).filter(link => link.hasAttribute('data-gallery-src')).map(link => ({
			src: link.getAttribute('data-gallery-src'),
			element: link
	}));
	
	if (items.length === 0) return;

	let currentIndex = 0;
	let modal = null;
	let modalImg = null;
	let isOpen = false;
	let isTransitioning = false;
	
	// для свайпов (мобильные) и drag (десктоп)
	let touchStartX = 0;
	let touchEndX = 0;
	let mouseStartX = 0;
	let mouseEndX = 0;
	let isDragging = false;
	let dragThreshold = 30; // минимальное смещение для срабатывания переключения
	let hasDragged = false;  // отличается от простого клика для закрытия
	
	function buildModal() {
			const modalDiv = document.createElement('div');
			modalDiv.className = 'gallery-modal';
			modalDiv.innerHTML = `
					<div class="gallery-modal__overlay"></div>
					<div class="gallery-modal__container">
							<button class="gallery-modal__close" aria-label="Закрыть">&times;</button>
							<button class="gallery-modal__prev" aria-label="Предыдущее">&#10094;</button>
							<button class="gallery-modal__next" aria-label="Следующее">&#10095;</button>
							<img class="gallery-modal__image" alt="Full size image" draggable="false">
					</div>
			`;
			document.body.appendChild(modalDiv);
			
			const overlay = modalDiv.querySelector('.gallery-modal__overlay');
			const container = modalDiv.querySelector('.gallery-modal__container');
			const closeBtn = modalDiv.querySelector('.gallery-modal__close');
			const prevBtn = modalDiv.querySelector('.gallery-modal__prev');
			const nextBtn = modalDiv.querySelector('.gallery-modal__next');
			const img = modalDiv.querySelector('.gallery-modal__image');
			
			// Закрытие по клику на фон (без перетаскивания)
			overlay.addEventListener('click', closeModal);
			
			// Закрытие по фону-контейнеру, но только если не было drag
			container.addEventListener('click', (e) => {
					if (e.target === container && !hasDragged) {
							closeModal();
					}
					hasDragged = false; // сброс после обработки
			});
			
			closeBtn.addEventListener('click', closeModal);
			prevBtn.addEventListener('click', () => navigate(-1));
			nextBtn.addEventListener('click', () => navigate(1));
			
			// ----- MOBILE SWIPE -----
			container.addEventListener('touchstart', (e) => {
					touchStartX = e.changedTouches[0].screenX;
					isDragging = false;
					hasDragged = false;
			});
			container.addEventListener('touchend', (e) => {
					touchEndX = e.changedTouches[0].screenX;
					handleSwipe();
			});
			img.addEventListener('touchstart', (e) => {
					touchStartX = e.changedTouches[0].screenX;
					e.preventDefault();
					isDragging = false;
			});
			img.addEventListener('touchend', (e) => {
					touchEndX = e.changedTouches[0].screenX;
					handleSwipe();
					e.preventDefault();
			});
			
			function handleSwipe() {
					if (!isOpen || isTransitioning) return;
					const diffX = touchEndX - touchStartX;
					if (Math.abs(diffX) < dragThreshold) return;
					if (diffX > 0) navigate(-1);
					else navigate(1);
			}
			
			// ----- DESKTOP DRAG (мышь) -----
			const onMouseMove = (e) => {
					if (!isDragging) return;
					e.preventDefault();
					// Отслеживаем движение мыши при зажатой кнопке
					mouseEndX = e.screenX;
					const diffX = mouseEndX - mouseStartX;
					// Можно добавить визуальный фидбек, но для простоты просто запоминаем
					if (Math.abs(diffX) > dragThreshold) {
							hasDragged = true;
					}
			};
			
			const onMouseUp = (e) => {
					if (!isDragging) return;
					document.removeEventListener('mousemove', onMouseMove);
					document.removeEventListener('mouseup', onMouseUp);
					const diffX = mouseEndX - mouseStartX;
					if (Math.abs(diffX) >= dragThreshold && !isTransitioning && isOpen) {
							if (diffX > 0) navigate(-1);
							else navigate(1);
					}
					isDragging = false;
					// Сброс, чтобы клик по фону не закрывал, если был drag
					setTimeout(() => { hasDragged = false; }, 50);
			};
			
			const onMouseDown = (e) => {
					if (!isOpen || isTransitioning) return;
					// Разрешаем drag только на контейнере или на изображении, но не на кнопках
					if (e.target === closeBtn || e.target === prevBtn || e.target === nextBtn) return;
					e.preventDefault();
					isDragging = true;
					mouseStartX = e.screenX;
					mouseEndX = e.screenX;
					hasDragged = false;
					document.addEventListener('mousemove', onMouseMove);
					document.addEventListener('mouseup', onMouseUp);
			};
			
			container.addEventListener('mousedown', onMouseDown);
			img.addEventListener('mousedown', onMouseDown);
			
			// Предотвращаем выделение текста и стандартный drag изображения
			container.addEventListener('dragstart', (e) => e.preventDefault());
			img.addEventListener('dragstart', (e) => e.preventDefault());
			
			img.style.transition = 'opacity 0.3s ease';
			img.style.opacity = '1';
			
			return { modal: modalDiv, img };
	}
	
	// Плавная смена изображения (fade)
	function setImageWithFade(newSrc) {
			return new Promise((resolve) => {
					if (!modalImg) return resolve();
					modalImg.style.opacity = '0';
					
					const onTransitionEnd = () => {
							modalImg.removeEventListener('transitionend', onTransitionEnd);
							modalImg.src = newSrc;
							if (modalImg.complete) {
									modalImg.style.opacity = '1';
									resolve();
							} else {
									modalImg.addEventListener('load', () => {
											modalImg.style.opacity = '1';
											resolve();
									});
									modalImg.addEventListener('error', () => {
											modalImg.style.opacity = '1';
											resolve();
									});
							}
					};
					
					modalImg.addEventListener('transitionend', onTransitionEnd);
					setTimeout(() => {
							if (parseFloat(modalImg.style.opacity) !== 0) return;
							modalImg.removeEventListener('transitionend', onTransitionEnd);
							onTransitionEnd();
					}, 50);
			});
	}
	
	async function openModal(index) {
			if (!modal) {
					const built = buildModal();
					modal = built.modal;
					modalImg = built.img;
			}
			
			if (index < 0) index = items.length - 1;
			if (index >= items.length) index = 0;
			currentIndex = index;
			
			const newSrc = items[currentIndex].src;
			
			if (isOpen && modalImg) {
					await setImageWithFade(newSrc);
			} else {
					modalImg.src = newSrc;
					modalImg.style.opacity = '1';
					modal.classList.add('gallery-modal--open');
					document.body.style.overflow = 'hidden';
					isOpen = true;
			}
	}
	
	function closeModal() {
			if (modal) {
					modal.classList.remove('gallery-modal--open');
					document.body.style.overflow = '';
					isOpen = false;
					isDragging = false;
			}
	}
	
	async function navigate(direction) {
			if (!isOpen || isTransitioning) return;
			isTransitioning = true;
			let newIndex = currentIndex + direction;
			if (newIndex < 0) newIndex = items.length - 1;
			if (newIndex >= items.length) newIndex = 0;
			currentIndex = newIndex;
			await setImageWithFade(items[currentIndex].src);
			isTransitioning = false;
	}
	
	// Назначение кликов миниатюрам
	items.forEach((item, idx) => {
			item.element.addEventListener('click', (e) => {
					e.preventDefault();
					openModal(idx);
			});
	});
	
	// Клавиатура
	document.addEventListener('keydown', (e) => {
			if (!isOpen) return;
			if (e.key === 'Escape') closeModal();
			if (e.key === 'ArrowLeft') navigate(-1);
			if (e.key === 'ArrowRight') navigate(1);
	});
	
	// CSS стили
	const style = document.createElement('style');
	style.textContent = `
			.gallery-modal {
					position: fixed;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 9999;
					visibility: hidden;
					opacity: 0;
					transition: visibility 0.2s, opacity 0.2s;
			}
			.gallery-modal--open {
					visibility: visible;
					opacity: 1;
			}
			.gallery-modal__overlay {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					background: rgba(0,0,0,0.9);
			}
			.gallery-modal__container {
					position: relative;
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					touch-action: pan-y pinch-zoom;
					user-select: none;
					cursor: grab;
			}
			.gallery-modal__container:active {
					cursor: grabbing;
			}
			.gallery-modal__image {
					max-width: 90vw;
					max-height: 90vh;
					object-fit: contain;
					z-index: 2;
					pointer-events: auto;
					transition: opacity 0.3s ease;
					opacity: 1;
					user-select: none;
			}
			.gallery-modal__close,
			.gallery-modal__prev,
			.gallery-modal__next {
					background: rgba(0,0,0,0.6);
					border: none;
					color: white;
					cursor: pointer;
					z-index: 3;
					transition: background 0.2s;
					user-select: none;
			}
			.gallery-modal__close {
					position: absolute;
					top: 20px;
					right: 30px;
					font-size: 40px;
					width: 50px;
					height: 50px;
					border-radius: 50%;
			}
			.gallery-modal__prev,
			.gallery-modal__next {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					font-size: 40px;
					width: 60px;
					height: 60px;
					border-radius: 50%;
			}
			.gallery-modal__prev {
					left: 20px;
			}
			.gallery-modal__next {
					right: 20px;
			}
			.gallery-modal__close:hover,
			.gallery-modal__prev:hover,
			.gallery-modal__next:hover {
					background: rgba(0,0,0,0.9);
			}
			@media (max-width: 768px) {
					.gallery-modal__close {
							font-size: 30px;
							width: 40px;
							height: 40px;
							top: 10px;
							right: 15px;
					}
					.gallery-modal__prev,
					.gallery-modal__next {
							font-size: 30px;
							width: 45px;
							height: 45px;
					}
			}
	`;
	document.head.appendChild(style);
})();