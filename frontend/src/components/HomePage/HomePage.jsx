<<<<<<< HEAD
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './HomePage.css'; 
import Weather from './Weather';
import Alert from './Alerts';
=======
import React from 'react'
import './HomePage.css' // Import a CSS file if needed
>>>>>>> 9b58e82026690c28f737ed5f19cfbc26a5b42821

const HomePage = () => {
  return (
    <>
<<<<<<< HEAD
      <Navbar />
      <div className="relative h-screen w-full">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{ zIndex: -1 }}
        ></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div>
            <Weather />
            <Alert />
          </div>
        </div>
=======
      <div className="relative h-screen w-full bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        {/* Add additional content here */}
>>>>>>> 9b58e82026690c28f737ed5f19cfbc26a5b42821
      </div>
    </>
  )
}

export default HomePage
