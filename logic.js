console.log("starting");

var images = [
  "path/to/1.png",
  "path/to/2.png",
  "path/to/3.png",
  "path/to/4.png",

  "path/to/5.png",
  "path/to/6.png",
  "path/to/7.png",
  "path/to/8.png",
  "path/to/9.png",
];

var allImages = [];
var shuffledImages = [];
var matchedImages = [];

function start() {
  matchedImages = [];
  cardGuess = [];
  cardMatched = [];
  $("#match-alerts").hide();
  // randomize images : pick a random from images, add it twice to allImages, shuffle and save in matched images
  $("#match-grid").html("");
  allImages = [];
  shuffledImages = [];
  for (var i = 0; i < 9; i++) {
    randomizeImages();
  }
  shuffledImages = shuffleArray(allImages);
  // creates 18 card images
  for (var i = 0; i < 18; i++) {
    var cardDiv =
      "<div class='card-container' id='card-" +
      i +
      "'><div class='card card_front'></div><div class='card card_back'><img draggable='false' src='" +
      shuffledImages[i] +
      "' ></div></div>";
    $("#match-grid").append(cardDiv);
  }
  addFlip();
}
function randomizeImages() {
  // get a random image from the list of images
  var randomNum = Math.floor(Math.random() * images.length);
  console.log(randomNum);
  var randomImage = images[randomNum];
  for (var i = 0; i < 2; i++) {
    allImages.push(randomImage);
  }
  console.log("all images", allImages);
  return allImages;
}
// flips the card that is clicked
var cardHTML;
var cardID;
var cardGuess = [];
var cardMatched = [];

function addFlip() {
  var card = $(".card-container");
  // What happens when a card is clicked
  card.on("click", function (event) {
    $(this).addClass("is-flipped");
    cardID = $(this).attr("id");
    // check to see if card can be clicked on
    if (cardID == cardGuess[0]) return;
    if ($(this).hasClass("matched")) return;
    cardGuess.push(cardID);
    console.log("GUESS", cardGuess);
    if (cardGuess.length == 2) {
      var card1 = document.getElementById(cardGuess[0]);
      var card2 = document.getElementById(cardGuess[1]);
      cardGuess = [];
      setTimeout(() => checkAnswers(card1, card2), 1000);
    }
  });
}
function checkAnswers(card1, card2) {
  console.log("matching");
  if (card1.innerHTML == card2.innerHTML) {
    console.log("YES");
    cardMatched.push(card1, card2);
    card1.classList.add("matched");
    card2.classList.add("matched");
    //add new
    setTimeout(() => {
      card1.style.display = "none";
      card2.style.display = "none";
      playCorrectSound();
    }, 1000);
    //ad new
    alertMatch("Match!");
  } else {
    console.log("NO");
    card1.classList.remove("is-flipped");
    card2.classList.remove("is-flipped");
    playWrongSound();
  }
  if (cardMatched.length == shuffledImages.length) {
    setTimeout(() => {
      alert("Winner winner!");
      playWinSound();
    }, 500);
  }
}

function alertMatch(alertMsg) {
  var message = alertMsg;
  $("#match-alerts").html(message).show();
  setTimeout(function () {
    $("#match-alerts").hide();
  }, 1000);
}
//  Durstenfeld shuffle, a function to shuffle arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
