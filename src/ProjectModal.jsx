// src/components/ProjectModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import './ProjectModal.css'; // Import CSS for styling the modal

const ProjectModal = ({ project, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setIsOpen(true);
      document.body.classList.add('no-scroll');
    } else {
      setIsOpen(false);
      document.body.classList.remove('no-scroll');
    }
  }, [project]);

  if (!project) return null;

  const statusClass = `status-pill ${project.status.replace(' ', '-').toLowerCase()}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
      <div className = "header">
      <p className="modal-date">{project.date}</p>
      <button className="close-button" onClick={onClose}>×</button>
      <h3 className="modal-title">{project.title}</h3>
      </div>
        <img src={project.image} alt={project.title} className="modal-image" />
        <div className="modal-info">
          <div className={statusClass}>{project.status}</div> {/* Move status pill here */}
          <p className="modal-description">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
