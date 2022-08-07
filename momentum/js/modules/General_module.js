const MAX = 20, MIN = 1; // диапазон рандомных чисел для смены фона 
const city = document.querySelector('.city');

const getRandomNum = (MIN, MAX) => Math.floor(Math.random() * (Math.floor(MAX) - Math.ceil(MIN) + 1)) + Math.ceil(MIN);

export {MAX, MIN, city, getRandomNum};