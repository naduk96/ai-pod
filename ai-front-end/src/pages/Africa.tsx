// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import Button from "../components/Button";
// import "../styles/App.css";

// const Home: React.FC = () => {
//   const navigate = useNavigate();

//   const handleStartSurvey = () => {
//     navigate("/survey");
//   };

//   return (
//     <div className="app">
//       <Header />
//       <main className="main">
//         <Button onClick={handleStartSurvey} label="Design My Newsletter" />
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Home;
import React from "react";
import ExampleNewsletter from "../components/ExampleNewsletter";
import SubscriptionForm from "../components/SubscriptionForm";
import ValueProp from "../components/ValueProp";

const mockNewsletter = {
  title: "Vertical AI Agents Could Be 10X Bigger Than SaaS",
  summary: "This is a concise and compelling story summary.",
  keyTakeaways: [
    "Identify repetitive tasks.",
    "Leverage local expertise.",
    "Embrace competition in AI.",
  ],
  africaSpecificInnovation: [
    "Use AI for inventory management in small African businesses.",
    "Automate construction safety monitoring using local data.",
  ],
  nextStepsForInnovators: [
    "Conduct a needs assessment in your local market.",
    "Build a prototype targeting specific industries.",
    "Pilot the solution with small businesses.",
  ],
  link: "https://example.com",
};




const Africa: React.FC = () => {
  return (
    <div className="africa-page">
      <SubscriptionForm />
      <ValueProp />
      {/* <div className="cta-buttons">
        <button className="cta-email">Subscribe via Email</button>
        <button className="cta-whatsapp">Subscribe via WhatsApp</button>
      </div> */}
      <ExampleNewsletter {...mockNewsletter} />
    </div>
  );
};

export default Africa;
