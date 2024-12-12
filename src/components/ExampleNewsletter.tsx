import React from "react";
import "../styles/ExampleNewsletter.css";

interface ExampleNewsletterProps {
  title: string;
  summary: string;
  keyTakeaways: string[];
  africaSpecificInnovation: string[];
  nextStepsForInnovators: string[];
  link: string;
}

const ExampleNewsletter: React.FC<ExampleNewsletterProps> = ({
  title,
  summary,
  keyTakeaways,
  africaSpecificInnovation,
  nextStepsForInnovators,
  link,
}) => {
  return (
    <div className="newsletter-example">
      <h2 className="newsletter-title">{title}</h2>

      <section className="newsletter-content">
        <h3>📖 Story Highlights:</h3>
        <p>{summary}</p>
      </section>

      <section className="newsletter-content">
        <h3>📌 Key Takeaways:</h3>
        <ul>
          {keyTakeaways.map((takeaway, index) => (
            <li key={index}>{takeaway}</li>
          ))}
        </ul>
      </section>

      <section className="newsletter-content">
        <h3>🌍 Africa-Specific Innovation:</h3>
        <ul>
          {africaSpecificInnovation.map((innovation, index) => (
            <li key={index}>{innovation}</li>
          ))}
        </ul>
      </section>

      <section className="newsletter-content">
        <h3>🚀 Next Steps for Innovators:</h3>
        <ul>
          {nextStepsForInnovators.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </section>

      <footer className="newsletter-content">
        <a href={link} target="_blank" rel="noopener noreferrer" className="newsletter-link">
          👉 Read More Here
        </a>
      </footer>
    </div>
  );
};

export default ExampleNewsletter;
