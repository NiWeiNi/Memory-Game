// Set variables
const imgSrc = ["../img/santa_0.svg", "../img/church_0.svg", "../img/degree_project_0.svg", "../img/hospital_0.svg",
                "../img/ice_city_0.svg", "../img/inspiration_hotel_0.svg", "../img/la_hotel_0.svg", "../img/youth_camp_0.svg"]
const cardFront = document.querySelectorAll(".card-front");
const cardBack = document.querySelectorAll(".card-back");
const circle = document.querySelectorAll(".fontawesome-circle");
const winPop = document.querySelector(".win-popup");
let moves = 0;
let seconds, minutes, pairs, circles, currentTime, clock, round, startFlag;

// Initialize game
startGame();

// Add event listener on cards
document.querySelector(".deck").addEventListener("click", function(event) {
    const front = event.target;
    const back = event.target.nextElementSibling;

    // Check if clicked card is opened or not
    if (front.nodeName === "DIV" && front.classList.contains("card-front")) {
        // Check first click to start counter
        if (startFlag) {
            showTime();
        }

        startFlag = false;
        
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
                    document.querySelector(".moves-number").innerHTML = "<strong>" + moves + "</strong>";
                    document.querySelector(".end-time").innerHTML = "<strong>" + currentTime + "</strong>";
                    stopTime();
                }
            }
        }

        hideCircle();

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

// Restart game once click on restart icon
document.querySelector(".restart").addEventListener("click", function() {
    startGame();
});


// Minus circle according to number of moves
function hideCircle() {
    switch(moves) {
        case 16:
        circles = 2;
        circle[2].classList.add("fontawesome-");
        break;
        case 24:
        circles = 1;
        circle[1].classList.add("fontawesome-");
        break;
        case 30:
        circles = 0;
        circle[0].classList.add("fontawesome-");
    }
    document.querySelector(".number-circles").innerHTML = "<strong>" + circles + "</strong>";
}

// Counter
function counter() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
}

// Stop counter
function stopTime() {
    clearTimeout(clock);
}

//set timer
function counter() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
    currentTime = (minutes > 0 ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    document.querySelector(".timer").textContent = currentTime;
    showTime();
}

function showTime() {
    clock = setTimeout(counter, 1000);
} 

function stopTime() {
    clearTimeout(clock);
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
    circles = 3;
    startFlag = true;
    changeBack(imgSrc);
    document.querySelector(".timer").innerHTML = "00:00";
    stopTime();
    shuffle(document.querySelectorAll("img"));
    document.querySelector(".moves").innerHTML ="Moves: " + moves;
    circle[0].classList.remove("fontawesome-");
    circle[1].classList.remove("fontawesome-");
    circle[2].classList.remove("fontawesome-");

    for (let i = 0; i < cardFront.length; i++) {
        cardBack[i].classList.remove("card-match");
        flipBack(cardFront[i], cardBack[i]);
    }
}

// Change background randomly with every restart
function changeBack(imgSrc) {
    document.body.style.backgroundImage = "url(" + imgSrc[Math.floor(Math.random() * imgSrc.length)] + ")";
}

