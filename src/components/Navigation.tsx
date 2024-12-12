import React from "react";
import { Link } from "react-router-dom";
import "../styles/Headers.css"; // Use Header.css for clarity

const Nav: React.FC = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="nav-logo">
          PodGen
        </Link>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/africa" className="nav-link">Africa</Link>
          <Link to="/survey" className="nav-link">Survey</Link>
          <Link to="/newsletter" className="nav-link">Newsletter</Link>
        </nav>
        <button className="nav-button">Subscribe</button>
      </div>
    </header>
  );
};

export default Nav;
