// Function to lay deck 
function layDeck() {
    // Array of cards images
    let deckCards = $(".face");

    // Array of icons path
    let paths= ["img/church_0.svg", "img/degree_project_0.svg", "img/hospital_0.svg",
                    "img/ice_city_0.svg", "img/inspiration_hotel_0.svg", "img/la_hotel_0.svg",
                    "img/santa_0.svg", "img/youth_camp_0.svg"];

    let iconsPath = paths.concat(paths);

    // Shuffle cards with Fisher-Yates function
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

    shuffle(iconsPath);

    // Assign shuffled cards to deck
    for (let i = 0; i < deckCards.length; i++) {
        deckCards.get(i).setAttribute("src", iconsPath[i]);
    }
}

// Add event listener on each card
function eventListener () {
    $("tr").on("click", ".card", function(){
    $(this).css("transform", "rotateY(180deg)");
    setTimeout(function() { 
        $(".card").css("transform", "rotateY(0deg)"); }, 2000);
    });
}

layDeck();
eventListener();

function cardClass() {
    $("tr").on("click", ".card", function() {
        let cardClass = $(this).attr("class");
    });
    return cardClass;
}

// Source of the image
function sourceImage(image) {
    return image.getAttribute('src');
}

// Add second shown card to variable

// Check both card

// If both card match let them face up and add them to array

// If don´t, put them face down

// If all cards are face up means game finished

// If all cards aren´t after 50 moves, it pops game over