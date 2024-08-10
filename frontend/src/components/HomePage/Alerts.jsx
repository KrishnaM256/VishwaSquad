// Alert.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ALERT_API_URL = "http://localhost:3000/api/alerts";

const Alert = () => {
  const [alertData, setAlertData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        const response = await axios.get(ALERT_API_URL);
        setAlertData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching alert data:", error);
        setError("Failed to fetch alert data");
        setLoading(false);
      }
    };

    fetchAlertData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="alert p-4 bg-white shadow-md rounded-md border border-gray-200">
      {alertData ? (
        <div>
          <h3 className="text-xl font-bold mb-2">Disaster Alert</h3>
          <p><strong>Event:</strong> {alertData.title}</p>
          <p><strong>Description:</strong> {alertData.description}</p>
          <p><strong>Location:</strong> {alertData.location}</p>
          <p><strong>Date:</strong> {alertData.date}</p>
        </div>
      ) : (
        <p className="text-center text-gray-500">No alerts available.</p>
      )}
    </div>
  );
};

export default Alert;
