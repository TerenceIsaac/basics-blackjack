// Initialise an empty deck array & global var
var cardDeck = [];
var playerCard = [{}];
var computerCard = [{}];
var myOutputValue;

var makeDeck = function () {
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["❤", "♦", "♣", "♠"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  shuffleCards(cardDeck);

  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function () {
  return Math.floor(Math.random() * 52);
};

//// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

var main = function () {
  //make deck and shuffle
  makeDeck();

  //// make playerCards and computerCards (deal 2 cards each)
  // var playerCard1 = cardDeck.pop();
  // var computerCard1 = cardDeck.pop();
  // var playerCard2 = cardDeck.pop();
  // var computerCard2 = cardDeck.pop();

  // playerCard.push(playerCard1);
  // playerCard.push(playerCard2);
  // computerCard.push(computerCard1);
  // computerCard.push(computerCard2);

  // console.log("playerCard");
  // console.log(playerCard);
  // console.log("computerCard");
  // console.log(computerCard);

  var index = 0;
  var playerTotalRank = 0;
  var computerTotalRank = 0;
  while (index <= playerCard.length) {
    playerTotalRank = playerTotalRank + playerCard[index].rank;
    console.log("Player Total Rank");
    console.log(playerTotalRank);
    if (playerTotalRank < 16) {
      playerCard[index] = cardDeck.pop();
    }

    computerTotalRank = computerTotalRank + computerCard[index].rank;
    console.log("Computer Total Rank");
    console.log(computerTotalRank);
    if (computerTotalRank < 16) {
      computerCard[index] = cardDeck.pop();
    }

    index = index + 1;
  }
};

var game1 = function () {
  if (playerCard1.rank + playerCard2 == 11) {
    myOutputValue = `Player Wins`;
  } else if (computerCard1.rank + computerCard2.rank == 11) {
    myOutputValue = `Computer Wins`;
  }
};
