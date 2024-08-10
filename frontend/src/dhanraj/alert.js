// npm install axios

const http = require('http');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Using Ambee API to get Disaster info 
const apiKey = "ed9a6be03f6231b9527b9078a72026806e0a4b8aba5ed6595aed5c3f23fa51be";
// Using ipgeolocation.io API to get current lat and long
const geoApiKey = "4808dbf310f0498db0945a715075b440"; 
// Using OpenWeatherMap API to get weather info
const weatherApiKey = "a98a12a23c2ea8daed3cfd5b7d192d07"; // Replace with your OpenWeatherMap API key

// Function to get current latitude and longitude based on IP address
async function getGeoLocation() {
  try {
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo', {
      params: {
        apiKey: geoApiKey
      }
    });
    return {
      latitude: response.data.latitude,
      longitude: response.data.longitude
    };
  } catch (error) {
    console.error('Failed to get geolocation:', error);
    return {
      latitude: null,
      longitude: null
    };
  }
}

// Function to get event ID from the response
function getEventId(responseBody) {
  try {
    const formattedBody = responseBody.data;
    if (formattedBody.result && formattedBody.result.length > 0) {
      return formattedBody.result[0].event_id;
    } else {
      console.log('No event found.');
      return null;
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
}

// Function to make a request to get event details by eventId
async function getEventDetails(eventId) {
  try {
    const response = await axios.get(`https://api.ambeedata.com/disasters/by-eventId`, {
      params: {
        eventId: eventId
      },
      headers: {
        'x-api-key': apiKey,
        'Content-type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve event details:', error);
    return { error: 'Failed to retrieve event details' };
  }
}

// Function to get current weather based on latitude and longitude
async function getWeather(latitude, longitude) {
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        lat: latitude,
        lon: longitude,
        appid: weatherApiKey,
        units: 'metric' // Optional: Use 'imperial' for Fahrenheit, 'metric' for Celsius
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get weather:', error);
    return { error: 'Failed to retrieve weather data' };
  }
}

// Create an HTTP server
http.createServer(async (req, res) => {
  if (req.url === '/') {
    // Serve the HTML page
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading page');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
  } else if (req.url === '/event') {
    try {
      // Get current geolocation
      const location = await getGeoLocation();
      
      console.log('Current Location:', location);

      // Fetch event data
      const apiResponse = await axios({
        method: 'GET',
        url: 'https://api.ambeedata.com/disasters/latest/by-lat-lng',
        params: {
          lat: location.latitude,
          lng: location.longitude,
          limit: 1,
          page: 1
        },
        headers: {
          'x-api-key': apiKey,
          'Content-type': 'application/json'
        }
      });

      const eventId = getEventId(apiResponse);
      if (eventId) {
        const eventDetails = await getEventDetails(eventId);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(eventDetails, null, 2));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Event not found' }));
      }
    } catch (error) {
      console.error('Error during API request:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to retrieve event data' }));
    }
  } else if (req.url === '/weather') {
    try {
      // Get current geolocation
      const location = await getGeoLocation();
      
      console.log('Current Location for Weather:', location);

      if (location.latitude && location.longitude) {
        // Fetch weather data
        const weatherData = await getWeather(location.latitude, location.longitude);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(weatherData, null, 2));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unable to get weather data' }));
      }
    } catch (error) {
      console.error('Error during weather request:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Failed to retrieve weather data' }));
    }
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
}).listen(3000, () => {
  console.log('Server running on port 3000');
});
