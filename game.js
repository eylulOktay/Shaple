//The actual game will be coded here.

//WHAT IS NEEDED:
//PROBLEMS:
//when you press enter before 5 shapes are entered it goes to the next row- it shld stay on same one
//colors need to be added
//how to randomize the winnign sequence

document.addEventListener("DOMContentLoaded", () => {
    var t = document.getElementById("grid");
    console.log(t)
    for (let r=0; r<5; r++) {
        let row = t.insertRow(r);
        for (let c=0; c<5; c++) {
            let cell = row.insertCell(c);
            
            let id1 = r;
            let id2 = c + 1;
            
            let img1 = document.createElement("img");
            img1.src = "images/circleShape.png";
            img1.setAttribute("hidden", "hidden");
            img1.setAttribute("id", "d" + id1 + id2);

            let img2 = document.createElement("img");
            img2.src = "images/diamondShape.png";
            img2.setAttribute("hidden", "hidden");
            img2.setAttribute("id", "f" + id1 + id2);

            let img3 = document.createElement("img");
            img3.src = "images/heartShape.png";
            img3.setAttribute("hidden", "hidden");
            img3.setAttribute("id", "g" + id1 + id2);

            let img4 = document.createElement("img");
            img4.src = "images/squareShape.png";
            img4.setAttribute("hidden", "hidden");
            img4.setAttribute("id", "h" + id1 + id2);

            let img5 = document.createElement("img");
            img5.src = "images/starShape.png";
            img5.setAttribute("hidden", "hidden");
            img5.setAttribute("id", "j" + id1 + id2);

            let img6 = document.createElement("img");
            img6.src = "images/triangleShape.png";
            img6.setAttribute("hidden", "hidden");
            img6.setAttribute("id", "k" + id1 + id2);
            
            cell.appendChild(img1)
            cell.appendChild(img2)
            cell.appendChild(img3)
            cell.appendChild(img4)
            cell.appendChild(img5)
            cell.appendChild(img6)
        }
    }

    console.log("included");

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

            //concatonates id with shape (letter) and guesses (number)
            let x = allGuesses.length;
            let id = shape + x + guesses.length;
            let element = document.getElementById(id); 
            element.removeAttribute("hidden");


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
    
    function drawGrid(container) {
        const grid = document.createElement('div');
        grid.className = 'grid';
      
        for (let i = 0; i < 6; i++) {
          for (let j = 0; j < 5; j++) {
            drawBox(grid, i, j);
          }
        }
      
        container.appendChild(grid);
    }

    function updateGrid() {
        for (let i = 0; i < state.grid.length; i++) {
          for (let j = 0; j < state.grid[i].length; j++) {
            const box = document.getElementById(`box${i}${j}`);
            box.textContent = state.grid[i][j];
          }
        }
    }
      
    function drawBox(container, row, col, letter = '') {
        const box = document.createElement('div');
        box.className = 'box';
        box.textContent = letter;
        box.id = `box${row}${col}`;
      
        container.appendChild(box);
        return box;
    }
      
    // function getShapeGrid() {
    //     const gameGrid = document.getElementById("grid");

    //     //loops through indexes in the grid
    //     for (let i = 0; i < 25; i ++){
    //         let block = document.createElement("div");
    //         block.classList.add("block");
    //         //add the animation here
    //         //block.classList.add(animation)
    //         block.setAttribute("id", i + 1);
    //         gameGrid.appendChild(block);
    //     }
    // }

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
        guesses.pop(shape);
        console.log(guesses)

        //concatonates id with shape (letter) and guesses (number)
        let x = allGuesses.length;
        let id = shape + x + guesses.length;
        let element = document.getElementById(id); 
        element.setAttribute("hidden");
    }
     
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
    

    function startup() {
        const game = document.getElementById('game');
        drawGrid(game);
    }
      
    startup();

    // main
    //getShapeGrid();
});