
// // БЕСКОНЕЧНАЯ CSS анимация (проще и надежнее)
// (function() {
//   console.log('Infinite CSS marquee');
  
//   function initInfiniteCSSMarquee() {
//     const marqueeElement = document.querySelector('.marquee-2');
//     const container = document.querySelector('.marquee-2__container');
//     const items = document.querySelectorAll('.marquee-2__item');
    
//     if (!container || !items.length) {
//       setTimeout(initInfiniteCSSMarquee, 100);
//       return;
//     }
    
//     // 1. Сохраняем оригиналы
//     const originalItems = Array.from(items);
    
//     // 2. Создаем временный контейнер для измерения
//     const tempContainer = document.createElement('div');
//     tempContainer.style.display = 'flex';
//     tempContainer.style.visibility = 'hidden';
//     tempContainer.style.position = 'absolute';
//     tempContainer.style.left = '-9999px';
    
//     // 3. Копируем оригинальные элементы с их стилями
//     originalItems.forEach(item => {
//       const clone = item.cloneNode(true);
//       clone.style.whiteSpace = 'nowrap';
//       tempContainer.appendChild(clone);
//     });
    
//     document.body.appendChild(tempContainer);
//     const singleSetWidth = tempContainer.offsetWidth;
//     document.body.removeChild(tempContainer);
    
//     console.log('Measured width:', singleSetWidth, 'px');
    
//     // 4. Получаем скорость
//     const speedAttr = marqueeElement?.closest('[data-marquee-speed]')?.getAttribute('data-marquee-speed');
//     const speed = parseInt(speedAttr) || 200;
    
//     // 5. Создаем ОЧЕНЬ МНОГО копий для бесконечности
//     // Очищаем только если это не первый запуск
//     const hasClones = container.querySelectorAll('.marquee-clone').length > 0;
//     if (hasClones) {
//       const clones = container.querySelectorAll('.marquee-clone');
//       clones.forEach(clone => clone.remove());
//     }
    
//     // Добавляем 8 копий (оригиналы + 7 копий = 8 наборов)
//     for (let i = 0; i < 7; i++) {
//       originalItems.forEach(item => {
//         const clone = item.cloneNode(true);
//         clone.classList.add('marquee-clone');
//         clone.style.whiteSpace = 'nowrap';
//         container.appendChild(clone);
//       });
//     }
    
//     // 6. Создаем БЕСКОНЕЧНУЮ CSS анимацию
//     const styleId = 'true-infinite-marquee';
//     let styleEl = document.getElementById(styleId);
//     if (!styleEl) {
//       styleEl = document.createElement('style');
//       styleEl.id = styleId;
//       document.head.appendChild(styleEl);
//     }
    
//     // Длительность зависит от ширины и скорости
//     // Чем больше speed, тем медленнее анимация
//     const duration = Math.max(10, (singleSetWidth * 0.05) * (speed / 100));
    
//     // Ключевой момент: двигаем на ширину одного набора
//     // У нас много копий, поэтому анимация бесконечная
//     styleEl.textContent = `
//       @keyframes trueInfinite {
//         0% {
//           transform: translateX(0);
//         }
//         100% {
//           transform: translateX(-${singleSetWidth}px);
//         }
//       }
      
//       .marquee-2__container {
//         display: flex !important;
//         white-space: nowrap !important;
//         animation: trueInfinite ${duration}s linear infinite !important;
//         will-change: transform;
//       }
      
//       .marquee-2__item, .marquee-clone {
//         flex-shrink: 0 !important;
//         white-space: nowrap !important;
//         padding-right: 32px !important;
//       }
      
//       .marquee-2__item:last-child, .marquee-clone:last-child {
//         padding-right: 0 !important;
//       }
      
//       .marquee-2:hover .marquee-2__container {
//         animation-play-state: paused !important;
//       }
//     `;
    
//     // 7. Принудительный запуск анимации
//     setTimeout(() => {
//       container.style.animation = 'none';
//       void container.offsetWidth; // Перерисовка
//       container.style.animation = `trueInfinite ${duration}s linear infinite`;
//     }, 50);
    
//     console.log('True infinite CSS marquee started, duration:', duration, 's');
//   }
  
//   // Запускаем
//   document.addEventListener('DOMContentLoaded', initInfiniteCSSMarquee);
//   window.addEventListener('load', initInfiniteCSSMarquee);
  
