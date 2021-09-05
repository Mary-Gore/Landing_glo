window.addEventListener('DOMContentLoaded', () => {

    let intervalId,
        intervalAnimateTop,
        intervalAnimateBottom,
        startPosition = 0,
        time;

    if (document.body.clientWidth >= 768 &&
        document.body.clientWidth <= 1000) {

        time = 400;

    } else if (document.body.clientWidth > 1000 &&
        document.body.clientWidth < 1200) {

        time = 1000;
    } else {
        time = 300;
    }

    const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content');

    //Таймер
    const countTimer = deadline => {

        const timerHours = document.querySelector('#timer-hours'),
            timerMinuts = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {

            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        };

        const updateClock = () => {

            const timer = getTimeRemaining();

            if (timer.timeRemaining > 0) {

                if (String(timer.hours).length < 2) {
                    timerHours.textContent = '0' + timer.hours;
                } else {
                    timerHours.textContent = timer.hours;
                }

                if (String(timer.minutes).length < 2) {

                    timerMinuts.textContent = '0' + timer.minutes;
                } else {
                    timerMinuts.textContent = timer.minutes;
                }

                if (String(timer.seconds).length < 2) {
                    timerSeconds.textContent = '0' + timer.seconds;
                } else {
                    timerSeconds.textContent = timer.seconds;
                }

            } else {
                clearInterval(intervalId);
                timerHours.textContent = '00';
                timerMinuts.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };

        intervalId = setInterval(updateClock, 1000);
    };

    countTimer('15 september 2021');

    // Меню
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);

        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    // popup
    const togglePopUp = () => {

        const popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach(elem => {

            elem.addEventListener('click', () => {

                // Отключение анимации на маленьких экранах
                if (document.body.clientWidth >= 768) {

                    const start = Date.now();

                    // Анимация сверху-вниз
                    intervalAnimateTop = setInterval(() => {

                        const passed = Date.now() - start;

                        if (passed >= time) {
                            clearInterval(intervalAnimateTop);
                            startPosition = passed;
                            return;
                        }

                        popup.style.display = 'block';
                        popupContent.style.left = (popup.clientWidth / 2) - (popupContent.clientWidth / 2) + 60 + 'px';
                        popupContent.style.top = passed + 'px';

                    }, 5);

                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popupClose.addEventListener('click', () => {

            // Отключение анимации на маленьких экранах
            if (document.body.clientWidth >= 768) {

                const start = Date.now();

                // Анимация снизу вверх и скрытие блока
                intervalAnimateBottom = setInterval(() => {

                    const passedBottom = Date.now() - start;

                    if (passedBottom >= time + 500) {
                        clearInterval(intervalAnimateBottom);
                        popup.style.display = 'none';
                        return;
                    }

                    popupContent.style.top = (startPosition - passedBottom) + 'px';

                }, 5);

            } else {
                popup.style.display = 'none';
            }
        });
    };

    togglePopUp();

});
