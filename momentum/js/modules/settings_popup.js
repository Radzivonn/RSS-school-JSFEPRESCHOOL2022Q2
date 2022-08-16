import settingsState from './settings.js';
import setBg from './Background_change.js';

const settingsIcon = document.querySelector('.settings-icon');
const settingsPopup = document.querySelector('.settingsPopup');
const settingsContent = document.querySelector('.popup__content');
const tagInput = document.querySelector('.tagInput');
const changeImagesSource = document.querySelector('.change-BG-images-source');
const saveChangesButton = document.querySelector('.saveChangesButton');
let flag = true;
export let BGphotoSource = changeImagesSource.value;


const settingsOpen = () => {
  settingsPopup.classList.add('open');
  settingsContent.classList.add('open');

  settingsPopup.addEventListener('click', function (e) {
    if(!e.target.closest('.popup__content')) settingsClose();
  })
}

const settingsClose = () => {
  settingsPopup.classList.remove('open');
  settingsContent.classList.remove('open');
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


const ShowAllNodes = () => {
  settingsState.IncludedBlocks = [];
  const checkboxes = document.querySelectorAll('input#checkbox');
  checkboxes.forEach(flag => {
    const node = document.querySelector(`.${flag.name}`);
    if (flag.checked) node.classList.remove('hidden');
    else node.classList.add('hidden');
  });
}

// const saveBlocksState = () => {
//   settingsState.IncludedBlocks = [];
//   const checkboxes = document.querySelectorAll('input#checkbox');
//   checkboxes.forEach(flag => {
//     if (flag.checked) settingsState.IncludedBlocks.push(flag.name)
//   });
// }

// const getPreviousBlocksState = () => {
//   const checkboxes = document.querySelectorAll('input#checkbox');
//   console.log(settingsState.IncludedBlocks.split(','));
//   for(let i = 0; i < checkboxes.length; i++) {
//     console.log(checkboxes[i].name);
//     console.log(settingsState.IncludedBlocks.split(',')[i]);
//     if (checkboxes[i].name === settingsState.IncludedBlocks.split(',')[i]) checkboxes[i].setAttribute("checked", "checked");
//     else checkboxes[i].removeAttribute("checked");
//   }
// }

const setLocalStorageSettings = () => { for (let name in settingsState) localStorage.setItem(name, settingsState[name]) }
const getLocalStorageSettings = () => { for (let name in settingsState) if(localStorage.getItem(name)) settingsState[name] = localStorage.getItem(name) }


// window.addEventListener('beforeunload', saveBlocksState);
window.addEventListener('beforeunload', setLocalStorageSettings); // сохранить настройки в local storage перед перезагрузкой или закрытием страницы
window.addEventListener('DOMContentLoaded', getLocalStorageSettings); // загрузить настройки из local storage при загрузке страницы
// window.addEventListener('DOMContentLoaded', getPreviousBlocksState);

window.addEventListener('DOMContentLoaded', () => changeImagesSource.value = settingsState.photoSource);
window.addEventListener('load', tagInputLock);
window.addEventListener('load', ShowAllNodes);

settingsIcon.addEventListener('click', settingsOpen);

changeImagesSource.addEventListener('change', () => {
  tagInputLock();
  settingsState.photoSource = changeImagesSource.value;
  setBg();
});

saveChangesButton.addEventListener('click', ShowAllNodes);