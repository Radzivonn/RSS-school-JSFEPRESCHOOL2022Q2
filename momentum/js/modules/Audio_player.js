import playList from './playList.js';

// const play_list = document.querySelector('.play-list'); // <ul>
let audioTracksList = [];

/* show playlist */
playList.forEach(elem => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = elem.title
  // play_list.append(li);
  audioTracksList.push(li);
});

export const playButton = document.querySelector('.play'); // play/pause button
const audioName = document.querySelector('.audio-name');
const currentTimeElement = document.querySelector('.current-time');
const durationElement = document.querySelector('.duration');
const progressBar = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const volumeSlider = document.querySelector('.volume-slider');
const volumeButton = document.querySelector('.volume-logo'); // volume OFF/ON
let isPlay = false;
let playNum = 0; // number of audio track


const audio = new Audio();
durationElement.textContent = playList[playNum].duration;
audio.src = playList[playNum].src;
audioName.textContent = playList[playNum].title;
audio.currentTime = 0;
audio.volume = volumeSlider.valueAsNumber;

export const playAudio = () => {
  durationElement.textContent = playList[playNum].duration;
  audioName.textContent = playList[playNum].title;
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  playButton.classList.add('pause');
}

export const togglePlayPause = () => {
	if(isPlay) {
		audio.pause();
		isPlay = false;
    playButton.classList.remove('pause');
	} else {
		audio.play();
		isPlay = true;
    playButton.classList.add('pause');
	}
}

export const playPrevAudio = () => {
  playNum - 1 < 0 ? playNum = playList.length - 1 : playNum -= 1;
  playAudio();
} 

export const playNextAudio = () => {
  playNum + 1 > playList.length - 1 ? playNum = 0 : playNum += 1;
  playAudio();
}

const updateProgress = (e) => {
  const {duration, currentTime} = e.srcElement;
  progressBar.style.width = `${(currentTime / duration) * 100}%`;
  const minutes = Math.floor(currentTime / 60);
  if(Math.round(currentTime - minutes * 60) > 59) audio.currentTime = Math.round(currentTime - minutes * 60); // что-бы не отображалось 60 секунд
  if(Math.round(currentTime - minutes * 60) < 10) currentTimeElement.textContent = `0${Math.round(minutes)}:0${Math.round(currentTime - minutes * 60)}`;
  else currentTimeElement.textContent = `0${Math.round(minutes)}:${Math.round(currentTime - minutes * 60)}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

const changeVolume = () => audio.volume = volumeSlider.valueAsNumber;

const toggleVolume = () => audio.volume > 0 ? audio.volume = 0 : audio.volume = volumeSlider.valueAsNumber;

audio.addEventListener('ended', playNextAudio);
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', changeVolume);
volumeButton.addEventListener('click', toggleVolume)