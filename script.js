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