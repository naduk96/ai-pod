import React, { useState } from "react";
import { useSurvey } from "../context/SurveyContext";
import Question from "../components/Question.tsx";
import "../styles/Survey.css";
import questions from "../questions";
import EmailModal from "../components/EmailModal";
import ProgressBar from "../components/ProgressBar";

const Survey: React.FC = () => {
    const { currentQuestion, setCurrentQuestion, responses, setResponse } = useSurvey();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleNext = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setIsModalOpen(true); // Open the email modal
        console.log("Survey Complete:", responses);
      }
    };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleEmailSubmit = (email: string) => {
    console.log("Survey Complete:");
    console.log("Responses:", responses);
    console.log("Email:", email);
    // TODO: Submit survey data and email to back-end here
  };
  
  const question = questions[currentQuestion];

  return (
    <div className="survey-page">
    <ProgressBar currentStep={currentQuestion + 1} totalSteps={questions.length} />
      <Question
        id={question.id} // Pass question ID
        text={question.text}
        options={question.options}
        type={question.type}
        onSelect={(answer) => setResponse(currentQuestion, answer)}
        selectedOption={responses[currentQuestion]}
      />
      <div className="button-container">
        {currentQuestion > 0 && (
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
        )}
        <button
          className="next-button"
          onClick={handleNext}
          disabled={question.type !== "text" && !responses[currentQuestion]}
        >
          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
        </button>
        <EmailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleEmailSubmit}
      />
      </div>
    </div>
  );
};

export default Survey;