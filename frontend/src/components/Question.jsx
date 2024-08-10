import React from 'react';

const Question = ({ question, options, onAnswer }) => {
    return (
        <div className="question-container">
            <h3>{question}</h3>
            <div className="options-container">
                {options.map((option, index) => (
                    <button 
                        key={index} 
                        onClick={() => onAnswer(index)} 
                        className="option-button"
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Question;
