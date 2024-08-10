const express = require('express');
const axios = require('axios');
const router = express.Router();


const apiKey = 'ed9a6be03f6231b9527b9078a72026806e0a4b8aba5ed6595aed5c3f23fa51be';
const geoApiKey = '4808dbf310f0498db0945a715075b440';


async function getGeoLocation() {
  try {
    const response = await axios.get('https://api.ipgeolocation.io/ipgeo', {
      params: { apiKey: geoApiKey }
    });
    return {
      latitude: response.data.latitude,
      longitude: response.data.longitude
    };
  } catch (error) {
    console.error('Failed to get geolocation:', error.message);
    throw new Error('Failed to get geolocation');
  }
}

// Function to get event ID from the response
function getEventId(responseBody) {
  try {
    const formattedBody = responseBody.data;
    if (formattedBody.result && formattedBody.result.length > 0) {
      return formattedBody.result[0].event_id;
    } else {
      throw new Error('No event found');
    }
  } catch (error) {
    console.error('Failed to parse JSON:', error.message);
    throw new Error('Failed to parse event ID');
  }
}

// Function to get event details
async function getEventDetails(eventId) {
  try {
    const response = await axios.get('https://api.ambeedata.com/disasters/by-eventId', {
      params: { eventId },
      headers: { 'x-api-key': apiKey, 'Content-type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to retrieve event details:', error.message);
    throw new Error('Failed to retrieve event details');
  }
}

// Route to handle alert requests
router.get('/alerts', async (req, res) => {
  try {
    const location = await getGeoLocation();
    console.log('Location:', location);
    
    if (location.latitude && location.longitude) {
      const apiResponse = await axios.get('https://api.ambeedata.com/disasters/latest/by-lat-lng', {
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

      console.log('API Response:', apiResponse.data);
      
      const eventId = getEventId(apiResponse);
      if (eventId) {
        const eventDetails = await getEventDetails(eventId);
        console.log('Event Details:', eventDetails);
        res.json(eventDetails);
      } else {
        res.status(404).json({ error: 'Event not found' });
      }
    } else {
      res.status(404).json({ error: 'Unable to get geolocation' });
    }
  } catch (error) {
    console.error('Error during alert request:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
