document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  if (!form) return;

  // Функция сброса ошибок со всех полей
  function clearErrors() {
    document.querySelectorAll('.form__input._error').forEach(el => {
      el.classList.remove('_error');
    });
  }

  // Функция добавления ошибки на конкретное поле
  function addError(inputElement) {
    if (inputElement) {
      inputElement.classList.add('_error');
    }
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Очищаем старые ошибки перед новой валидацией
    clearErrors();

    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Получаем значения
    const firstName = formData.get('firstname')?.trim() || '';
    const lastName = formData.get('lastname')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const message = formData.get('message')?.trim() || '';
    const phone = formData.get('phone')?.trim(); // необязательное

    // Находим DOM-элементы для подсветки
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    let hasError = false;

    // Проверка обязательных полей (не пустые)
    if (!firstName || firstName.length < 2) {
      addError(firstNameInput);
      hasError = true;
    }
    if (!lastName || lastName.length < 2) {
      addError(lastNameInput);
      hasError = true;
    }
    if (!email) {
      addError(emailInput);
      hasError = true;
    } else {
      // Проверка формата email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        addError(emailInput);
        hasError = true;
      }
    }
    if (!message || message.length < 10) {
      addError(messageInput);
      hasError = true;
    }

    // Если есть ошибки – показываем alert и прерываем отправку
    if (hasError) {
      alert('Пожалуйста, исправьте выделенные поля (минимум 2 символа для имени/фамилии, корректный email, минимум 10 символов для сообщения).');
      return;
    }

    // Блокируем кнопку
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert('Сообщение отправлено успешно!');
        form.reset();
        clearErrors(); // на всякий случай очищаем после сброса
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