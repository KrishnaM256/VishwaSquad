import React from 'react';
import { Helmet } from 'react-helmet'; 

const emergencyNumbers = [
  { service: 'Emergency Services', number: '112', description: 'For immediate assistance in emergencies' },
  { service: 'Fire Department', number: '101', description: 'Report a fire or other urgent fire-related issues' },
  { service: 'Police Department', number: '100', description: 'Report crimes or suspicious activities' },
  { service: 'Ambulance', number: '102', description: 'Request medical assistance and emergency transportation' },
  { service: 'National Disaster Management Authority', number: '1078', description: 'For disaster management and assistance' },
  { service: 'Poison Control', number: '1800-11-1200', description: 'Emergency help for poison or chemical exposure' },
  { service: 'Gas Leak Emergency', number: '1800-180-3333', description: 'Report gas leaks or hazardous gas incidents' },
];

const EmergencyNo = () => {
  return (
    <>
      <Helmet>
        <title>Emergency Numbers - Your App</title>
        <meta name="description" content="Find important emergency contact numbers for various services including police, fire, ambulance, and disaster management." />
        <meta property="og:title" content="Emergency Numbers" />
        <meta property="og:description" content="Find important emergency contact numbers for various services including police, fire, ambulance, and disaster management." />
        <meta property="og:image" content="URL_TO_DEFAULT_IMAGE" /> 
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-10 px-5 mt-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-600 text-white text-2xl font-bold py-4 px-6">
            Emergency Numbers
          </div>
          <div className="p-6 space-y-4">
            {emergencyNumbers.map((entry, index) => (
              <div key={index} className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center">
                <div className="flex-1 mb-3 sm:mb-0 sm:mr-6">
                  <h3 className="text-lg font-semibold text-red-600">{entry.service}</h3>
                  <p className="text-sm text-gray-700">{entry.description}</p>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {entry.number}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmergencyNo;
