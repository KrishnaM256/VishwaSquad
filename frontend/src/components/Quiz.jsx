import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';
import quizData from '../components/data/quizData';
import './Quiz.css';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);

    const handleAnswer = (index) => {
        if (index === quizData[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setFinished(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setFinished(false);
        setQuizStarted(false);
    };

    const startQuiz = () => {
        setQuizStarted(true);
    };

    if (finished) {
        return <Result score={score} total={quizData.length} onTryAgain={resetQuiz} />;
    }

    return (
        <div className="quiz-container">
            {!quizStarted ? (
                <div className="quiz-introduction">
                    <h2>Welcome to the Disaster Management Quiz!</h2>
                    <p>This quiz is designed to test your knowledge on disaster management. Please read each question carefully and select the best answer.</p>
                    <p>Click the button below to start the quiz.</p>
                    <button onClick={startQuiz} className="start-quiz-button">Start Quiz</button>
                </div>
            ) : (
                <Question
                    question={quizData[currentQuestion].question}
                    options={quizData[currentQuestion].options}
                    onAnswer={handleAnswer}
                />
            )}
        </div>
    );
};

export default Quiz;
