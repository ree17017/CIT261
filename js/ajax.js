const url = "";

function runWeatherAPI() {
    var xhttp = new XMLHttpRequest();
    var displayWeather = "";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            const weatherObj = JSON.parse(this.responseText);
            displayWeather += "<h2>" + weatherObj["name"] + "</h2>"
            displayWeather += "<ul>";
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
            document.getElementById("demo").innerHTML = displayWeather;
        } else if (this.status >= 400) {
            // 404 error
            displayWeather += "City not found. Please check your spelling.";
        }
    };
    xhttp.open("GET", stringBuilder(), true);
    xhttp.send();
}

const capitalize = (s) => {
    if (typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const kelvinToFahrenheit = (kellvin) => {
    console.log(typeof kellvin);
    if (typeof kellvin !== "number") return kellvin
    return (kellvin - 273.15) * 9 / 5 + 32;
}

function stringBuilder() {
    var city = document.getElementById("city");
    return "http://api.openweathermap.org/data/2.5/weather?q=" + city.value + " &APPID=bc98b09ff043d5ccd569bc18d0135641";
}

document.getElementById("loadWeather").addEventListener("click", runWeatherAPI);