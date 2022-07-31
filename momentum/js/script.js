const time = document.querySelector('.time');
const currentDate = document.querySelector('.date');
const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const greetingText = document.querySelector('.greeting');
let UserName = document.querySelector('.name');


function getTimeOfDay() {
	let date = new Date();
	const TimesOfDay = ['night', 'morning', 'afternoon', 'evening'];
	hours = date.getHours();
	return TimesOfDay[Math.floor(hours / 6)];
}

const showGreeting = () => greetingText.textContent = `Good ${getTimeOfDay()}`;

function showTime() {
	let date = new Date(); // Data object
	time.textContent = date.toLocaleTimeString(); // time
	currentDate.textContent = WeekDays[date.getDay()] + ', ' + Months[date.getMonth()] + ' ' + date.getDate(); // current date
	showGreeting();
	setTimeout(showTime, 1000);
}

showTime();


const setLocalStorage = () => localStorage.setItem('name', UserName.value);

const getLocalStorage = () => { if(localStorage.getItem('name')) UserName.value = localStorage.getItem('name') }

window.addEventListener('beforeunload', setLocalStorage) // сохранить имя пользователя в local storage перед перезагрузкой или закрытием страницы

window.addEventListener('load', getLocalStorage) // загрузить имя пользователя из local storage при загрузке страницы
