'use strict';

let d = document;
let videoResponseContainer = d.getElementById('video-response-container');
let responseContainer = d.getElementById('response-container');
let searchInput = d.createElement('input');
let searchSubmit = d.createElement('button');
let searchIcon = d.createElement('img');
searchInput.setAttribute('type', 'text');
searchInput.placeholder = "Enter the city or place for weather report!";
searchInput.className = 'input_text form-control';
searchInput.id = 'search-value';
searchIcon.src = 'imgs/search.svg'
searchSubmit.className = 'submit btn ';
searchSubmit.innerHTML = 'Search';
searchSubmit.appendChild(searchIcon);
let searchBar = d.getElementById('search-bar');
searchBar.appendChild(searchInput);
searchBar.appendChild(searchSubmit);
let lastEntryData = {
    name: '',
    main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
    },
    wind: {
        speed: 0,        
    },
    weather: 
        [{
            main: '',
            description: '',  
            icon: '',          
        }]
    ,
};
let data = {};
const API_KEY = '4bd67f987db0bea3e98dcf5bfb3258f8';


if (localStorage.data) {
    data = JSON.parse(localStorage.data);    
    deliverData(data);    
}

searchSubmit.addEventListener('click', () => {    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(
            data => {                               
                storeData(data);
                deliverData(data);            
            }
        )
        .catch((error) => {alert( `Ah ah ah, you didn't say the magic word! Try again with anotherone`)});

} );

searchInput.addEventListener('keypress', (event) => {    
    if (event.key === "Enter") {
        event.preventDefault();
        searchSubmit.click();
      }
} );

function deliverData(data) {
    let placeTitle = d.createElement('h2');
    let dataList = d.createElement('ul');
    let currentTemp = d.createElement('li');
    let maxTemp = d.createElement('li');
    let minTemp = d.createElement('li');
    let humidity = d.createElement('li');
    let feelsLike = d.createElement('li');
    let pressure = d.createElement('li');
    let windSpeed = d.createElement('li');
    let weatherCondition = d.createElement('li');
    let newSearchButton = d.createElement('button');
    let videoIframeContainer = d.createElement('div');


    placeTitle.id = 'place-title';
    dataList.id = 'data-list';
    placeTitle.innerHTML = 'Current Weather in ' + data['name'];
    currentTemp.innerHTML = '<span class= "inner-list-item">Temperature: </span>' + data['main']['temp'] + '°C';
    maxTemp.innerHTML = '<span class= "inner-list-item">Max. Temp.: </span>' + data['main']['temp_max'] + '°C';
    minTemp.innerHTML = '<span class= "inner-list-item">Min. Temp.: </span>' + data['main']['temp_min'] + '°C';
    humidity.innerHTML = '<span class= "inner-list-item">Humidity: </span>' + data['main']['humidity'] + '%';
    feelsLike.innerHTML = '<span class= "inner-list-item">Feels Like: </span>' + data['main']['feels_like'] + '°C';
    pressure.innerHTML = '<span class= "inner-list-item">Pressure: </span>' + data['main']['pressure'] + 'hPa';
    windSpeed.innerHTML = '<span class= "inner-list-item">Wind Speed: </span>' + data['wind']['speed'] + ' meter/sec';                
    weatherCondition.innerHTML = '<span class= "inner-list-item">Weather condition: </span>' + data['weather'][0]['description'] + ' ' + `<img src="imgs/${data['weather'][0]['icon']}.png" alt="${data['weather'][0]['description']}"/>`
    newSearchButton.innerHTML = 'Search another place'; 
    newSearchButton.id = 'new-search-button';
    newSearchButton.className = 'new-search-button btn p-3 mb-3 align-self-center';
    videoIframeContainer.className = 'video-iframe-container'
    videoIframeContainer.innerHTML = ` <iframe src="https://www.youtube.com/embed/${backgroundVideoToggle(data['weather'][0]['icon'])}?start=10&controls=0&showinfo=0&rel=0&autoplay=1&controls=0&loop=1&mute=1&playlist=${backgroundVideoToggle(data['weather'][0]['icon'])}" frameborder="0" allowfullscreen allow="autoplay"></iframe>`


    dataList.appendChild(currentTemp);
    dataList.appendChild(maxTemp);
    dataList.appendChild(minTemp);
    dataList.appendChild(humidity);
    dataList.appendChild(feelsLike);
    dataList.appendChild(pressure);
    dataList.appendChild(windSpeed);
    dataList.appendChild(weatherCondition);
    responseContainer.className = "container card mt-5"
    responseContainer.appendChild(placeTitle);
    responseContainer.appendChild(dataList);
    responseContainer.appendChild(newSearchButton);
    videoResponseContainer.appendChild(videoIframeContainer);
    searchBar.remove();

    newSearchButton.addEventListener('click', () => {
        localStorage.clear();
        window.location.reload();
        
    } )

    searchInput.value ="";

}

