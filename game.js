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

    function getBlockColor(shape, i ) {
        const correctShape = shapeSequence.includes(shape);

        if(!correctShape){
            //block becomes red
        }

        const shapeInCurrentPos = shapeSequence.charAt(i);
        const rightPos = shape = shapeInCurrentPos;

        if (rightPos) {
            //block becomes green
        }
    }

    function enteredSequence() {
        const currentGuess = getCurrentGuess();
        if (currentGuess.length != 5) {
            window.alert("Please enter a sequence with 5 shapes!");
        }

        const currentShape = guesses.join(' ');        

        //currentGuess.forEach(shapeSequence,i) =>{

        //}
       
        if (currentShape == shapeSequence) {
            //link over to winningSCreen
            //how to switch screen on win
        }

        if (guesses.length === 5) {
            //link over to losingScreen
        }

        guesses.push([]);

    }

    function getShapeGrid() {
        const gameGrid = document.getElementById("grid");

        //loops through indexes in the grid
        for (let i = 0; i < 25; i ++){
            let block = document.createElement("div");
            block.classList.add("block");
            //add the animation here
            //block.classList.add(animation)
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

    function deleteShape() {
        const currentGuess = getCurrentGuess();
        const deletedShape = currentGuess.pop();

        guesses[guesses.length-1] = currentGuess;

        const lastEnteredShape = document.getElementById(String(spacesOpen-1));
        lastEnteredShape.textContent = "";
        spacesOpen -= 1;
     
        for (let i = 0; i < keyPress.length; i++) {
            keyPress[i].onclick = ({ target }) => {
              const shape = target.getAttribute("data-key");
        
              if (shape === "enter") {
                enteredSequence();
                return;
              }
        
              if (shape === "del") {
                deleteShape();
                return;
              }
        
              getShapesGuessed(shape);
            };
        }
    }
});