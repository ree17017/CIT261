function myFunction(event) {
  var demo = document.getElementById("demo");
  var x = event.key;
  demo.innerHTML = '"' + x + '"';
}

function cantTouchMe() {
  var button = document.getElementById("button");
  button.style.top = randomNumber(button.style.top) + "px";
}

function randomNumber(number = 200) {
  var ranNumber;

  if (number > 0) {
    ranNumber = Math.random() * number;
  } else {
    ranNumber = Math.random() * 300;
  }
  return ranNumber;
}

function alertButtonClicked() {
  alert("You touched me! Ouch!");
}

window.onload = alert(
  "The window is Loaded. Good Luck. You are going to need it."
);

var changeBackgroundColor = document.getElementById("changeBackgroundColor");
changeColorDisplay.style.width = "100px";
changeColorDisplay.style.height = "50px";
changeColorDisplay.style.border = "1px solid black";
var words = document.getElementById("words");
words.size = "50";

function changeColor() {
  var changeBackgroundColor = document.getElementById("changeBackgroundColor");
  var changeColorDisplay = document.getElementById("changeColorDisplay");
  changeColorDisplay.style.background = changeBackgroundColor.value;
}

function getWords() {
  var words = document.getElementById("words").value;
  document.getElementById("changeColorDisplay").textContent = words;
}

function javaScriptAlign() {
  var changeColorDisplay = document.getElementById("changeColorDisplay");
  var left = document.getElementById("left");
  var center = document.getElementById("center");
  var right = document.getElementById("right");

  if (left.checked) {
    changeColorDisplay.style.textAlign = "left";
  } else if (center.checked) {
    changeColorDisplay.style.textAlign = "center";
  } else if (right.checked) {
    changeColorDisplay.style.textAlign = "right";
  }
}

function javaScriptPosition() {
  var changeColorDisplay = document.getElementById("changeColorDisplay");
  var top = document.getElementById("top");
  var middle = document.getElementById("middle");
  var bottom = document.getElementById("bottom");
  changeColorDisplay.style.position = "relative";
  if (top.checked) {
    changeColorDisplay.style.top = 0 + "px";
  } else if (middle.checked) {
    changeColorDisplay.style.top = 50 + "%";
  } else if (bottom.checked) {
    changeColorDisplay.style.top = 100 + "%";
  }
}

document.getElementById("top").addEventListener("change", javaScriptPosition);
document
  .getElementById("middle")
  .addEventListener("change", javaScriptPosition);
document
  .getElementById("bottom")
  .addEventListener("change", javaScriptPosition);
