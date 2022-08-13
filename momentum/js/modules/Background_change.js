import {getTimeOfDay} from './Date_and_greeting.js';
import {getRandomNum, MAX, MIN} from './General_module.js';

const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let timeOfDay = getTimeOfDay(false);
let bgNum;
let pageLoaded = false;
let url = ``;
let imagesListFromFlickrAPI = [];
let imagesListLen = 0;

let BGphotoSource = 'GitHub';


async function getLinkByUnsplashAPI() {
  const res = await fetch(`https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=K_JQbbDUaSngxKk6lGvvkJaowbRwXZgCK98WCmjBPjM`);
  const data = await res.json();
  return data.urls.regular;
}


async function getLinkByFlickrAPI() {
  const res = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9890e6668e76db4fc54684a689e616f4&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`);
  let data = await res.json();
  return data.photos.photo;
}

getLinkByFlickrAPI().then(data => {
	imagesListFromFlickrAPI = data;// достаём список фото из ассинхронной функции
	imagesListLen = imagesListFromFlickrAPI.length;
	setBg();
});


export default function setBg() {;
	if(!pageLoaded){
		bgNum = getRandomNum(MIN, MAX);
		pageLoaded = true;
	}
	bgNum < 10 ? bgNum = String(String(bgNum).padStart(2, '0')) : bgNum = String(bgNum);
	timeOfDay = getTimeOfDay(false);
	getLinkBySource(BGphotoSource); // get Photo url by source
	const img = new Image();
	img.src = url;
  img.onload = () => {
    body.style.backgroundImage = `url(${url})`;
  };
}

const getLinkBySource = (Source) => {
	if (Source === 'GitHub') url = `https://raw.githubusercontent.com/Radzivonn/stage1-tasks-images/assets/images/${timeOfDay}/${bgNum}.jpg`;
	else if (Source === 'Unsplash API') getLinkByUnsplashAPI().then(data => url = data); // достаём data из ассинхронной функции;
	else if (Source === 'Flickr API') url = imagesListFromFlickrAPI[Math.floor(Math.random() * (Math.floor(imagesListLen) - Math.ceil(0) + 1)) + Math.ceil(0)].url_l;
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

if (BGphotoSource !== 'Flickr API') setBg();