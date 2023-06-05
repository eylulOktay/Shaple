//The actual game will be coded here.
//randomization

document.addEventListener("DOMContentLoaded", () => {

//this array will store each guessed shape sequence
const guesses = [[]];

//keys will correspond to certain shapes D-K 
const keyPress = document.querySelectorAll(".keyboard-row button");

for (let i = 0; i < keyPress.length; i++) {
    keyPress[i].onClick = ({target}) => {
        const shape = target.getAttribute("data-key");
        getShapesGuessed(shape);
    }
};

//returns the current sequence that user has entered
function getCurrentGuess() {
    const numGuesses = guesses.length;
    return guesses[numGuesses - 1];
}

//checks if the user has entered the required 5 letters into the sequence
function getShapesGuessed(shape){
    const currentGuess = getCurrentGuess();
    
    if (currentGuess && guesses.length < 5){
        guesses.push(shape);
    }
}

});