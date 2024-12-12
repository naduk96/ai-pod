import React from "react";
import "../styles/ValueProp.css";

const ValueProp: React.FC = () => {
  return (
    <div className="value-prop-section">
      <h2 className="section-title">🌟 Why Subscribe? 🌟</h2>
      <ul className="reasons-list">
        <li className="reason-item">
          <span className="emoji">📖</span>
          <span className="text">Simplified global success stories.</span>
        </li>
        <li className="reason-item">
          <span className="emoji">🚀</span>
          <span className="text">Actionable steps to implement locally.</span>
        </li>
        <li className="reason-item">
          <span className="emoji">🌍</span>
          <span className="text">Tailored insights for African entrepreneurs.</span>
        </li>
      </ul>
    </div>
  );
};

export default ValueProp;
