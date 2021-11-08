//Get grid id from HTML, to create grid inside.
const grid = document.querySelector('#grid');

//Preset gridSize, to start. To be changed by user after.
let gridSize = 8;

//Create gridSize * gridSize squares to fill a 960x960 grid.
function createSquare(gridSize) {
    for (let i = 1; i <= gridSize*gridSize; i++){
        let newSquare = document.createElement('div'); 
        newSquare.classList.add('square');// <-- Adds the square class to each square so CSS rules apply

        //Randomize background color
        let squareColor = randomColor();
        newSquare.style.backgroundColor = squareColor;

        //Darken on mouse over

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

//Create a grid of gridSize rows and columns.
grid.style.grid = `repeat(${gridSize}, 1fr)/repeat(${gridSize}, 1fr)`; 

//Create squares when page has loaded.
document.ready(createSquare(gridSize))

