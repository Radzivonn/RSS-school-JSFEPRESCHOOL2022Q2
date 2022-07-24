window.onload = init(); // при полной загрузке окна вызвать функцию инициализации

/*------------------открытие и закрытие меню------------------*/
if(icon_menu) OnMenuClick(icon_menu);
if(cross) OnMenuClick(cross);
/*------------------открытие и закрытие меню------------------*/

/*------------------плавная прокрутка по якорям------------------*/
const menu_links = document.querySelectorAll('.nav_link[data-goto]');
let account_button;
if (menu_links.length > 0) {
  menu_links.forEach(menu_link => {
    menu_link.addEventListener('click', OnMenuLinkClick);
  });
}
/*------------------плавная прокрутка по якорям------------------*/

/*------------------код слайдера в секции destinations------------------*/
slides.forEach(slide => {
  slide.addEventListener('click', function(e) {
    if(window.screen.width > 390) {
      const order = parseInt(window.getComputedStyle(e.currentTarget).order);
      order != 1 && slide_num != order + 1 ? slide_num = order + 1 : slide_num = 2; // order - на который кликнули, slide_num - был нажат последним
      slider_click(true);
    }
  });
});

let click_element = document.querySelectorAll('.destination_photo_arrow');
click_element.forEach(element => {
  element.addEventListener('click', function(el) {
    if(window.screen.width <= 390) {
      let slide_width = parseInt(window.getComputedStyle(document.querySelector('.destination_photo')).width);
      if(el.currentTarget.classList.contains('left_arrow')) slide_num = slide_num - 1; 
      else if(el.currentTarget.classList.contains('right_arrow')) slide_num = slide_num + 1;
      slider_click(false, slide_width);
    }
  });
});
/*------------------код слайдера в секции destinations------------------*/

/*------------------------------код popup------------------------------*/
if(popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function(e) {
      if(popupLink.getAttribute('id') === 'login_button' || popupFlagON) {
        popupFlagON = false;
        popupOpen(document.querySelector('.popup'));
      } else {
        popupChange(document.querySelector('.popup__content'));
        e.preventDefault(); // запрет перезагрузки страницы для ссылки
      }
      popupInputs.forEach(popupInput => popupInput.value = '');
    })
  }
}
/*------------------------------код popup------------------------------*/