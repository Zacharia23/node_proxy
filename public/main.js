const weatherDisplay = document.querySelector('.weather')
const weatherForm = document.querySelector('#weather-form')
const cityInput = document.querySelector('#city-input')

/* Fetch Weather Data From API */

const fetchWeather = async (city) => {
    const url = `/api?q=${city}`;
    
    const res = await fetch(url)
    const data = await res.json()

    if(data.cod === '404') {
        alert('City Not Found')
        return
    }

    const displatData = {  
        city: data.name,
        temp: kelvinToFarenheit(data.main.temp),
    }

    addWeatherToDOM(displatData)
}

const addWeatherToDOM = (data) => {
    weatherDisplay.innerHTML = `<h2> Weather in ${data.city} </h2>
    <h3>${data.temp} &deg;F</h3>
    `

    cityInput.value = ''
}

const kelvinToFarenheit = (temp) => {
    return Math.ceil(((temp - 273.15) * 9) / 5 + 32)
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    if (cityInput.value === '') {
        alert('Please Enter a City...')
    } else {
        fetchWeather(cityInput.value)
    }
})
