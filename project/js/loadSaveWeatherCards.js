// {/* <script src="js/ajax.js"></script> */}

function loadHistory() {
    if (typeof localStorage.history != "undefined") {
        var historyObj = JSON.parse("[" + localStorage.history + "]");
        console.log(historyObj);
    }
}

function createJSON() {
    let city = document.getElementById("city");

    return { "city": city };
}

function getHistory() {
    if (typeof localStorage.weatherCards != "undefined") {
        var historyObj = JSON.parse("[" + localStorage.weatherCards + "]");
        console.log('historyObj: ', historyObj);
    }

    for (let i = 0; i < historyObj.length; i++) {
        
    }
}

