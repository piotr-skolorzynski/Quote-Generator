let $apiQuotes = [];

async function getQuotes() {
    const url = "https://type.fit/api/quotes";
    try {
        const response = await fetch(url);
        $apiQuotes = await response.json();
        console.log($apiQuotes);
    } catch (err) {
        console.log(err);
    }
};

getQuotes();



