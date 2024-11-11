window.addEventListener("DOMContentLoaded", function () {

    // Меню бургер
    $(document).ready(function () {
        $('.menu__burger').click(function () {
            $(this).toggleClass('active');
            $('.menu__block').toggleClass('active');
            $('body').toggleClass('lock');
        });

        $('.menu__link').click(function (e) {
            e.preventDefault(); // Зупиняємо стандартну дію
            if ($('.menu__burger').hasClass('active')) {
                $('.menu__burger').removeClass('active');
                $('.menu__block').removeClass('active');
                $('body').removeClass('lock');
            }
        });
    });

    // Функція для оновлення висоти футера в CSS
    function updateFooterAndHeaderHeight() {
        const footer = document.querySelector('footer');
        const header = document.querySelector('header');

        const content = document.querySelector('.content');
        const footerHeight = footer.offsetHeight;
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--footer-height', `${footerHeight}px`);
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);


    }

    // Виклик функції при завантаженні сторінки та зміні розмірів вікна
    window.addEventListener('load', updateFooterAndHeaderHeight);
    window.addEventListener('resize', updateFooterAndHeaderHeight);





    // Функція відкриття пунктів item
    function itemsControl() {
        const coll = document.getElementsByClassName('content__item');

        for (let i = 0; i < coll.length; i++) {
            const title = coll[i].querySelector('.content__item__button');
            title.addEventListener('click', function () {
                let content = coll[i].querySelector('.content__item__info');
                let image = coll[i].querySelector('.img-rotate'); // картинка
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    image.classList.remove('rotated'); // поворот картинки
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    image.classList.add('rotated'); //  поворот картинки
                }
            });
        }
    }

    itemsControl();

    
    
    



      
  
// Робота з інтерактивною мапою
let rooms = document.querySelectorAll('.cls-4');
let popupBg = document.querySelector('.map__info_bg');
let popup__link = document.querySelector('.map__info_link');
let popup__title = document.querySelector('.map__room_num');
// let popup__text = document.querySelector('.map__info_text');
let selectedRoom = null; // Змінна для збереження обраної кімнати

rooms.forEach((item) => {
    item.addEventListener('click', function() {
        // Якщо є попередньо виділена кімната, знімаємо виділення
        if (selectedRoom) {
            selectedRoom.classList.remove('selected-room');
        }

        // Додаємо виділення до поточної кімнати
        this.classList.add('selected-room');
        selectedRoom = this; // Зберігаємо посилання на обрану кімнату

        // Оновлюємо контент попапа
        popup__link.setAttribute('href', this.getAttribute('data-link'));
        popup__title.textContent = this.getAttribute('data-title');
        // popup__text.innerHTML = this.getAttribute('data-text');


        // Показуємо попап
        popupBg.style.display = 'block';
        popupBg.classList.add('active');
    });
});

document.addEventListener('click', (e) => {
    if (e.target === popupBg) {
        popupBg.classList.remove('active');
    }
});

// Додаємо подію для завершення анімації
popupBg.addEventListener('transitionend', () => {
    if (!popupBg.classList.contains('active')) {
        popupBg.style.display = 'none';

        // Знімаємо виділення з кімнати, якщо попап закрито
        if (selectedRoom) {
            selectedRoom.classList.remove('selected-room');
            selectedRoom = null;
        }
    }
});

// Скролл свайпами

const scrollContainers = document.querySelectorAll('.map__wrapper');

scrollContainers.forEach(scrollContainer => {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Подія свайпу або натиску мишую
    scrollContainer.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - scrollContainer.offsetLeft;
        scrollLeft = scrollContainer.scrollLeft;
    });

    scrollContainer.addEventListener('mouseleave', () => {
        isDown = false;
    });

    scrollContainer.addEventListener('mouseup', () => {
        isDown = false;
    });

    scrollContainer.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - scrollContainer.offsetLeft;
        const walk = (x - startX) * 1.5; // пришвидшення прокрутки
        scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Для мобільних пристроїв
    // scrollContainer.addEventListener('touchstart', (e) => {
    //     startX = e.touches[0].pageX - scrollContainer.offsetLeft;
    //     scrollLeft = scrollContainer.scrollLeft;
    // });

    // scrollContainer.addEventListener('touchmove', (e) => {
    //     const x = e.touches[0].pageX - scrollContainer.offsetLeft;
    //     const walk = (x - startX) * 1.5; // пришвидшення прокрутки
    //     scrollContainer.scrollLeft = scrollLeft - walk;
    // });
});


// Корегуємо таблицю по висоті
document.addEventListener("DOMContentLoaded", function() {
    const content = document.querySelector('.content');
    const tableNav = document.querySelector('.table__nav');

    const tableInfoHeight = content.offsetHeight - tableNav.offsetHeight; // Отримує висоту в пікселях
    document.documentElement.style.setProperty('--table_info-height', `${tableInfoHeight}px`);
    
});

// на гіт хаб

document.querySelectorAll('a').forEach(link => {
    // Отримуємо поточне значення href
    let href = link.getAttribute('href');
    
    // Видаляємо розширення .html, якщо воно є
    if (href.endsWith('.html')) {
      href = href.slice(0, -5); // Видаляємо останні 5 символів (".html")
    }
    
    // Додаємо "residence/" перед оновленим значенням href, якщо його там ще немає
    if (!href.startsWith('residence/')) {
      href = 'residence/' + href;
    }
    
    // Перевірка доступності посилання
    fetch(href, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          link.href = href; // Якщо посилання доступне, оновлюємо його
        } else {
          console.error(`Посилання недоступне: ${href}`);
        }
      })
      .catch(error => {
        console.error(`Помилка при перевірці посилання ${href}:`, error);
      });
  
  
});
