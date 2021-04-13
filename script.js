let $apiQuotes = [];

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
    return randomQuote;
};

//create quote
const createQuoteElements = (quoteApi, authorApi) => {
    const quoteWrapper = document.createElement('div');
    quoteWrapper.classList.add('quote-wrapper');
    quoteWrapper.setAttribute('id', 'quote-wrapper');

    const quoteText = document.createElement('div');
    quoteText.classList.add('quote-text');
    const quotationMark = document.createElement('i');
    quotationMark.classList.add('fas');
    quotationMark.classList.add('fa-quote-left');
    quoteText.appendChild(quotationMark);
    const quote = document.createElement('span');
    quote.setAttribute('id', 'quote');
    quote.innerHTML = quoteApi;
    quoteText.appendChild(quote);

    const quoteAuthor = document.createElement('div');
    quoteAuthor.classList.add('quote-author');
    const author = document.createElement('span');
    author.setAttribute('id', 'author');
    author.innerHTML = authorApi;
    quoteAuthor.appendChild(author);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('button-container');
    const btnTwitter = document.createElement('button');
    btnTwitter.classList.add('twitter-btn');
    btnTwitter.setAttribute('id', 'twitter-btn');
    btnTwitter.setAttribute('title', 'Tweet this');
    const twitterIcon = document.createElement('i');
    twitterIcon.classList.add('fab');
    twitterIcon.classList.add('fa-twitter');
    btnTwitter.appendChild(twitterIcon);
    btnContainer.appendChild(btnTwitter);
    const btnNewQuote = document.createElement('button');
    btnNewQuote.classList.add('new-quote');
    btnNewQuote.setAttribute('id', 'new-quote');
    btnNewQuote.innerHTML = 'New Quote';
    btnContainer.appendChild(btnNewQuote);

    quoteWrapper.appendChild(quoteText);
    quoteWrapper.appendChild(quoteAuthor);
    quoteWrapper.appendChild(btnContainer);

    const body = document.querySelector('body');
    body.appendChild(quoteWrapper);
};

//get quotes from api and show random one
async function getQuotes() {
    const url = "https://type.fit/api/quotes";
    try {
        const response = await fetch(url);
        $apiQuotes = await response.json();
        // console.log($apiQuotes);
        const newQuote = chooseQuote();
        // console.log(newQuote);
        createQuoteElements(newQuote.text, newQuote.author);
    } catch (err) {
        console.log(err);
    }
};
getQuotes();