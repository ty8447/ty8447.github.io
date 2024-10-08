import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './ProjectModal.css';

const allImages = import.meta.glob('/public/Proj_Images/**/*.{jpg,png}', { eager: true });
const allVideos = import.meta.glob('/public/Proj_Images/**/*.mp4', { eager: true });

const ProjectModal = ({ project, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const body = document.body;
    if (project) {
      setIsOpen(true);
      //document.body.classList.add('no-scroll');
      document.body.style.overflow = 'hidden';

      const projectfolder = project.folder;

      const projectImages = Object.keys(allImages)
        .filter(path => path.includes(`/Proj_Images/${projectfolder}/`))
        .map(path => {
          const newPath = new URL(path.replace('/public', ''), import.meta.url).pathname;
          return newPath;
        });

      const projectVideos = Object.keys(allVideos)
        .filter(path => path.includes(`/Proj_Images/${projectfolder}/`))
        .map(path => {
          const newPath = new URL(path.replace('/public', ''), import.meta.url).pathname;
          return newPath;
        });

      setMedia([...projectImages, ...projectVideos]);
    } else {
      setIsOpen(false);
      // document.body.classList.remove('no-scroll');
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
  };
  }, [project]);

  if (!project) return null;

  const statusClass = `status-pill-modal ${project.status.replace(' ', '-').toLowerCase()}`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="header">
          <div className='modal-date-title'>
            <p className="modal-date">{project.date}</p>
            <div className="modal-title-container">
              <h3 className="modal-title">{project.title}</h3>
              <div className={statusClass}>{project.status}</div>
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
              showThumbs={false}
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
