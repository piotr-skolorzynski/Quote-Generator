let $apiQuotes = [];

async function getQuotes() {
    const url = "https://type.fit/api/quotes";
    try {
        const response = await fetch(url);
        $apiQuotes = await response.json();
        console.log($apiQuotes);
        chooseQuote();
    } catch (err) {
        console.log(err);
    }
};
getQuotes();

const generateIndex = (min,max) => {
    const num = Math.floor(Math.random() * ((max - min + 1) + min));
    return num;
};

const chooseQuote = () => {
    let randomIndex = generateIndex(0, ($apiQuotes.length - 1));
    console.log($apiQuotes[randomIndex]);
};



