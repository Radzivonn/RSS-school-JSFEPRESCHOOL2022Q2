window.onload = init(); // при полной загрузке окна вызвать функцию инициализации

/*------------------открытие и закрытие меню------------------*/
if(icon_menu) OnMenuClick(icon_menu);
if(cross) OnMenuClick(cross);
/*------------------открытие и закрытие меню------------------*/

/*------------------плавная прокрутка по якорям------------------*/
const menu_links = document.querySelectorAll('.nav_link[data-goto]');
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
      if(order != 1 && slide_num != order + 1) slide_num = order + 1; // order - на который кликнули, slide_num - был нажат последним
      else slide_num = 2;
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