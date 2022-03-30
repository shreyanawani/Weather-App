const cityName = document.querySelector("input");
const checkWeather = document.querySelector("#sub");
const temperature = document.querySelector(".temp");
const description = document.querySelector(".desc");
const place = document.querySelector(".place");
const icon = document.querySelector("img");

cityName.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && cityName.value != "") {
    requestApi(cityName.value);
  }
});

checkWeather.addEventListener("click", () => {
  if (cityName.value != "") {
    requestApi(cityName.value);
  }
});

const requestApi = (city) => {
  let api = `https:/api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=83dd3b038bb8688f573fc802158272de&units=metric`;
  axios
    .get(api)
    .then((response) => {
      WeatherDetails(response);
    })
    .catch((err) => {
      description.innerText = "Oops there is some error";
      temperature.innerText = "";
      place.innerText = "";
      icon.src = "sun.gif";
    });
};

const WeatherDetails = (info) => {
  console.log(info);
  temperature.innerText = info.data.main.temp + "\u00B0" + "C";
  description.innerText = info.data.weather[0].description;
  place.innerText = info.data.name;
  const id = info.data.weather[0].id;

  if (id == 800) {
    icon.src = "icons/clear.svg";
  } else if (id >= 200 && id <= 232) {
    icon.src = "icons/storm.svg";
  } else if (id >= 600 && id <= 622) {
    icon.src = "icons/snow.svg";
  } else if (id >= 701 && id <= 781) {
    icon.src = "icons/haze.svg";
  } else if (id >= 801 && id <= 804) {
    icon.src = "icons/cloud.svg";
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    icon.src = "icons/rain.svg";
  }
};
