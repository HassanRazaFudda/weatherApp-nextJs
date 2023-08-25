import React, { useState, useEffect } from "react";
import Clock from "react-live-clock";
import Forcast from "./Forcast";
import Loader from "../public/images/WeatherIcons.gif";
import Image from "next/image";
import axios from 'axios';

const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};
const Weather = () => {
  
  const [weather, setWeather] = useState(null);
  const [isClient, setIsClient] = useState(false);
  
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const base = process.env.NEXT_PUBLIC_BASE_URL;


  useEffect(() => {
    getPosition();
    setIsClient(true)
  }, [])
  


  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(async (data) => {
      getWeather(data.coords.latitude, data.coords.longitude)
    });
  }


  const getWeather = async (lat, lon) => {
    let uri = `${base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`;
    await axios.get(uri)
    .then((res)=> {
      setWeather(res?.data);
    })
    .catch((err) => {
      console.log(err, uri)
      setWeather(null)
    })
  };
  return (
    <>
      {weather? (
        <>
          <div className="city">
            <div className="title">
              <h2>{weather.name}</h2>
              <h3>{weather.sys.country}</h3>
            </div>
            <div className="mb-icon">
            </div>
            <div className="date-time">
              <div className="dmy">
                <div id="txt"></div>
                <div className="current-time">
                  {isClient ? (<Clock format="h:mm:ss a" interval={1000} ticking={true} />) : (<></>)}
                </div>
                <div className="current-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="temperature">
                <p>
                  {Math.round(weather.main.temp)}°<span>C</span>
                </p>
              </div>
            </div>
          </div>
          <Forcast main={weather.weather[0].main} />

        </>
      ) : (
        <React.Fragment>
          <Image src={Loader} style={{ width: "50%", WebkitUserDrag: "none", }} layout='intrinsic' />
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
        </React.Fragment>
      )}
    </>

  )
}
export default Weather;









