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
let time = today.getHours() + ":" + today.getMinutes();
document.getElementById("displayDateTime").innerHTML =
  daylist[day] + "  " + time;

/* change city name */

function showTemperatue(response) {
  let hightempf = document.querySelector(".hightemp");
  hightempf.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let lowtempf = document.querySelector(".lowtemp");
  lowtempf.innerHTML = `/${Math.round(response.data.main.temp_min)}°`;
}
function pressEnter(e) {
  if (e.key === "Enter") {
    let cityName = document.querySelector("#city");
    let city = document.querySelector("#form").value;
    cityName.innerHTML = city;

    let apiKey = "282e369bc66d56353f526c0bc686be2b";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperatue);
  }
}
function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city");
  let city = document.querySelector("#form").value;
  cityName.innerHTML = city;
  let apiKey = "282e369bc66d56353f526c0bc686be2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperatue);
}
let searchIcon = document.querySelector("#searchicon");
searchIcon.addEventListener("click", changeCity);
document.querySelector("#form").addEventListener("keypress", pressEnter);

/* celsius to Fahrenheit and vice versa */
function cToF(event) {
  event.preventDefault();
  let hightempf = document.querySelector(".hightemp");
  hightempf.innerHTML = `68°`;
  let lowtempf = document.querySelector(".lowtemp");
  lowtempf.innerHTML = `/63°`;
}
function fToC(event) {
  event.preventDefault();
  let hightempc = document.querySelector(".hightemp");
  hightempc.innerHTML = "20°";
  let lowtempc = document.querySelector(".lowtemp");
  lowtempc.innerHTML = "/17°";
}
let fahrenheittemperature = document.querySelector(".fahrenheit");
fahrenheittemperature.addEventListener("click", cToF);
let celsiustemperature = document.querySelector(".celsius");
celsiustemperature.addEventListener("click", fToC);

function currentLoc(response) {
  let hightempf = document.querySelector(".hightemp");
  hightempf.innerHTML = `${Math.round(response.data.main.temp)}°`;
  let lowtempf = document.querySelector(".lowtemp");
  lowtempf.innerHTML = `/${Math.round(response.data.main.temp_min)}°`;
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "282e369bc66d56353f526c0bc686be2b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(currentLoc);
}
function pressButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
document.querySelector("#currloc").addEventListener("click", pressButton);
