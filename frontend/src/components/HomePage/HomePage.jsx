import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './HomePage.css'; 
import Weather from './Weather';
import Alert from './Alerts';
import Map from './Map';

/* homepage */
const HomePage = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');

  const handleButtonClick = () => {
    setFormVisible(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmittedMessage(message);
    setMessage('');
    setFormVisible(false);
  };

  const handleCloseForm = () => {
    setFormVisible(false);
  };

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen w-full flex flex-col">
        <video 
          className="absolute inset-0 object-cover w-full h-full"
          autoPlay 
          loop 
          muted
        >
          <source src="/assets/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{ zIndex: -1 }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-[80px] pb-8">
          <div className="window">
            <div className="weather"><Weather /></div>
            <div className="alert"><Alert /></div>
          </div>
          <div className="border-radius">
            <Map />
          </div>
          <button
            className="absolute bottom-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
            onClick={handleButtonClick}
          >
            <lord-icon
              src="https://cdn.lordicon.com/pdsourfn.json"
              trigger="hover"
              style={{ width: '50px', height: '50px' }}
            ></lord-icon>
          </button>

          {formVisible && (
            <div className="fixed bottom-4 right-4 p-4 bg-white bg-opacity-80 border rounded shadow-lg">
              <button
                className="absolute top-2 right-2 p-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                onClick={handleCloseForm}
              >
                <span className="text-lg font-semibold">&times;</span>
              </button>
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="authorityMessage" className="block text-sm font-medium text-gray-700">
                  Authority Message
                </label>
                <input
                  id="authorityMessage"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter message"
                  required
                />
                <button
                  type="submit"
                  className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {submittedMessage && (
            <div className="fixed bottom-0 left-0 w-full p-2 bg-black text-white overflow-hidden">
              <div className="moving-line">
                {submittedMessage}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
