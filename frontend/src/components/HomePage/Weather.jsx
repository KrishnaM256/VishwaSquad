// Weather.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css"; // Ensure you have relevant CSS for styling

const WEATHER_API_URL = "http://localhost:3000/weather"; // URL to your backend API

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

    // Function to get geolocation and fetch weather data
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
      {weatherData ? (
        <div>
            <lord-icon
            src="https://cdn.lordicon.com/kkudtejl.json"
            trigger="hover"
          ></lord-icon>
          <div className="current-weather">
          <p>
            <strong>Location:</strong> {weatherData.name}
          </p>
          <p>
            <strong>Temperature:</strong> {weatherData.main.temp}°C
          </p>
          <p>
            <strong>Weather:</strong> {weatherData.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weatherData.main.humidity}%
          </p>
          <p>
            <strong>Wind Speed:</strong> {weatherData.wind.speed} Km/h
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
