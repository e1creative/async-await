
async function getOneFact(){
    let resp = await axios.get('http://numbersapi.com/42?json')
    let container = document.getElementById('single-fact')
    let newItem = document.createElement('p');
    newItem.innerText = resp.data.text
    container.appendChild(newItem)
};
getOneFact();


async function getMultipleFacts(){
    let resp = await axios.get('http://numbersapi.com/1..3,10?json')
    let container = document.getElementById('multiple-facts')
    for (let i in resp.data) {
        let newItem = document.createElement('p');
        newItem.innerText = resp.data[i];
        container.appendChild(newItem);
    }
}
getMultipleFacts();



async function getFourFacts(num){
    let favNumFacts = []
    for (let i=1; i<5; i++ ) {
        favNumFacts.push(await axios.get('http://numbersapi.com/13?json'));
    }
    let favNumFactsArr = await Promise.all(favNumFacts)
    let container = document.getElementById('favorite-num-facts');
    favNumFactsArr.forEach(val => {
        let newItem = document.createElement('p');
        newItem.innerText = val.data.text;
        container.appendChild(newItem);
    })
}
getFourFacts(13);


// Part 2.1
async function getOneCard() {
    let resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    let resp2 = await axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
    console.log(`${resp2.data.cards[0].value} of ${resp2.data.cards[0].suit}`)
}
getOneCard();

// Part 2.2
async function getTwoCards(){
    let cardsInHand = []
    let resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    // after deck is shuffled
    let card1 = await axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
    let card2 = await axios.get(`https://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count=1`)
    cardsInHand.push(card1.data.cards[0])
    cardsInHand.push(card2.data.cards[0])
    for (let card of cardsInHand){
        console.log(`${card.value} of ${card.suit}`)
    }
}
getTwoCards();
    

// Part 2.3

const deck = {
    getACardButton: document.getElementById('get-a-card'),
    cardPile: document.getElementById('cards'),
    async init() {
        let resp = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        this.deckID = resp.data.deck_id;
    },
    async getACard() {
        console.log(this.deckID)
        let resp = await axios.get(`https://deckofcardsapi.com/api/deck/${this.deckID}/draw/?count=1`);

        let newCard = document.createElement('img');
        newCard.setAttribute('src', resp.data.cards[0].image)
        this.cardPile.appendChild(newCard)
        if (resp.data.remaining == 0){
            this.getACardButton.style.display = "none";
        }
    }
};
deck.getACardButton.addEventListener('click', () => { deck.getACard()})
deck.init();