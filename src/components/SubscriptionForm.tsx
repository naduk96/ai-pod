import React, { useState } from "react";
import "../styles/SubscriptionForm.css";

const SubscriptionForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");

//   const handleEmailSubmit = () => {
//     alert(`Subscribed via Email: ${email}`);
//   };

//   const handleWhatsAppSubmit = () => {
//     alert(`Subscribed via WhatsApp: ${phone}`);
//   };

  return (
    <div className="subscribe-form-container">
      <h1 className="subscribe-title">Leap Africa</h1>
      <p className="subscribe-description">
        The best kept secrets of business and technology, straight to your phone. From the best podcasts and newsletters in the world, tailored for Africa.
      </p>
      <div className="subscribe-form">
        <div className="input-container">
          <span className="whatsapp-icon">📱💬</span>
          <input
            type="email"
            placeholder="Enter Your Phone Number"
            className="subscribe-input"
          />
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;
