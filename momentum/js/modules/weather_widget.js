import {city} from './General_module.js';
import {lang}  from "./ChangeLanguage.js";
import translationsArr from "./lang.js";

const APPID = 'cf41f54b6e7b8c8b88e892a0f3f39fb3';
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const weatherElements = [weatherIcon, temperature, wind, humidity, weatherDescription];

export default async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=${APPID}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.message === 'city not found') {
    weatherError.style.display = 'block';
    weatherError.textContent = translationsArr["Weather"]["weatherError"][lang];
    weatherElements.forEach(weatherElement => weatherElement.style.display = 'none');
  }
  else {
    weatherError.style.display = 'none';
    weatherElements.forEach(weatherElement => weatherElement.style.display = 'block');
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    wind.textContent = `${translationsArr["Weather"]["windSpeed"][lang]} ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `${translationsArr["Weather"]["Humidity"][lang]} ${data.main.humidity}%`;
    weatherDescription.textContent = data.weather[0].description;
  }
}

city.addEventListener('change', () => getWeather()); // отобразить погоду если поменялся город