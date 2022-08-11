import {getTimeOfDay} from './Date_and_greeting.js';
import {getRandomNum, MAX, MIN} from './General_module.js';

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let bgNum;
let pageLoaded = false;

export default function setBg() {;
	if(!pageLoaded){
		bgNum = getRandomNum(MIN, MAX);
		pageLoaded = true;
	}
	bgNum < 10 ? bgNum = String(String(bgNum).padStart(2, '0')) : bgNum = String(bgNum);
	let timeOfDay = getTimeOfDay(false);
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

slidePrev.addEventListener('click', getSlidePrev);
slideNext.addEventListener('click', getSlideNext);