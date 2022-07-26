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

/* search engine */

function showTemperature(response) {
  document.querySelector(".hightemp").innerHTML = `${Math.round(response.data.main.temp)}°`;
  document.querySelector(".lowtemp").innerHTML = `/${Math.round(response.data.main.temp_min)}°`;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#humidity").innerHTML = `${Math.round(response.data.main.humidity)} %`;
  document.querySelector("#status").innerHTML = `${response.data.weather[0].description}`;
  celsiushightemp = Math.round(response.data.main.temp);
  celsiuslowtemp = Math.round(response.data.main.temp_min);
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


document.getElementById("displayDateTime").innerHTML =
  daylist[day] + "  " + today.getHours() + ":" + today.getMinutes();

document.querySelector("#searchicon").addEventListener("click", changeCitySubmit);
document.querySelector("#form").addEventListener("keypress", changeCityEnter);

document.querySelector("#fahrenheit").addEventListener("click", cToF);
document.querySelector("#celsius").addEventListener("click", fToC);

let celsiushightemp = null;
let celsiuslowtemp = null;
search("Berlin");