function formatDate(date) {
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentHour = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let currentMinutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

  return `<br />
  <br />
  ${currentMonth} ${currentDate}, ${currentYear}
  <br />
  <span class="currentTime">${currentDay} ${currentHour}:${currentMinutes}</span>`;
}

let now = new Date();
let date = document.querySelector("h1");
date.innerHTML = formatDate(now);

function showWeather(response) {
  document.querySelector("h3").innerHTML = response.data.name;
  document.querySelector("h2").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  let minTemp = Math.round(response.data.main.temp_min);
  let maxTemp = Math.round(response.data.main.temp_max);
  document.querySelector(
    "#temperature-span"
  ).innerHTML = `${minTemp}°C / ${maxTemp}°C`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "23f36f924c54872c0021ed29214126a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "23f36f924c54872c0021ed29214126a5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#searchCityForm");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Frankfurt");
