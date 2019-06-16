var randList = [];


function history() {
    console.log(randList);
    randList.forEach(display);
}

function display(element) {
    console.log("element = " + element);
    document.getElementById("history").innerHTML += "Roll: " + element.random + " from " + element.side + " side dice<br>";
}

function loadButtons() {
    var dice = document.getElementById("dice");
    var string = "";

    for (var i = 2; i <= 20; i += 2) {
        console.log(i);
        if (i != 14 && i != 16 && i != 18) {
            string += "<button onclick='roll(" + i + ")' id='dice_" + i + "'>" + i + "</button>";
        }
        dice.innerHTML = string;
    }
}
var Dice = {
    side: 0,
    random: 0
};

function roll(number) {
    var tempDice = Object.create(Dice);
    tempDice.side = number;
    tempDice.random = Math.floor(Math.random() * number) + 1;
    randList.push(tempDice);
    document.getElementById('loop').innerHTML = tempDice.random;
    document.getElementById('history').innerHTML = "";
    history();
}

function init() {
    loadButtons();
}