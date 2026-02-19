import React from "react";
import type { CurrentWeatherData } from "../types/weather.types";
import '../css/WeatherInfo.css'
interface WeatherInfoProps{
  weatherData:CurrentWeatherData;
}

const WeatherInfo:React.FC<WeatherInfoProps> = ({weatherData})=>{
  return(
    <div className="weather-info">
      <h2>{weatherData.city}</h2>
      <div className="weather-main">
        <img 
          src={`http://openweathermap.org/img/wn/${weatherData.icon}@2x.png`}
          alt={weatherData.description}
          className="weather-icon"
        />
        <div className="temperature">{weatherData.temperature}°C</div>
      </div>
      <div className="weather-description">{weatherData.description}</div>
      <div className="weather-details">
        <div className="detail">
          <span className="label">Humidity:</span>
          <span className="value">{weatherData.humidity}%</span>
        </div>
        <div className="detail">
          <span className="label">Wind Speed:</span>
          <span className="value">{weatherData.windSpeed}m/s</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherInfo;
