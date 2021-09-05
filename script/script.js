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

        const menu = document.querySelector('menu');

        const handlerMenu = elem => {

            if (!menu.classList.contains('active-menu')) {
                menu.classList.add('active-menu');
            } else if (elem.matches('a')) {
                menu.classList.remove('active-menu');
            }
        };

        document.addEventListener('click', event => {

            const target = event.target;

            // Отслеживание клика по иконке бургера или эл-там меню
            // чтобы запустить ф-цию еще раз для проверки класса
            if (target.closest('.menu') || target.closest('menu')) {
                handlerMenu(target);
            }
        });
    };

    toggleMenu();

    const popupAnimateClose = () => {

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

                popupContent.style.top = (startPosition - passedBottom * 2) + 'px';

            }, 1);

        } else {
            popup.style.display = 'none';
        }
    };

    // popup
    const togglePopUp = () => {

        const popupBtn = document.querySelectorAll('.popup-btn');

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

                    }, 2);

                } else {
                    popup.style.display = 'block';
                }
            });
        });

        popup.addEventListener('click', event => {

            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popupAnimateClose();
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popupAnimateClose();
                }
            }
        });
    };

    togglePopUp();

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleContent = index => {

            for (let i = 0; i < tabContent.length; i++) {

                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {

            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleContent(i);
                    }
                });
            }
        });
    };

    tabs();

});

