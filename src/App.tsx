import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Africa from "./pages/Africa.tsx";
import Home from "./pages/Home.tsx";
import SurveyPage from "./pages/Survey.tsx";
import Newsletter from "./pages/Newsletter.tsx";
import { SurveyProvider } from "./context/SurveyContext.tsx";
import Nav from "./components/Navigation.tsx";
import Footer from "./components/Footer.tsx";
const App: React.FC = () => {
  return (
    <SurveyProvider>
      <Router>
        <Nav />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/africa" element={<Africa />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/newsletter" element={<Newsletter />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </SurveyProvider>
  );
};

export default App;
