import React from 'react';

const Question = ({ question, options, onAnswer }) => {
    return (
        <div className="question-container">
            <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          style={{ zIndex: -1 }}
        ></div>
            <br />         
            <h3 className='que1'>{question}</h3>
            <br />
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
