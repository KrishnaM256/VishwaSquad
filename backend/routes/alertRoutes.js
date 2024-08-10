const express = require('express');
const axios = require('axios');
const router = express.Router();

// API keys
const apiKey = 'ed9a6be03f6231b9527b9078a72026806e0a4b8aba5ed6595aed5c3f23fa51be';
const geoApiKey = '4808dbf310f0498db0945a715075b440';

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

// Function to get event details
async function getEventDetails(eventId) {
  try {
    const response = await axios.get(`https://api.ambeedata.com/disasters/by-eventId`, {
      params: { eventId },
      headers: { 'x-api-key': apiKey, 'Content-type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve event details:', error);
    return { error: 'Failed to retrieve event details' };
  }
}

// Route to handle alert requests
router.get('/alerts', async (req, res) => {
  try {
    const location = await getGeoLocation();
    if (location.latitude && location.longitude) {
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
        res.json(eventDetails);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } else {
      res.status(404).json({ error: 'Unable to get geolocation' });
    }
  } catch (error) {
    console.error('Error during alert request:', error);
    res.status(500).json({ error: 'Failed to retrieve alert data' });
  }
});

module.exports = router;
