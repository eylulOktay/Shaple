//The actual game will be coded here.

//WHAT IS NEEDED:
//block colors changing
//do i need to make the grid before i can change the colors of the blocks accoridnly

console.log("included");

document.addEventListener("DOMContentLoaded", () => {

    console.log("Loading");
    //this array will store each guessed shape sequence
    let guesses = [];

    let allGuesses = [];

    //how many spots are open to place a shape guess
    let spacesOpen = 1;

    //hard coded placeholder sequence of keys
    let shapeSequence = "g f d h k"

    //keys will correspond to certain shapes D-K 
    const keyPress = document.querySelectorAll(".keyboard-row button");

    //returns the current sequence that user has entered
    function getCurrentGuess() {
        //number of guesses entered is added to above list 
        const numGuesses = guesses.length;
        //returns the current sequence that user has guessed/entered
        return guesses[numGuesses - 1];
    }

    //WHAT IS HAPPENING HERE??
    //checks if the user has entered the required 5 letters into the sequence
    function getShapesGuessed(shape){
        //gets current sequence
        const currentGuess = getCurrentGuess();

        console.log(currentGuess);
        console.log(guesses.length);
        
        if (guesses.length < 5){

            guesses.push(shape);
            console.log(guesses)

            const spaceAvailable = document.getElementById("String(1)");
            spacesOpen += 1;

            spacesOpen.textContent = shape;
        }
    }

    //makes grid block chaneg color based on correct, misplaced, and wrong guesses
    function getBlockColor(shape, i ) {
     
        const includedShape = shapeSequence.includes(shape);
        //current shape user is on
        const shapeInCurrentPos = shapeSequence.charAt(i);

        if(!includedShape){
            //docQuerySelector
            //block becomes red
        }

        //included but wrong pos
        else{
            if(guesses[i] !== shapeInCurrentPos){
                //yellow
            }
            else{
                //green
            }
        }
    }

    function enteredSequence() {
        //const currentGuess = getCurrentGuess();
        
        //if they press enter without filling in all the spaces there is a window alert
        if (guesses.length != 5) {
            window.alert("Please enter a sequence with 5 shapes!");
        }

        const currentShape = guesses.join(' ');        
        console.log(currentShape);
       
        if (currentShape == shapeSequence) {
            window.location.href = "winningScreen.html";
        }

        if (allGuesses.length === 5) {
            window.location.href = "losingScreen.html";
        }

        allGuesses.push(guesses);
        console.log(allGuesses.join(' '));
        guesses = [];

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
            console.log("key pressed");
            const shape = target.getAttribute("data-key");
            console.log(shape);

            if (shape === 'enter') {
                console.log("enter");
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
                for(let j = 0; j < guesses.length; j++) {
                    getBlockColor(shape, j);
                }
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

    // main
    getShapeGrid();


});