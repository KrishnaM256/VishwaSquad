import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Alerts.css'; // Make sure this file exists and contains your styles

const Alerts = () => {
  const [alertData, setAlertData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async (latitude, longitude) => {
      try {
        const response = await axios.get('http://localhost:3000/api/alerts', {
          params: { lat: latitude, lon: longitude },
        });
        console.log('API Response:', response.data);
        if (response.data && response.data.result) {
          setAlertData(response.data);
        } else {
          setError('No valid data received from the server.');
        }
      } catch (err) {
        console.error('Error fetching alert data:', err.message);
        setError('Failed to fetch alerts: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    const getGeolocationAndFetchAlerts = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Received Latitude: ${latitude}, Longitude: ${longitude}`);
            await fetchAlerts(latitude, longitude);
          },
          (err) => {
            console.error('Error getting geolocation:', err.message);
            setError('Failed to get geolocation: ' + err.message);
            setLoading(false);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        setLoading(false);
      }
    };

    getGeolocationAndFetchAlerts();
  }, []);

  if (loading) {
    return <p className="text-gray-500 text-center">Loading...</p>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      {alertData && alertData.result && alertData.result.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-red-600">Disaster Alerts</h2>
          {alertData.result.map((event, index) => (
            <div key={index} className="p-4 border border-red-600 bg-red-100 text-red-800 rounded">
              <p><strong>Event:</strong> {event.event_name || 'N/A'}</p>
              <p><strong>Description:</strong> {event.details?.description || 'N/A'}</p>
              <p><strong>Severity:</strong> {event.details?.severity || 'N/A'}</p>
              <p><strong>Urgency:</strong> {event.details?.urgency || 'N/A'}</p>
              <p><strong>Instruction:</strong> {event.details?.instruction || 'N/A'}</p>
              <p><strong>Sender:</strong> {event.details?.sender || 'N/A'}</p>
              <p><strong>Status:</strong> {event.details?.event_status || 'N/A'}</p>
              <p><strong>Certainty:</strong> {event.details?.certainty || 'N/A'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No alerts available.</p>
      )}
    </div>
  );
};

export default Alerts;
