const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (location) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`;

async function getWeatherByLocation(location) {
  const resp = await fetch(url(location), { origin: "cors" });
  const respData = await resp.json();

  addWeatherToPage(respData);
}

//getWeatherByLocation('Binjai');

function KtoC(K) {
  return (K - 273.15).toFixed(2);
}

function addWeatherToPage(data) {
  const temp = KtoC(data.main.temp);
  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
        <h2>${temp}°C</h2>
        <small>in ${search.value.toUpperCase()}</small>
        <div class="pic">
        <img src="https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" />
        <img src="https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" />
        <img src="https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" />
        </div>
    `;
  main.innerText = "";
  main.appendChild(weather);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  if (location) {
    getWeatherByLocation(location);
  }
});
