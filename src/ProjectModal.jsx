import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProjectModal.css'; // Import CSS for styling the modal

// Import all images and videos at build time
const allImages = import.meta.glob('/public/Proj_Images/**/*.{jpg,png}', { eager: true });
const allVideos = import.meta.glob('/public/Proj_Images/**/*.mp4', { eager: true }); // Update pattern to match your structure

const ProjectModal = ({ project, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    if (project) {
      setIsOpen(true);
      document.body.classList.add('no-scroll');
      console.log(`Project Description: ${project.description}`);

      const projectfolder = project.folder;

      // Filter images based on project folder
      const projectImages = Object.keys(allImages)
        .filter(path => path.includes(`/Proj_Images/${projectfolder}/`))
        .map(path => {
          const newPath = new URL(path.replace('/public', ''), import.meta.url).pathname;
          console.log(`Image Path: ${newPath}`); // Debug: Log image paths
          return newPath;
        });

      // Filter videos based on project folder
      const projectVideos = Object.keys(allVideos)
        .filter(path => path.includes(`/Proj_Images/${projectfolder}/`)) // Updated pattern
        .map(path => {
          const newPath = new URL(path.replace('/public', ''), import.meta.url).pathname;
          console.log(`Video Path: ${newPath}`); // Debug: Log video paths
          return newPath;
        });

      console.log(`Project Videos:`, projectVideos); // Debug: Log all project video paths
      console.log(`Project Images:`, projectImages); // Debug: Log all project image paths

      // Combine images and videos
      setMedia([...projectImages, ...projectVideos]);
    } else {
      setIsOpen(false);
      document.body.classList.remove('no-scroll');
    }
  }, [project]);

  if (!project) return null;

  const statusClass = `status-pill-carousel ${project.status.replace(' ', '-').toLowerCase()}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <div className='modal-date-title'>
            <p className="modal-date">{project.date}</p>
            <div className="modal-title-container">
              <h3 className="modal-title">{project.title}</h3>
            </div>
          </div>
          <div className="modal-close"><button className="close-button" onClick={onClose}>×</button></div>
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
        {media.length > 0 ? (
          <div className="carousel-container">
            <Carousel
              dynamicHeight={true}
              showStatus={true}
              showArrows={true}
              infiniteLoop={true}
              showIndicators={false}
              showThumbs={false} // Hide the dots
            >
              {media.map((src, index) => (
                <div key={index}>
                  {src.endsWith('.jpg') || src.endsWith('.png') ? (
                    <img src={src} alt={`Project ${project.title} ${index}`} />
                  ) : (
                    <video controls>
                      <source src={src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </Carousel>
            <div className={statusClass}>{project.status}</div>
          </div>
        ) : (
          <p>No media available</p>
        )}
        <div className="modal-info">
          <p className="modal-description" dangerouslySetInnerHTML={{ __html: project.description }} />
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="projectLink"
          >
            Go to Project Files
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
