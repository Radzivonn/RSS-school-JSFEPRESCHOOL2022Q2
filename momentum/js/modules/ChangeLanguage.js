import {ChangeSelectElement} from './General_module.js';
import translationsArr from "./lang.js";

const selectLang = document.querySelector('.change-lang');
const allLang = ["en", "ru"]; // используемые языки
let hash;

// перенаправить на URL с указанием языка
const changeURLLanguage = () => {
  settingsState.language = selectLang.value;
  location.href = window.location.pathname + '#' + settingsState.language; // изменить язык на выбранный в теге select
  location.reload();
}

const changeInterfaceLanguage = (language) => {
	document.querySelector('.chooseLanguageLabel').textContent = translationsArr["settings"]["chooseLanguageLabel"][language];
	document.querySelector('.chooseAPILabel').textContent = translationsArr["settings"]["chooseAPILabel"][language];
	document.querySelector('.tagInput').setAttribute("placeholder", translationsArr["settings"]["tagForBG"][language]);
	document.querySelector('.saveChangesButton').textContent = translationsArr["settings"]["SaveChangesButton"][language];
	document.querySelector('.WidgetsTitle').textContent = translationsArr["settings"]["WidgetsTitle"][language];
	const nodes = document.querySelectorAll('.blocksDisplay label span');
	const nodesNames = translationsArr["settings"]["WidgetsNames"][language];
	for (let i = 0; i < nodesNames.length; i++) {
		nodes[i].textContent = nodesNames[i];
	}
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
	changeInterfaceLanguage(hash);
}

window.addEventListener('load', () => ChangeSelectElement('lang', settingsState.language)); // после загрузки установить сохранённое значение в поле select

changeLanguage();
selectLang.addEventListener('change', changeURLLanguage);

export {hash as lang};