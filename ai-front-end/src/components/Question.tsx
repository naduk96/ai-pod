import React from "react";
import "../styles/Question.css";

type QuestionProps = {
  id: number;
  text: string;
  options: string[];
  type: "single-select" | "multiple-select" | "text";
  onSelect: (answer: string | string[]) => void;
  selectedOption?: string | string[];
};

const Question: React.FC<QuestionProps> = ({ id, text, options, type, onSelect, selectedOption }) => {
  const handleOptionClick = (option: string) => {
    if (type === "single-select") {
      onSelect(option);
    } else if (type === "multiple-select") {
      const selected = Array.isArray(selectedOption) ? [...selectedOption] : [];
      if (selected.includes(option)) {
        onSelect(selected.filter((o) => o !== option));
      } else {
        onSelect([...selected, option]);
      }
    }
  };

  return (
    <div className={`question-container ${id === 0 ? "question-style-1" : ""}`}>
      <h1>{text}</h1>
      {type === "text" ? (
        <textarea
          placeholder="Type your response here..."
          value={selectedOption as string || ""}
          onChange={(e) => onSelect(e.target.value)}
          className="text-input"
        />
      ) : (
      <div className="options-container">
        {options.map((option) => (
          <button
            key={option}
            className={`option-button ${
              (Array.isArray(selectedOption) && selectedOption.includes(option)) ||
              selectedOption === option
                ? "selected"
                : ""
            }`}
            onClick={() => handleOptionClick(option)}
          >
            {id === 0 } {option} {/* Add heart icon for Question 1 */}
          </button>
        ))}
      </div>
       )}
    </div>
  );
};

export default Question;