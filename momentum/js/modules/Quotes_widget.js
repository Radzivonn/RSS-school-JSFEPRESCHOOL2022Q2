import {getRandomNum} from './General_module.js';
import {lang}  from "./ChangeLanguage.js";

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuoteButton = document.querySelector('.change-quote');
let quotesJSON;

const getQuotes = async () => { 
  const quotes = `./js/quotes&authors${lang.toUpperCase()}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
	return data;
}

const getRandomQuote = () => {
	let index = getRandomNum(0, quotesJSON.length - 1);
	const RandomQuote = quotesJSON[index];
	quote.textContent = RandomQuote.quote;
	author.textContent = RandomQuote.author;
}

getQuotes().then((data) => {
	quotesJSON = data; // достаём data из ассинхронной функции
	getRandomQuote();
});

changeQuoteButton.addEventListener('click', getRandomQuote); // отобразить новую рандомную цитату по клику