import React from 'react';
import disasterData from './data/disasterData';
import './TrainingPage.css';

const Homepage = () => {
    return (
        
        <div className="training-container">
            <br />
            <br />
            <br />
            <br />
            
            <h1>Natural Disaster Preparedness</h1>
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
