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