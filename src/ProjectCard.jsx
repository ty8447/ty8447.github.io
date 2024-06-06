// src/components/ProjectCard.jsx
import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ image, title, description, date, status, onLearnMore }) => {
    const cardRef = React.useRef(null);

    // Determine the class name for the status pill based on the status
    const statusClass = `status-pill ${status.replace(' ', '-').toLowerCase()}`;

    return (
        <div className="project-card" ref={cardRef}>
            <div className={statusClass}>{status}</div>
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
