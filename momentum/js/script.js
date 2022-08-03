const body = document.querySelector('body');
const time = document.querySelector('.time');
const currentDate = document.querySelector('.date');
const WeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const greetingText = document.querySelector('.greeting');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

const city = document.querySelector('.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const weatherElements = [weatherIcon, temperature, wind, humidity, weatherDescription];

let UserName = document.querySelector('.name');

const MAX = 20, MIN = 1; // диапазон рандомных чисел для смены фона 
const APPID = 'cf41f54b6e7b8c8b88e892a0f3f39fb3';
let bgNum;


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

const getRandomBgNum = () => bgNum = Math.floor(Math.random() * (Math.floor(MAX) - Math.ceil(MIN) + 1)) + Math.ceil(MIN);

const setBg = () => {
	let timeOfDay = getTimeOfDay();
	bgNum < 10 ? bgNum = String(String(bgNum).padStart(2, '0')) : bgNum = String(bgNum);
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`;
  };
}

const getSlidePrev = () => {
	bgNum = parseInt(bgNum, 10);
	bgNum - 1 < 1 ? bgNum = MAX : bgNum -= 1;
	setBg();
}

const getSlideNext = () => {
	bgNum = parseInt(bgNum, 10);
	bgNum + 1 > 20 ? bgNum = MIN : bgNum += 1;
	setBg();
}

async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=${APPID}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
	if(data.message === 'city not found'){
		weatherError.style.display = 'block';
		weatherError.textContent = `Error! city not found for ${city.value}!`;
		weatherElements.forEach(weatherElement => weatherElement.style.display = 'none');
	}
	else{
		weatherError.style.display = 'none';
		weatherElements.forEach(weatherElement => weatherElement.style.display = 'block');
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		temperature.textContent = `${Math.round(data.main.temp)}°C`;
		wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
		humidity.textContent = `Humidity: ${data.main.humidity}%`;
		weatherDescription.textContent = data.weather[0].description;
	}
}

getWeather();

showTime();
getRandomBgNum();
setBg();


const setLocalStorage = () => localStorage.setItem('name', UserName.value);

const getLocalStorage = () => { if(localStorage.getItem('name')) UserName.value = localStorage.getItem('name') }

window.addEventListener('beforeunload', setLocalStorage); // сохранить имя пользователя в local storage перед перезагрузкой или закрытием страницы

window.addEventListener('load', getLocalStorage); // загрузить имя пользователя из local storage при загрузке страницы

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);

city.addEventListener('change', () => getWeather());