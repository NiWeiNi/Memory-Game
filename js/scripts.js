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

let openCards = [];
let cards = [];
let twoCards = [];
// Add event listener on each card
function eventListener() {
    $(".card").on("click", function(event){
    
    let targetCardSrc = $(this).children(".face").attr("src");
    let openCard = $(this);
    let cardArray = [];
    
    let imageOnUse = openCard.children(".face");

    // Add open cards src to array
    // addOpenCards(targetCardSrc, openCards);
    addCards(openCard, cards, twoCards);
    compareCards(twoCards, openCard);

    openCard.css("transform", "rotateY(180deg)");
    sourceImage(imageOnUse);

})

layDeck();
eventListener();


function cardClass() {
    $("tr").on("click", ".card", function(){
        let cardClass = $(this).attr("class");
    });
    return cardClass;
}

// Get all the images
function getImagesArray(){
    var images = $(".face");
    return images;
}

// Source of the image
function sourceImage(image){
    console.log(image.attr('src'));
    return image.attr('src');
}

// Initialize events
function initializeEvents(){
    var cards = getImagesArray();
    cards.forEach(addThumbClickHandler);
}

// Add clicked cards src attribute to array
function addOpenCards(card, array){
    array.push(card);
    console.log(array);
    return array;
}


// Add clicked cards to array
function addCards(card, array, anotherArray){
    array.push(card);
    anotherArray.push(card);
    console.log(array, anotherArray);
    return array;
}

// Check both card
function compareCards(array, openCard){
    if (array.length == 2){
        if (array[0].is(array[1])){
            console.log("Equal cards");
        }
        else if (array[0].children(".face").attr("src")==array[1].children(".face").attr("src")){
            console.log("Yaaaaah! Matching!");
            openCard.css("transform", "rotateY(180deg)");
        }
        else if (cards[0].children(".face").attr("src") != cards[1].children(".face").attr("src")){
            console.log("Not equal!");
            setTimeout(function() { 
                openCard.css("transform", "rotateY(0deg)"); }, 2000);
            }
        }
    console.log('checking conditional if');
    }
    
    else if (array.length > 2){
        [].shift.call(array);
        [].shift.call(array);
    }

    else {
        console.log("loop working");
    }
}


// If both card match let them face up and add them to array

// If don´t, put them face down

// If all cards are face up means game finished

// If all cards aren´t after 50 moves, it pops game over