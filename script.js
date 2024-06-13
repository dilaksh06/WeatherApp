function getWeather() {
    //45f7065757163068236174cbce0fdf64
    const apikey = "45f7065757163068236174cbce0fdf64";
    const city = document.getElementById('city').value;

    if (!city) {
        alert("please enter a city name");
        return false;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apikey}&units=metric`;



    fetch(currentWeatherUrl).then(response => response.json())
        .then(data => {
            displayWeather(data);
            console.log(data);
        }).catch(error => {
            console.error('Error fetching current weather data', error);
            alert("errroe");
        });

    fetch(forecastUrl).then(response => response.json())
        .then(data => {
            displayHourlyForcast(data.list)
        }).catch(error => {
            console.error("error fetching", error);
            alert("error fetching hourly foecasst");
        })

}

function displayWeather(data) {
    const tempDIvInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hoourlyForecasDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hoourlyForecasDiv.innerHTML = '';
    tempDIvInfo.innerHTML = '';

    if (data === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;

    } else {
        const cityname = data.name;
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHTML = ` <p>${temperature} &deg;C</p>`;
        const weatherHTML = `<p>${cityname}</p> <p>${description}</P>`;

        tempDIvInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        showImage();
    }

}

function displayHourlyForcast(hourlyData) {
    const hoourlyForecasDiv = document.getElementById('hourly-forecast');
    const next24 = hourlyData.slice(0, 8);
    next24.forEach(item => {
        const dateTIme = new Date(item.dt * 1000);
        const hour = dateTIme.getHours();
        const temperature = item.main.temp
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItmeHtml = `<div class="hourly-item">
         <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
           <span> ${temperature}&deg;C </span>
            </div>`;
        hoourlyForecasDiv.innerHTML += hourlyItmeHtml;
    });
}

function showImage() {
    {
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.style.display = 'block';
    }
}