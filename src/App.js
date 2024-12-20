import { useState,useEffect } from 'react';
import './App.css';
import PropTypes from 'prop-types'

import searchicon from './Assets/Search-icon.jpeg'
import clearicon from './Assets/Clear-icon1.png'
import cloudicon from './Assets/Cloud-icon.jpeg'
import drizzleicon from './Assets/Drizzle-icon.jpeg'
import rainicon from './Assets/Rain-icon.jpeg'
import windicon from './Assets/Wind-icon.jpeg'
import snowicon from './Assets/Snow-icon1.jfif'
import humidity from './Assets/Huminity-icom.jpeg'
const WeatherDetails = ({icon, temp, city, country, lat, log, huminity, wind})=>{

  return (
    <>
  <div className='image'>
   <img src={icon} alt='image' className='snow'/>
  </div>
  <div className='temp'>{temp} *C</div>
  <div className='location'>{city}</div>
  <div className='country'>{country}</div>
  <div className='cord'>
    <div className='div'>
      <span className='lan'>Latitude</span>
      <span>{lat}</span>
    </div>
    <div className='div'>
      <span className='log'>Logitude</span>
      <span>{log}</span>
    </div>
  </div>
  <div className='data-container'>

    <div className='element'>
      <img src={humidity} alt='humidity' className='icon'/>
      <div className='data'>
        <div className='humidity-persentage'>{huminity}%</div>
        <div className='text'>Humidity</div>
      </div>
    </div>

    <div className='element'>
      <img src={windicon} alt='wind' className='icon'/>
      <div className='data'>
        <div className='wind-persentage'>{wind} km/h</div>
        <div className='text'>Wind Speed</div>
      </div>
    </div>

  </div>
  </>
  );
};

WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  huminity: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  lot: PropTypes.number.isRequired,
  log: PropTypes.number.isRequired,
};

function App() {
  let api_key = "5024535f157b5a17d06acddf6e50f6fc"
  const [text, setText] = useState("Kanchipuram")

  const [icon, setIcon] = useState(snowicon); 
  const [temp, setTemp] = useState(0); 
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [huminity, setHiminity] = useState(0);
  const [wind, setWind] = useState(0);

  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": clearicon,
    "01n": clearicon,
    "02d": cloudicon,
    "02n": cloudicon,
    "03d": drizzleicon,
    "03n": drizzleicon,
    "04d": drizzleicon,
    "04n": drizzleicon,
    "09d": rainicon,
    "09n": rainicon,
    "10d": rainicon,
    "10n": rainicon,
    "13d": snowicon,
    "13n": snowicon,
  }

  const search = async ()=>{
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;

    try{
      let res = await fetch(url);
      let data = await res.json();
      //console.log(data);
      if (data.cod === "404"){
         console.error("City not found");
         setCityNotFound(true);
         setLoading(false);
      return;
      
      };
      setHiminity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLog(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon (weatherIconMap[weatherIconCode] || clearicon);
      setCityNotFound(false);

      
    }catch(error){
      console.error("An Error Occurred:", error.message);
      setError("An error occurred while fetching weather data.")
    }finally{
      setLoading(false); 
    }
  };

  const handleCity = (e) => {
    setText(e.target.value)
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter"){
      search();
    }
  };
  useEffect (function () {
    search();
  }, []);


  return (
    <>
     <div className='container'>
      <div className='inpiut-container'>
        <input type='text' 
        className='cityInput' 
        placeholder='Search City' 
        onChange={handleCity}
        value={text} onKeyDown={handleKeyDown}/>
        <div className='search-icon' onClick={() => search()}>
          <img src={searchicon} alt='search'className='search'/>
        </div>
      </div>
      

      {loading && <div className='loading-message'>Loading...</div>}
      {error && <div className='error-message'>{error}</div>}
      {cityNotFound && <div className='city-not-found'>City not found</div>}

      {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country}
      lat={lat} log={log} huminity={huminity} wind={wind}/>}

      <p className='copyright'>
        Designed By <span className='myname'>Shikamaru</span>
      </p>
     </div>
    </>
   
  )
}

export default App;
