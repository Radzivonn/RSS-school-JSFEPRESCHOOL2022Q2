import {getRandomNum} from './General_module.js';
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
let quotesJSON;

export const getQuotes = async () => { 
  const quotes = './js/quotes&authors.json';
  const res = await fetch(quotes);
  const data = await res.json();
	return data;
}

export const getRandomQuote = () => {
	let index = getRandomNum(0, quotesJSON.length - 1);
	const RandomQuote = quotesJSON[index];
	quote.textContent = RandomQuote.quote;
	author.textContent = RandomQuote.author;
}

getQuotes().then((data) => {
	quotesJSON = data; // достаём data из ассинхронной функции
	getRandomQuote();
});