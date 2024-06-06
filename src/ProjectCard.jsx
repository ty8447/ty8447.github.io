// src/components/ProjectCard.jsx
import React from 'react';
import './ProjectCard.css'; // Import CSS for styling the card

const ProjectCard = ({ image, title, description, date }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-info">
        <h3>{title}</h3>
        <p className="project-date">{date}</p>
        <p>{description}</p>
        <button className="learn-more-button">Learn More</button>
      </div>
    </div>
  );
};

export default ProjectCard;
