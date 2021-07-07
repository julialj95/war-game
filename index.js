let deckId;
let cardButton = document.getElementById("draw-cards");
let cardDiv = document.getElementById("cards");

function getDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      cardButton.classList.toggle("hidden");
    })
    .catch((error) => console.log(error));
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.cards);
      cardDiv.innerHTML = `<img src=${data.cards[0].image} /><br><img src=${data.cards[1].image} />`;
    })
    .catch((error) => console.log(error));
}

document.getElementById("new-deck").addEventListener("click", getDeck);
cardButton.addEventListener("click", drawCards);
