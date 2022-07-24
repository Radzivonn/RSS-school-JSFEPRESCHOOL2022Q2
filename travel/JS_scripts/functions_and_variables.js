/*------------------------------------variables------------------------------------*/
let last_screenWidth; // переменная для хранения предыдущей ширины экрана

const icon_menu = document.querySelector('.menu__icon');
const navigation = document.querySelector('#navigation');
const cross = document.querySelector('.close_window_cross');

const circles = document.querySelectorAll('.scroll_circle');
const slider = document.querySelector('#destinations_container');
let slide_num = 2; // номер слайда начиная с 1
let offset = 0; //смещение для слайдера от левого края
let slides = document.querySelectorAll('div.destination_photo');

const popupLinks = document.querySelectorAll('.popup-link');
const popupInputs = document.querySelectorAll('.popup__input');
const popupButton =  document.querySelector('input.popup__button');
const body = document.querySelector('body');
let popupFlagON = false;

/*------------------------------------variables------------------------------------*/

/*------------------------------------Functions------------------------------------*/
function toggleMenu() {
  body.classList.toggle('_lock');
  navigation.classList.toggle('_active');
}

const OnMenuClick = obj => obj.addEventListener("click", toggleMenu);

function OnMenuLinkClick(e) {
  const menuLink = e.target;
  if(menuLink.dataset.goto === '#account_anchor') popupFlagON = true; // показать popup
  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY
    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth"
    });
    e.preventDefault();
  }
  if(window.screen.width <= 390) toggleMenu();
}

function change_stories_text(text_number) {
  let paragraph = document.querySelectorAll('.story_description');
  for(let i = 0; i < paragraph.length; i++){
    // 0 - разрешение 390 и меньше
    if (text_number === 0) paragraph[i].textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.Lorem ipsum dolor sit a... Read More';
    else paragraph[i].textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit... Read More ';
  }
}

/* number_ON переменная для хранения номера активного круга в слайдере */
const switch_slider_circles = (number_ON, circles) => { for (let i = 0; i < circles.length; i++) i === number_ON - 1 ? circles[i].style="fill: #F2785C" : circles[i].style="fill: rgba(242, 120, 92, 0.5)" }

function switch_slider_arrows(left_arrow, right_arrow) {
  if(left_arrow && right_arrow) document.querySelectorAll('.destination_photo_arrow').style="opacity: 1";
  else if(left_arrow && !right_arrow) document.querySelector('.right_arrow').style="opacity: 0.5";
  else if(!left_arrow && right_arrow) document.querySelector('.left_arrow').style="opacity: 0.5";
}

function slider_switch(offset, slide_num) {
  let slide_width = parseInt(window.getComputedStyle(document.querySelector('.destination_photo')).width);
  switch(slide_num) {
    case 1: 
      switch_slider_arrows(false, true);
      return offset + slide_width + 30;
      break;
    case 2:
        switch_slider_arrows(true, true);
        return 0;
        break;
    case 3:
      switch_slider_arrows(true, false);
      return offset - slide_width - 30;
      break;
  }
}

function slider_click(big_resolution_On, slide_width) {
  slide_num > 3 ? slide_num = 1 : slide_num < 1 ? slide_num = 3 : slide_num;
  big_resolution_On ? offset = slider_switch(offset, slide_num) : offset = -(slide_num - 1) * (slide_width + 30);
  switch_slider_circles(slide_num, circles);
  slider.style.left = String(offset) + 'px';
}

function popupOpen(curentPopup) {
  if(curentPopup) {
    curentPopup.classList.add('open');
    body.classList.add('_lock'); // убрать скролл сайта когда отображается popup окно
    curentPopup.addEventListener('click', function(e) {
      if(!e.target.closest('.popup__content')) {
        curentPopup.classList.remove('open');
        body.classList.remove('_lock'); // вернуть скролл сайта когда отображается popup окно
        if (document.querySelector('.popup__content').classList.contains('popup2')) popupChange(document.querySelector('.popup__content'));
      }
    });
  }
}

function popupChange(curentPopup) {
  if(curentPopup) {
    const popupChangeLinks = document.querySelectorAll('#popup2');
    curentPopup.classList.toggle('popup2'); 
    if(curentPopup.classList.contains('popup2')) {
      popupChangeLinks[0].style.display = 'none';
      popupChangeLinks[1].style.display = 'block';
      popupButton.value = 'Sign Up';
      document.querySelector('.popup__title').innerHTML = 'Create account';
      document.querySelector('.popup__buttons').style.display = 'none';
      document.querySelector('#or').style.display = 'none';
      document.querySelector('#forgot_your_password').style.display = 'none';
    } else {
      popupChangeLinks[1].style.display = 'none';
      popupChangeLinks[0].style.display = 'block';
      popupButton.value = 'Sign In';
      document.querySelector('.popup__title').innerHTML = 'Log in to your account';
      document.querySelector('.popup__buttons').style.display = 'flex';
      document.querySelector('#or').style.display = 'block';
      document.querySelector('#forgot_your_password').style.display = 'block';
    }
  }
}

function window_resize() {
  const screenWidth = window.screen.width;
  if((last_screenWidth <= 390 && screenWidth > 390) || (screenWidth <= 390 && last_screenWidth > 390)) slider.style.left = String(offset = 0) + 'px'; // при переходе разрешения экрана через 390px в большую и меньшую сторону
  if(last_screenWidth <= 390 && screenWidth > 390) {
    slide_num = 2;
    change_stories_text(1);
  } else if (screenWidth <= 390 && last_screenWidth > 390) {
    slide_num = 1;
    slider.style.left = String(offset) + 'px';
    change_stories_text(0);
    switch_slider_arrows(true, true);
  }
  switch_slider_circles(slide_num, circles);
  last_screenWidth = screenWidth;
}

/*-----------------------функция вызываемая при загрузке окна-----------------------*/
function init() {
  window.addEventListener('resize', function(e){ window_resize() });
  if (window.screen.width <= 390) { 
    slide_num = 1;
    change_stories_text(0);
  } else change_stories_text(1);
  switch_slider_circles(slide_num, circles);
}
/*-----------------------функция вызываемая при загрузке окна-----------------------*/

/*------------------------------------Functions------------------------------------*/