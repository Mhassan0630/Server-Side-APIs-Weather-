var key = '66ab4b644320689237397dc493746b1d';
var city = "Minneapolis"
var date = moment().format('dddd, MMMM Do YYYY');
var cityHist = [];

function handleSearch(event) {
    event.preventDefault();
    let newCity = $('.textVal').val().trim();
    if (newCity !== "") {
        city = newCity;
        if (!cityHist.includes(city)) {
            cityHist.push(city);
        }
        localStorage.setItem('city', JSON.stringify(cityHist));
        updateCityHistory();
        $('.textVal').val('');
        getWeatherToday();
        getFiveDayForecast();
    }
}

function updateCityHistory() {
    $('.cityHist').empty();
    cityHist.forEach((city) => {
        let btn = $('<button>')
            .addClass('btn btn-outline-secondary histBtn')
            .attr('type', 'button')
            .text(city)
            .on('click', function() {
                city = $(this).text();
                getWeatherToday();
                getFiveDayForecast();
            });
        $('.cityHist').prepend(btn);
    });
}

function getWeatherToday() {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + key + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        const temperature = response.main.temp;
        const humidity = response.main.humidity;
        const windSpeed = response.wind.speed;

        $('.cardBodyToday').html(`
            <p>Temperature: ${temperature}&deg;F</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} mph</p>
        `);
    });
}

function getFiveDayForecast() {
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + key + "&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $('.fiveForecast').empty();
        for (let i = 0; i < response.list.length; i+=8) {
            const dayData = response.list[i];
            const temperature = dayData.main.temp;
            const humidity = dayData.main.humidity;

            const forecastElem = $(`
                <div class="col">
                    <p>Date: ${dayData.dt_txt}</p>
                    <p>Temperature: ${temperature}&deg;F</p>
                    <p>Humidity: ${humidity}%</p>
                </div>
            `);
            $('.fiveForecast').append(forecastElem);
        }
    });
}

// Add event listener to the search button
$('.search').on('click', handleSearch);

// Load city history from local storage on page load
if (localStorage.getItem('city')) {
    cityHist = JSON.parse(localStorage.getItem('city'));
    updateCityHistory();
}

// Load weather data for default city on page load
getWeatherToday();
getFiveDayForecast();