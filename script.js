// Показать скрытые карточки по кнопке "Загрузить ещё"
document.getElementById('load-more').addEventListener('click', function () {
    const hiddenCards = document.querySelectorAll('.card.hidden');
    hiddenCards.forEach((card, index) => {
        if (index < 3) {
            card.classList.remove('hidden');
        }
    });

    // Скрыть кнопку, если больше нет скрытых карточек
    if (document.querySelectorAll('.card.hidden').length === 0) {
        this.style.display = 'none';
    }
});

//Смена цвета при скролле

document.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    const scrollY = window.scrollY;
  
    // Условие: изменить стиль при прокрутке вниз
    if (scrollY > 125) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

// МОДАЛЬНОЕ ОКНО

const openBtnModals = document.querySelectorAll('.card')
const modals = document.querySelectorAll('.modal')


openBtnModals.forEach(card=> {
    card.addEventListener('click', function (event) {
        const btn = card.querySelector('.details-btn');
        if (!btn) return;

        const modalId = btn.dataset.modalId; // Получаем ID модального окна из data-атрибута
        const modal = document.querySelector(`#${modalId}`);
        if (modal) {
            modal.classList.add('open'); // Открываем модальное окно
        } else {
            console.error(`Модальное окно с ID "${modalId}" не найдено.`);
        }
    });
});
        

modals.forEach(modal => {
    const closeBtn = document.querySelector('#close-my-modal-btn')
    const modalBox = document.querySelector('.modal__box')

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('open')
    })

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.classList.remove('open')
        }
    })

    modalBox.addEventListener('click', event => {
        event._isClickWithModal = true
    })
    
    modal.addEventListener('click', event => {
        if (event._isClickWithModal) return
        event.currentTarget.classList.remove('open')
    })
    
})

// Главное модальное окно

const openModal = document.querySelector('.welcome__button');
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('main-modal');
const closeModal = document.getElementById('modal-close');
const form = modal.querySelector('form'); // Найдём форму внутри модального окна
const submitButton = form?.querySelector('[type="submit"]'); // Найдём кнопку отправки

// Открытие модального окна
openModal.addEventListener('click', () => {
    setTimeout(() => modalOverlay.classList.add('modal-show'), 50);
    setTimeout(() => modal.classList.add('show'), 50); // Добавляем задержку для анимации
});

// Функция закрытия модального окна (всегда закрывает, без проверки формы)
const close = () => {
    // Убираем фокус с активного элемента
    document.activeElement.blur();

    // Закрываем модальное окно
    modal.classList.remove('show');
    modalOverlay.classList.remove('modal-show');
};

// Закрытие по клику на крестик (и предотвращение всплытия события)
closeModal.addEventListener('click', (e) => {
    e.stopPropagation(); // Предотвращаем лишнюю обработку событий
    close();
});

// Закрытие при клике на оверлей
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) close();
});

// Закрытие по клавише Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
});

// Обработка отправки формы (если форма не заполнена — не закрываем)
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Отмена стандартной отправки

        if (form.checkValidity()) {
            console.log('Форма успешно отправлена!'); // Тут можно добавить AJAX-запрос
            close(); // Закрываем модальное окно после успешной отправки
        } else {
            console.log('Форма заполнена не полностью!'); // Уведомление в консоль
            form.reportValidity(); // Включает стандартное отображение ошибок
        }
    });
}


// Слайдер

const personalContainers = document.querySelectorAll('.personal-container');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const reviewsContainer = document.querySelector('.reviews-container');

let currentIndex = 0;
let isDragging = false;
let startX = 0;

// Функция обновления состояния стрелок
function updateArrows() {
    leftArrow.classList.toggle('disabled', currentIndex === 0);
    rightArrow.classList.toggle('disabled', currentIndex === personalContainers.length - 1);
}

// Функция плавного перемещения слайдов
function moveSlider(smooth = true) {
    const offset = -currentIndex * 100;
    personalContainers.forEach((container) => {
        container.style.transition = smooth ? 'transform 0.6s ease-out' : 'none'; // Убираем анимацию при свайпе
        container.style.transform = `translateX(${offset}%)`;
    });
}

// Обработчики событий для стрелок
leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        moveSlider();
        updateArrows();
    }
});

rightArrow.addEventListener('click', () => {
    if (currentIndex < personalContainers.length - 1) {
        currentIndex++;
        moveSlider();
        updateArrows();
    }
});

// === 🛠 ДОБАВЛЕНИЕ ПЛАВНОГО СКРОЛЛА ДЛЯ МОБИЛЬНЫХ ===
reviewsContainer.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

reviewsContainer.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diffX = startX - e.touches[0].clientX;
    const offset = -currentIndex * 100 - (diffX / window.innerWidth) * 100;

    personalContainers.forEach((container) => {
        container.style.transition = 'none'; // Убираем анимацию во время свайпа
        container.style.transform = `translateX(${offset}%)`;
    });
});

reviewsContainer.addEventListener('touchend', (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (diffX > 50 && currentIndex < personalContainers.length - 1) {
        currentIndex++;
    } else if (diffX < -50 && currentIndex > 0) {
        currentIndex--;
    }

    moveSlider(true); // Включаем плавную анимацию
    updateArrows();
});

// Инициализация
updateArrows();


// АККОРДЕОН 

const headers = document.querySelectorAll('.accordion-header');

headers.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const cross = header.querySelector('.cross');

    // Если текущий элемент уже открыт, просто закрываем его
    if (content.classList.contains('open')) {
      content.classList.remove('open');
      cross.classList.remove('rotated');
      return;
    }

    // Закрываем все остальные элементы
    document.querySelectorAll('.accordion-content').forEach(item => {
      item.classList.remove('open');
    });
    document.querySelectorAll('.cross').forEach(crossItem => {
      crossItem.classList.remove('rotated');
    });

    // Открываем текущий элемент
    content.classList.add('open');
    cross.classList.add('rotated');
  });
});

// БУРГЕР 

const burgerBtn = document.querySelector('.header__burger-btn')
const openBurger = document.querySelector('.header')
const overlay = document.getElementById('overlay')
const navBtnBurger = document.querySelectorAll('#nav__btn-burger')
const welcomeBtn = document.querySelector('.welcome__button')

welcomeBtn.addEventListener('click', () => {
    openBurger.classList.remove('open')
    overlay.classList.remove('active')
})

navBtnBurger.forEach(nav => {
    nav.addEventListener('click', () => {
        openBurger.classList.remove('open')
        overlay.classList.remove('active')
    })
})

burgerBtn.addEventListener('click', function() {
    openBurger.classList.toggle('open')
    overlay.classList.toggle('active')
})

// Скролл навигации

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
  
      if (targetElement) {
        // Прокрутка к секции без учёта высоты шапки
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
  
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth',
        });
      }
    });
  });