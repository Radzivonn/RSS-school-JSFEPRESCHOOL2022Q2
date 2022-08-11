const selectLang = document.querySelector('.change-lang');
const allLang = ["en", "ru"]; // используемые языки
let hash;

// перенаправить на URL с указанием языка
const changeURLLanguage = () => {
  let lang = selectLang.value;
  location.href = window.location.pathname + '#' + lang; // изменить язык на выбранный в теге select
  location.reload();
}

const changeLanguage = () => {
  hash = window.location.hash;
  hash = hash.substring(1);
  // если не установлен язык, установить язык по умолчанию
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + "#en";
    location.reload();
  }
  selectLang.value = hash;
}

selectLang.addEventListener('change', changeURLLanguage);
changeLanguage();
export {hash as lang};