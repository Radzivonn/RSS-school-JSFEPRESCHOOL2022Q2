import {getRandomNum, MAX, MIN} from './modules/General_module.js';
import {showTime} from './modules/Date_and_greeting.js';
import getWeather from './modules/weather_widget.js';

let UserName = document.querySelector('.name');

const setLocalStorage = () => localStorage.setItem('name', UserName.value);
const getLocalStorage = () => { if(localStorage.getItem('name')) UserName.value = localStorage.getItem('name') }

showTime();
getRandomNum(MIN, MAX);
getWeather();

window.addEventListener('beforeunload', setLocalStorage); // сохранить имя пользователя в local storage перед перезагрузкой или закрытием страницы
window.addEventListener('load', getLocalStorage); // загрузить имя пользователя из local storage при загрузке страницы