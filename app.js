// ------------------------------------------------------
// 1. Переключение вкладок
// ------------------------------------------------------
const navLinks = document.querySelectorAll('.top-nav a');
const tabSections = document.querySelectorAll('.tab-section');

function switchTab(tabId) {
  // Удаляем active-tab у всех ссылок
  navLinks.forEach(link => link.classList.remove('active-tab'));
  // Скрываем все секции
  tabSections.forEach(sec => sec.classList.remove('active-section'));

  // Находим нужную ссылку и секцию
  const targetLink = document.querySelector(`.top-nav a[data-tab="${tabId}"]`);
  const targetSection = document.getElementById(tabId);

  // Добавляем классы «active»
  if (targetLink) targetLink.classList.add('active-tab');
  if (targetSection) targetSection.classList.add('active-section');
}

// Навешиваем клики на ссылки в шапке (кроме внешних ссылок)
navLinks.forEach(link => {
  if (link.classList.contains('discord-link')) return; // пропускаем Discord
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tabId = link.getAttribute('data-tab');
    switchTab(tabId);
  });
});


// ------------------------------------------------------
// 2. Модальные окна (для кнопок "Подробнее" / "Перейти к темам")
// ------------------------------------------------------
const openTopicButtons = document.querySelectorAll('.open-topics');
const modals = document.querySelectorAll('.modal');
const closeModalButtons = document.querySelectorAll('.close');

// Открываем нужное модальное окно
openTopicButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const sectionId = btn.getAttribute('data-section-id');
    // Модальному окну добавляем суффикс "-modal"
    const modal = document.getElementById(sectionId + '-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  });
});

// Закрываем по нажатию на кнопку "×"
closeModalButtons.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    modals.forEach(m => m.style.display = 'none');
  });
});

// Закрываем по клику вне модального окна
window.addEventListener('click', (e) => {
  modals.forEach(m => {
    if (e.target === m) {
      m.style.display = 'none';
    }
  });
});


// ------------------------------------------------------
// 3. Примитивная "Авторизация"
// ------------------------------------------------------
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const profileUsername = document.getElementById('profile-username');
const profileStatus = document.getElementById('profile-status');

// Обработка формы «Вход»
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('login-username').value;
  const pass = document.getElementById('login-password').value;
  
  if (user && pass) {
    // Условная «авторизация»
    profileUsername.textContent = user;
    profileStatus.textContent = 'Пользователь';
    alert(`Добро пожаловать, ${user}!`);
    switchTab('profile');
  } else {
    alert('Введите логин и пароль!');
  }
});

// Обработка формы «Регистрация»
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('register-username').value;
  const pass = document.getElementById('register-password').value;
  const mail = document.getElementById('register-email').value;
  
  if (user && pass && mail) {
    alert(`Регистрация прошла успешно, ${user}!`);
    switchTab('login'); 
  } else {
    alert('Заполните все поля!');
  }
});


// ------------------------------------------------------
// 4. Генерация снега
// ------------------------------------------------------
const snowContainer = document.getElementById('snow-container');

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  // Рандомная позиция
  snowflake.style.left = Math.random() * 100 + '%';

  // Рандомная длительность (5-10 сек)
  const fallTime = 5 + Math.random() * 5;
  snowflake.style.animationDuration = fallTime + 's';

  // Рандомный размер (0.5 - 1.5 rem)
  const size = 0.5 + Math.random() * 1;
  snowflake.style.width = size + 'rem';
  snowflake.style.height = size + 'rem';

  snowContainer.appendChild(snowflake);

  // Удаляем снежинку, когда она «долетит»
  setTimeout(() => {
    snowflake.remove();
  }, fallTime * 1000);
}

// Каждые 600 мс генерируем снежинку
setInterval(createSnowflake, 600);


// ------------------------------------------------------
// 5. Генерация «пиксельного дождя»
// ------------------------------------------------------
const pixelRainContainer = document.querySelector('.pixel-rain-container');

function createPixelRain() {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel-rain');

  // Рандомная позиция (left: 0% - 100%)
  const leftPos = Math.random() * 100;
  pixel.style.left = leftPos + '%';

  // Длительность падения (1.5 - 3 сек)
  const duration = 1.5 + Math.random() * 1.5;
  pixel.style.animation = `pixelRain ${duration}s linear infinite`;

  // Удалим элемент по завершении анимации
  setTimeout(() => {
    pixel.remove();
  }, duration * 1000);

  pixelRainContainer.appendChild(pixel);
}

// Генерируем «дождевые пиксели» каждые 250 мс
setInterval(createPixelRain, 250);
