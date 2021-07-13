let deckId;
let cardButton = document.getElementById("draw-cards");
let cardDiv = document.getElementById("cards");
let overlay = document.getElementById("overlay");
let playerScoreText = document.getElementById("player-score");
let computerScoreText = document.getElementById("computer-score");
let computerScore = 0;
let myScore = 0;

function getDeck() {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      computerScore = 0;
      myScore = 0;
      deckId = data.deck_id;
      cardDiv.innerHTML = ``;
      if (cardButton.classList.contains("hidden")) {
        cardButton.classList.toggle("hidden");
      }
      if (!overlay.classList.contains("hidden")) {
        overlay.classList.toggle("hidden");
      }
      playerScoreText.innerHTML = ``;
      computerScoreText.innerText = ``;
    })
    .catch((error) => console.log(error));
}

function drawCards() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      displayScore();
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
  computerScoreText.innerText = `Computer: ${computerScore}`;
  playerScoreText.innerText = `Me: ${myScore}`;
}

function endGame() {
  if (myScore >= 13) {
    cardButton.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    overlay.innerHTML = `Congratulations! You won! Click 'New Deck' to play again.`;
    return;
  } else if (computerScore >= 13) {
    cardButton.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    overlay.innerHTML = `Computer won this round. Better luck next time! Click 'New Deck' to play again.`;

    return;
  }
}

document.getElementById("new-deck").addEventListener("click", getDeck);
cardButton.addEventListener("click", drawCards);
