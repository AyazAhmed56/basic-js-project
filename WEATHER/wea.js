const apiKey = `e212b8064ce439725f143290a7fcdd86`;

async function fetchWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        
        if(!response.ok)
            {
                console.log("UNABLE TO FETCH DATA");
                alert("spelling mistake");
            }
        const data = await response.json();
        console.log(data);
        // console.log(data.main.temp);
        // console.log(data.name);
        updateWeatherUI(data);
    }
    catch(error)
    {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".degree");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity-percent");
const visibility = document.querySelector(".visible");
const description = document.querySelector(".desc-text");
const date = document.querySelector(".date");
const icon = document.querySelector(".desc i")

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity} %`;
    visibility.textContent = `${data.visibility} km`;
    description.textContent = data.weather[0].description;
    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    icon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search");
const inputElement = document.querySelector(".input");

formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    const city = inputElement.value;
    if(city !== "")
        {
            fetchWeatherData(city);
            inputElement.value = "";
        }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help"
}