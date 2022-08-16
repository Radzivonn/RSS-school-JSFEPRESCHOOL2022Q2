import settingsState from './settings.js';
import {ChangeSelectElement} from './General_module.js';

const selectLang = document.querySelector('.change-lang');
const allLang = ["en", "ru"]; // используемые языки
let hash;

// перенаправить на URL с указанием языка
const changeURLLanguage = () => {
  settingsState.language = selectLang.value;
  location.href = window.location.pathname + '#' + settingsState.language; // изменить язык на выбранный в теге select
  location.reload();
}

const changeLanguage = () => {
  hash = window.location.hash;
  hash = hash.substring(1);
  // если не установлен язык, установить язык по умолчанию
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#' + settingsState.language;
    location.reload();
  }
  selectLang.value = hash;
}

window.addEventListener('load', () => ChangeSelectElement('lang', settingsState.language)); // после загрузки установить сохранённое значение в поле select

changeLanguage();
selectLang.addEventListener('change', changeURLLanguage);

export {hash as lang};