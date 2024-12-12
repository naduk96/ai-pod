import React, { useState } from "react";
import axios from "axios";
import "../styles/Newsletter.css";
import Button from "../components/Button";

const Newsletter: React.FC = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [newsletter, setNewsletter] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateNewsletter = async () => {
    setError(null); // Reset error
    try {
      const response = await axios.post("http://127.0.0.1:5000/generate-newsletter", {
        youtube_link: youtubeLink,
      });
      console.log("API Response:", response.data); // Debugging
      setNewsletter(response.data.newsletter); // Ensure proper nesting
    } catch (err) {
      setError("Failed to generate newsletter. Please try again.");
      console.error(err);
    }
  };


  return (
    <div className="newsletter-page">
      <h1 className="page-header">Generate Your Newsletter</h1>
      <input
        className="input-field"
        type="text"
        value={youtubeLink}
        onChange={(e) => setYoutubeLink(e.target.value)}
        placeholder="Enter YouTube link..."
      />
      <Button label="Generate Newsletter" onClick={generateNewsletter} />
      {error && <p className="error-message">{error}</p>}
      {newsletter && (
        <div className="newsletter-container">
          {/* Step 1: Display Title */}
          <header className="newsletter-header">
            <h1>{newsletter.title}</h1>
            <p className="newsletter-channel">🎙️ Channel: {newsletter.channel}</p>
            <p className="newsletter-duration">⏱️ Duration: {newsletter.duration}</p>
          </header>

          <section className="newsletter-summary">
            <h2>🌟 Summary Highlights</h2>
            <p>{newsletter.summary}</p>
          </section>

          <section className="newsletter-takeaways">
          <h2>📌 Key Takeaways</h2>
          {Array.isArray(newsletter.keyTakeaways) && newsletter.keyTakeaways.length > 0 ? (
            <ul>
              {newsletter.keyTakeaways.map((takeaway: string, index: number) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: takeaway.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
                  }}
                />
              ))}
            </ul>
          ) : (
            <p>No key takeaways were generated for this newsletter.</p>
          )}
        </section>
        <section className="newsletter-africa">
            <h2>🌍 Africa-Specific Innovation</h2>
            <p>
              {newsletter.africaSpecificInnovation || "No Africa-specific innovations provided."}
            </p>
        </section>

        <section className="newsletter-takeaways">
            <h2>🚀 Next Steps for Innovators</h2>
            {Array.isArray(newsletter.nextStepsForInnovators) && newsletter.nextStepsForInnovators.length > 0 ? (
            <ul>
              {newsletter.nextStepsForInnovators.map((takeaway: string, index: number) => (
                <li
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: takeaway.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>"),
                  }}
                />
              ))}
            </ul>
          ) : (
            <p>"No next steps provided."</p>
          )}
            
        </section>

        <footer className="newsletter-footer">
            <a href={newsletter.link} target="_blank" rel="noopener noreferrer">
              👉 Watch the full video
            </a>
        </footer>

        </div>
      )}
    </div>
  );
};

export default Newsletter;
