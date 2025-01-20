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

// Open Modal
openModal.addEventListener('click', () => {
    setTimeout(() => modalOverlay.classList.add('modal-show'), 50);
    setTimeout(() => modal.classList.add('show'), 50); // Add delay for smooth animation
});

// Close Modal
const close = () => {
    modal.classList.remove('show');
    modalOverlay.classList.remove('modal-show')
};

closeModal.addEventListener('click', close);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) close();
});


// Слайдер

const personalContainers = document.querySelectorAll('.personal-container');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');

let currentIndex = 0;

// Функция обновления состояния стрелок
function updateArrows() {
    if (currentIndex === 0) {
        leftArrow.classList.add('disabled'); // Скрыть левую стрелку на первом слайде
    } else {
        leftArrow.classList.remove('disabled');
    }

    if (currentIndex === personalContainers.length - 1) {
        rightArrow.classList.add('disabled'); // Скрыть правую стрелку на последнем слайде
    } else {
        rightArrow.classList.remove('disabled');
    }
}

// Функция перемещения слайдов
function moveSlider() {
    const offset = -currentIndex * 100; // Смещение на ширину контейнера
    personalContainers.forEach((container) => {
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

burgerBtn.addEventListener('click', function() {
    openBurger.classList.toggle('open')
    overlay.classList.toggle('active')
})