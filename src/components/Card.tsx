import React from "react";
import "../styles/Card.css";

interface CardProps {
  title: string;
  thumbnail: string;
  excerpt: string;
  tags: string[];
  link: string;
}

const Card: React.FC<CardProps> = ({ title, thumbnail, excerpt, tags, link }) => {
  return (
    <div className="card">
      <img src={thumbnail} alt={title} className="card-thumbnail" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-excerpt">{excerpt}</p>
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
        <a href={link} className="card-link">
          Read More
        </a>
      </div>
    </div>
  );
};

export default Card;
