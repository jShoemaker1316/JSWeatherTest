const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

    // console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties
    const { cityDets, weather } = data;

    // update details template (the h5 to the spans)
    details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

    // update the day/night & icon images
    //be sure to add this <img src="" alt="weather icon" /> in html
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    //rewrite the timeSrc code simpler
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // let timeSrc = null;
    // if(weather.IsDayTime){
    //     timeSrc = 'img/day.svg';
    // } else {
    //     timeSrc = 'img/night.svg';
    // }
    // time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }

};
//DO NOT NEED WITH NEW CLASS IN FORECAST
// const updateCity = async (city) => {

// const cityDets = await getCity(city);
// const weather = await getWeather(cityDets.Key);

// return {
//     cityDets,
//     weather
// };

// };

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    //updateCity(city)
    //NOW with the class in place, we call with forecast
    forecast.updateCity(city)
    //.then(data => console.log(data))
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage (most recent location)
localStorage.setItem('city', city);

});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}