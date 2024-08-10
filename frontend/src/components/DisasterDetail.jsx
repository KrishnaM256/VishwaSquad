// src/components/DisasterDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import disasterData from './data/disasterData';
import './DisasterDetail.css';

const DisasterDetail = () => {
    const { id } = useParams();
    const disaster = disasterData[parseInt(id)];

    if (!disaster) {
        return <div>Disaster not found!</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card">
                <img src={disaster.image} className="card-img-top" alt={disaster.name} style={{ height: '400px', objectFit: 'cover' }} />
                <div className="card-body">
                    <h1 className="card-title">{disaster.name}</h1>
                    <p className="card-text"><strong>Description:</strong> {disaster.description}</p>
                    <p className="card-text"><strong>Preparation:</strong> {disaster.preparation}</p>
                    <p className="card-text"><strong>During:</strong> {disaster.during}</p>
                    <p className="card-text"><strong>After:</strong> {disaster.after}</p>
                    {disaster.video && (
                        <div className="video-container mt-4">
                            <h5>Learn More</h5>
                            <iframe
                                width="100%"
                                height="315"
                                src={disaster.video}
                                title={`${disaster.name} Video`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DisasterDetail;