//   // Ресайз с дебаунсом
//   let resizeTimer;
//   window.addEventListener('resize', function() {
//     clearTimeout(resizeTimer);
//     resizeTimer = setTimeout(initInfiniteCSSMarquee, 400);
//   });
// })();


// БЕСКОНЕЧНАЯ CSS анимация с адаптивностью
(function() {
  console.log('Adaptive Infinite CSS marquee initialized');
  
  let resizeTimeout;
  let animationTimeout;
  let isInitialized = false;
  
  function initAdaptiveMarquee() {
    // Отменяем предыдущую инициализацию
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
    
    const marqueeElement = document.querySelector('.marquee-2');
    const container = document.querySelector('.marquee-2__container');
    
    if (!marqueeElement || !container) {
      // Пробуем еще раз через 100мс
      animationTimeout = setTimeout(initAdaptiveMarquee, 100);
      return;
    }
    
    // Получаем оригинальные элементы (только не клоны)
    const originalItems = container.querySelectorAll('.marquee-2__item:not(.marquee-clone)');
    
    if (!originalItems.length) {
      console.warn('No original items found');
      return;
    }
    
    // Очищаем старые клоны
    const oldClones = container.querySelectorAll('.marquee-clone');
    oldClones.forEach(clone => clone.remove());
    
    // Определяем количество копий на основе ширины экрана
    const screenWidth = window.innerWidth;
    let copiesNeeded;
    
    if (screenWidth < 768) {
      // Мобильные: меньше копий для производительности
      copiesNeeded = 3;
    } else if (screenWidth < 1024) {
      // Планшеты
      copiesNeeded = 5;
    } else {
      // Десктоп
      copiesNeeded = 7;
    }
    
    console.log(`Screen width: ${screenWidth}px, copies: ${copiesNeeded}`);
    
    // Создаем копии
    for (let i = 0; i < copiesNeeded; i++) {
      originalItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('marquee-clone');
        // Сохраняем важные стили
        clone.style.whiteSpace = 'nowrap';
        clone.style.flexShrink = '0';
        container.appendChild(clone);
      });
    }
    
    // Измеряем ширину одного набора
    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      display: flex;
      visibility: hidden;
      position: absolute;
      left: -9999px;
      white-space: nowrap;
    `;
    
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      clone.style.whiteSpace = 'nowrap';
      clone.style.flexShrink = '0';
      tempContainer.appendChild(clone);
    });
    
    document.body.appendChild(tempContainer);
    const singleSetWidth = tempContainer.offsetWidth;
    document.body.removeChild(tempContainer);
    
    if (singleSetWidth === 0) {
      console.warn('Zero width detected, retrying...');
      animationTimeout = setTimeout(initAdaptiveMarquee, 200);
      return;
    }
    
    // Получаем скорость из data-marquee-speed на любом родительском элементе
    let speedValue = 200; // значение по умолчанию
    
    // Ищем элемент с data-marquee-speed
    const speedElement = marqueeElement.closest('[data-marquee-speed]');
    if (speedElement && speedElement.hasAttribute('data-marquee-speed')) {
      const speedAttr = speedElement.getAttribute('data-marquee-speed');
      speedValue = parseInt(speedAttr);
      
      // Проверяем корректность значения
      if (isNaN(speedValue)) {
        console.warn(`Invalid data-marquee-speed value: ${speedAttr}, using default 200`);
        speedValue = 200;
      }
      // Убираем ограничения на минимальное/максимальное значение
    }
    
    // Конвертируем speedValue в длительность анимации
    // Новая формула: чем меньше значение, тем медленнее анимация
    // speed=10 → очень медленно, speed=500 → очень быстро
    const baseDuration = 60; // максимальная длительность для минимальной скорости
    const minSpeed = 1; // минимальное значение скорости
    const maxSpeed = 1000; // максимальное значение скорости
    
    // Нормализуем значение скорости
    let normalizedSpeed = Math.max(minSpeed, Math.min(maxSpeed, speedValue));
    
    // Обратная зависимость: чем больше скорость, тем меньше длительность
    let duration = baseDuration * (minSpeed / normalizedSpeed);
    
    // Ограничиваем минимальную и максимальную длительность
    duration = Math.max(2, Math.min(60, duration));
    
    // Корректируем скорость для разных устройств
    if (screenWidth < 480) {
      // Мобильные: быстрее для лучшего восприятия
      duration *= 0.7;
    } else if (screenWidth < 768) {
      duration *= 0.8;
    }
    
    console.log(`Speed value: ${speedValue}, duration: ${duration}s, normalized: ${normalizedSpeed}`);
    
    // Создаем или обновляем стили
    const styleId = 'adaptive-marquee-styles';
    let styleEl = document.getElementById(styleId);
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    // Адаптивные медиа-запросы в CSS
    styleEl.textContent = `
      /* Основная анимация */
      @keyframes adaptiveMarquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-${singleSetWidth}px);
        }
      }
      
      /* Общие стили */
      .marquee-2__container {
        display: flex !important;
        white-space: nowrap !important;
        will-change: transform;
        animation: adaptiveMarquee ${duration}s linear infinite !important;
      }
      
      .marquee-2__item, .marquee-clone {
        flex-shrink: 0 !important;
        white-space: nowrap !important;
      }
      
      /* Пауза при наведении (только для устройств с мышью) */
      @media (hover: hover) {
        .marquee-2:hover .marquee-2__container {
          animation-play-state: paused !important;
        }
      }
      
      /* Адаптивность для мобильных */
      @media (max-width: 767px) {
        .marquee-2__container {
          animation-duration: ${duration * 0.8}s !important;
          /* Улучшаем производительность на мобильных */
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      }
      
      /* Супер мобильные (маленькие экраны) */
      @media (max-width: 480px) {
        .marquee-2__container {
          animation-duration: ${duration * 0.6}s !important;
        }
      }
      
      /* Отключение анимации при сниженных настройках движения */
      @media (prefers-reduced-motion: reduce) {
        .marquee-2__container {
          animation: none !important;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
      }
    `;
    
    // Оптимизация производительности
    container.style.willChange = 'transform';
    container.style.transform = 'translateZ(0)';
    
    // Перезапускаем анимацию для обновления
    requestAnimationFrame(() => {
      container.style.animation = 'none';
      requestAnimationFrame(() => {
        container.style.animation = `adaptiveMarquee ${duration}s linear infinite`;
        isInitialized = true;
        console.log(`Adaptive marquee initialized: ${duration}s, width: ${singleSetWidth}px, speed: ${speedValue}`);
      });
    });
  }
  
  // Функция для оптимизированного ресайза
  function handleResize() {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    
    // Используем requestAnimationFrame для синхронизации с рендерингом
    resizeTimeout = requestAnimationFrame(() => {
      // Дебаунс 400ms
      setTimeout(initAdaptiveMarquee, 400);
    });
  }
  
  // Обработчики событий
  document.addEventListener('DOMContentLoaded', function() {
    // Небольшая задержка для загрузки всех стилей
    setTimeout(initAdaptiveMarquee, 100);
  });
  
  window.addEventListener('load', initAdaptiveMarquee);
  
  // Оптимизированный ресайз с throttling
  window.addEventListener('resize', handleResize, { passive: true });
  
  // Обработка видимости страницы (пауза анимации когда страница неактивна)
  document.addEventListener('visibilitychange', function() {
    const container = document.querySelector('.marquee-2__container');
    if (container) {
      if (document.hidden) {
        container.style.animationPlayState = 'paused';
      } else {
        container.style.animationPlayState = 'running';
      }
    }
  });
  
  // Автоматическая очистка при выгрузке страницы
  window.addEventListener('beforeunload', function() {
    if (resizeTimeout) {
      cancelAnimationFrame(resizeTimeout);
    }
    if (animationTimeout) {
      clearTimeout(animationTimeout);
    }
  });
  
  // Экспортируем функцию для ручного управления
  window.marqueeAPI = {
    init: initAdaptiveMarquee,
    refresh: initAdaptiveMarquee,
    updateSpeed: function(newSpeed) {
      // Обновляем data-атрибут на родительском элементе
      const speedElement = document.querySelector('[data-marquee-speed]');
      if (speedElement) {
        speedElement.setAttribute('data-marquee-speed', newSpeed);
        initAdaptiveMarquee();
      }
    },
    destroy: function() {
      const styleEl = document.getElementById('adaptive-marquee-styles');
      if (styleEl) styleEl.remove();
      
      const container = document.querySelector('.marquee-2__container');
      if (container) {
        container.style.animation = '';
        const clones = container.querySelectorAll('.marquee-clone');
        clones.forEach(clone => clone.remove());
      }
      
      isInitialized = false;
      console.log('Marquee destroyed');
    }
  };
})();