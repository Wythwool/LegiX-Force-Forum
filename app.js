// Переключение вкладок с плавной анимацией
const navLinks = document.querySelectorAll('.top-nav a');
const sections = document.querySelectorAll('main .tab-section');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const targetId = link.getAttribute('href').slice(1);

    // Удаляем active-class
    navLinks.forEach(nav => nav.classList.remove('active-tab'));
    sections.forEach(sec => sec.classList.remove('active-section'));

    // Добавляем active-class
    link.classList.add('active-tab');
    document.getElementById(targetId).classList.add('active-section');

    // Прокручиваем к секции с плавной анимацией
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Генерация эффектов снега
const snowContainer = document.getElementById('snow-container');

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');

  // Рандомная позиция и размер
  snowflake.style.left = Math.random() * 100 + '%';
  snowflake.style.animationDuration = 5 + Math.random() * 5 + 's';
  snowflake.style.width = snowflake.style.height = Math.random() * 5 + 5 + 'px';

  snowContainer.appendChild(snowflake);

  // Удаление снежинки после завершения анимации
  snowflake.addEventListener('animationend', () => {
    snowflake.remove();
  });
}

setInterval(createSnowflake, 200);

// Появление и исчезновение уведомлений
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.classList.add('notification', type);
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('hide');
    notification.addEventListener('transitionend', () => notification.remove());
  }, 3000);
}

// Пример уведомлений при взаимодействии
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    showNotification(`Вы открыли вкладку: ${link.textContent}`, 'success');
  });
});

// Генерация "пиксельного дождя"
const pixelRainContainer = document.querySelector('.pixel-rain-container');

function createPixelRain() {
  const pixel = document.createElement('div');
  pixel.classList.add('pixel-rain');

  // Рандомная позиция и длительность
  pixel.style.left = Math.random() * 100 + '%';
  pixel.style.animationDuration = 2 + Math.random() * 2 + 's';

  pixelRainContainer.appendChild(pixel);

  // Удаление пикселя после завершения анимации
  pixel.addEventListener('animationend', () => {
    pixel.remove();
  });
}

setInterval(createPixelRain, 300);

// Эффекты кнопок
const buttons = document.querySelectorAll('button, .button-animated-border');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = '0 0 15px var(--primary-color)';
    button.style.transform = 'scale(1.1)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = 'none';
    button.style.transform = 'scale(1)';
  });
});
