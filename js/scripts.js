// Set variables
const imgSrc = ["../img/santa_0.svg", "../img/church_0.svg", "../img/degree_project_0.svg", "../img/hospital_0.svg",
                "../img/ice_city_0.svg", "../img/inspiration_hotel_0.svg", "../img/la_hotel_0.svg", "../img/youth_camp_0.svg"];
const circle = $(".fa-circle");
let seconds, pairs, round, moves, timer;

// Initialize game
startGame();

// Add event listener on cards
$(".deck").on("click touchstart", function(event) {
    const front = event.target;
    const back = event.target.nextElementSibling;
    

    // Check if clicked card is opened or not
    if (front.nodeName === "DIV" && front.classList.contains("front")) {

        // Check first click to start counter
        if (seconds == 0) {
            counter();
        }
        
        // Open clicked card
        if (!front.classList.contains("inactive")) {
            front.classList.add("inactive");
            back.classList.add("active");
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
                    $(".win-popup").removeClass("popup-hidden");
                    $(".moves-number").text(moves);
                    $(".end-time").text(timeElapsed());
                    stopTime();
                }
            }
        }

        shadowCircle();

        // Assign previous clicked cards to new variables to compare
        prevSrc = back.firstElementChild.src;
        prevFront = front;
        prevBack = back;
    } 
});

// Add event listener to replay button
$(".replay").on("click touchstart", function() {
    $(".win-popup").addClass("popup-hidden");
    startGame();
});

// Restart game click on restart icon
$(".restart").on("click touchstart", function() {
    startGame();
});


// Minus circle according to number of moves
function shadowCircle() {
    let circles;
    switch(moves) {
        case 12:
        circles = 2;
        circle[2].classList.add("fontawesome-");
        break;
        case 16:
        circles = 1;
        circle[1].classList.add("fontawesome-");
        break;
        case 24:
        circles = 0;
        circle[0].classList.add("fontawesome-");
    }
    $(".number-circles").text(circles);
}

// Stop counter
function stopTime() {
    clearTimeout(timer);
}

// Count time in seconds
function counter() {
    seconds++;
    $(".timer").text(timeElapsed());
    timer = setTimeout(counter, 1000);
}

// Display time in seconds and minutes and display it
function timeElapsed() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    let timeElapsed = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
    return timeElapsed;
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
    if (cardOne.classList.contains("inactive") && cardTwo.classList.contains("active")) {
        cardOne.classList.remove("inactive");
        cardTwo.classList.remove("active");
    }
}

// Start the game resetting any previous state
function startGame() {
    round = 2;
    moves = 0;
    pairs = 8;
    seconds = 0;
    changeBack(imgSrc);
    $(".timer").text("00:00");
    stopTime();
    shuffle($("img"));
    $(".moves").text("Moves: " + moves);
    circle.removeClass("fontawesome-");

    for (let i = 0; i < $(".front").length; i++) {
        $(".back")[i].classList.remove("card-match");
        flipBack($(".front")[i], $(".back")[i]);
    }
}

// Change background randomly with every restart
function changeBack(imgSrc) {
    document.body.style.backgroundImage = "url(" + imgSrc[Math.floor(Math.random() * imgSrc.length)] + ")";
}

