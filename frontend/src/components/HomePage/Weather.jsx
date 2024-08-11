import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet"; 
import "./Weather.css"; 

const WEATHER_API_URL = "http://localhost:3000/weather"; 

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Function to fetch weather data from backend
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await axios.get(WEATHER_API_URL, {
          params: {
            lat: latitude,
            lon: longitude,
          },
        });
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data");
        setLoading(false);
      }
    };

    const getGeolocationAndFetchWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            setError("Failed to get geolocation");
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    getGeolocationAndFetchWeather();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="weather">
      <Helmet>
        <title>Weather Information - Your App</title>
        <meta name="description" content="Get the latest weather information for your current location." />
        <meta property="og:title" content="Weather Information" />
        <meta property="og:description" content="Get the latest weather information for your current location." />
        <meta property="og:image" content="URL_TO_DEFAULT_WEATHER_IMAGE" /> 
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
      </Helmet>
      {weatherData ? (
        <div>
          <lord-icon
            src="https://cdn.lordicon.com/kkudtejl.json"
            trigger="hover"
          ></lord-icon>
          <div className="current-weather">
            <p>
              <span className="label">Location:</span> <span className="data">{weatherData.name}</span>
            </p>
            <p>
              <span className="label">Temperature:</span> <span className="data">{weatherData.main.temp}°C</span>
            </p>
            <p>
              <span className="label">Weather:</span> <span className="data">{weatherData.weather[0].description}</span>
            </p>
            <p>
              <span className="label">Humidity:</span> <span className="data">{weatherData.main.humidity}%</span>
            </p>
            <p>
              <span className="label">Wind Speed:</span> <span className="data">{weatherData.wind.speed} Km/h</span>
            </p>
          </div>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default Weather;

