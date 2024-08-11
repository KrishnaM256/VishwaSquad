import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';

// Your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoib21rYXItMjQ4MyIsImEiOiJjbHppZ2IyZHgwZzhvMmpxeHo2bjF0Nm9jIn0.EzGTTY88dJ7CbVo4KMKKig';

// Mapbox API endpoint for nearby search
const mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  // Function to initialize the map
  const initializeMap = () => {
    if (map.current || location.latitude === null || location.longitude === null) return; // Initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [location.longitude, location.latitude],
      zoom: 12,
    });

    // Add user's location marker with red color
    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([location.longitude, location.latitude])
      .setPopup(new mapboxgl.Popup().setText('Your Location'))
      .addTo(map.current);

    // Fetch and display nearby hospitals
    fetchNearbyPlaces(location.latitude, location.longitude);

    // Add zoom control buttons
    map.current.addControl(new mapboxgl.NavigationControl());
  };

  // Function to get geolocation and initialize the map
  const getGeolocationAndInitializeMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  // Function to fetch nearby places (e.g., hospitals) and add markers to the map
  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await axios.get(mapboxApiUrl + '/hospital.json', {
        params: {
          proximity: `${longitude},${latitude}`,
          access_token: mapboxgl.accessToken,
        },
      });

      const places = response.data.features;

      places.forEach((place) => {
        // Add hospital markers with different color
        new mapboxgl.Marker({ color: 'blue' }) // Change 'blue' to your desired color
          .setLngLat([place.geometry.coordinates[0], place.geometry.coordinates[1]])
          .setPopup(new mapboxgl.Popup().setText(place.text))
          .addTo(map.current);
      });
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  // Function to focus on the user's location
  const focusOnLocation = () => {
    if (map.current && location.latitude !== null && location.longitude !== null) {
      map.current.flyTo({
        center: [location.longitude, location.latitude],
        zoom: 12,
        essential: true // This animation is considered essential for accessibility
      });
    }
  };

  useEffect(() => {
    getGeolocationAndInitializeMap();
  }, []); // Run once when component mounts

  useEffect(() => {
    if (location.latitude !== null && location.longitude !== null) {
      initializeMap(); // Initialize map when location is set
    }
  }, [location]); // Run whenever location changes

  return (
    <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
      <div ref={mapContainer} style={{ width: '70vw', height: '70vh' }} />
      <button 
        onClick={focusOnLocation} 
        style={{
          position: 'absolute', 
          bottom: '10px', 
          right: '10px', 
          padding: '10px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 1 // Ensure the button is above other elements
        }}
      >
        Center on My Location
      </button>
    </div>
  );
};

export default Map;

