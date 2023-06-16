//The actual game will be coded here.

//WHAT IS NEEDED:
//add delete function
//how to randomize the winnign sequence

const cellList = [];
let rowCounter = 0;

document.addEventListener("DOMContentLoaded", () => {
    var t = document.getElementById("grid");
    for (let r=0; r<5; r++) {
        let row = t.insertRow(r);
        for (let c=0; c<5; c++) {
            let cell = row.insertCell(c)
            cellList.push(cell);

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

    //this array will store each guessed shape sequence
    let guesses = [];

    //array of all guesses
    let allGuesses = [];

    //how many spots are open to place a shape guess
    let spacesOpen = 1;

    //shuffle function
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    //creating random shape sequence
    var a1 = ['d', 'f', 'g', 'h', 'j', 'k'];
    var sequence = shuffle(a1);
    var s = "";
    for(let i = 0; i < 5; i++) {
        s += sequence[i];
    }
    let shapeSequence = s;

    //keys will correspond to certain shapes D-K 
    const keyPress = document.querySelectorAll(".keyboard-row button");

    //returns the current sequence that user has entered
    function getCurrentGuess() {
        //number of guesses entered is added to above list 
        const numGuesses = guesses.length;
        //returns the current sequence that user has guessed/entered
        return guesses[numGuesses - 1];
    }

    //checks if the user has entered the required 5 letters into the sequence
    function getShapesGuessed(shape){
        //gets current sequence
        const currentGuess = getCurrentGuess();

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
    function getBlockColor(shape, i) {
        let completeIndex = (rowCounter-1)*5+i
        let cell = cellList[completeIndex];
        const includedShape = shapeSequence.includes(shape);
        //current shape user is on
        const shapeInCurrentPos = shapeSequence.charAt(i);

        if(!includedShape){
            cell.classList.add("gray");
        }

        //included but wrong pos
        else{
            if(shape !== shapeInCurrentPos){
                cell.classList.add("yellow");
            }
            else{
                cell.classList.add("green");
            }
        }
    }

    function enteredSequence() {
        //if they press enter without filling in all the spaces there is a window alert
        if (guesses.length != 5) {
            window.alert("Please enter a sequence with 5 shapes!");
            return;
        }

        rowCounter++;
        const currentShape = guesses.join("");        
       
        if (currentShape == shapeSequence) {
            window.location.href = "winningScreen.html";
        }

        if (allGuesses.length === 4) {
            window.location.href = "losingScreen.html";
        }

        allGuesses.push(guesses);

        for(let j = 0; j < guesses.length; j++) {
            let shape = guesses[j];
            getBlockColor(shape, j);
        }
        
        guesses = [];
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

    function deleteShape(){
        //concatonates id with shape (letter) and guesses (number)
        //let x = allGuesses.length;
        //cellList[rowCounter + guesses.length].setAttribute("hidden");
        if (guesses.length == 0) {
            return
        }

        let shape = guesses[guesses.length - 1];
        let id = shape + rowCounter + (guesses.length);
        let element = document.getElementById(id); 
        console.log(id);
        element.setAttribute("hidden","hidden");
        guesses.pop();
    }
     
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
});