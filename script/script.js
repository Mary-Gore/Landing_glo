/* eslint-disable no-useless-escape */
window.addEventListener('DOMContentLoaded', () => {

    let intervalId,
        intervalAnimateTop,
        intervalAnimateBottom,
        startPosition = 0,
        time;

    const popup = document.querySelector('.popup'),
        popupContent = document.querySelector('.popup-content'),
        img = document.querySelectorAll('#command img'),
        calcBlock = document.querySelector('.calc-block'),
        mainForm = document.querySelectorAll('.main-form')[0],
        mainFormModal = document.querySelectorAll('.main-form')[1],
        footerFormInput = document.querySelector('.footer-form-input');

    if (document.body.clientWidth >= 768 &&
        document.body.clientWidth <= 1000) {

        time = 400;

    } else if (document.body.clientWidth > 1000 &&
        document.body.clientWidth < 1200) {

        time = 1000;
    } else {
        time = 300;
    }

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

    countTimer('25 september 2021');

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

    // Слайдер
    const slide = () => {

        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            dotUl = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            interval;

        const addDots = () => {

            for (let i = 0; i < slide.length; i++) {

                const dotLi = document.createElement('li');
                dotLi.classList.add('dot');
                dotUl.appendChild(dotLi);
            }
        };

        addDots();


        const dot = document.querySelectorAll('.dot');
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {

            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', event => {

            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {

            if (event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };

    slide();

    // Галерея
    img.forEach(item => {

        const imgSrc = item.src;

        item.addEventListener('mouseenter', event => {
            event.target.src = event.target.dataset.img;
        });

        item.addEventListener('mouseleave', event => {
            event.target.src = imgSrc;
        });
    });

    // Валидация
    calcBlock.addEventListener('blur', event => {

        if (event.target.matches('.calc-square, .calc-count, .calc-day')) {
            event.target.value = event.target.value.replace(/\D/g, '');
        }

    }, true);

    // Проверка имени
    const checkName = val => {

        const lowerVal = val.toLowerCase();
        val = lowerVal.replace(/(^[а-яё])/gi, match => match.toUpperCase());
        val = val.replace(/[^а-яё-\s]/gim, '');
        val = val.replace(/((^-|-$)|(\s(?=\s)))/gim, '');
        val = val.replace(/-{2}/gm, '-');
        return val;

    };

    // Проверка сообщения
    const checkMessage = message => {

        message = message.replace(/[^а-яё\.\?\!-\"\';\:,]/gi, '');
        message = message.replace(/((^-|-$)|(\s(?=\s)))/gim, '');
        message = message.replace(/-{2}/gm, '-');

        return message;
    };

    // Проверка email
    const checkEmail = email => {

        email = email.replace(/[^\w\d@\.\!~\*\'_-]/gi, '');
        email = email.replace(/((^-|-$)|(\s(?=\s)))/g, '');
        email = email.replace(/-{2}/g, '-');
        return email;

    };

    // Проверка телефона
    const checkPhone = phone => {

        phone = phone.replace(/[^\d()+]/g, '');
        phone = phone.replace(/(^-|-$)/g, '');
        phone = phone.replace(/-{2}/g, '-');
        return phone;

    };
    // Форма на главном экране
    mainForm.addEventListener('input', event => {

        if (event.target.matches('#form1-name')) {
            event.target.value = checkName(event.target.value);
        }

        if (event.target.matches('#form1-email')) {
            event.target.value = checkEmail(event.target.value);
        }

        if (event.target.matches('#form1-phone')) {
            event.target.value = checkPhone(event.target.value);
        }
    }, true);

    // Форма в модальном окне
    mainFormModal.addEventListener('input', event => {

        if (event.target.matches('#form3-name')) {
            event.target.value = checkName(event.target.value);
        }

        if (event.target.matches('#form3-email')) {
            event.target.value = checkEmail(event.target.value);
        }

        if (event.target.matches('#form3-phone')) {
            event.target.value = checkPhone(event.target.value);
        }
    }, true);

    // Форма в футере
    footerFormInput.addEventListener('input', event => {

        if (event.target.matches('#form2-name')) {
            event.target.value = checkName(event.target.value);
        }

        if (event.target.matches('#form2-message')) {
            event.target.value = checkMessage(event.target.value);
        }

        if (event.target.matches('#form2-email')) {
            event.target.value = checkEmail(event.target.value);
        }

        if (event.target.matches('#form2-phone')) {
            event.target.value = checkPhone(event.target.value);
        }

    }, true);

    // Калькулятор
    const calc = (price = 100) => {

        const calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {

            let total = 0,
                countValue = 1,
                dayValue = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            if (!isNaN(total)) totalValue.textContent = total.toFixed(2);
        };

        calcBlock.addEventListener('change', event => {

            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }

        });
    };

    calc(100);

    // send ajax-form
    const sendForm = formId => {
        const errorMessage = 'Что-то пошло не так...',
            loadMessage = 'Загрузка...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const form = document.getElementById(formId);

        const statusMessage = document.createElement('div');
        if (form.matches('#form1')) {
            statusMessage.style.cssText = 'font-size: 2rem';
        } else if (form.matches('#form3')) {
            statusMessage.style.cssText = `font-size: 1.5rem; color: #fff;
            padding-bottom: 20px`;
        } else if (form.matches('#form2')) {
            statusMessage.style.cssText = `font-size: 2rem; 
            margin-top: 30px`;
        }


        form.addEventListener('submit', event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form),
                body = {};

            formData.forEach((key, val) => {
                body[key] = val;
            });

            const postData = body => fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)

            });

            postData(body)
                .then(response => {
                    if (response.status !== 200) {
                        throw new Error('status network is not 200');
                    }
                    statusMessage.textContent = successMessage;
                })
                .catch(error => {
                    statusMessage.textContent = errorMessage;
                    console.error(error);
                });
        });
    };

    sendForm('form1');
    sendForm('form3');
    sendForm('form2');
});
