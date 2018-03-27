// Set variables
const imgSrc = ["../img/santa_0.svg", "../img/church_0.svg", "../img/degree_project_0.svg", "../img/hospital_0.svg",
                "../img/ice_city_0.svg", "../img/inspiration_hotel_0.svg", "../img/la_hotel_0.svg", "../img/youth_camp_0.svg"]
const cardFront = document.querySelectorAll(".card-front");
const cardBack = document.querySelectorAll(".card-back");
const star = document.querySelectorAll(".fa-star");
const winPop = document.querySelector(".win-popup");
let moves = 0;
let seconds, minutes, pairs, stars, currentTime, clock, round;

// Initialize game
startGame();

// Add event listener on cards
document.querySelector(".deck").addEventListener("click", function(event) {
    const front = event.target;
    const back = event.target.nextElementSibling;

    // Check if clicked card is opened or not
    if (front.nodeName === "DIV" && front.classList.contains("card-front")) {
        checkStart();
        
        // Open clicked card
        if (!front.classList.contains("front-inactive")) {
            front.classList.add("front-inactive");
            back.classList.add("back-active");
            round -= 1;
        }

        // Two cards are opened
        if (round == 0) {
            round = 2;
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
                    winPop.classList.remove("popup-hidden");
                    document.querySelector(".moves-number").innerHTML = moves;
                    document.querySelector(".end-time").innerHTML = currentTime;
                    stopTime();
                }
            }
        }

        hideStars();

        // Assign previous clicked cards to new variables to compare
        prevSrc = back.firstElementChild.src;
        prevFront = front;
        prevBack = back;
    } 
});

// Add event listener to replay button
document.querySelector(".replay").addEventListener("click", function() {
    winPop.classList.add("popup-hidden");
    startGame();
});


// Minus stars according to number of moves
function hideStars() {
    switch(moves) {
        case 16:
        stars = 2;
        star[2].classList.add("minus-star");
        break;
        case 24:
        stars = 1;
        star[1].classList.add("minus-star");
        break;
        case 30:
        stars = 0;
        star[0].classList.add("minus-star");
    }
    document.querySelector(".stars-ranking").innerHTML = stars;
}

// Counter
function counter() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    currentTime = (minutes > 0 ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    document.querySelector(".timer").innerHTML = currentTime;
}

// Stop counter
function stopTime() {
    clearTimeout(clock);
}

// Check first click on card to start counter
function checkStart() {
    if (moves === 0) {
        clock = setTimeout(counter, 1000);
    }
}

// Count every second and update clock timer at score panel
function counter() {
    seconds++;
    updateTime();

    // Call itself in 1 second to update time again
    timer = setTimeout(counter, 1000);
}

// Show current time at score panel
function updateTime() {
    clock.textContent = elapsedTime();
}

// Format time value to 'mm:ss' format
function elapsedTime() {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return ((min < 10) ? "0" + min : min) + ":" + ((sec < 10) ? "0" + sec : sec);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(shuffleCards) {
    let array = [];
    for (let i = 0; i < shuffleCards.length; i++) {
        array[i] = shuffleCards[i].src;
    }

    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    for (let i = 0; i < shuffleCards.length; i++) {
        shuffleCards[i].src = array[i];
    }
}


// Function to hide no matching cards
function flipBack(cardOne, cardTwo) {
    if (cardOne.classList.contains("front-inactive") && cardTwo.classList.contains("back-active")) {
        cardOne.classList.remove("front-inactive");
        cardTwo.classList.remove("back-active");
    }
}

// Start the game resetting any previous state
function startGame() {
    round = 2;
    moves = 0;
    pairs = 8;
    seconds = 0;
    minutes = 0;
    stars = 3;
    document.querySelector(".timer").innerHTML = "00:00";
    stopTime();
    shuffle(document.querySelectorAll("img"));
    document.querySelector(".moves").innerHTML ="Moves: " + moves;

    for (let i = 0; i < cardFront.length; i++) {
        cardBack[i].classList.remove("card-match");
        flipBack(cardFront[i], cardBack[i]);
    }
}

