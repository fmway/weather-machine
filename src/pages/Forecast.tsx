import React, { useEffect, useState, type ChangeEvent } from "react";
import type { ForecastItem } from "../types/weather.types";
import { fetchForecast } from "../api/weatherService";
import { faCalendar,faUmbrella,faMagnifyingGlass,faDroplet,faWind,faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/Forecast.css'

const Forecast: React.FC=()=>{
  const [forecastData,setForecastData]=useState<ForecastItem[]>([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState<string|null>(null);
  const [city,setCity]=useState<string>('');

  useEffect(()=>{
    const lastCity=localStorage.getItem('lastSearchedCity');
    if (lastCity) {
      setCity(lastCity);
      fetchForecatData(lastCity);
    }else{
      setCity('Ngawi');
      fetchForecatData('Ngawi');
    }
  },[]);
  const fetchForecatData=async (cityName:string)=>{
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching forecast for ',cityName);
      const forecastResponse=await fetchForecast(cityName);
      const transdormedWeatherData:ForecastItem[]=forecastResponse.list.map((item:any)=>({
        dt:item.dt,
        dt_txt:item.dt_txt,
        main:{
          temp:item.main.temp,
          feels_like:item.main.feels_like,
          temp_min:item.main.temp_min,
          temp_max:item.main.temp_max,
          humidity:item.main.humidity
        },
        weather:item.weather,
        wind:{
          speed:item.wind.speed,
        },
        pop:item.pop
      }));
      setForecastData(transdormedWeatherData);
      console.log('Forecast data updated : ',transdormedWeatherData);
    } catch (error:any) {
      console.error('Error fetching data forecast because ',error);
      setError('Error while fetching data forecast. We will fix the bug, please back after few minutes');    
    }finally{
      setLoading(false);
    }
  };
  const handleCityChange=(e:ChangeEvent<HTMLInputElement>)=>{
    setCity(e.target.value);
  }
  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    if (city.trim()) {
      fetchForecatData(city);
    }
  };
  const formDate=(dt_txt:string)=>{
    const date=new Date(dt_txt);
    return date.toLocaleDateString('en-US',{
      weekday:'short',
      month:'short',
      day:'numeric',
      hour:'2-digit',
      minute:'2-digit'
    })
  }
  return(
    <div className="forecast-page">
      <h2>
        <FontAwesomeIcon icon={faCalendar}/> Forecast page
      </h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter City Name correctly !"
          className="forecast-input"
        />
        <button type='submit' className='forecast-button'>
          <FontAwesomeIcon icon={faMagnifyingGlass} /> Search
        </button>
      </form>
      {error && (
        <div className='error-message'>
          <FontAwesomeIcon icon={faWarning}/> {error}
        </div>
      )}
      {loading && (
        <div className='loading-spinner'>
          <div className='spinner'></div>
          <span>Loading forecast for {city}...</span>
        </div>
      )}
      {!loading && !error && forecastData.length > 0 && (
        <div className="forecast-container">
          <h3>5-Day Forecast for {city}</h3>
          <div className="forecast-list">
            {forecastData.map((item) => (
              <div key={item.dt} className="forecast-card">
                <div className="forecast-time">
                  {formDate(item.dt_txt)}
                </div>
                <img 
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
                  alt={item.weather[0].description}
                  className="forecast-icon"
                />
                <div className="forecast-temp">
                  <span className="temp-value">{Math.round(item.main.temp)}°C</span>
                </div>
                <div className="forecast-desc">
                  {item.weather[0].description}
                </div>
                <div className="forecast-details">
                  <span><FontAwesomeIcon icon={faDroplet}/>{item.main.humidity}%</span>
                  <span><FontAwesomeIcon icon={faWind}/> {Math.round(item.wind.speed)} m/s</span>
                  {item.pop > 0 && (
                    <span><FontAwesomeIcon icon={faUmbrella}/> {Math.round(item.pop * 100)}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {!loading && !error && forecastData.length === 0 && city && (
        <div className="no-data">
          No forecast data available for {city}
        </div>
      )}
    </div>
  );
}

export default Forecast;
