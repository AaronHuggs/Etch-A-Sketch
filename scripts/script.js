//Get grid id from HTML, to create grid inside.
const grid = document.querySelector('#grid');


//Preset gridSize, to start. To be changed by user after.
let gridSize = 8;


//Square color, changes each time.
let squareColor = randomColor();


//Create squares when page has loaded.
document.addEventListener("DOMContentLoaded", function() {
    createSquare(gridSize);
  });
  

//Create reset button above the grid
const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Grid';
//When clicked, reset the grid and ask for new grid size
resetButton.addEventListener('click',function(){
    getGridSize();
}); 
//Add button on top of grid
grid.parentNode.insertBefore(resetButton,grid); 


//Create checkbox for rainbow mode
const rainbowBox = document.createElement('input');
rainbowBox.type = 'checkbox';
rainbowBox.id = 'rainbow';
let rainbowEnabled = false;
const label = document.createElement('label');
label.htmlFor = 'rainbow';
label.appendChild(document.createTextNode('Enable Rainbow Mode'));
//When checked, change square colors to rainbow
rainbowBox.addEventListener('change',function(){
    if (this.checked) {
        rainbowEnabled = true;
        removeSquares();
        createSquare(gridSize);
    }
    else {
        rainbowEnabled = false;
        removeSquares();
        squareColor = randomColor();
        createSquare(gridSize);
    }
});
//Add checkbox after button on top of grid
grid.parentNode.insertBefore(rainbowBox,grid); 
grid.parentNode.insertBefore(label,grid); 




//===================FUNCTIONS===================================//

//Create gridSize * gridSize squares to fill a 960x960 grid.
function createSquare(gridSize) {
    //Create a grid of gridSize rows and columns.
    grid.style.grid = `repeat(${gridSize}, 1fr)/repeat(${gridSize}, 1fr)`; 
    for (let i = 1; i <= gridSize*gridSize; i++){
        let newSquare = document.createElement('div'); 
        newSquare.classList.add('square');// <-- Adds the square class to each square so CSS rules apply
        
        //If rainbow checkbox is checked, randomize square color on creation
        if (rainbowEnabled) {
            squareColor = randomColor();
            newSquare.style.backgroundColor = squareColor;

            //Randomize square color on mouse over
            newSquare.addEventListener("mouseover", function(){
                newSquare.style.backgroundColor = randomColor();
            });
        }
        else {
            //Use same color
            newSquare.style.backgroundColor = squareColor;

            //Change brightness on mouseover
            newSquare.addEventListener("mouseover", function(){
                newSquare.style.filter = "brightness(50%)";
            });
        }
        grid.appendChild(newSquare); // <-- Adds created square to the grid
    }
}


//Create random color
function randomColor() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`;
    return rgb;
}


//Reset grid with new user specified grid size
function getGridSize() {
    let input = prompt("Specify Grid Size (Min:1 / Max:100)", "64");
    while(input <= 0 || input > 100 || input == null) {
        input = prompt("Specify Grid Size (Min:1 / Max:100)", "64");
    }
    gridSize = input;
    removeSquares();
    //Get a new color too, why not.
    squareColor = randomColor();
    createSquare(gridSize);
}


//Remove all squares on reset
function removeSquares(){
    const elements = document.getElementsByClassName('square');
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

