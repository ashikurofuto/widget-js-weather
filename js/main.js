 const apiKey = "ae3ec91bb102709320c0d7e56bc89cc6";
 const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");

 searchButton.addEventListener('click', ()=> {
    checkWeather(searchInput.value);
    searchInput.value = "";
 }); 
 
 searchInput.addEventListener('keydown', (event)=> {
    if(event.keyCode === 13) {
        checkWeather(searchInput.value);
        searchInput.value = "";
    }
 }); 

 function innerExtension(tag, data)
 {
    document.querySelector(tag).innerHTML = data;
 }


 function checkWeather(city)
 {
    fetch(url + city + '&appid='+ apiKey)
    .then(resp => {
        if(resp.status === 404){
            error.style.display = "block";
            weather.style.display = "none";
        }
        return resp.json()
    })
    .then(data => {
        innerExtension(".city",data.name);
        innerExtension(".temp",Math.round(data.main.temp) + '&#8451');
        innerExtension(".humidity",data.main.humidity + "%");
        innerExtension(".wind",data.wind.speed + " m/c");

        if(data.weather[0].main == "Clear") {
            weatherIcon.className ="fa-solid fa-sun";
         }
         else if(data.weather[0].main == "Rain") {
             weatherIcon.className = "fa-solid fa-cloud-rain";
         }
         else if(data.weather[0].main == "Mist") {
             weatherIcon.className = "fa-solid fa-cloud-mist";
         }
         else if(data.weather[0].main == "Drizzle") {
             weatherIcon.className = "fa-solid fa-cloud-drizzle";
         }
         else {
            weatherIcon.className = "fa-solid fa-cloud";
         }
        weather.style.display = "block";
        error.style.display = "none";
    }); 
 }




 