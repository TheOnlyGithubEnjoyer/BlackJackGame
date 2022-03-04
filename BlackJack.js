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
    }
  
    let playerCardString = "";
    for (let i = 0; i < playerCards.length; i++) {
    }


  }
