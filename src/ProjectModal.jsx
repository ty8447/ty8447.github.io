// src/components/ProjectModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import './ProjectModal.css'; // Import CSS for styling the modal

const ProjectModal = ({ project, onClose, cardRef }) => {
  const [modalStyle, setModalStyle] = useState({});
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false); // Track if modal is open

  useEffect(() => {
    if (project && cardRef.current && modalRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect();

      setModalStyle({
        position: 'fixed',
        top: `calc(50% - ${cardRect.height / 2}px)`,
        left: `calc(50% - ${cardRect.width / 2}px)`,
        width: cardRect.width,
        height: cardRect.height,
        transition: 'none', // Disable transition for initial position
      });

      requestAnimationFrame(() => {
        setModalStyle({
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: 'auto',
          maxWidth: '800px',
          maxHeight: '80%',
          overflowY: 'auto',
          borderRadius: '15px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          transition: 'all 1.5s ease', // Enable transition for final position
          zIndex: 1001, // Set higher z-index
        });
      });

      setIsOpen(true);
      document.body.classList.add('no-scroll'); // Add class to disable scrolling
    } else {
      if (isOpen) {
        document.body.classList.remove('no-scroll'); // Remove class when modal is closed
        setIsOpen(false);
      }
    }
  }, [project, cardRef, isOpen]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div ref={modalRef} style={modalStyle} onClick={(e) => e.stopPropagation()} className="modal-content">
        <img src={project.image} alt={project.title} className="modal-image" />
        <div className="modal-info">
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-date">{project.date}</p>
          <p className="modal-description">{project.description}</p>
          <button className="close-button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
