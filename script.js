const img = document.querySelector(".weather img");
const temp = document.querySelector(".weather .temp");
const cityEl = document.querySelector(".weather .city");
const card = document.querySelector(".card");

const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// click
searchBtn.addEventListener("click", () => {
    const cityName = searchInput.value.trim();
    if (cityName) {
        getWeather(cityName);
    }
});

// enter key
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const cityName = searchInput.value.trim();
        if (cityName) {
            getWeather(cityName);
        }
    }
});

async function getWeather(city) {
    const apiKey = "6c977931cfe3bb6a677501f9f1c06a82";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        cityEl.textContent = "Loading... ⏳";

        const res = await fetch(url);
        const data = await res.json();

        if (data.cod !== 200) {
            cityEl.textContent = "City not found 😢";
            temp.textContent = "--";
            return;
        }

        // update DOM
        img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.textContent = `${data.main.temp}°C`;
        cityEl.textContent = data.name;

        // 🎨 WEATHER BASED BACKGROUND
        const condition = data.weather[0].main;

        if (condition === "Clear") {
            card.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
        } else if (condition === "Rain") {
            card.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
        } else if (condition === "Clouds") {
            card.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
        } else {
            card.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
        }

        // save
        localStorage.setItem("lastWeather", JSON.stringify(data));

    } catch (err) {
        cityEl.textContent = "Error 😭";
        console.error(err);
    }
}

// load from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const lastWeather = localStorage.getItem("lastWeather");

    if (lastWeather) {
        const data = JSON.parse(lastWeather);

        img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.textContent = `${data.main.temp}°C`;
        cityEl.textContent = data.name;

        // same gradient on reload
        const condition = data.weather[0].main;

        if (condition === "Clear") {
            card.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
        } else if (condition === "Rain") {
            card.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
        } else if (condition === "Clouds") {
            card.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
        } else {
            card.style.background = "linear-gradient(135deg, #89f7fe, #66a6ff)";
        }
    }
});
