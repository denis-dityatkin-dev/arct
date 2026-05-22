(function() {
	// Находим все ссылки галереи
	const links = document.querySelectorAll('.gallery-portfolio__link');
	
	// Собираем массив изображений из data-атрибута
	const items = Array.from(links).filter(link => link.hasAttribute('data-gallery-src')).map(link => ({
			src: link.getAttribute('data-gallery-src'),
			element: link
	}));
	
	if (items.length === 0) return;

	let currentIndex = 0;
	let modal = null;
	let modalImg = null;
	let isOpen = false;

	// Создаём DOM-структуру модального окна
	function buildModal() {
			const modalDiv = document.createElement('div');
			modalDiv.className = 'gallery-modal';
			modalDiv.innerHTML = `
					<div class="gallery-modal__overlay"></div>
					<div class="gallery-modal__container">
							<button class="gallery-modal__close" aria-label="Закрыть">&times;</button>
							<button class="gallery-modal__prev" aria-label="Предыдущее">&#10094;</button>
							<button class="gallery-modal__next" aria-label="Следующее">&#10095;</button>
							<img class="gallery-modal__image" alt="Full size image">
					</div>
			`;
			document.body.appendChild(modalDiv);
			
			const overlay = modalDiv.querySelector('.gallery-modal__overlay');
			const container = modalDiv.querySelector('.gallery-modal__container');
			const closeBtn = modalDiv.querySelector('.gallery-modal__close');
			const prevBtn = modalDiv.querySelector('.gallery-modal__prev');
			const nextBtn = modalDiv.querySelector('.gallery-modal__next');
			const img = modalDiv.querySelector('.gallery-modal__image');
			
			// Закрытие при клике на пустое место (overlay или container, но не на картинку и не на кнопки)
			overlay.addEventListener('click', closeModal);
			container.addEventListener('click', (e) => {
					// Если клик пришёлся именно на container (пустое место вокруг картинки), закрываем
					if (e.target === container) closeModal();
			});
			
			closeBtn.addEventListener('click', closeModal);
			prevBtn.addEventListener('click', () => navigate(-1));
			nextBtn.addEventListener('click', () => navigate(1));
			
			return { modal: modalDiv, img };
	}
	
	function openModal(index) {
			if (!modal) {
					const built = buildModal();
					modal = built.modal;
					modalImg = built.img;
			}
			
			if (index < 0) index = items.length - 1;
			if (index >= items.length) index = 0;
			currentIndex = index;
			
			modalImg.src = items[currentIndex].src;
			modalImg.alt = `Изображение ${currentIndex + 1}`;
			
			modal.classList.add('gallery-modal--open');
			document.body.style.overflow = 'hidden';
			isOpen = true;
	}
	
	function closeModal() {
			if (modal) {
					modal.classList.remove('gallery-modal--open');
					document.body.style.overflow = '';
					isOpen = false;
			}
	}
	
	function navigate(direction) {
			openModal(currentIndex + direction);
	}
	
	// Обработчики кликов по миниатюрам
	items.forEach((item, idx) => {
			item.element.addEventListener('click', (e) => {
					e.preventDefault();
					openModal(idx);
			});
	});
	
	// Глобальная клавиатура
	document.addEventListener('keydown', (e) => {
			if (!isOpen) return;
			if (e.key === 'Escape') closeModal();
			if (e.key === 'ArrowLeft') navigate(-1);
			if (e.key === 'ArrowRight') navigate(1);
	});
	
	// Стили
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
			}
			.gallery-modal__image {
					max-width: 90vw;
					max-height: 90vh;
					object-fit: contain;
					z-index: 2;
					pointer-events: auto;  /* чтобы картинка не перехватывала клики для закрытия */
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