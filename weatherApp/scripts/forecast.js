class Forecast{
    constructor(){
        this.key = 'fYVfuJW9GzcMAEHxyBRHFFRYsfewHy5U';
        this.weatherURI = 'http://dataservice.accuweather.com/currentconditions/v1/';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';

    }
    //basically recreate our async updateCity from app.js
    async updateCity(city){
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);
        return { cityDets, weather };
    }
    //basically copy getCity from lower down
    async getCity(city){
        //const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    //basically copy getWeather from lower down
    async getWeather(id){
        //const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}

// const key = 'fYVfuJW9GzcMAEHxyBRHFFRYsfewHy5U';

// // GET WEATHER INFO
// const getWeather = async (id) => {

//     const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
//     const query = `${id}?apikey=${key}`;

//     const response = await fetch(base + query);
//     const data = await response.json();

//     return data[0];

// };


// // GET CITY INFO (gets the keycode we need to pass into getWeather!)
// const getCity = async (city) => {

//     const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
//     const query = `?apikey=${key}&q=${city}`;

//     const response = await fetch(base + query);
//     const data = await response.json();

//     return data[0];

// };

// getCity('manchester')
// //.then(data => console.log(data))
// .then(data => {
//     return getWeather(data.Key);
// }).then(data => {
//     console.log(data);
// })
// .catch(err => console.log(err));