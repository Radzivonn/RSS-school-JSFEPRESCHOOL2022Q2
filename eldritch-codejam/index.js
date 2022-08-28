import ancientsData from "./ancients.js";
import greenCardsPathes from './assets/MythicCards/green/index.js';
import blueCardsPathes from './assets/MythicCards/blue/index.js';
import brownCardsPathes from './assets/MythicCards/brown/index.js';

const ancientCards = document.querySelectorAll('.ancient__card');
const dificultyButtons = document.querySelectorAll('.dificulty__button');
const mythicCardDisplay = document.querySelector('#mythicCard');
const mythicCardBackground = document.querySelector('#mythicCardBackground');
const shuffleButton = document.querySelector('.shuffle__button');

let difficulty = 'normal'; // сложнось по умолчанию
dificultyButtons[1].style.color = 'red';
dificultyButtons[1].style.border = 'solid 2px red';

const stages = ["firstStage", "secondStage", "thirdStage"];
const cardTypes = ["greenCards", "blueCards", "brownCards"];

let AllCards = [];
AllCards.push(greenCardsPathes);
AllCards.push(blueCardsPathes);
AllCards.push(brownCardsPathes);

let selectedAncient = {};
let stagesDecks = [];
let Deck = [], greenDeck = [], blueDeck = [], brownDeck = [];
let greenCardSum = 0, blueCardSum = 0, brownCardSum = 0;
let stageCounter = 0, cardsCounter = 0;

let stagesCounterTitles = []

for (let i = 1; i < 4; i++)	stagesCounterTitles.push(document.querySelector(`.deckTracker li p.stage${i}`));

let CardSums = [
	{
		"color": "green",
		"sum": greenCardSum,
	},
	{
		"color": "blue",
		"sum": blueCardSum,
	},
	{
		"color": "brown",
		"sum": brownCardSum,
	},
];


const zeroing = () => {
	selectedAncient = {};
	stagesDecks = [];
	stageCounter = 0, cardsCounter = 0;
	Deck = [], greenDeck = [], blueDeck = [], brownDeck = [];
	greenCardSum = 0, blueCardSum = 0, brownCardSum = 0;
	CardSums[0].sum = greenCardSum;
	CardSums[1].sum = blueCardSum;
	CardSums[2].sum = brownCardSum;
	AllCards = [];
	AllCards.push(greenCardsPathes);
	AllCards.push(blueCardsPathes);
	AllCards.push(brownCardsPathes);
	stagesCounterTitles.forEach(elem => elem.style.color = 'white');
}


const CardsSetFormation = () => {
	for (let i = 0; i < 3; i++) {
		if (difficulty === 'easy') AllCards[i] = AllCards[i].filter((item) => !item.includes('Tentacles'));
		else if (difficulty === 'hard') AllCards[i] = AllCards[i].filter((item) => !item.includes('SF'));
	}
}

const CardsSum = () => {
	greenCardSum +=
		selectedAncient.firstStage.greenCards +
		selectedAncient.secondStage.greenCards +
		selectedAncient.thirdStage.greenCards;
	blueCardSum +=
		selectedAncient.firstStage.blueCards +
		selectedAncient.secondStage.blueCards +
		selectedAncient.thirdStage.blueCards;
	brownCardSum +=
		selectedAncient.firstStage.brownCards +
		selectedAncient.secondStage.brownCards +
		selectedAncient.thirdStage.brownCards;
	CardSums[0].sum = greenCardSum;
	CardSums[1].sum = blueCardSum;
	CardSums[2].sum = brownCardSum;
}


const cardsCounterInit = () => {
	document.querySelector(`.stage1 #green`).textContent = selectedAncient.firstStage.greenCards;
	document.querySelector(`.stage1 #brown`).textContent = selectedAncient.firstStage.brownCards;
	document.querySelector(`.stage1 #blue`).textContent = selectedAncient.firstStage.blueCards;

	document.querySelector(`.stage2 #green`).textContent = selectedAncient.secondStage.greenCards;
	document.querySelector(`.stage2 #brown`).textContent = selectedAncient.secondStage.brownCards;
	document.querySelector(`.stage2 #blue`).textContent = selectedAncient.secondStage.blueCards;

	document.querySelector(`.stage3 #green`).textContent = selectedAncient.thirdStage.greenCards;
	document.querySelector(`.stage3 #brown`).textContent = selectedAncient.thirdStage.brownCards;
	document.querySelector(`.stage3 #blue`).textContent = selectedAncient.thirdStage.blueCards;
}

