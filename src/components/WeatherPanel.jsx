import React, {useState} from 'react';
import Form from './Form';
import Card from './Card';

const WeatherPanel = () => {

    let urlWeather = "https://api.openweathermap.org/data/2.5/weather?appid=2522e5e0e8c3df471d7080b4a5af93b0&lang=es";
    let cityUrl = "&q="

    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?appid=2522e5e0e8c3df471d7080b4a5af93b0&lang=es"

    const [weather, setWeather] = useState([]);
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState("");

    const getLocation = async(loc) => {
        setLoading(true); 
        setLocation(loc);

        //weather

        urlWeather = urlWeather + cityUrl + loc;

        await fetch(urlWeather).then((res) => {
            if(!res.ok) throw {res}
            return res.json();
        }).then((weatherData) =>{
            console.log(weatherData);
            setWeather(weatherData);
        }).catch(error => {
            console.log(error);
            setLoading(false);
            setShow(false);
        })

        //forecast

        urlForecast = urlForecast + cityUrl + loc;

        await fetch(urlForecast).then((res) => {
            if(!res.ok) throw {res}
            return res.json();
        }).then((forecastData) =>{
            console.log(forecastData);
            setForecast(forecastData);

            setLoading(false);
            setShow(true);

        }).catch(error => {
            console.log(error);
            setLoading(false);
            setShow(false);
        })
        
    }

    return (
        <React.Fragment>

            <Form newLocation = {getLocation}/>

            <Card 
                showData = {show}
                loadingData = {loading}
                weather = {weather}
                forecast = {forecast}
            />

        </React.Fragment>
    );
}

export default WeatherPanel;
