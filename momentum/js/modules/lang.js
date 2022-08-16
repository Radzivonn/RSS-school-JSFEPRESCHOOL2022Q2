import {city} from './General_module.js';

const translationsArr = {

  "WeekDays": {      
    "en": ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    "ru": ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  }, 

  "Months": {
    "en": ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    "ru": ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  },

  "TimesOfDay": {
    "en": ['Good night', 'Good morning', 'Good afternoon', 'Good evening'],
    "ru": ['Cпокойной ночи ', 'Доброе утро', 'Добрый день', 'Добрый вечер'],
  },

  "Weather": {
    "weatherError": {
      "en": `Error! city not found for ${city.value}!`,
      "ru": `Ошибка! Город ${city.value} не найден!`,
    },

    "windSpeed": {
      "en": "Wind speed:",
      "ru": "Скорость ветра:"
    },

    "Humidity": {
      "en": "Humidity:",
      "ru": "Влажность",
    }
  },

  "URLlang": {
    "en": "en",
    "ru": "ru",
  }

}

export default translationsArr;