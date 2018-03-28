// Set variables
const imgSrc = ["../img/santa_0.svg", "../img/church_0.svg", "../img/degree_project_0.svg", "../img/hospital_0.svg",
                "../img/ice_city_0.svg", "../img/inspiration_hotel_0.svg", "../img/la_hotel_0.svg", "../img/youth_camp_0.svg"];
let seconds, pairs, round, moves, timer, circles;

// Initialize game
startGame();

$(".deck").on("click touchstart", function(event) {
    const cardFront = $(event.target);
    const cardBack = cardFront.next(".back");

    // First click on card to start counter
    if (seconds == 0) {
        counter();
    }

    // Check card for class up or down
    if  (!cardFront.hasClass("down")) {
        cardFront.addClass("down");
        cardBack.addClass("up");
        round += 1;
    }

    // Two cards face up
    if (round == 2) {
        round = 0;
        moves += 1;
        $(".moves").text("Moves: " + moves);

        //Compares two opened cards
        if (prevSrc !== cardBack.children().attr("src")) {
            setTimeout(flipBack, 1000, cardFront, cardBack);
            setTimeout(flipBack, 1000, prevFront, prevBack); 
        } 
        
        else {
            cardBack.addClass("matched");
            prevBack.addClass("matched");
            pairs -= 1;

            if (pairs == 0) {
                endGame();
            }
        }   
    }
    
    // Assign previous clicked cards to new variables to compare
    prevSrc = cardBack.children().attr("src");
    prevFront = cardFront;
    prevBack = cardBack;

    shadowCircle();
});

// Avoid event listeners on images
$('img').click(function(event){
    event.stopPropagation();
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

// Count time in seconds
function counter() {
    seconds++;
    $(".timer").text(timeElapsed());
    timer = setTimeout(counter, 1000);
}

// Display time in seconds and minutes
function timeElapsed() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    let timeElapsed = (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
    return timeElapsed;
}

// Stop counter
function stopTime() {
    clearTimeout(timer);
}

// Minus circle according to number of moves
function shadowCircle() {
    const circle = $(".fa-circle");
    switch(moves) {
        case 12:
        circles = 2;
        circle[circles].classList.add("fontawesome-");
        break;
        case 16:
        circles = 1;
        circle[circles].classList.add("fontawesome-");
        break;
        case 24:
        circles = 0;
        circle[circles].classList.add("fontawesome-");
    }
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
    if ($(cardOne).hasClass("down") && $(cardTwo).hasClass("up")) {
        $(cardOne).removeClass("down");
        $(cardTwo).removeClass("up");
    }
}

// Start the game resetting any previous state
function startGame() {
    round = 0;
    moves = 0;
    pairs = 8;
    seconds = 0;
    changeBack(imgSrc);
    $(".timer").text("00:00");
    stopTime();
    shuffle($("img"));
    $(".moves").text("Moves: " + moves);
    $(".fa-circle").removeClass("fontawesome-");
    $(".back").removeClass("card-match");
    flipBack($(".front"), $(".back"));
}

// Display stats at end
function endGame() {
    $(".win-popup").removeClass("popup-hidden");
    $(".number-circles").text(circles);
    $(".moves-number").text(moves);
    $(".end-time").text(timeElapsed());
    stopTime();
}

// Change background randomly with every restart
function changeBack(imgSrc) {
    document.body.style.backgroundImage = "url(" + imgSrc[Math.floor(Math.random() * imgSrc.length)] + ")";
}

