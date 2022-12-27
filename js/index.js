let date = new Date();
let today = document.getElementById('today');
let todayDate = document.getElementById('today-date');
let cityLocation = document.getElementById('city-location');
let todayTemperature = document.getElementById('today-temperature');
let todayIcon = document.getElementById('today-icon');
let todayState = document.getElementById('today-state');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let compass = document.getElementById('compass');

let nextDay = document.querySelectorAll('.nextday');
let nextDayIcon = document.querySelectorAll('.nextday-icon');
let maxDegree = document.querySelectorAll('.max-degree');
let minDegree = document.querySelectorAll('.min-degree');
let nextDayState = document.querySelectorAll('.nextday-state');

let searchInput = document.getElementById('searchInput');
let apiRespone, finalResult;
let day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] 

async function getWeather(city = 'cairo') {
    apiRespone = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${city}&days=3`);
    finalResult = await apiRespone.json();
    displayTodayWeather();
    displayNextWeather();
}
getWeather();

function displayTodayWeather() {
    today.innerHTML = day[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${month[date.getMonth()]}`;
    cityLocation.innerHTML = finalResult.location.name;
    todayTemperature.innerHTML = finalResult.current.temp_c;
    todayIcon.setAttribute('src', `https:${finalResult.current.condition.icon}`);
    todayState.innerHTML = finalResult.current.condition.text;
    humidity.innerHTML = finalResult.current.humidity;
    wind.innerHTML = finalResult.current.wind_kph;
    compass.innerHTML = finalResult.current.wind_dir;
}

function displayNextWeather(){
    for(let i =0 ; i < nextDay.length ; i++){
        nextDay[i].innerHTML = day[new Date(finalResult.forecast.forecastday[i+1].date).getDay()] ;
        nextDayIcon[i].setAttribute('src' , `https:${finalResult.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = finalResult.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = finalResult.forecast.forecastday[i+1].day.mintemp_c;
        nextDayState[i].innerHTML = finalResult.forecast.forecastday[i+1].day.condition.text;
    }    

}
searchInput.addEventListener('keyup', function() {
    city = searchInput.value;
    getWeather(city);
})
