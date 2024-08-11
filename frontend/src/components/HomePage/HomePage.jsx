import React from 'react';
import Navbar from '../Navbar/Navbar';
import './HomePage.css'; 
import Weather from './Weather';
import Alert from './Alerts';
import Map from './Map';

/* homepage */
const HomePage = () => {
  return (
    <>
      <Navbar />
      <br></br>
      <div className="relative h-screen w-full flex flex-col">
      <video 
          className="absolute inset-0 object-contain w-full h-1000vh" 
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

  <div className="relative z-10 flex flex-col items-center justify-center h-full pt-[80px]">
    <div className="window">
      <div className="weather"><Weather /></div>
      <div className="alert"><Alert /></div>
    </div>
    <div>
      <Map />
    </div>
    <br></br>
  </div>
</div>

            
    </>
  );
}

export default HomePage;
