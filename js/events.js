function myFunction(event) {
  var demo = document.getElementById("demo");
  var x = event.key;
  console.log(demo.style.left);
  demo.innerHTML = '"' + x + '"';
}

function cantTouchMe() {
  var button = document.getElementById("button");

  console.log("button.style.top: ", button.style.top);
  button.style.top = randomNumber(button.style.top) + "px";
}

function randomNumber(number = 200) {
  var ranNumber;

  if (number > 0) {
    ranNumber = Math.random() * number;
    console.log("if ranNumber: ", ranNumber);
  } else {
    ranNumber = Math.random() * 300;
    console.log("else ranNumber: ", ranNumber);
  }
  return ranNumber;
}

function alertButtonClicked() {
  alert("You touched me! Ouch!");
  window.close();
}

window.onload = alert(
  "The window is Loaded. Good Luck. You are going to need it."
);

function changeColor() {
  var whichColor = document.getElementById("whichColor");
  whichColor.style.width = "100px";
  whichColor.style.height = "100px";
  whichColor.style.background = whichColor.value;
}

function getWords() {
  var words = document.getElementById("words").value;
  document.getElementById("changeColor").textContent = words;
}
