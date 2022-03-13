window.addEventListener("load", () => {
  let apiKey = "a8f6179630de50582203e8324ec4a157";

  const searchButtonEl = document.querySelector(".search button");
  const searchBarEl = document.querySelector(".search-bar");

  let lat;
  let lon;

  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data));
  });

  searchButtonEl.addEventListener("click", () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBarEl.value}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data));
  });
});

const displayWeather = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  const cityEl = document.querySelector(".city");
  const iconEl = document.querySelector(".icon");
  const descriptionEl = document.querySelector(".description");
  const temperatureEl = document.querySelector(".temperature");
  const humidityEl = document.querySelector(".humidity");
  const windEl = document.querySelector(".wind");

  document.body.style.backgroundColor = `url('https://source.unsplash.com/1600x900/?"${name}"')`;

  cityEl.innerText = name;
  iconEl.src = `https://openweathermap.org/img/wn/${icon}.png`;
  descriptionEl.innerText = description;
  temperatureEl.innerHTML = `${Math.round(temp)}&deg;C`;
  humidityEl.innerText = `Humidity: ${humidity}%`;
  windEl.innerText = `Wind speed: ${speed.toFixed(2)} km/h`;
};
