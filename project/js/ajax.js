const url = "";

function runWeatherAPI() {
    var xhttp = new XMLHttpRequest();
    var displayWeather = "";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            const weatherObj = JSON.parse(this.responseText);
            if (weatherObj["name"] === "") {
                displayWeather += "<ul><li>Failed to load weather.</li></ul>";
            } else {
                displayWeather += "<ul>";
                displayWeather += "<div class='bar'><div class='bar1'></div><div class='bar2'></div><div class='bar3'></div></div>"
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
                            displayWeather += "<li>" + capitalize(wind) + ": " + weatherObj[property][wind] + "</li>"
                        }
                    }

                }
                displayWeather += "</ul>";

                let cityName = weatherObj["name"];
                if (!document.getElementById(cityName)) {
                    weatherCard(cityName);
                    let temp = kelvinToFahrenheit(weatherObj["main"]["temp"]);
                    console.log('kelvinToFahrenheit(weatherObj["main"]["temp"]): ', kelvinToFahrenheit(weatherObj["main"]["temp"]));
                    weatherColor(cityName, temp);
                    document.getElementById(cityName).innerHTML = displayWeather;
                } else {
                    weatherCard("error")
                    var displayError = "<ul><li><h3>ERROR</h3></li></ul>";
                    document.getElementById('error').innerHTML = displayError;
                }
            }
        } else if (this.status >= 400) {
            // 404 error
            weatherCard(weatherObj["name"])
            displayWeather = "<ul><li>City not found. Please check your spelling.</li></ul>";
            document.getElementById().innerHTML = displayWeather;
        }
    };
    xhttp.open("GET", stringBuilder(), true);
    xhttp.send();
}

function weatherColor(cityName, temp) {
    let weatherCardID = document.getElementById(cityName);
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
}

function weatherCard(cityName) {
    var node = document.createElement("DIV");
    console.log('node: ', node);
    node.setAttribute("id", cityName);
    console.log(node);
    document.getElementById("weatherList").appendChild(node);
}


const capitalize = (s) => {
    if (typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const kelvinToFahrenheit = (kellvin) => {
    if (typeof kellvin !== "number") return kellvin
    return (kellvin - 273.15) * 9 / 5 + 32;
}

function stringBuilder() {
    var city = document.getElementById("cityName");
    return "http://api.openweathermap.org/data/2.5/weather?q=" + city.value + " &APPID=bc98b09ff043d5ccd569bc18d0135641";
}

document.getElementById("loadWeather").addEventListener("click", runWeatherAPI);