function storeData(apiData) {
    lastEntryData.name = apiData['name'];
    lastEntryData.main.temp = apiData['main']['temp'];
    lastEntryData.main.temp_max = apiData['main']['temp_max'];
    lastEntryData.main.temp_min = apiData['main']['temp_min'];
    lastEntryData.main.humidity = apiData['main']['humidity'];
    lastEntryData.main.feels_like = apiData['main']['feels_like'];
    lastEntryData.main.pressure = apiData['main']['pressure'];
    lastEntryData.wind.speed = apiData['wind']['speed'];
    lastEntryData.weather[0].main = apiData['weather'][0]['main'];
    lastEntryData.weather[0].description = apiData['weather'][0]['description'];
    lastEntryData.weather[0].icon = apiData['weather'][0]['icon'];
    
    localStorage.data = JSON.stringify(lastEntryData);
}

function backgroundVideoToggle(weatherCondition) {

    

    let clearSkyDayUrl = '6_dIwlftUkA';
    let clearSkyNightUrl = '4jTQbPXyBp4';
    let fewCloudsDayUrl = 'OJePtI73TwI';
    let fewCloudsNightUrl = 'dP2RpWM4vz8';
    let scatteredCloudsDayUrl = '1VW0SifQdKE';
    let scatteredCloudsNightUrl = '6q1UhzWexmM';
    let brokenCloudsDayUrl = 'LlidKa1C1Ug';
    let brokenCloudsNightUrl = 'B_ZxezFynEA';
    let showerRainDayUrl = 'yjG_kqE9Wtw';
    let showerRainNightUrl = 'x7SQaDTSrVg';
    let rainDayUrl = 'SfCkAOA090k';
    let rainNIghtUrl = '6FAoy-P1GJA';
    let thunderstormDayUrl = 'tY-obzTGg9o';
    let thunderstormNightUrl = 'gVKEM4K8J8A';
    let snowDayUrl = 'vz91QpgUjFc';
    let snowNightUrl = 'yamiiGk6aSs';
    let mistDayUrl = 'lxTbMx1RW2o';
    let mistNightUrl = 'rkaWHmLB3fQ';


    if(weatherCondition === "01d") {
        return clearSkyDayUrl;
    } else if(weatherCondition === "01n") {
        return clearSkyNightUrl;
    } else if(weatherCondition === "02d") {
        return fewCloudsDayUrl;
    } else if(weatherCondition === "02n") {
        return fewCloudsNightUrl;
    } else if(weatherCondition === "03d") {
        return scatteredCloudsDayUrl;
    } else if(weatherCondition === "03n") {
        return scatteredCloudsNightUrl;
    } else if(weatherCondition === "04d") {
        return brokenCloudsDayUrl;
    } else if(weatherCondition === "04n") {
        return brokenCloudsNightUrl;
    } else if(weatherCondition === "09d") {
        return showerRainDayUrl;
    } else if(weatherCondition === "09n") {
        return showerRainNightUrl;
    } else if(weatherCondition === "10d") {
        return rainDayUrl;
    } else if(weatherCondition === "10n") {
        return rainNIghtUrl;
    } else if(weatherCondition === "11d") {
        return thunderstormDayUrl;
    } else if(weatherCondition === "11n") {
        return thunderstormNightUrl;
    } else if(weatherCondition === "13d") {
        return snowDayUrl;
    } else if(weatherCondition === "13n") {
        return snowNightUrl;
    } else if(weatherCondition === "50d") {
        return mistDayUrl;
    } else if(weatherCondition === "50n") {
        return mistNightUrl;
    } else {
        return 'W0LHTWG-UmQ';
    }



}