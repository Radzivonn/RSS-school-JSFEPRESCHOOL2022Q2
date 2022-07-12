const icon_menu = document.querySelector('.menu__icon');
const navigation = document.querySelector('#navigation');
const cross = document.querySelector('.close_window_cross');
const circles_slider =  document.getElementById('scroll_circles');
const destinations_container = document.getElementById('destinations_container');
const screenWidth = window.screen.width;
let Close_menu_flag = false;

/* переменная для хранения предыдущей ширины экрана */
var last_screenWidth;


/* number_ON переменная для хранения номера активного круга в слайдере */
function switch_slider(number_ON) {
  const svg_circles = document.querySelectorAll('.svg_circle');
  const circles = document.querySelectorAll('.scroll_circle');
  if (circles.length > 0) {
    for (let i = 0; i < svg_circles.length; i++) {
      var order = window.getComputedStyle(svg_circles[i]).order;
      order = Number(order);
      if (order === number_ON - 1) { circles[i].style="fill: #F2785C" }
      else { circles[i].style="fill: rgba(242, 120, 92, 0.5)" }
    }
  }
}

function window_resize() {
  const screenWidth = window.screen.width;
  if(last_screenWidth <= 390 && screenWidth > 390) {
    destinations_container.after(circles_slider);
    switch_slider(2);
  }
  else if (screenWidth <= 390 && last_screenWidth > 390) {
    destinations_container.append(circles_slider);
    switch_slider(1);
    const scroll_circles = document.querySelector('#scroll_circles');
    scroll_circles.style="bottom: 12px";
  }
  last_screenWidth = screenWidth;
}

function Open_close_menu() {
  document.body.classList.toggle('_lock');
  navigation.classList.toggle('_active');
}


window_resize();
if (screenWidth > 390) switch_slider(2);
else {
  switch_slider(1);
  scroll_circles.style="bottom: -32px";
}


window.addEventListener('resize', function(e){
  window_resize();
});


/*------------------открытие и закрытие меню------------------*/
if (icon_menu) {
  icon_menu.addEventListener("click", function (e) {
    Open_close_menu();
  });

  if (cross) {
    cross.addEventListener("click", function (e) {
      Open_close_menu();
    });
  }
}
/*------------------открытие и закрытие меню------------------*/


/*------------------плавная прокрутка по якорям------------------*/
const menu_links = document.querySelectorAll('.nav_link[data-goto]');

if (menu_links.length > 0) {
  menu_links.forEach(menu_link => {
    menu_link.addEventListener('click', OnMenuLinkClick);
  });

  function OnMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}
/*------------------плавная прокрутка по якорям------------------*/