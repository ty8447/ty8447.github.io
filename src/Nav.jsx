import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Nav.css";

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
];

const Nav = ({ activeLink, onLinkClick }) => {
    const { hash } = useLocation();
    const navigate = useNavigate();
    const [pillStyle, setPillStyle] = useState({});
    const linkRefs = useRef([]);

    const setActiveLink = (path) => {
        console.log("Setting active link to:", path);
        onLinkClick(path);
    };

    const handleNavClick = (path, index) => {
        if (hash === path) {
            navigate("", { replace: true });
            setTimeout(() => {
                navigate(path, { replace: true });
            }, 0);
        } else {
            navigate(path);
        }
        setActiveLink(path);
        updatePillStyle(index);
    };

    const updatePillStyle = (index) => {
        const linkRef = linkRefs.current[index];
        if (linkRef) {
            let backgroundColor = "#4d6aa8";

            if (links[index].path === "#projects") {
                backgroundColor = "#378baf";
            } else if (links[index].path === "#contact") {
                backgroundColor = "#378baf";
            }
            
            setPillStyle({
                width: `${linkRef.offsetWidth}px`,
                left: `${linkRef.offsetLeft}px`,
                backgroundColor: backgroundColor,
            });
        }
    };

    useEffect(() => {
        const activeIndex = links.findIndex((link) => link.path === activeLink);
        updatePillStyle(activeIndex);
    }, [activeLink]);

    return (
        <div className="nav-container">
            <ul className="nav-list">
                {links.map(({ path, label }, index) => (
                    <li key={label}>
                            <a
                                href={path}
                                className={activeLink === path ? "active" : ""}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick(path, index);
                                }}
                                ref={(el) => (linkRefs.current[index] = el)}
                            >
                                {label}
                            </a>
                    </li>
                ))}
            </ul>
            <div className="active-pill" style={pillStyle} />
        </div>
    );
};

export default Nav;