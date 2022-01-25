import React, { useState, useEffect } from 'react';
import weatherIcon from './weatherIcons';
import compassArrow from './compassArrows';
import Navigation from './Navigation';
import axios from 'axios';

const url = "https://meta-weather.vercel.app";
const cities = ['2487610','2367105','2457170','2458833'];

let App = () => {
  const [location, setLocation] = useState([])

  useEffect(() => {
    let cityWeather = []
    cities.forEach(city => {
      cityWeather.push(axios.get(`${url}/api/location/${city}/`).then(result => result.data))
    })
    Promise.all(cityWeather).then(cityData => {
      setLocation(cityData)
    })
  },[])

  const tempConvert = (temp) => {
    let roundTemp = temp * 9 / 5 + 32
    return Math.round(roundTemp)
  }

  const getDay = (dateString) => {
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const day = new Date(dateString)
    const dayName = weekDays[day.getDay()]
    return dayName
  }

  const getDayAbbr = (dateString) => {
    const weekDays = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']
    const day = new Date(dateString)
    const dayName = weekDays[day.getDay()]
    return dayName
  }

  const windSpeedMph = (windSpeed) => {
    return Math.round(windSpeed)
  }

  return(
    <section className="top-city">
      <Navigation></Navigation>
      <div className="app-container">
      {location.slice(0,4).map((city, index) => (
        <div className="columns is-centered is-vcentered is-multiline is-mobile" key={index}>          
          <div className="column is-12">
          <h1 className="title center">{city.title}</h1>
            {city.consolidated_weather.slice(0,1).map((data, e) => (
            <section className="conditions" key={e}>
              <h2 className="center temp">{tempConvert(data.the_temp)}°</h2>
              <img className="condIcon" src={weatherIcon(data.weather_state_abbr)} alt={data.weather_state_name + " Icon"} /> 
              <p className="center">{data.weather_state_name}</p>
              <p className="center">H: {tempConvert(data.max_temp)}°&nbsp;&nbsp;&nbsp;L: {tempConvert(data.min_temp)}°</p>
            </section>
            ))}
          </div>

          <div className="column is-12">
            <div className="weatherbox">
              <p className="state center has-text-left-mobile">{city.title} Forecast</p>
              <div className="columns is-centered is-vcentered is-mobile labels">
                <div className="column is-2-desktop center">
                  <p>Day:</p>
                </div>
                <div className="column is-2-desktop center">
                  <p>Skies:</p>
                </div>
                <div className="column is-2-desktop center">
                  <p>Temp:</p>
                </div>
                <div className="column is-2-desktop center">
                  <p>Wind:</p>
                </div>
              </div>
              {city.consolidated_weather.map((forecast, f) => (
                <div className="columns is-centered is-vcentered is-mobile" key={f}>
                  <div className="column is-2-desktop center">
                    <p><span className="is-hidden-mobile">{getDay(forecast.applicable_date)}</span><span className="is-hidden-desktop is-hidden-tablet">{getDayAbbr(forecast.applicable_date)}</span></p>
                  </div>
                  <div className="column is-2-desktop center">
                    <p><img className="condIcon sm" src={weatherIcon(forecast.weather_state_abbr)} alt={forecast.weather_state_name + " Icon"} /> <span className="is-hidden-mobile">{forecast.weather_state_name}</span></p>
                  </div>
                  <div className="column is-2-desktop center">
                    <p>H: {tempConvert(forecast.max_temp)}° <span className="is-hidden-desktop is-hidden-tablet"><br /></span> L: {tempConvert(forecast.min_temp)}°</p>
                  </div>

                  <div className="column is-2-desktop center">
                    <p>{forecast.wind_direction_compass} <img className="condIcon wind" src={compassArrow(forecast.wind_direction_compass)} alt={forecast.wind_direction_compass} /> <span className="is-hidden-desktop is-hidden-tablet"><br /></span> {windSpeedMph(forecast.wind_speed)} mph</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        ))}
      </div>
    </section>
  )

}

export default App;