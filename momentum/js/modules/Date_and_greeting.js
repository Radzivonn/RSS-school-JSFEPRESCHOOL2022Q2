const time = document.querySelector('.time');
const currentDate = document.querySelector('.date');
const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const greetingText = document.querySelector('.greeting');

export function getTimeOfDay() {
	let date = new Date();
	const TimesOfDay = ['night', 'morning', 'afternoon', 'evening'];
	return TimesOfDay[Math.floor(date.getHours() / 6)];
}

const showGreeting = () => greetingText.textContent = `Good ${getTimeOfDay()}`;

export function showTime() {
	let date = new Date(); // Data object
	time.textContent = date.toLocaleTimeString(); // time
	currentDate.textContent = WeekDays[date.getDay()] + ', ' + Months[date.getMonth()] + ' ' + date.getDate(); // current date
	showGreeting();
	setTimeout(showTime, 1000);
}