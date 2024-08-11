import React from 'react';
import disasterData from './data/disasterData';
import './TrainingPage.css';

const Homepage = () => {
    return (
        
        <div className="training-container">
            <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{ zIndex: -1 }}
        ></div>
            <br />
            <br />
            <br />
            
            <h1 className='heading12'>Natural Disaster Preparedness</h1>
            <br />
            <div className="disaster-grid">
                {disasterData.map((disaster, index) => (
                    <div key={index} className="disaster-card">
                        <img src={disaster.image} className="disaster-image" alt={disaster.name} />
                        <h3 className="card-title">
                            {disaster.name}
                        </h3>
                        <a href={`/disaster/${index}`} className="card-button">Learn More</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
