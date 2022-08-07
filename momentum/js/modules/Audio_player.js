import playList from './playList.js';

const play_list = document.querySelector('.play-list'); // <ul>
let audioTracksList = [];

/* show playlist */
playList.forEach(elem => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = elem.title
  play_list.append(li);
  audioTracksList.push(li);
});

export const playButton = document.querySelector('.play'); // play/pause button
let isPlay = false;
let playNum = 0; // number of audio track

const audio = new Audio();
audio.src = playList[playNum].src;
audio.currentTime = 0;

export const playAudio = () => {
  for(let index in audioTracksList) {
    if(index === playNum) audioTracksList[index].style.color = '#A7994F';
    else audioTracksList[index].style.color = 'white';
  }
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