const ColorDecksBuilder = () => {
	for (let i = 0; i < 3; i++) {
		while (true) {
			if (CardSums[i].color === 'green') {
				let randomImg = AllCards[0][Math.floor(Math.random() * (Math.floor(AllCards[0].length - 1) - Math.ceil(0) + 1)) + Math.ceil(0)];
				if (greenDeck.indexOf(randomImg) === -1) greenDeck.push(randomImg);
			}
			else if (CardSums[i].color === 'blue') {
				let randomImg = AllCards[1][Math.floor(Math.random() * (Math.floor(AllCards[1].length - 1) - Math.ceil(0) + 1)) + Math.ceil(0)];
				if (blueDeck.indexOf(randomImg) === -1) blueDeck.push(randomImg);
			}
			else if (CardSums[i].color === 'brown') {
				let randomImg = AllCards[2][Math.floor(Math.random() * (Math.floor(AllCards[2].length - 1) - Math.ceil(0) + 1)) + Math.ceil(0)];
				if (brownDeck.indexOf(randomImg) === -1) brownDeck.push(randomImg);
			}
			if ((greenDeck.length === CardSums[0].sum && i === 0) || (blueDeck.length === CardSums[1].sum && i === 1) || (brownDeck.length === CardSums[2].sum && i === 2)) break;
		}
	}
	Deck.push(greenDeck);
	Deck.push(blueDeck);
	Deck.push(brownDeck);
}

const StageDecksBuilder = () => {
	for (let stage in stages) {
		let stageDeck = [];
		for (let type in cardTypes) {
			for (let i = 0; i < selectedAncient[stages[stage]][cardTypes[type]]; i++) {
				let randomIndex = Math.floor(Math.random() * (Math.floor(Deck[type].length - 1) - Math.ceil(0) + 1)) + Math.ceil(0);
				stageDeck.push(Deck[type][randomIndex]);
				Deck[type].splice(randomIndex, 1);
			}
		}
		stagesDecks.push(stageDeck);
	}
}

const showDeck = () => {
	stagesCounterTitles.forEach(elem => elem.style.color = 'white');
	stagesCounterTitles[stageCounter].style.color = 'red';

	if (stageCounter < 3 && stagesDecks[stageCounter].length === 0) stageCounter++;

	if (stageCounter < 3) {
		const randomPath = Math.floor(Math.random() * (Math.floor(stagesDecks[stageCounter].length - 1) - Math.ceil(0) + 1)) + Math.ceil(0);
		const imgPath = stagesDecks[stageCounter][randomPath];
		stagesDecks[stageCounter].splice(randomPath, 1);

		let color;
		if (imgPath.includes('green')) color = 'green';
		else if (imgPath.includes('blue')) color = 'blue';
		else if (imgPath.includes('brown')) color = 'brown';

		document.querySelector(`.stage${stageCounter + 1} #${color}`).textContent = document.querySelector(`.stage${stageCounter + 1} #${color}`).textContent - 1;
		cardsCounter -= 1;

		mythicCardDisplay.src = `./assets/MythicCards/${color}/${imgPath}`;
	}
	else {
		mythicCardBackground.removeEventListener('click', showDeck);
		zeroing();
	}
}

const shuffle = () => {
	let stages = [];
	stages.push(selectedAncient.firstStage);
	stages.push(selectedAncient.secondStage);
	stages.push(selectedAncient.thirdStage);

	cardsCounterInit();
	CardsSetFormation();
	CardsSum();
	ColorDecksBuilder();
	CardsSetFormation()
	StageDecksBuilder();
	mythicCardBackground.addEventListener('click', showDeck, false);
}


ancientCards.forEach(card => card.addEventListener('click', elem => {
	ancientCards.forEach(ancientCard => ancientCard.style.outline = '0px');
	card.style.outline = 'solid 2px red';

	selectedAncient = ancientsData[elem.target.id];
}));

dificultyButtons.forEach(button => button.addEventListener('click', elem => {
	difficulty = elem.target.id;
	dificultyButtons.forEach(button => {
		button.style.color = 'rgb(190, 0, 0)';
		button.style.border = 'solid 2px rgb(190, 0, 0)';
	});
	elem.target.style.color = 'red';
	elem.target.style.border = 'solid 2px red';
}));

shuffleButton.addEventListener('click', shuffle);
