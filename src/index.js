import countTimer from './modules/countTimer';
import checkPopup from './modules/checkPopup';
import toggleMenu from './modules/toggleMenu';
import tabs from './modules/tabs';
import slide from './modules/slide';
import calc from './modules/calc';
import moveGallery from './modules/moveGallery';
import sendForm from './modules/sendForm';

//Таймер
countTimer('31 october 2021');

// Меню
toggleMenu();

// popup
checkPopup();

// Табы
tabs();

// Слайдер
slide();

// Галерея
moveGallery();

// Калькулятор
calc(100);

// send ajax-form
sendForm('form1');
sendForm('form3');
sendForm('form2');

