/** Topic: local storage */

function loadMadLib() {
    var name = document.getElementById("name");
    var gender = document.getElementById("gender");
    var pet = document.getElementById("pet");
    var game = document.getElementById("game");
    var madLib = document.getElementById("madLib");

    if (name.value != "" || gender.value != "" || pet.value != "" || game.value != "") {
        localStorage.setItem("name", name.value);
        localStorage.setItem("gender", gender.value);
        localStorage.setItem("pet", pet.value);
        localStorage.setItem("game", game.value);
        var localString = localStorage.name + " has a " + localStorage.gender + " " + localStorage.pet + ". They like to play " + localStorage.game + ".";
        console.log(localString);

        madLib.innerHTML = localString;
    } else {
        madLib.innerHTML = "Please fill in any empty text boxes."
    }
}

function clearText() {
    document.getElementById("name").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("pet").value = "";
    document.getElementById("game").value = "";
    document.getElementById("name").focus();
}

function clearLocalStorage() {
    localStorage.clear();
    document.getElementById('madLib').innerHTML = "Local Storage has been reset.";
}

function saveLocal() {
    localStorage.history = createJSON();
    document.getElementById('madLib').innerHTML = "History as been saved";
    loadHistory();
}

function createJSON() {
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let pet = document.getElementById("pet").value;
    let game = document.getElementById("game").value;

    var saveCurrent = { "name": name, "gender": gender, "pet": pet, "game": game };

    if (typeof localStorage.history != "undefined") {
        console.log("saveCurrent, localStorage.history = " + saveCurrent + ", " + localStorage.history);
        var temp = JSON.stringify(saveCurrent)
        return temp + "," + localStorage.history;
    } else {
        console.log("saveCurrent = " + saveCurrent);
        return JSON.stringify(saveCurrent);
    }
}

function loadHistory() {
    if (typeof localStorage.history != "undefined") {
        var historyObj = JSON.parse("[" + localStorage.history + "]");
        console.log(historyObj);


        var string = "<h1>Local History</h1>";
        for (let i = 0; i < historyObj.length; i++) {
            string += historyObj[i].name + " has a " + historyObj[i].gender + " " + historyObj[i].pet + ". They like to play " + historyObj[i].game + ".<br>";
        }
        console.log(string);
        document.getElementById("history").innerHTML = string;
    } else {
        document.getElementById("history").innerHTML = "No History";
    }
}

function loadPreviousStorage() {
    let madLib = document.getElementById("madLib");
    let name = localStorage.name;
    let gender = localStorage.gender;
    let pet = localStorage.pet;
    let game = localStorage.game;



    console.log("typeof name = " + typeof name);
    if (localStorage.length != 0) {
        console.log("if name = " + name);
        let madLibString = name + " has a " + gender + " " + pet + ". They like to play " + game + ".";
        madLib.innerHTML = madLibString;
        document.getElementById("name").value = name;
        document.getElementById("gender").value = gender;
        document.getElementById("pet").value = pet;
        document.getElementById("game").value = game;
        loadHistory();
    } else {
        console.log("name = " + localStorage.name);
        madLib.innerHTML = "Local storage is empty.";
    }
}

function init() {
    var name = document.getElementById("name");
    var gender = document.getElementById("gender");
    var pet = document.getElementById("pet");
    var game = document.getElementById("game");
    loadPreviousStorage();
    document.getElementById("name").focus();
}