import React, { useState } from 'react';
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.css";

function Test() {
    const questions = [
        {
            questionText: 'How many pieces in a Red Sox maki?',
            answerOptions: [
                { answerText: '3', isCorrect: false },
                { answerText: '8', isCorrect: true },
                { answerText: '6', isCorrect: false },
                { answerText: '4', isCorrect: false },
            ],
        },
        {
            questionText: "What's liquor is in a Maitai",
            answerOptions: [
                { answerText: 'Rum', isCorrect: true },
                { answerText: 'Vodka', isCorrect: false },
                { answerText: 'Tequila', isCorrect: false },
                { answerText: 'Cognac', isCorrect: false },
            ],
        },
        {
            questionText: "What is shiso leaf?",
            answerOptions: [
                { answerText: 'A luck clover', isCorrect: false },
                { answerText: 'A random leaf from the side walk', isCorrect: false },
                { answerText: 'Japanese Flower', isCorrect: false },
                { answerText: 'Japanese Mint', isCorrect: true },
            ],
        },
        {
            questionText: "What do we call a  “Philly (Philadelphia) Roll” at Yoki?",
            answerOptions: [
                { answerText: 'Philly maki', isCorrect: false },
                { answerText: 'Rock n Roll maki', isCorrect: false },
                { answerText: 'Good Time maki', isCorrect: true },
                { answerText: 'Alaska maki', isCorrect: false },
            ],
        },
        {
            questionText: "Which of the following doesn't contain sesame?",
            answerOptions: [
                { answerText: 'Baby Octopus', isCorrect: false },
                { answerText: 'Spicy brussl sprouts', isCorrect: false },
                { answerText: 'Hotate-Hokkaiyaki', isCorrect: false },
                { answerText: 'Lobster rangoon', isCorrect: true },
                { answerText: 'Seaweed salas', isCorrect: false },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	}

return (
    <div>
    <Navbar />
    <div>            
            <label>Create Quiz?</label>
                <Link to="/createQuiz"> Create quiz</Link>
            </div>
    <div className='app'>
        {showScore ? (
            <div className='score-section'>
                You scored {score} out of {questions.length}
            </div>
        ) : (
            <>
                <div className='question-section'>
                    <div className='question-count'>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div className='question-text'>{questions[currentQuestion].questionText}</div>
                </div>
                <div className='answer-section'>
                    {questions[currentQuestion].answerOptions.map((answerOption) => (
                        <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                    ))}
                </div>
            </>
        )}
    </div>
    </div>
);
}
export default Test;