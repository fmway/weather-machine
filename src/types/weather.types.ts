export interface CurrentWeatherData{
  city:string;
  temperature:number;
  description:string;
  humidity:number;
  windSpeed:number;
  icon:string;
}
export interface ForecastItem{
  dt:number;
  dt_txt:string;
  main:{
    temp:number;
    feelsLike:string;
    tempMin:number;
    tempMax:number;
    humidity:number;
  };
  weather:Array<{
    id:number;
    main:string;
    description:string;
    icon:string;
  }>;
  wind:{
    speed:number;
  };
  pop:number;
}
export interface ForecastProps{
  forecast:ForecastItem[];
}
export interface ForecastResponse{
  list:ForecastItem[];
  city:{
    name:string;
    country:string;
  };
}

