import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Nav.css"; // Assuming you have a separate CSS file for styling

const links = [
  {
    path: "#skills",
    label: "Skills",
  },
  {
    path: "#projects",
    label: "Projects",
  },
  {
    path: "#contact",
    label: "Contact",
  },
  {
    path: "Resume_Cole_Rabe.pdf",
    label: "Download Resume",
    isDownload: true,
  },
];

const Nav = ({ activeLink, onLinkClick }) => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const setActiveLink = (path) => {
    console.log("Setting active link to:", path);
    onLinkClick(path);
  };

  const handleNavClick = (path) => {
    if (hash === path) {
      navigate("", { replace: true });
      setTimeout(() => {
        navigate(path, { replace: true });
      }, 0);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="nav-container">
      <ul>
        {links.map(({ path, label, isDownload }) => (
          <li key={label}>
            {isDownload ? (
              <a href={path} download className="resume-button">
                {label}
              </a>
            ) : (
              <a
                href={path}
                className={activeLink === path ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(path);
                  onLinkClick(path);
                  setActiveLink(path); // Update active link when clicked
                }}
              >
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
      <div
        className="active-pill"
        style={{ left: links.findIndex((link) => link.path === activeLink) * 25 + "%" }}
      />
    </div>
  );
};

export default Nav;
