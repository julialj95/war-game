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
      const cardValues = [data.cards[0].value, data.cards[1].value];
      findWinner(cardValues);
      cardDiv.innerHTML = `<img src=${data.cards[0].image} class="card" /><br><img src=${data.cards[1].image} class="card" />`;
    })
    .catch((error) => console.log(error));
}

function findWinner(cardValues) {
  let numericCardArray = [];

  if (cardValues[0] === cardValues[1]) {
  } else if (Number(cardValues[0]) < 11 && !Number(cardValues[1])) {
    myScore += 1;
  } else if (Number(cardValues[1]) < 11 && !Number(cardValues[0])) {
    computerScore += 1;
  } else if (!Number(cardValues[0]) && !Number(cardValues[1])) {
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
    } else {
      computerScore += 1;
    }
  } else {
    if (Number(cardValues[0]) < Number(cardValues[1])) {
      myScore = myScore + 1;
    } else {
      computerScore = computerScore + 1;
    }
  }

  displayScore();
  endGame();
}

function displayScore() {
  console.log("computer score", computerScore, "my score", myScore);
}

function endGame() {
  if (myScore >= 14) {
    console.log("You win the game!");
    return;
  } else if (computerScore >= 14) {
    console.log("Computer won the game");
    return;
  }
}

document.getElementById("new-deck").addEventListener("click", getDeck);
cardButton.addEventListener("click", drawCards);
