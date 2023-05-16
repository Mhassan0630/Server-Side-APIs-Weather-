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

$(document).ready(function() {
    $('.search').click(handleSearch);
});