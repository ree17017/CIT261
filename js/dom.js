var numSquares = 6;
var clicks = 0
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var systemMessageDisplay = document.querySelector('#message');
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    console.log("Running init()");
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    console.log("running setupModeButtons");
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            numSquares = this.textContent === "Easy" ? 3 : 6;
            reset();
        });
    }
}

function setupSquares() {
    console.log("running setupSquares()");
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function() {

            // userMessageDisplay.innerHTML = this.style.backgroundColor;

            var clickedColor = this.style.background;

            console.log("pickedColor = " + pickedColor + " clickedColor = " + clickedColor);
            if (clickedColor === pickedColor) {
                systemMessageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
                clicks++;
            } else {
                this.style.backgroundColor = "#232323";
                systemMessageDisplay.innerHTML = "Try Again";
                clicks--;
            }
            winLoss(clicks);
        })
    };
}

function changeColors(pickedColor) {
    console.log("running changeColor()")
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.background = pickedColor;
    }
}

function randomColor() {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    console.log("running randomColor" + red + ", " + green + ", " + blue);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    console.log("running pickColor() random = " + random);
    return colors[random];
}

function generateRandomColor(numberSquares) {
    var randomColorArray = [];

    for (let i = 0; i < numberSquares; i++) {
        randomColorArray.push(randomColor());
    }

    console.log("running generateRandomColor() randomColor = " + randomColor);
    return randomColorArray;
}

function reset() {
    colors = generateRandomColor(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor
    resetButton.textContent = "New Colors";
    systemMessageDisplay.innerHTML = "";

    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
    console.log("Running rest button colors = " + colors + " pickedColor = " + pickedColor);
}

const newItem = document.createElement("p");
const winText = "Winning!";
const lossText = "Losing!";
var results = document.getElementById("clicks");

function winLoss(value) {
    localStorage.setItem("clicks", value);
    if (localStorage.clicks > 0) {
        newItem.textContent = winText;
    } else {
        newItem.textContent = lossText;
    }

    results.innerHTML = localStorage.clicks;
    results.appendChild(newItem);
}

resetButton.addEventListener('click', function() {
    reset();
})