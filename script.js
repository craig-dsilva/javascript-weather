const weather = () => {
  let apiKey = "a8f6179630de50582203e8324ec4a157";

  const searchButtonEl = document.querySelector(".search button");
  const searchBarEl = document.querySelector(".search-bar");

  document.body.style.backgroundImage = 'url("img/london.jpg")';
  // Photo by Benjamin Davies on Unsplash

  // If the user's location is available this will render the data for that location
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data));
  });

  // Users can manually search for locations
  searchButtonEl.addEventListener("click", () => {
    document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${searchBarEl.value}")`;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBarEl.value}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => displayWeather(data));

    searchBarEl.value = ""; // Clears the search input when the search button is clicked
  });
};

const displayWeather = (data) => {
  // Destructures the data/object
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, feels_like, humidity } = data.main;
  const { speed } = data.wind;

  const cityEl = document.querySelector(".city");
  const iconEl = document.querySelector(".icon");
  const descriptionEl = document.querySelector(".description");
  const temperatureEl = document.querySelector(".temperature");
  const feelsLikeEl = document.querySelector(".feels-like");
  const humidityEl = document.querySelector(".humidity");
  const windEl = document.querySelector(".wind");

  cityEl.innerText = name;
  iconEl.src = `https://openweathermap.org/img/wn/${icon}.png`; // Renders an icon according to the weather condition provided by the api
  temperatureEl.innerHTML = `${Math.round(temp)}&deg;C`;
  feelsLikeEl.innerHTML = `Feels like ${Math.round(feels_like)}&deg;C`;
  descriptionEl.innerText = description;
  humidityEl.innerText = `Humidity: ${humidity}%`;
  windEl.innerText = `Wind speed: ${Math.round(speed * 3.6)} km/h`;
};

window.onload = weather;
