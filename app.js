// ------------------------------------------------------
// 1. Переключение вкладок
// ------------------------------------------------------
const navLinks = document.querySelectorAll('.top-nav a');
const tabSections = document.querySelectorAll('.tab-section');

function switchTab(tabId) {
  // Удаляем active-tab у всех
  navLinks.forEach(link => link.classList.remove('active-tab'));
  tabSections.forEach(sec => sec.classList.remove('active-section'));

  // Ставим active
  const targetLink = document.querySelector(`.top-nav a[data-tab="${tabId}"]`);
  if (targetLink) targetLink.classList.add('active-tab');

  const targetSection = document.getElementById(tabId);
  if (targetSection) targetSection.classList.add('active-section');
}

// Навешиваем клики
navLinks.forEach(link => {
  // Пропускаем внешние (Discord)
  if (link.classList.contains('discord-link')) return;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tabId = link.getAttribute('data-tab');
    switchTab(tabId);
  });
});

// ------------------------------------------------------
// 2. Модальные окна (для кнопок "Перейти к темам")
// ------------------------------------------------------
const openTopicButtons = document.querySelectorAll('.open-topics');
const modals = document.querySelectorAll('.modal');
const closeModalButtons = document.querySelectorAll('.close');

openTopicButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const sectionId = btn.getAttribute('data-section-id');
    const modal = document.getElementById(sectionId + '-modal');
    if (modal) {
      modal.style.display = 'block';
    }
  });
});
closeModalButtons.forEach(closeBtn => {
  closeBtn.addEventListener('click', () => {
    modals.forEach(m => m.style.display = 'none');
  });
});
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

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('login-username').value;
  const pass = document.getElementById('login-password').value;
  if (user && pass) {
    // Фейк: просто меняем статус
    profileUsername.textContent = user;
    profileStatus.textContent = 'Пользователь';
    alert('Добро пожаловать, ' + user + '!');
    switchTab('profile');
  } else {
    alert('Введите логин и пароль!');
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const user = document.getElementById('register-username').value;
  const pass = document.getElementById('register-password').value;
  const mail = document.getElementById('register-email').value;
  if (user && pass && mail) {
    alert('Регистрация прошла успешно, ' + user + '!');
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
  // Создаём элемент
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  // Рандомная позиция
  snowflake.style.left = Math.random() * 100 + '%';

  // Рандомная задержка анимации и длительность
  const fallTime = 5 + Math.random() * 5; // 5-10 секунд
  snowflake.style.animationDuration = fallTime + 's';

  // Рандомный размер (0.5 - 1.5 rem)
  const size = 0.5 + Math.random() * 1;
  snowflake.style.width = size + 'rem';
  snowflake.style.height = size + 'rem';

  // Добавляем во вложение
  snowContainer.appendChild(snowflake);

  // Удаляем элемент по окончании анимации
  setTimeout(() => {
    snowflake.remove();
  }, fallTime * 1000);
}

// Каждые 600 мс генерируем снежинку
setInterval(createSnowflake, 600);
