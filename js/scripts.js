// Store svg classes
const cards = {1: "santa", 2: "hotel", 3: "ice", 4: "hospital", 5:"church", 6:"degree",
                7:"inspiration", 8:"camp"};

const cardFront = document.querySelectorAll(".card-front");
const cardBack = document.querySelectorAll(".card-back");
const star = document.querySelectorAll(".fa-star");
const winner = document.querySelector(".win-popup");
let gameRound = 2;
let moves = 0;
let seconds, minutes, prevSrc, pairs, stars, currentTime, clock;


// Add event listener on cards
document.querySelector(".deck").addEventListener("click", function(event) {
    const front = event.target;
    const back = event.target.nextElementSibling;

    // Check if clicked card is opened or not
    if (front.nodeName === "DIV" && front.classList.contains("card-front")) {
        // Open clicked card
        if (!front.classList.contains("front-inactive")) {
            front.classList.add("front-inactive");
            back.classList.add("back-active");
            gameRound -= 1;
        }

        // Two cards are opened
        if (gameRound == 0) {
            gameRound = 2;
            moves += 1;
            document.querySelector(".moves").innerHTML = "Moves: " + moves;

            // Compares two opened cards
            if (prevSrc !== back.firstElementChild.src) {
                setTimeout(flipBack, 1000, front, back);
                setTimeout(flipBack, 1000, prevFront, prevBack); 
            } else {
                back.classList.add("matched");
                prevBack.classList.add("matched");
                pairs -= 1;
                if (pairs == 0) {
                    winner.classList.remove("banner-hidden");
                    document.querySelector(".moves-number").innerHTML = moves;
                    document.querySelector(".final-time").innerHTML = currentTime;
                    stopTime();
                }
            }
        }

        //store parameteres to compare cards in game round
        prevSrc = back.firstElementChild.src;
        prevFront = front;
        prevBack = back;
    } 
});

// document.querySelector(".deck").addEventListener("click", function(event) { 
//     event.target.style.background = "red";
// });

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// function to hide no matching cards
function flipBack(cardOne, cardTwo) {
    if (cardOne.classList.contains("front-inactive") && cardTwo.classList.contains("back-active")) {
        cardOne.classList.remove("front-inactive");
        cardTwo.classList.remove("back-active");
        click = true;
    }
}