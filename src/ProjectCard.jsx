// src/components/ProjectCard.jsx
import React from 'react';
import './ProjectCard.css';

const ProjectCard = ({ thumbnail, title, summary, date, status, onLearnMore, objectPosition, objectScale }) => {
    const cardRef = React.useRef(null);

    // Determine the class name for the status pill based on the status
    const statusClass = `status-pill ${status.replace(' ', '-').toLowerCase()}`;

    const handleButtonClick = (e) => {
        e.stopPropagation();
        onLearnMore(cardRef);
    };

    return (
        <div className="project-card" ref={cardRef} onClick={() => onLearnMore(cardRef)}>
            <div className={statusClass}>{status}</div>
            <img
                src={thumbnail}
                alt={title}
                className="project-thumbnail"
                style={{
                    objectPosition: objectPosition
                }}
            />
            {/* <div className="fade-grad"></div> */}
            <div className="project-info">
                <h3 className="project-title">{title}</h3>
                <p className="project-date">{date}</p>
                <p className="project-summary">{summary}</p>
                <button className="learn-more-button" onClick={handleButtonClick}>Learn More</button>
            </div>
        </div>
    );
};


export default ProjectCard;
