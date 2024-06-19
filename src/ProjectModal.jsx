import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProjectModal.css'; // Import CSS for styling the modal

// Import all images at build time
const allImages = import.meta.glob('/public/Proj_Images/**/*.jpg', { eager: true });

const ProjectModal = ({ project, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // console.log('All Images:', allImages); // Log all imported images

    if (project) {
      setIsOpen(true);
      document.body.classList.add('no-scroll');

      const projectfolder = project.folder;
      // console.log('Project Title:', projectfolder); // Debug: Log project title

      // Filter images based on project title
      const projectImages = Object.keys(allImages)
        .filter(path => {
          const matches = path.includes(`/Proj_Images/${projectfolder}/`);
          // console.log(`Checking path: ${path} - Matches: ${matches}`); // Debug: Log each path check
          return matches;
        })
        .map(path => {
          const newPath = path.replace('/public', '');
          // console.log(`Filtered Path: ${newPath}`); // Debug: Log filtered paths
          return newPath;
        })
        .map(path => new URL(path, import.meta.url).pathname); // Adjust path

      // console.log('Filtered Images:', projectImages); // Debug: Log filtered images

      setImages(projectImages);
    } else {
      setIsOpen(false);
      document.body.classList.remove('no-scroll');
    }
  }, [project]);

  if (!project) return null;

  const statusClass = `status-pill-modal ${project.status.replace(' ', '-').toLowerCase()}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <p className="modal-date">{project.date}</p>
          <button className="close-button" onClick={onClose}>×</button>
          <div className="modal-title-container">
          <h3 className="modal-title">{project.title}</h3>
          <div className={statusClass}>{project.status}</div>
          </div>
        </div>
        <div className="tools-list">
            {project.tools && project.tools.length > 0 && (
              <ul className="tools">
                {project.tools.map((tool, index) => (
                  <li key={index} className="tool-pill">{tool}</li>
                ))}
              </ul>
            )}
          </div>
        {images.length > 0 ? (
          <Carousel dynamicHeight={true} showStatus={false} showArrows={true} infiniteLoop={true} >
            {images.map((src, index) => (
              <div key={index}>
                <img src={src} alt={`Project ${project.title} ${index}`} />
              </div>
            ))}
          </Carousel>
        ) : (
          <p>No images available</p>
        )}
        <div className="modal-info">
          <p className="modal-description">{project.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
