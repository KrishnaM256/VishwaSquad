import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';
import quizData from '../components/data/quizData';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

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
    };

    if (finished) {
        return <Result score={score} total={quizData.length} onTryAgain={resetQuiz} />;
    }

    return (
        <Question
            question={quizData[currentQuestion].question}
            options={quizData[currentQuestion].options}
            onAnswer={handleAnswer}
        />
    );
};

export default Quiz;
