import {getRandomNum, MAX, MIN, city} from './modules/General_module.js';
import {showTime} from './modules/Date_and_greeting.js';
import {setBg, getSlidePrev, getSlideNext} from './modules/Background_change.js';
import getWeather from './modules/weather_widget.js';
import {getRandomQuote} from './modules/Quotes_widget.js';
import {playButton, togglePlayPause, playPrevAudio, playNextAudio} from './modules/Audio_player.js';

const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const changeQuoteButton = document.querySelector('.change-quote');

const playPrevButton = document.querySelector('.play-prev');
const playNextButton = document.querySelector('.play-next');

let UserName = document.querySelector('.name');
const setLocalStorage = () => localStorage.setItem('name', UserName.value);
const getLocalStorage = () => { if(localStorage.getItem('name')) UserName.value = localStorage.getItem('name') }

showTime();
getRandomNum(MIN, MAX);
setBg();
getWeather();

window.addEventListener('beforeunload', setLocalStorage); // сохранить имя пользователя в local storage перед перезагрузкой или закрытием страницы
window.addEventListener('load', getLocalStorage); // загрузить имя пользователя из local storage при загрузке страницы

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

city.addEventListener('change', () => getWeather()); // отобразить погоду если поменялся город

changeQuoteButton.addEventListener('click', getRandomQuote); // отобразить новую рандомную цитату по клику

playButton.addEventListener('click', togglePlayPause);
playPrevButton.addEventListener('click', playPrevAudio);
playNextButton.addEventListener('click', playNextAudio);