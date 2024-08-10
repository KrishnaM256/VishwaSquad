import React from 'react';
import Certificate from './Certificate';

const Result = ({ score, total, onTryAgain }) => {
    const passed = score >= total * 0.75; // 75% passing rate

    return (
        <div className="result-container">
            <h2>{passed ? "Congratulations!" : "Try Again!"}</h2>
            <p>Your Score: {score} / {total}</p>
            {passed && (
                <Certificate name="John Doe" score={score} total={total} />
            )}
            <button onClick={onTryAgain} className="try-again-button">
                Try Again
            </button>
        </div>
    );
};

export default Result;
