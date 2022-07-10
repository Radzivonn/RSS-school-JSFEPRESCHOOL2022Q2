const icon_menu = document.querySelector('.menu__icon');
const navigation = document.querySelector('#navigation');
const cross = document.querySelector('.close_window_cross');
let Close_menu_flag = false;

function Open_close_menu() {
  document.body.classList.toggle('_lock');
  navigation.classList.toggle('_active');
}

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
    // if (menuLink.dataset.goto === '#account_anchor'){
    //   Open_close_menu();
    // }
  }
}
/*------------------плавная прокрутка по якорям------------------*/






// console.log(menuLink.dataset.goto);

//     if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
//       const gotoBlock = document.querySelector(menuLink.dataset.goto);
//       const gotoBlockValue = gotoBlock.getBoundingClientRect().
//     }


// <!-- <img class="close_window_cross" src="./images/social_media/window-close-line.svg" alt="window-close-line"></img> -->
  // const cross = document.querySelector('.close_window_cross');
  // console.log(cross);

  // if (cross) {
  //   cross.addEventListener("click", function (e) {
  //     var nav = document.getElementById('navigation');
  //     nav.classList.remove("_active");
  //   })
// icon_menu.classList.toggle('_active');
// cross.style="display: block";
