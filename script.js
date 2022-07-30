/* Show date and time*/

let today = new Date();
let day = today.getDay();
let daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];
let minute = today.getMinutes();
if (minute<10){
  minute = `0${minute}`;
}
let hour = today.getHours();
if (hour<10){
  hour = `0${hour}`;
}
/* weather icon */

function weathericon(status){
  if (status === "01d"){
    document.querySelector("img").src = "images/sun/26.png"
  }
  else if (status === "02d"){
    document.querySelector("img").src = "images/sun/27.png"
  }
  else if (status === "03d"){
    document.querySelector("img").src = "images/cloud/33.png"
  }
  else if (status === "04d"){
    document.querySelector("img").src = "images/sun/4.png"
  }
  else if (status === "50d"){
    document.querySelector("img").src = "images/cloud/35.png"
  }
  else if (status === "09d"){
    document.querySelector("img").src = "images/cloud/7.png"
  }
  else if (status === "10d"){
    document.querySelector("img").src = "images/cloud/5.png"
  }
  else if (status === "11d"){
    document.querySelector("img").src = "images/cloud/17.png"
  }
  else if (status === "13d"){
    document.querySelector("img").src = "images/cloud/23.png"
  }
  else if (status === "01n"){
    document.querySelector("img").src = "images/moon/10.png"
  }
  else if (status === "02n"){
    document.querySelector("img").src = "images/moon/15.png"
  }
  else if (status === "03n"){
    document.querySelector("img").src = "images/moon/41.png"
  }
  else if (status === "04n"){
    document.querySelector("img").src = "images/cloud/35.png"
  }
}
/* search engine */

function showTemperature(response) {
  document.querySelector(".hightemp").innerHTML = `${Math.round(response.data.main.temp)}°`;
  document.querySelector(".lowtemp").innerHTML = `/${Math.round(response.data.main.temp_min)}°`;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#humidity").innerHTML = `${Math.round(response.data.main.humidity)} %`;
  document.querySelector("#status").innerHTML = `${response.data.weather[0].description}`;
  weathericon(response.data.weather[0].icon);
  celsiushightemp = Math.round(response.data.main.temp);
  celsiuslowtemp = Math.round(response.data.main.temp_min);
  getForecast(response.data.coord);
}

function search(city){
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

}

function changeCitySubmit(event) {
  event.preventDefault();
  document.querySelector("#city").innerHTML = document.querySelector("#form").value;
  search(document.querySelector("#form").value);
}
function changeCityEnter(e) {
  if (e.key === "Enter") {
  document.querySelector("#city").innerHTML = document.querySelector("#form").value;
  let city = document.querySelector("#form").value;
  search(city);
  }
}

/* celsius to Fahrenheit and vice versa */

function cToF(event) {
  event.preventDefault();
  document.querySelector("#fahrenheit").classList.add("deactive");
  document.querySelector("#celsius").classList.remove("deactive");
  document.querySelector(".hightemp").innerHTML = `${Math.round((celsiushightemp)*9/5 + 32)}°`;
  document.querySelector(".lowtemp").innerHTML = `/${Math.round((celsiuslowtemp)*9/5 + 32)}°`;
}
function fToC(event) {
  event.preventDefault();
  document.querySelector("#celsius").classList.add("deactive");
  document.querySelector("#fahrenheit").classList.remove("deactive");
  document.querySelector(".hightemp").innerHTML = `${celsiushightemp}°`;;
  document.querySelector(".lowtemp").innerHTML = `/${celsiuslowtemp}°`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="row f">
        <div class="col-4 five">${formatDay(forecastDay.dt)}</div>
        <div class="col-4">        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /> ${forecastDay.weather[0].description}</div>
        <div class="col-4"><span class="ht">+${Math.round(
          forecastDay.temp.max
        )}°
          </span> +${Math.round(forecastDay.temp.min)}°</div>
        </div>
  `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}
 

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

document.getElementById("displayDateTime").innerHTML =
  daylist[day] + "  " + hour + ":" + minute;

document.querySelector("#searchicon").addEventListener("click", changeCitySubmit);
document.querySelector("#form").addEventListener("keypress", changeCityEnter);

document.querySelector("#fahrenheit").addEventListener("click", cToF);
document.querySelector("#celsius").addEventListener("click", fToC);

let celsiushightemp = null;
let celsiuslowtemp = null;

search("Berlin");