
//con questa parte collego l'API del weather per creare la var data che non è altro che un oggetto contente tutte le info che ci servono (nome città, umidità, temperatura, vento ...)
const apiKye = "c0a117b03bdf08a241be69300f32e508";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

//la funzione collegherà apiUrl con il nome della città inserita + la apiKye
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKye}`);

    //se in nome della città inserito come input da errore 404(ovvero è invalido) verrà svolta sto codice
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }else{
    var data = await response.json();

    //cambio l'innerHTML con i dati derivanti dall'oggetto data creato grazie all'API
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    //aggiorneremo le immagini relativamente alle condizioni del meteo (ovvero data > weather > main)
    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";
    }else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";
    }else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }

    //il div weather rimarrà nascosta fino a quando non verrà chiamata la funzione checkWeather
    document.querySelector(".weather").style.display = "block";

    document.querySelector(".error").style.display = "none";
    }
    
}

//quando clicco su searchBtn farò partire la funzione checkWeather con il nome della città scritta nell'input (che sarà quindi il value dell'input)
searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})