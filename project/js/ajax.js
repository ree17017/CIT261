const url = "";

function runWeatherAPI() {
    var xhttp = new XMLHttpRequest();
    var displayWeather = "";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            const weatherObj = JSON.parse(this.responseText);
            if (weatherObj["name"] === "") {
                displayWeather += "<li>Failed to load weather.</li>";
            } else {
                // displayWeather += "<ul>";
                console.log('weatherObj["name"]: ', weatherObj["name"]);

                displayWeather += "<li><h2>" + weatherObj["name"] + "</h2></li>"
                displayWeather += "<hr>";
                for (var property in weatherObj) {
                    if (property === "coord") {
                        var lon = weatherObj[property].lon;
                        var lat = weatherObj[property].lat;
                        displayWeather += "<li>" + capitalize("lon") + ": " + weatherObj[property].lon + "</li>"
                        displayWeather += "<li>" + capitalize("lat") + ": " + weatherObj[property].lat + "</li>"
                    } else if (property === "weather") {
                        for (var weather in weatherObj[property][0]) {
                            displayWeather += "<li>" + capitalize(weather) + ": " + weatherObj[property][0][weather] + "</li>"
                        }
                    } else if (property === "main") {
                        for (var main in weatherObj[property]) {
                            displayWeather += "<li>" + capitalize(main) + ": ";
                            displayWeather += (main === "temp" || main === "temp_min" || main === "temp_max") ? kelvinToFahrenheit(weatherObj[property][main]).toFixed(1) : weatherObj[property][main];
                            displayWeather += (main === "temp" || main === "temp_min" || main === "temp_max") ? "F</li>" : "</li>";
                        }
                    } else if (property === "wind") {
                        for (var wind in weatherObj[property]) {
                            displayWeather += "<li>" + capitalize(wind) + ": " + weatherObj[property][wind] + "<div class='windmill'></div></li>"
                        }
                    }
                }

                var cityName = weatherObj["name"];
                console.log('cityName: ', cityName);
                if (!document.getElementById(cityName)) {
                    weatherCard(cityName);
                    let temp = kelvinToFahrenheit(weatherObj["main"]["temp"]);
                    weatherColor(cityName, temp);
                    saveWeatherCard(displayWeather, cityName);
                    addWeather(cityName, displayWeather);
                    addBar(cityName);
                    // document.getElementById(cityName + "_weather").innerHTML = displayWeather;
                } else {
                    weatherCard("error")
                    var displayError = "<ul><li><h3>ERROR</h3></li>";
                    displayError += "<li>Please check your spelling.</li>";
                    displayError += "<li>Please do not try to add the same <br> city more than one time.</li>";
                    displayError += "</ul>";
                    document.getElementById('error').innerHTML = displayError;
                    removeErrorCard();
                }
            }
        } else if (this.status >= 400) {
            // 404 error
            displayWeather = "<ul><li>City not found. Please check your spelling.</li></ul>";
            document.getElementById().innerHTML += displayWeather;
        }
    };
    xhttp.open("GET", stringBuilder(), true);
    xhttp.send();
}

function weatherColor(cityName, temp) {
    let weatherCardID = document.getElementById(cityName);
    if (temp === 0) {
        weatherCardID.setAttribute('class', "cool")
        return;
    }

    if (temp >= 90) {
        weatherCardID.setAttribute('class', "hot");
    } else if (temp >= 32.1 && temp <= 89.99) {
        weatherCardID.setAttribute('class', 'cool');
    } else if (temp <= 32) {
        weatherCardID.setAttribute('class', 'cold');
    }
}

function removeErrorCard() {
    // remove error card after 20-30 seconds
    setTimeout(removeWeatherCard, 10000);
}

