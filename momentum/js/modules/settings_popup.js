import setBg from './Background_change.js';

const body = document.querySelector('body');
const settingsIcon = document.querySelector('.settings-icon');
const settingsPopup = document.querySelector('.settingsPopup');
const settingsContent = document.querySelector('.popup__content');
const tagInput = document.querySelector('.tagInput');
const changeImagesSource = document.querySelector('.change-BG-images-source');
const saveChangesButton = document.querySelector('.saveChangesButton');
export let BGphotoSource = changeImagesSource.value;

// const allWidgets = settingsState.AllWidgets.split(',');


const settingsOpen = () => {
  settingsPopup.classList.add('open');
	settingsContent.classList.add('open');
	body.classList.add('lock');

	settingsPopup.addEventListener('click', (e) => {
		if (!e.target.closest('.popup__content')) settingsClose();
	});
}

const settingsClose = () => {
  settingsPopup.classList.remove('open');
	settingsContent.classList.remove('open');
	body.classList.remove('lock');
}

const tagInputLock = () => {
  if (changeImagesSource.value.slice(-3) === "API") {
    tagInput.removeAttribute("disabled");
    settingsState.tagInput = 'abled';
  } else {
    tagInput.setAttribute("disabled", "disabled");
    settingsState.tagInput = 'disabled';
  }
}


const checkboxesSynchronization = () => {
	const checkboxes = document.querySelectorAll('input#checkbox');
	checkboxes.forEach(flag => {
		if (settingsState.IncludedWidgets.includes(flag.name)) flag.setAttribute('checked', 'checked');
		else flag.removeAttribute('checked');
	})
}

const saveBlocksState = () => {
	const checkboxes = document.querySelectorAll('input#checkbox');
  settingsState.IncludedWidgets = [];
  checkboxes.forEach(flag => {
		if (flag.checked) settingsState.IncludedWidgets.push(flag.name);
	});
}

const ShowAllWidgets = () => {
	saveBlocksState();
	const allWidgets = settingsState.AllWidgets.split(',');
	
	for (let i = 0; i < allWidgets.length; i++) {
		const widget = allWidgets[i];
		const node = document.querySelector(`.${widget}`);
		if (settingsState.IncludedWidgets.includes(widget)) {
			node.classList.remove('hidden');
		}
		else node.classList.add('hidden');
	}
}


const setLocalStorageSettings = () => { for (let name in settingsState) localStorage.setItem(name, settingsState[name]) }
const getLocalStorageSettings = () => { for (let name in settingsState) if(localStorage.getItem(name)) settingsState[name] = localStorage.getItem(name) }


window.addEventListener('beforeunload', setLocalStorageSettings); // сохранить настройки в local storage перед перезагрузкой или закрытием страницы
window.addEventListener('DOMContentLoaded', getLocalStorageSettings); // загрузить настройки из local storage при загрузке страницы

window.addEventListener('DOMContentLoaded', () => changeImagesSource.value = settingsState.photoSource);
window.addEventListener('load', tagInputLock);
window.addEventListener('load', checkboxesSynchronization);
window.addEventListener('load', ShowAllWidgets);

settingsIcon.addEventListener('click', settingsOpen);

changeImagesSource.addEventListener('change', () => {
  tagInputLock();
  settingsState.photoSource = changeImagesSource.value;
  setBg();
});

saveChangesButton.addEventListener('click', ShowAllWidgets);