import {base, key} from '@/pages/api/apikey';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactAnimatedWeather from 'react-animated-weather'

const Forcast = ({main}) => {
  const [query, setquery] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState(null);
  const handleChange = (setState) => (e) => {
    setState(e.target.value)
  }
  const search = async (city) => {
    let uri = `${base}weather?q=${city == "[object Object]"? query: city}&units=metric&appid=${key}`;
    await axios.get(uri)
    .then((res)=> {
      setWeather(res?.data);

      setquery("");
    })
    .catch((err) => {
      console.log(err, uri)
      setWeather(null)
      setquery("")
      setError({ message: "Not Found" , query: query})
    })
  };
  
  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Islamabad");
  }, []);

  const getIcon = m => 
  /Haze/.test(m) && 'CLEAR_DAY' || 
  /Rain/.test(m) && 'RAIN' || 
  /Snow/.test(m) && 'SNOW' || 
  /Dust/.test(m) && 'WIND' || 
  /Drizzle/.test(m) && 'SLEET' || 
  /Fog/.test(m) && 'FOG' || 
  /Smoke/.test(m) && 'FOG' || 
  /Tornado/.test(m) && 'WIND' || 
  /Clouds/i.test(m) && 'CLOUDY' || 'CLEAR_DAY';


  return (   
    <div className="forecast">
    <div className="forecast-icon">
      <ReactAnimatedWeather
        icon={getIcon(main)}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      />
    </div>
    <div className="today-weather">
      <h3>{main}</h3>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={(e) => setquery(e.target.value)}
          value={query}
        />
        <div className="img-box">
          {" "}
          <img
            src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            onClick={search}

          />
        </div>
      </div>
      <ul>
        {weather ? (
          <div>
            {" "}
            <li className="cityHead">
              <p>
                {weather.name}, {weather.sys.country}
              </p>
              <img
                className="temp"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              />
            </li>
            <li>
              Temperature{" "}
              <span className="temp">
                {Math.round(weather.main.temp)}°c ({weather.weather[0].main})
              </span>
            </li>
            <li>
              Humidity{" "}
              <span className="temp">
                {Math.round(weather.main.humidity)}%
              </span>
            </li>
            <li>
              Visibility{" "}
              <span className="temp">
                {Math.round(weather.visibility)} mi
              </span>
            </li>
            <li>
              Wind Speed{" "}
              <span className="temp">
                {Math.round(weather.wind.speed)} Km/h
              </span>
            </li>
          </div>
        ) : (
          <li>
            {error.query} {error.message}
          </li>
        )}
      </ul>
    </div>
  </div>

  )
}

export default Forcast