function removeWeatherCard(cityName = "error") {
    if (cityName === "error") {
        console.log('removeWeatherCard() -> cityName: ', typeof cityName);
        var weatherCardList = document.getElementById("weatherList");
        weatherCardList.removeChild(document.getElementById(cityName));
        console.log('I got deleted');
    } else if (confirm(`Are you sure you want to remove ${cityName}?`)) {
        console.log('removeWeatherCard() -> cityName: ', typeof cityName);
        var weatherCardList = document.getElementById("weatherList");
        weatherCardList.removeChild(document.getElementById(cityName));
        console.log('I got deleted');
    }
}

function weatherCard(cityName) {
    console.log("weatherCard() -> cityName: ", cityName);
    if (cityName == "" || cityName == undefined) return;

    var node = document.createElement("DIV");
    var weather = document.createElement("UL");

    weather.setAttribute("id", cityName + "_weather");
    node.setAttribute("id", cityName);

    document.getElementById("weatherList").appendChild(node);
    console.log('document.getElementById(cityName).appendChild(bar);: ', document.getElementById(cityName));
}

function addBar(cityName) {
    console.log();
    var bar = document.createElement("DIV");

    bar.innerHTML = `<div class='bar1'></div><div class='bar2'></div><div class='bar3'></div>`;
    bar.setAttribute("onclick", `removeWeatherCard("${cityName}")`);
    bar.setAttribute("class", "bar");
    console.log('bar.innerHTML: ', bar.innerHTML);

    document.getElementById(cityName).appendChild(bar);
}

function addWeather(cityName, weatherObj) {
    var weather = document.createElement("UL");
    weather.innerHTML = weatherObj;
    console.log('weather: ', weather);
    document.getElementById(cityName).appendChild(weather);
}


const capitalize = (s) => {
    if (typeof s !== 'string') return s;
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const kelvinToFahrenheit = (kellvin) => {

    if (typeof kellvin !== "number") return kellvin;

    return (kellvin - 273.15) * 9 / 5 + 32;
}

function stringBuilder() {
    var city = document.getElementById("cityName");
    return "http://api.openweathermap.org/data/2.5/weather?q=" + city.value + " &APPID=bc98b09ff043d5ccd569bc18d0135641";
}

function saveWeatherCard(weatherObj, cityName) {
    console.log('weatherObj: ', weatherObj);
    var history = localStorage.history;

    var temp = { "cityName": cityName, "weather": weatherObj };

    if (typeof history != "undefined") {
        console.log('temp: ', temp);
        localStorage.history = JSON.stringify(temp) + "," + localStorage.history;
    } else {
        localStorage.history = JSON.stringify(temp);
        console.log("else", temp);
    }
    document.getElementById("clearLocalStorage").style.display = "block";
}

function loadWeatherCard() {
    if (localStorage.history != undefined) {
        document.getElementById("clearLocalStorage").style.display = "block";
        var historyObj = JSON.parse("[" + localStorage.history + "]");
        console.log('loadWeatherCard() -> historyObj: ', historyObj);

        for (var i = 0; i < historyObj.length; i++) {
            weatherCard(historyObj[i].cityName);
            document.getElementById(historyObj[i].cityName).innerHTML = historyObj[i].weather;
            weatherColor(historyObj[i].cityName, temp = 0);
            addBar(historyObj[i].cityName);
        }
    } else {
        document.getElementById("clearLocalStorage").style.display = "none";
    }
}
function clearText() {
    document.getElementById("cityName").value = "";
}

function clearLocalStorage() {
    if (confirm(`Are you sure you want to clear Local Storage?`)) {
        localStorage.clear();
        document.getElementById("clearLocalStorage").classList.add("exit");
        setTimeout(removeLocalStorageButton, 4500);
    }
}

var removeLocalStorageButton = () => {
    document.getElementById("clearLocalStorage").style.display = "none";
};
document.getElementById
document.getElementById("clearLocalStorage").addEventListener("click", clearLocalStorage);
document.getElementById("clear").addEventListener("click", clearText);
document.getElementById("loadWeather").addEventListener("click", runWeatherAPI);

window.onload = function () { loadWeatherCard() }