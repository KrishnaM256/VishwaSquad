import React from 'react';
import Navbar from '../Navbar/Navbar';
import './HomePage.css'; // Import a CSS file if needed

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="relative h-screen w-full bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        {/* Add additional content here */}
      </div>
    </>
  );
};

export default HomePage;
