// src/components/ProjectCard.jsx
import React, { useRef } from 'react';
import './ProjectCard.css'; // Import CSS for styling the card

const ProjectCard = ({ image, title, description, date, onLearnMore }) => {
    const cardRef = useRef(null);

    return (
        <div className="project-card" ref={cardRef}>
            <img src={image} alt={title} className="project-image" />
            <div className="project-info">
                <h3 className="project-title">{title}</h3>
                <p className="project-date">{date}</p>
                <p className="project-description">{description}</p>
                <button className="learn-more-button" onClick={() => onLearnMore(cardRef)}>Learn More</button>
            </div>
        </div>
    );
};

export default ProjectCard;
