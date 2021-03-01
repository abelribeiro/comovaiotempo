




const cepField = document.querySelector('.put-your-cep')
const submitForm = document.querySelector('.get-cep')

submitForm.addEventListener('submit', (e) => {
    let userCep = cepField.value.replace('-', '')
    e.preventDefault()
    zipRequest(userCep)
})

function zipRequest(userCep){
    fetch(`https://viacep.com.br/ws/${userCep}/json/`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        let city = data.localidade
        let uf = data.uf
        let cityReplacement = document.querySelector('.user-city')
        cityReplacement.innerHTML = `${city}, ${uf}`
        weatherIdRequest(city, uf)
    })
}
function weatherIdRequest(city, uf) {
    fetch(`https://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${city}&state=${uf}&token=c1cdba8979fd4fb41bf76d03b1d04eb9`)
    .then(response => {
        return response.json()
    })
    .then(cityData => {
        let cityID  = cityData[0].id 
        currentWeather(cityID)
    })
}

function currentWeather(cityID) {
    fetch(`http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${cityID}/current?token=c1cdba8979fd4fb41bf76d03b1d04eb9`)
    .then(response => {
        return response.json()
    })
    .then(currentData => {
        let showWeatherContent = document.querySelector('.current-weather')
        let currentTemp = document.querySelector('.current-temperature')
        let currentTempCondition = document.querySelector('.current-condition')
        let currentWind = document.querySelector('.wind')
        let currentHumidity = document.querySelector('.humidity')
        let currentPressure = document.querySelector('.pressure')
        let currentWeatherIcon = document.querySelector('.weather-icon img')
        currentWeatherIcon.src = `./img/${currentData.data.icon}.png`
        showWeatherContent.classList.remove('hidden-weather-content')
        showWeatherContent.classList.add('show-weather-content')
        currentTemp.innerHTML = currentData.data.temperature + 'º'
        currentTempCondition.innerHTML = currentData.data.condition
        currentWind.innerHTML = `Vento: ${currentData.data.wind_velocity}km/h`
        currentHumidity.innerHTML = `Umidade: ${currentData.data.humidity}`
        currentPressure.innerHTML = `Pressão: ${currentData.data.pressure}hPa`
    })
}


/*

function myCity() {

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
    .then(response => {
        return response.json()
    })
    .then (myCityData => {
        console.log(myCityData[0])
    })
}

myCity()

*/