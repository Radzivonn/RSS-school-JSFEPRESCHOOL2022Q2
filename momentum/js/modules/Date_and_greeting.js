import translationsArr from "./lang.js";
import {lang}  from "./ChangeLanguage.js";

const time = document.querySelector('.time');
const currentDate = document.querySelector('.date');
const WeekDays = translationsArr["WeekDays"][lang];
const Months = translationsArr["Months"][lang];
const greetingText = document.querySelector('.greeting');

export function getTimeOfDay(isShowGreetingRequest) {
	let date = new Date();
	let TimesOfDay = ['Good night', 'Good morning', 'Good afternoon', 'Good evening'];
	/* если запрос от функции showGreeting, переводим на один из языков */
	if(isShowGreetingRequest){
		TimesOfDay = translationsArr["TimesOfDay"][lang]; 
		return TimesOfDay[Math.floor(date.getHours() / 6)];
	}
	return TimesOfDay[Math.floor(date.getHours() / 6)].substring(5);
}

const showGreeting = () => greetingText.textContent = `${getTimeOfDay(true)}`;

export function showTime() {
	let date = new Date(); // Data object
	time.textContent = date.toLocaleTimeString(); // time
	currentDate.textContent = WeekDays[date.getDay()] + ', ' + Months[date.getMonth()] + ' ' + date.getDate(); // current date
	showGreeting();
	setTimeout(showTime, 1000);
}