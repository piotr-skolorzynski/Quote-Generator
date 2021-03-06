const $loader = document.getElementById('loader');
let $apiQuotes = [];

//show loader
const showLoader = () => {
    $loader.hidden = false;
};

//hide loader
const hideLoader = () => {
    $loader.hidden = true;
};

//generate random index
const generateIndex = (min,max) => {
    const num = Math.floor(Math.random() * ((max - min + 1) + min));
    return num;
};

//choose random quote
const chooseQuote = () => {
    const randomIndex = generateIndex(0, ($apiQuotes.length - 1));
    const randomQuote = $apiQuotes[randomIndex];
    // console.log(randomQuote);
    // check if there is author. If not show unknown
    if (!randomQuote.author) {
        randomQuote.author = 'Unknown';
    }
    return randomQuote;
};

//create quote dynamically (just for exercise ;)
const createQuoteElements = (quoteApi, authorApi) => {
    const quoteWrapper = document.createElement('div');
    quoteWrapper.classList.add('quote-wrapper');
    quoteWrapper.setAttribute('id', 'quote-wrapper');
    
    const quoteText = document.createElement('div');
    quoteText.classList.add('quote-text');
    const quotationMark = document.createElement('span');
    quotationMark.classList.add('icon');
    quotationMark.classList.add('quote-mark');
    quoteText.appendChild(quotationMark);
    const quote = document.createElement('span');
    quote.setAttribute('id', 'quote');
    if (quoteApi.length > 120) {
        quote.classList.add('quote-long-text');
    } else {
       quote.classList.remove('quote-long-text'); 
    }
    quote.innerText = quoteApi;
    quoteText.appendChild(quote);

    const quoteAuthor = document.createElement('div');
    quoteAuthor.classList.add('quote-author');
    const author = document.createElement('span');
    author.setAttribute('id', 'author');
    author.innerText = authorApi;
    quoteAuthor.appendChild(author);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('button-container');
    const btnTwitter = document.createElement('button');
    btnTwitter.classList.add('twitter-btn');
    btnTwitter.classList.add('glass');
    btnTwitter.setAttribute('id', 'twitter-btn');
    btnTwitter.setAttribute('title', 'Tweet this');
    const twitterIcon = document.createElement('span');
    twitterIcon.classList.add('icon');
    twitterIcon.classList.add('twitter');
    btnTwitter.appendChild(twitterIcon);
    btnContainer.appendChild(btnTwitter);
    const btnNewQuote = document.createElement('button');
    btnNewQuote.classList.add('new-quote');
    btnNewQuote.classList.add('glass');
    btnNewQuote.setAttribute('id', 'new-quote');
    btnNewQuote.innerText = 'New Quote';
    btnContainer.appendChild(btnNewQuote);

    quoteWrapper.appendChild(quoteText);
    quoteWrapper.appendChild(quoteAuthor);
    quoteWrapper.appendChild(btnContainer);

    const body = document.querySelector('body');
    body.appendChild(quoteWrapper);
    hideLoader();
};

//show newQuote
const showNewQuote = () => {
    showLoader();
    const newQuote = chooseQuote();
    // console.log(newQuote);
    const quote = document.getElementById('quote');
    // console.log(quote);
    if (newQuote.text.length > 120) {
        quote.classList.add('quote-long-text');
    } else {
        quote.classList.remove('quote-long-text'); 
    }
    quote.innerText = newQuote.text;
    const author = document.getElementById('author');
    // console.log(author);
    author.innerText = newQuote.author;
    hideLoader();
};

//tweet quote
const tweetQuote = () => {
    const quote = document.getElementById('quote');
    const author = document.getElementById('author');
    // console.log(quote.innerText);
    // console.log(author.innerText);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.innerText} - ${author.innerText}`;
    window.open(twitterUrl, '_blank');
};

//get quotes from api and show random one
async function getQuotes() {
    showLoader();
    const url = "https://type.fit/api/quotes";
    try {
        const response = await fetch(url);
        $apiQuotes = await response.json();
        // console.log($apiQuotes);
        const newQuote = chooseQuote();
        // console.log(newQuote);
        createQuoteElements(newQuote.text, newQuote.author);
        const newQuoteBtn = document.getElementById('new-quote');
        newQuoteBtn.addEventListener('click', showNewQuote);
        const twitterBtn = document.getElementById('twitter-btn');
        twitterBtn.addEventListener('click', tweetQuote);
    } catch (err) {
        console.log(err);
    }
};

document.addEventListener('DOMContentLoaded', getQuotes);