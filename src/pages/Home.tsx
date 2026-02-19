import { useState } from "react";
import type { CurrentWeatherData } from "../types/weather.types";
import { fetchWeatherByCity } from "../api/weatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudSun, faWarning } from "@fortawesome/free-solid-svg-icons";
import Search from "../components/Search";
import WeatherInfo from "../components/WeatherInfo";

export default function Home(){
  const [weatherData,setWeatherData]=useState<CurrentWeatherData|null>(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const handleSearch=async (city:string)=>{
    if (!city.trim()) {
      setError('Please enter city name !');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      console.log('Searching for data weather city ',city);
      const weatherResponse=await fetchWeatherByCity(city);
      console.log('Weather API Response ',weatherResponse);
      const transformedWeatherData:CurrentWeatherData={
        city:weatherResponse.name,
        temperature:Math.round(weatherResponse.main.temp),
        description:weatherResponse.weather[0].description,
        humidity:weatherResponse.main.humidity,
        windSpeed:weatherResponse.wind.speed,
        icon:weatherResponse.weather[0].icon
      }
      console.log('Transformed weather data : ',transformedWeatherData);
      setWeatherData(transformedWeatherData)
    } catch (error:any) {
      console.error('Error fetching weather data',error);
      if (error.message?.include('404')) {
        setError('City not found. Please check the spell');
      }else if(error.message?.include('401')){
        setError('API key error, please wait for maintenance');
      }else if(error.message?.include('429')){
         setError('Too many request, please be patient !');
      }else{
        setError('There is something error, please back after a few minutes');
      }
    }finally{
      setLoading(false);
    }
  };
  return(
    <div className="home-page">
      <div className="hero-section">
        <h1><FontAwesomeIcon icon={faCloudSun}/>Weather Machine</h1>
      </div>
      <Search onSearch={handleSearch} />
      {error && (
        <div className="error-message">
          <FontAwesomeIcon icon={faWarning} />
        </div>
      )}
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <span>Loading weather data ...</span>
        </div>
      )}
      {weatherData && !loading &&(
        <div className="weather-result">
          <WeatherInfo weatherData={weatherData} />
          <div className="navigation-hint">
            <p>Go to Forecast page to see 5 days forecast</p>
          </div>
        </div>
      )}
    </div>
  );
}
