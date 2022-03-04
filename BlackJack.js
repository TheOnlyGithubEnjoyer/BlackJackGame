let textArea = document.getElementById("text-info");
let newGameButton = document.getElementById("start-game-button");
let hitButton = document.getElementById("hit-button");              // Id's of buttons for functions
let standButton = document.getElementById("stand-button");

let suits = ["Hearts", "Clubs", "Diamonds", "Spades"];
let values = [
  "Ace",
  "King",
  "Queen",
  "Jack",
  "Ten",
  "Nine",
  "Eight",          // Values of the "cards"
  "Seven",
  "Six",
  "Five",
  "Four",
  "Three",
  "Two"
];

let gamesStarted = false;
let gameOver = false;
let playerWon = false;
let dealerCards = [];               // All of the game variables
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

newGameButton.addEventListener("click", function() {
    gamesStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];       // Start Game button function
    playerCards = [getNextCard(), getNextCard()];
  
    newGameButton.style.display = "none";
    hitButton.style.display = "inline";
    standButton.style.display = "inline";
    showStatus();

});

standButton.addEventListener("click", function() {
    gameOver = true;                              // Function of the stand button
    showStatus();
    checkForEndOfGame();
  });

hitButton.addEventListener("click", function() {
    playerCards.push(getNextCard());               // Hit button function
    showStatus();
    checkForEndOfGame();
});


function createDeck() {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
      for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
        let card = {
          suit: suits[suitIdx],
          value: values[valueIdx]
        };
        deck.push(card);
      }
    }
    return deck;
  }

  function showStatus() {
    if (!gamesStarted) {
      textArea.innerText = "Welcome to The Game Of BlackJack";
      return;
    }
  
    let dealerCardString = "";
    for (let i = 0; i < dealerCards.length; i++) {
        dealerCardString += getCardString(dealercards[i]);
    }
  
    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]);
    }

    updateScores();
    
  if (gameOver) {
    if (playerWon) {
      textArea.innerText += "You Win!";
    }
    else
    {
      textArea.innerText += "You Lose"
    }

    newGameButton.style.display = "inline";
    hitButton.style.display = "none";
    standButton.style.display = "none";
  }
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
      let swapIdx = Math.trunc(Math.random() * deck.length);
      let tmp = deck[swapIdx];
      deck[swapIdx] = deck[i];
      deck[i] = tmp;
    }
  }
  
  function getCardString(card) {
    return card.value + " of " + card.suit;
  }
  
  function getNextCard() {
    return deck.shift();
  }

function getCardNumericValue(card) {
    switch (card.value) {
      case "Ace":
        return 1;
      case "Two":
        return 2;
      case "Three":
        return 3;
      case "Four":
        return 4;
      case "Five":
        return 5;
      case "Six":
        return 6;
      case "Seven":
        return 7;
      case "Eight":
        return 8;
      case "Nine":
        return 9;
      default:
        return 10;
    }
  }

  function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
      let card = cardArray[i];
      score += getCardNumericValue(card);
      if (card.value === "Ace") {
        hasAce = true;
      }
    }
    if (hasAce && score + 10 <= 21) {
      return score + 10;
    }
    return score;
  }

  
function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
  }
  
  function checkForEndOfGame() {
    updateScores();
    if (gameOver) {
      //let the dealer take cards
      while (
        playerScore <= 21 &&
        dealerScore <= 21 
      ) {
        dealerCards.push(getNextCard());
        updateScores();
      }
    }

    
  if (playerScore > 21 && dealerScore <= 21) {
    playerWon = false;
    gameOver = true;
  } 
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
    else if (gameOver) {
    if (playerScore > dealerScore) {        // If you have a higher score = Win 
      playerWon = true;
    }
    if (playerScore < dealerScore)
    {
        playerWon = false;              // You lose if you have less score than dealer
    }
}
}
  