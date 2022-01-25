import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import axios from 'axios';

const url = "https://meta-weather.vercel.app";
const cities = ['2487610','2367105','2457170','2458833'];
const iconUrl = "https://worldweather.wmo.int/images";
const windIcons = "/images/wind_direction";

const App = () => {
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

  const weatherIcon = (conditions) => {
    if (conditions === 'sn') {
      return `${iconUrl}/6.png`
    } else if (conditions === 'sl') {
      return `${iconUrl}/8.png`
    } else if (conditions === 'h') {
      return `${iconUrl}/3.png`
    } else if (conditions === 't') {
      return `${iconUrl}/2.png`
    } else if (conditions === 'hr') {
      return `${iconUrl}/9.png`
    } else if (conditions === 'lr') {
      return `${iconUrl}/15.png`
    } else if (conditions === 's') {
      return `${iconUrl}/12.png`
    } else if (conditions === 'hc') {
      return `${iconUrl}/23a.png`
    } else if (conditions === 'lc') {
      return `${iconUrl}/22a.png`
    } else if (conditions === 'c') {
      return `${iconUrl}/24a.png`
    }
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

  const compassArrow = (windDirection) => {
    if (windDirection === 'N') {
      return `${windIcons}/n.png`
    } else if (windDirection === 'E') {
      return `${windIcons}/e.png`
    } else if (windDirection === 'S') {
      return `${windIcons}/s.png`
    } else if (windDirection === 'W') {
      return `${windIcons}/w.png`
    } else if (windDirection === 'NE') {
      return `${windIcons}/ne.png`
    } else if (windDirection === 'NW') {
      return `${windIcons}/nw.png`
    } else if (windDirection === 'SE') {
      return `${windIcons}/se.png`
    } else if (windDirection === 'SW') {
      return `${windIcons}/sw.png`
    } else if (windDirection === 'NNE') {
      return `${windIcons}/nne.png`
    } else if (windDirection === 'NNW') {
      return `${windIcons}/nnw.png`
    } else if (windDirection === 'SSE') {
      return `${windIcons}/sse.png`
    } else if (windDirection === 'SSW') {
      return `${windIcons}/ssw.png`
    } else if (windDirection === 'ENE') {
      return `${windIcons}/ene.png`
    } else if (windDirection === 'ESE') {
      return `${windIcons}/ese.png`
    } else if (windDirection === 'WNW') {
      return `${windIcons}/wnw.png`
    } else if (windDirection === 'WSW') {
      return `${windIcons}/wsw.png`
    }
  }

  return(
    <section className="top-city">
      <Navigation></Navigation>
      <div className="container">
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
              <p className="state center">{city.title} Forecast</p>
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
                <div className="column is-2-desktop is-hidden-mobile center">
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