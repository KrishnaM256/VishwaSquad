import React from 'react';
import { useParams } from 'react-router-dom';
import disasterData from './data/disasterData';
import { Helmet } from 'react-helmet'; 
import './DisasterDetail.css';

const DisasterDetail = () => {
    const { id } = useParams();
    const disaster = disasterData[parseInt(id)];

    if (!disaster) {
        return <div>Disaster not found!</div>;
    }

    return (
        <div className="container mt-4">
            <Helmet>
                <title>{disaster.name} - Disaster Management</title>
                <meta name="description" content={disaster.description} />
                <meta property="og:title" content={disaster.name} />
                <meta property="og:description" content={disaster.description} />
                <meta property="og:image" content={disaster.image} />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="article" />
            </Helmet>
            <div
                className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
                style={{ zIndex: -1 }}
            ></div>
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
