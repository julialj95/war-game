let deckId;
let cardButton = document.getElementById("draw-cards");
let cardDiv = document.getElementById("cards");
let computerScore = 0;
let myScore = 0;

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
      console.log(data.cards[0].value);
      const cardValues = [data.cards[0].value, data.cards[1].value];
      console.log(cardValues);
      findWinner(cardValues);
      cardDiv.innerHTML = `<img src=${data.cards[0].image} class="card" /><br><img src=${data.cards[1].image} class="card" />`;
    })
    .catch((error) => console.log(error));
}

function displayScore() {
  console.log("computer score", computerScore, "my score", myScore);
}

function findWinner(cardValues) {
  let numericCardArray = [];

  if (cardValues[0] === cardValues[1]) {
    myScore = myScore + 1;
    computerScore = computerScore + 1;
    console.log("cards match!");
    return;
  } else if (cardValues[0] < 11 && typeof cardValues[1] === String) {
    myScore = myScore + 1;
    console.log(myScore);
    console.log("You win this hand!");
  } else if (cardValues[1] < 11 && typeof cardValues[0] === String) {
    computerScore = computerScore + 1;
    console.log(computerScore);
    console.log("Computer wins this hand");
  } else if (
    typeof cardValues[0] === String &&
    typeof cardValues[1] !== Number
  ) {
    for (card of cardValues) {
      switch (card) {
        case "JACK":
          numericCardArray.push(11);
          break;
        case "QUEEN":
          numericCardArray.push(12);
          break;
        case "KING":
          numericCardArray.push(13);
          break;
        case "ACE":
          numericCardArray.push(14);
          break;
      }
    }
    if (numericCardArray[0] < numericCardArray[1]) {
      myScore += 1;
      console.log(myScore);
      console.log("You win this round");
    } else {
      computerScore = computerScore + 1;
      console.log(computerScore);
      console.log("Computer wins this round");
    }
  } else {
    if (cardValues[0] < cardValues[1]) {
      myScore = myScore + 1;
      console.log(myScore);
      console.log("You win this round");
    } else {
      computerScore = computerScore + 1;
      console.log(computerScore);
      console.log("Computer wins this round");
    }
  }

  displayScore();
}

document.getElementById("new-deck").addEventListener("click", getDeck);
cardButton.addEventListener("click", drawCards);
