import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import './Assessment.css';

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axiosInstance.get('/api/questions');
      setQuestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion]._id,
      optionIndex,
      question: questions[currentQuestion],
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    const unansweredQuestions = [];
    for (let i = 0; i < questions.length; i++) {
      if (!answers[i] || answers[i].optionIndex === undefined) {
        unansweredQuestions.push(i + 1);
      }
    }

    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions before submitting. You have ${unansweredQuestions.length} unanswered question(s).`);
      return;
    }

    setSubmitting(true);
    try {
      const response = await axiosInstance.post('/api/assessment/submit', { answers });
      if (response.data && response.data.scores) {
        navigate('/result', { state: { results: response.data } });
      } else {
        alert('Invalid response from server. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error submitting assessment. Please try again.';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading questions...</div>;
  }

  if (questions.length === 0) {
    return <div className="loading">No questions available. Please contact administrator.</div>;
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[currentQuestion]?.optionIndex;
  const hasSelectedAnswer = selectedAnswer !== undefined && selectedAnswer !== null;

  return (
    <div className="assessment-container">
      <div className="container">
        <div className="assessment-header">
          <h2>Career Assessment</h2>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <div className="question-card">
          <h3 className="question-text">{question.question}</h3>
          <div className="options-list">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`option-item ${selectedAnswer === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="option-radio">
                  {selectedAnswer === index && <div className="radio-dot"></div>}
                </div>
                <span className="option-text">{option.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="assessment-actions">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn btn-secondary"
          >
            Previous
          </button>
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!hasSelectedAnswer || submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Submitting...' : 'Submit Assessment'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!hasSelectedAnswer}
              className="btn btn-primary"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
