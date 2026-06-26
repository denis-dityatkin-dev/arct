document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	if (!form) return; // если форма не найдена – выходим

	form.addEventListener('submit', async function (e) {
			e.preventDefault(); // ОБЯЗАТЕЛЬНО – отключаем стандартную отправку

			const formData = new FormData(form);
			const submitButton = form.querySelector('button[type="submit"]');
			const originalText = submitButton.textContent;

			// Получаем значения
			const firstName = formData.get('firstname')?.trim();
			const lastName = formData.get('lastname')?.trim();
			const email = formData.get('email')?.trim();
			const message = formData.get('message')?.trim();
			const phone = formData.get('phone')?.trim(); // необязательное

			// Валидация обязательных полей
			if (!firstName || !lastName || !email || !message) {
					alert('Пожалуйста, заполните все поля, отмеченные звёздочкой (*).');
					return;
			}

			// Проверка email
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
					alert('Введите корректный email адрес.');
					return;
			}

			if (firstName.length < 2 || lastName.length < 2) {
					alert('Имя и фамилия должны содержать минимум 2 символа.');
					return;
			}
			if (message.length < 10) {
					alert('Сообщение должно содержать минимум 10 символов.');
					return;
			}

			// Блокируем кнопку
			submitButton.textContent = 'Sending...';
			submitButton.disabled = true;

			try {
					const response = await fetch(form.action, {
							method: 'POST', // явно указываем POST
							body: formData
					});

					const data = await response.json();

					if (data.success) {
							alert('Сообщение отправлено успешно!');
							form.reset(); // очищаем форму
					} else {
							alert('Ошибка: ' + (data.message || 'Попробуйте позже.'));
					}
			} catch (error) {
					alert('Ошибка соединения. Проверьте интернет.');
			} finally {
					submitButton.textContent = originalText;
					submitButton.disabled = false;
			}
	});
});