// Initialise global var
var playerCard = [];
var computerCard = [];
var GameOverOutputValue;
var playerWinCount = 0;
var computerWinCount = 0;

var makeDeck = function () {
  // create the empty deck at the beginning
  var carddeck = [];
  var suits = ["❤", "🔷", "♣", "♠"];

  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // make a variable of the current suit
    var currentSuit = suits[suitIndex];

    // loop to create all cards in this suit
    // rank 1-13
    var counter = 1;
    while (counter <= 13) {
      var rankCounter = counter;
      var cardName = rankCounter;

      // for BlackJack only, change the card rank for the face cards to 10.
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        rankCounter = 10;
        cardName = "jack";
      } else if (cardName == 12) {
        rankCounter = 10;
        cardName = "queen";
      } else if (cardName == 13) {
        rankCounter = 10;
        cardName = "king";
      }

      // make a single card object variable
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // add the card to the deck
      carddeck.push(card);

      counter = counter + 1;
    }
    suitIndex = suitIndex + 1;
  }

  return carddeck;
};

var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

var shuffleCards = function (cards) {
  var index = 0;

  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);

    var currentItem = cards[index];

    var randomItem = cards[randomIndex];

    cards[index] = randomItem;
    cards[randomIndex] = currentItem;

    index = index + 1;
  }

  return cards;
};

// Initialise Card Deck
var cardDeck = shuffleCards(makeDeck());

// Draw 1 card to Hand Global function and Pop Deck
var drawCard = function (NameHand) {
  NameHand.push(cardDeck.pop());
};

////Count Hand of Player/Computer Global Function
var CountHand = function (Player) {
  var i = 0;
  var sum = 0;
  while (i < Player.length) {
    var currentCard = Player[i];

    //factoring Aces and player less than 2 cards, Ace = 11
    if (currentCard.rank == 1 && Player.length < 3) {
      currentCardRank = 11;
      sum = sum + currentCardRank;
    } else {
      sum = sum + currentCard.rank;
    }
    i = i + 1;
  }
  return sum;
};

//define player and computer Hand in string

var showHand = function (input) {
  var index = 0;
  var myOutputValue = "";

  while (index < input.length) {
    myOutputValue = ` ${input[index].name} of ${input[index].suit} <br> ${myOutputValue}`;
    index = index + 1;
  }

  return myOutputValue;
};

// define dafault myOutputValue Player Functions
var myOutputValuePlayer = function (input) {
  return `Player: <br> ${showHand(input)}  <br> Score: ${CountHand(
    input
  )}. <br>`;
};
// define dafault myOutputValue computer Functions
var myOutputValueComputer = function (input) {
  return `Computer: <br> ${showHand(input)} <br> Score: ${CountHand(
    input
  )}. <br>`;
};

var main = function (input) {
  // Initiate dealing at start game - deal card to player and PC each one-by-one
  if (playerCard.length == 0) {
    drawCard(playerCard);
    drawCard(computerCard);
    drawCard(playerCard);
    drawCard(computerCard);

    return `Click Start To Continue`;
  }

  // banker keep drawing till >16
  var x = 0;
  while (x < computerCard.length) {
    if (CountHand(computerCard) < 16) {
      drawCard(computerCard);
    }
    x = x + 1;
  }

  // if player 21 or computer 21 with 2 cards, else give player option to hit or stand
  // whenver wins, restart deck and game.
  if (CountHand(playerCard) == 21) {
    playerWinCount = playerWinCount + 1;

    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> Player wins. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}  `;
    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  } else if (CountHand(computerCard == 21)) {
    computerWinCount = computerWinCount + 1;

    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> Computer wins. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}`;
    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  } else if (CountHand(computerCard) > 21) {
    playerWinCount = playerWinCount + 1;

    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> Player wins. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}  `;
    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  } else if (CountHand(playerCard) < 21) {
    return `${myOutputValuePlayer(playerCard)} <br>
    Click "Hit" to draw 1 card or <br> "Stand" to tap.`;
  }
};

// hit button
var hit = function () {
  drawCard(playerCard);

  if (CountHand(playerCard) == 21) {
    playerWinCount = playerWinCount + 1;

    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> Player wins. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}  `;
    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  } else if (CountHand(playerCard) < 21) {
    return `Player: <br> ${showHand(playerCard)}  <br> Score: ${CountHand(
      playerCard
    )}. <br>
    Input "hit" to draw 1 card or <br> "stand" to tap.`;
  } else if (CountHand(playerCard) > 21) {
    computerWinCount = computerWinCount + 1;

    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> Computer wins. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}`;

    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  }
};

// stand button
var stand = function () {
  if (CountHand(playerCard) > CountHand(computerCard)) {
    playerWinCount = playerWinCount + 1;

    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> Player wins. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}  `;
    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  } else if (CountHand(playerCard) < CountHand(computerCard)) {
    computerWinCount = computerWinCount + 1;

    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> Computer wins. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}`;

    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  } else if (CountHand(playerCard) == CountHand(computerCard)) {
    GameOverOutputValue = `${myOutputValuePlayer(
      playerCard
    )} <br> ${myOutputValueComputer(
      computerCard
    )} <br> It's a draw. <br> Player Wins: ${playerWinCount}. Computer Wins: ${computerWinCount}`;

    // restart game + new deck
    playerCard = [];
    computerCard = [];
    cardDeck = shuffleCards(makeDeck());

    return GameOverOutputValue;
  }
};
