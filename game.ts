//The actual game will be coded here.
//randomization

document.addEventListener("DOMContentLoaded", () => {

    //this array will store each guessed shape sequence
    let guesses = [[]];
    let spacesOpen = 1;
    let shapeSequence = "DFGHJ"

    //keys will correspond to certain shapes D-K 
    const keyPress = document.querySelectorAll(".keyboard-row button");

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

            const spaceAvailable = document.getElementById("String(1)");
            spacesOpen += 1;

            spacesOpen.textContent = shape;
        }
    }

    function enteredSequence() {
        const currentGuess = getCurrentGuess();
        if (currentGuess.length != 5) {
            window.alert("Please enter a sequence with 5 shapes!");
        }

        const currentShape = guesses.join(' ');
        if (currentShape == shapeSequence) {
            //link over to winninSCreen
        }

    }

    function getShapeGrid() {
        const gameGrid = document.getElementById("grid");

        //loops through indexes in the grid
        for (let i = 0; i < 25; i ++){
            let block = document.createElement("div");
            block.classList.add("block");
            block.setAttribute("id", i + 1);
            gameGrid.appendChild(block);
        }
    }

    for (let i = 0; i < keyPress.length; i++) {
        keyPress[i].onclick = ({target}) => {
            const shape = target.getAttribute("data-key");
            if (shape === 'enter') {
                enteredSequence();
                return;
            }
            getShapesGuessed(shape);
        }
    };
});