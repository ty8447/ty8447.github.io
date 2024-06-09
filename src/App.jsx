// import Wireframe from './Wireframe';
import React, { useEffect, useState, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import Nav from './Nav.jsx';
import Copyright from './Copyright';

const Skills = () => <h1>Skills</h1>;
const Projects = () => <h1>Projects</h1>;
const Contact = () => <h1>Contact</h1>;

const ScrollToSection = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return null;
};

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCardRef, setSelectedCardRef] = useState(null);
  const [activeLink, setActiveLink] = useState("#skills");
  const [isSticky, setIsSticky] = useState(false);
  const [isSkillsVisible, setIsSkillsVisible] = useState(false);
  const [isSkillsInView, setIsSkillsInView] = useState(false);
  const linksContainerRef = useRef(null);
  const titleContainerRef = useRef(null);

  const projectRef = useRef(null);
  const skillRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: "#skills", ref: skillRef },
      { id: "#projects", ref: projectRef },
      { id: "#contact", ref: contactRef },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
            if (entry.target.id === "skills") {
              setIsSkillsVisible(true);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }

    sections.forEach(({ id, ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    const handleScroll = () => {
      if (linksContainerRef.current && titleContainerRef.current) {
        const titleContainerBottom = titleContainerRef.current.getBoundingClientRect().bottom;
        const linksContainerTop = linksContainerRef.current.getBoundingClientRect().top;
        setIsSticky(titleContainerBottom <= 0 && linksContainerTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {

      sections.forEach(({ id, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        } else {
          console.log("Ref not set for:", id);
        }
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isSkillsInView) {
      setIsSkillsVisible(true);
    }
  }, [isSkillsInView]);

  const projectData = [
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'MacDeck Dynamic Keyboard',
      description: 'Back when the Stream Deck was first released I loved the concept of having a dynamic macro keyboard for productivity, but I felt that the design was lacking in terms of control. My goal for this project was to design a product where it would functionally work the same as that device but incorporates many of the missing features I was looking for.',
      date: 'August 2021',
      status: 'In Progress',
      objectPosition: 'center center',
    },
    {
      image: 'Proj_Images/Proj_Flashlight.jpg',
      title: 'FWG Flashlight',
      description: 'My friend and I love flashlights and the we wanted to challenge ourselves to make one from scratch, but by adding brand new features to increase ease of use.',
      date: 'February 2022',
      status: 'In Progress',
      objectPosition: '0% 40%',
    },
    {
      image: 'Proj_Images/Proj_Longboard.jpg',
      title: 'DIY Electric Longboard',
      description: 'From when I was a kid I loved longboarding and after seeing one in person and knew I had to make my own.',
      date: 'June 2020',
      status: 'Completed',
      objectPosition: '0% 25%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Tendy: The Virtual Home Bartending Assistant ',
      description: 'While in College I built a liquor cabinet for my apartment and wanted to have an easy way to find drink recipes with the ingredients I have already in my apartment, so I developed a localized assistant that can be easily downloaded.',
      date: 'April 2023',
      status: 'In Progress',
      objectPosition: '0% 20%',
    },
    {
      image: 'Proj_Images/Proj_LEDControl.jpg',
      title: 'Home LED Effect Controller',
      description: 'While in College I built a liquor cabinet for my apartment and wanted to have an easy way to find drink recipes with the ingredients I have already in my apartment, so I developed a localized assistant that can be easily downloaded',
      date: 'August 2021',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Custom LED Headlights for Personal Electric Vehicles',
      description: 'After building a bunch of electric boards I found that there were not many small but reliable solutions for head and tail lights (besides the individual solutions for bikes) so I decided that I was going to make one myself for my Onewheel and Longboard.',
      date: 'November 2023',
      status: 'Paused',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Battery.jpg',
      title: 'Custom Electric Vehicles Battery Packs',
      description: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application .',
      date: 'May 2022',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Automated Item Purchaser',
      description: "When moving into my dorm room I wanted to add more light but didn't want to damage anything, so LED lights were used instead. Instead of using low cost led lights, I took the opportunity to design a control system for them and the project became more complex from there.",
      date: 'June 2023',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Lamps.jpg',
      title: 'Wirelessly Communicating Lamps',
      description: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application ',
      date: 'December 2023',
      status: 'Completed',
      objectPosition: '0% 40%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Custom VR Headset',
      description: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application ',
      date: 'January 2016',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'DIY CNC Machine',
      description: 'Back when there was the Oculus Rift and Google Cardboard, I was inspired to try and see if I could make a prototype myself.',
      date: 'February 2018',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Portfolio Website',
      description: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application ',
      date: 'June 2024',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Onewheel.jpg',
      title: 'Scratch Built Onewheel',
      description: 'While updating my resume I found that I wanted to have a way of sharing the most recent version of my projects and resume without needing to resend.',
      date: 'July 2022',
      status: 'Completed',
      objectPosition: '0% 50%',
    },
    {
      image: 'Proj_Images/Proj_Arcade.jpg',
      title: 'Custom Full Sized Arcade Machine',
      description: 'After renovating my basement, I found that there was some extra space to put something and I found that an arcade machine would fit perfectly. After a bunch of research, I found the cost of an arcade machine to be too high and limiting in the games it would provide so I ended up building one myself.',
      date: 'May 2018',
      status: 'Completed',
      objectPosition: '0% 40%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Simple LED Mapper',
      description: 'In order to determine the walls of the room and amount of LEDs on each wall for animations, I made a program that easily achieved this and gives an output that can be directly inputted into the LED Controller',
      date: 'December 2022',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Handheld Fog Machine',
      description: "For my friend's birthday I wanted to give him a gift that he could use for photography and found some really cool pictures that were achieved with smoke machines. In order to achieve this my goal is to use a small microcontroller to control a heating element and other useful features.",
      date: 'December 2022',
      status: 'In Progress',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Designing a Mechanism to Avoid Ice Deformation of Fixed Docks',
      description: 'My senior capstone project was to design a mechanism that would reduce the deformation caused by ice on fixed docks. This project was started after my partner got frustrated with the process for winterization of a fixed dock and created a team to help solve that.',
      date: 'January 2023',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Reducing Traffic Congestion in Downtown Nantucket, MA',
      description: "For my friend's birthday I wanted to give him a gift that he could use for photography and found some really cool pictures that were achieved with smoke machines. In order to achieve this my goal is to use a small microcontroller to control a heating element and other useful features.",
      date: 'October 2022',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Drone.jpg',
      title: 'Radio Controlled FPV Racing Drones',
      description: 'When I was a kid I always love the toy helicopters and when drones started to become a thing I built many different drones (with some that were autonomous and some that could carry payloads).',
      date: 'February 2016',
      status: 'Completed',
      objectPosition: '0% 55%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Developing a Local Multiplayer Game within Unreal Engine 4',
      description: 'When I was a kid I always love the toy helicopters and when drones started to become a thing I built many different drones (with some that were autonomous and some that could carry payloads).',
      date: 'May 2016',
      status: 'Paused',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Restoration of a Vintage Pipe Failure Tester',
      description: "This project came about after I was given a broken tester that he didn't have time to fix and asked if I wanted to try and fix it.",
      date: 'April 2023',
      status: 'In Progress',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Reverse Engineering a Consumable Computer Foot',
      description: "After a bunch of the feet on my computer case broke, I was in need of finding a solution and turned to taking a foot that wasn't broken and remade them within CAD and 3D printed them.",
      date: 'July 2018',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_Voronoi.jpg',
      title: 'Designing a Random Voronoi Generator',
      description: "During an intro to programming class we were asked to build a program to do anything, as long as it was in Python. This program was built in 48 hours.",
      date: 'January 2023',
      status: 'Completed',
      objectPosition: '0% 40%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Developing an Ultrasonic Levitating Device',
      description: 'The first project I used CAD for was to design and build a device that uses low cost ultrasonic sensors to float very light objects.',
      date: 'January 2019',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      image: 'Proj_Images/Proj_DMX.jpg',
      title: 'Designing a custom controller to interact with mains voltage devices',
      description: 'For a theatrical performance we needed to have a rotary phone ring, instead of using a sound effect the director wanted to see if we could make a real rotary phone ring on command and tasked me with finding a solution.',
      date: 'October 2019',
      status: 'Completed',
      objectPosition: '0% 40%',
    },
    {
      image: 'Proj_Images/Proj_Bracket.jpg',
      title: 'Designing a Vintage On Air Sign ',
      description: 'For a theatrical performance we needed to have a rotary phone ring, instead of using a sound effect the director wanted to see if we could make a real rotary phone ring on command and tasked me with finding a solution..',
      date: 'October 2019',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
  ];

  const handleLearnMore = (project, cardRef) => {
    setSelectedProject(project);
    setSelectedCardRef(cardRef);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSelectedCardRef(null);
  };

  return (
    <Router>
      <div className="body-container">
        <ScrollToSection />
        <div className="title-container" ref={titleContainerRef}>
          {/* <Wireframe /> */}
          <div className="name-profession-container">
            <h1 style={{pointerEvents:"none"}}>Cole Rabe</h1>
            <p style={{pointerEvents:"none"}}>Mechanical Engineer | Electrical Engineer</p>
            <a href="Resume_Cole_Rabe.pdf" download="Resume_Cole_Rabe.pdf" class="resume-button">Download Resume</a>
          </div>
          <a href="#skills" className="scroll-arrow">
            <img
              src="Icons/scroll_arrow.png"
              alt="Scroll Arrow"
              className="shrink-arrow"
            />
          </a>
        </div>
        <div className={`links-container ${isSticky ? "sticky" : ""}`}
          ref={linksContainerRef}>
          <nav id="nav">
            <Nav activeLink={activeLink} onLinkClick={setActiveLink} />
          </nav>
        </div>
        <div className="skill-container">
          <div className="wave1-background"></div>
          <section id="skills" ref={skillRef}>
            <h1 className="section-title skill-title">Skills</h1>
            <div className="skill-categories">
              <div className={`sksoftware ${isSkillsVisible ? 'fade-in' : ''}`}>
                <h2>Software</h2>
                <div className="icons-column">
                  <div className="icon" title="Altium Designer">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      role="img"
                    >
                      <path d="M19.14 5.876a1.012 1.012 0 0 0-.442-.442L9.744.171c-.329-.226-.843-.226-1.203-.01L5.148 2.145a2.045 2.045 0 0 0-.144.123 1.086 1.086 0 0 0-.288.72l.01 6.569-.02.215.062.123a.478.478 0 0 0 .195.206.516.516 0 0 0 .555.01L8.859 8.2a.573.573 0 0 0 .175-.175l.082-.165V4.643l2.251 1.326 3.536 2.077a.413.413 0 0 1 .164.185.442.442 0 0 1 .062.226v7.052a.52.52 0 0 1-.072.257c-.041.072-.082.123-.154.154l-4.225 2.488-1.573.925v-3.228l1.953-1.172 1.049-.627.185-.175.021-.051a.542.542 0 0 0 .062-.247V9.999a.51.51 0 0 0-.092-.288l-.062-.123-.144-.072c-.093-.041-.175-.041-.247-.041l-.175.01-6.363 3.865a1.129 1.129 0 0 0-.442.463 1.281 1.281 0 0 0-.144.607v6.559c0 .257.103.514.329.75.082.062.154.113.236.164l3.341 1.943c.186.113.381.164.597.164.216 0 .422-.051.596-.164l8.882-5.212c.195-.103.36-.267.442-.432.113-.185.164-.401.164-.617V6.483a1.236 1.236 0 0 0-.153-.607zM8.387 7.624 5.447 9.32V2.988c0-.072.031-.154.092-.216l.216-.123 2.632 1.563v3.412zm-2.951 6.795c0-.093.021-.185.062-.278a.409.409 0 0 1 .175-.175l5.973-3.629v3.392l-.956.576-2.313 1.388-2.94 1.778v-3.052zm0 6.559v-2.663l2.94-1.768v3.218l-2.632 1.552-.103-.062c-.051-.031-.093-.051-.103-.062-.061-.071-.102-.143-.102-.215zm13.128-3.403a.518.518 0 0 1-.072.257.342.342 0 0 1-.165.154l-8.892 5.222a.405.405 0 0 1-.452 0l-2.508-1.47 4.575-2.693v-.01l4.215-2.478a.998.998 0 0 0 .432-.442 1.13 1.13 0 0 0 .175-.606V8.457c0-.216-.062-.421-.165-.596a1.189 1.189 0 0 0-.432-.442l-3.536-2.077-3.352-1.974-1.923-1.141L8.911.788a.446.446 0 0 1 .452 0l8.985 5.294a.319.319 0 0 1 .154.154.517.517 0 0 1 .062.247v11.092z" />
                    </svg>
                  </div>
                  <div className="icon" title="Gimp">
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                      id="Camada_1"
                      version="1.1"
                      xmlSpace="preserve"
                    >
                      <style type="text/css">{`.st0 { fill: #FFF; }.st1 { fill-rule: evenodd; clip-rule: evenodd; fill: #FFF; }`}</style>
                      <g>
                        <path
                          className="st0"
                          d="M17.3,24.5c-4.7,0-7.7-1.1-9.6-2.6c0.4-0.1,0.8-0.3,1.2-0.6c0.8-0.8,1-1.9,0.9-2.9c0-0.2-0.1-0.4-0.1-0.6 c0.2,0,0.4,0.1,0.6,0.1c0.9,0,1.7-0.4,2.3-1c0.6,1.1,1.8,1.9,3.2,1.9c1.7,0,3.2-1.2,3.5-2.9c0-0.2,0.1-0.5,0.1-0.7 c0-0.4-0.1-0.8-0.2-1.2c-0.5-1.4-1.8-2.4-3.4-2.4c-0.9,0-1.8,0.3-2.4,0.9c-0.2,0.2-0.4,0.4-0.6,0.7c-0.2-0.2-0.4-0.5-0.6-0.6 c-0.5-0.4-1.2-0.7-1.9-0.7c-1.5,0-2.8,1.1-3,2.6c-0.3-0.2-0.5-0.4-0.8-0.5c0.2-0.8,0.7-1.6,1.3-2.1V8.1c0-0.3,0.3-0.4,0.4-0.1 l0,0.1c0.4,0.9,0.9,2.1,2,3c0.9,0,1.8,0.3,2.4,0.9c0.8-0.7,1.9-1.2,3-1.2c1.2,0,2.3,0.5,3.1,1.2c3.8-1.1,5.8-3.6,6.8-5.6 c0.1-0.3,0.7-0.2,0.7,0.1c0.6,5.9,0.3,12-2.5,15.4c-1-0.7-2-1.2-2.7-1.6c-0.1,0-0.1-0.1-0.2-0.1c0-0.1,0-0.2,0-0.2l0,0 c-0.2-0.6-0.7-1.2-1.4-1.4l0,0c-0.2-0.1-0.5,0-0.5,0.3c-0.1,0.2,0,0.5,0.3,0.5l0,0c0,0,0.1,0,0.1,0c-1.7,1.1-3.7,1.6-5.8,1.5 l-0.5,0c-0.2,0-0.4,0.2-0.5,0.4c0,0.2,0.2,0.4,0.4,0.5l0.5,0c1.8,0.1,3.7-0.2,5.3-1c0,0,0,0,0,0c0.1,0.1,0.2,0.3,0.3,0.4 c0.2,0.2,0.5,0.5,0.9,0.8c0.5,0.5,1.2,1,2,1.6C20.7,24.1,19.2,24.5,17.3,24.5L17.3,24.5z"
                        />
                        <path
                          className="st0"
                          d="M22.5,23c-1.2-0.9-2.2-1.7-2.8-2.2c-0.1-0.1-0.1-0.1-0.2-0.2c-0.1-0.2-0.2-0.3-0.3-0.4c0-0.1,0-0.1,0-0.1 c0,0,0.1-0.1,0.2,0c0.1,0,0.2,0.1,0.3,0.1c0.1,0,0.1,0.1,0.2,0.1c0.7,0.3,2,1,3.3,1.9c0.2,0.1,0.4,0.3,0.6,0.4c1.1,0.7,2,1.5,2.7,2 c1.2-1.3,2.7,2.2,2.7,2.2s-3.8,0.4-3.1-1.4c-0.8-0.4-1.8-1.1-2.9-1.8C23,23.4,22.7,23.2,22.5,23L22.5,23z"
                        />
                        <path
                          className="st1"
                          d="M8.5,20.4c-0.1,0.1-0.2,0.2-0.3,0.3c-1.1,1-3.2,0.5-4.7-1.2c-1.5-1.7-1.9-3.8-0.8-4.8C3.6,14,5,14.1,6.3,14.9 c0.3,0.2,0.7,0.5,1,0.8c0.1,0.1,0.2,0.2,0.3,0.3c0.4,0.5,0.8,1,1,1.5c0.3,0.7,0.4,1.4,0.4,2C8.9,19.8,8.8,20.1,8.5,20.4L8.5,20.4z M5.2,16.2c0,0.8-0.5,1.4-1.2,1.4S2.8,17,2.8,16.2c0-0.8,0.5-1.4,1.2-1.4S5.2,15.4,5.2,16.2z"
                        />
                        <path
                          className="st0"
                          d="M10.9,16.8c1,0,1.7-0.8,1.7-1.7c0-1-0.8-1.7-1.7-1.7c-0.1,0-0.3,0-0.4,0c0.4,0.1,0.7,0.5,0.7,1 c0,0.6-0.5,1-1,1c-0.4,0-0.8-0.3-1-0.7c0,0.1,0,0.3,0,0.4C9.2,16,10,16.8,10.9,16.8z"
                        />
                        <path
                          className="st0"
                          d="M16.4,17.6c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2c-0.1,0-0.2,0-0.3,0c0.5,0.1,0.9,0.6,0.9,1 c0,0.6-0.5,1.2-1.2,1.2c-0.6,0-1.2-0.5-1.2-1.2c0-0.1,0-0.1,0-0.2c-0.2,0.3-0.3,0.7-0.3,1.1C14.4,16.7,15.3,17.6,16.4,17.6 L16.4,17.6z"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="icon" title="Arduino IDE">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M31.76 16c-0.077-4.251-3.588-7.636-7.839-7.563-0.391 0-0.801 0.032-1.203 0.068-3.359 0.495-5.599 2.907-6.839 4.76-1.265-1.853-3.52-4.265-6.853-4.76-0.401-0.036-0.797-0.068-1.199-0.068-4.249-0.063-7.749 3.317-7.828 7.563 0.079 4.245 3.579 7.625 7.828 7.563 0.401 0 0.797-0.032 1.224-0.084 3.36-0.479 5.599-2.891 6.855-4.744 1.265 1.853 3.505 4.265 6.853 4.76 0.412 0.036 0.803 0.068 1.213 0.068 4.229 0.041 7.709-3.333 7.787-7.563zM8.64 20.803c-0.265 0.052-0.572 0.052-0.837 0.052-2.767 0.057-5.057-2.12-5.136-4.881 0.088-2.765 2.385-4.943 5.145-4.88 0.267 0 0.563 0.027 0.839 0.052 3.161 0.469 5.095 3.563 5.751 4.828-0.667 1.267-2.599 4.401-5.751 4.829zM17.333 16c0.651-1.24 2.588-4.36 5.745-4.828 0.271-0.052 0.561-0.052 0.828-0.052 2.776-0.084 5.088 2.104 5.161 4.88-0.089 2.76-2.385 4.937-5.147 4.88-0.271 0-0.561-0.025-0.828-0.052-3.145-0.468-5.093-3.588-5.744-4.828zM5.615 16.787h4.719v-1.547h-4.708v1.547zM24.453 16.787h1.588v-1.547h-1.604v-1.589h-1.505v1.604h-1.599v1.532h1.599v1.573h1.537v-1.557zM32 9.412c0 0.4-0.292 0.681-0.708 0.681-0.38 0.016-0.699-0.287-0.704-0.667 0-0.375 0.319-0.692 0.704-0.692 0.416 0 0.708 0.292 0.708 0.677zM30.787 9.412c0 0.296 0.213 0.536 0.531 0.536 0.297 0 0.511-0.24 0.511-0.536 0-0.292-0.213-0.532-0.511-0.532-0.317-0.025-0.531 0.213-0.531 0.532zM31.188 9.76h-0.136v-0.692l0.265-0.016c0.12 0 0.188 0.016 0.245 0.041 0.052 0.027 0.077 0.079 0.077 0.147 0 0.077-0.052 0.135-0.145 0.145 0.068 0.027 0.093 0.084 0.12 0.177l0.036 0.172h-0.156c-0.025-0.027-0.025-0.095-0.057-0.172-0.025-0.068-0.052-0.093-0.145-0.093h-0.063l-0.032 0.291zM31.213 9.36h0.079c0.093 0 0.135-0.011 0.135-0.095 0-0.068-0.041-0.093-0.135-0.093h-0.095v0.188z" />
                    </svg>
                  </div>
                  <div className="icon" title="Eclipse IDE">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M14.813 0.031c-0.365 0.005-0.807 0.016-0.984 0.031-4.859 0.417-9.203 3.297-11.724 7.75-1.203 2.151-1.911 4.547-2.078 7.005-0.052 0.688-0.026 2.323 0.047 2.943 0.406 3.578 1.802 6.745 4.094 9.286 2.615 2.896 6.115 4.625 9.917 4.885 0.557 0.042 1.391 0.052 1.359 0.016-0.146-0.047-0.297-0.078-0.453-0.099-2.229-0.443-4.516-1.505-6.365-2.979-1.255-1.005-2.359-2.188-3.271-3.51-1.745-2.573-2.734-5.583-2.844-8.693-0.083-1.927 0.167-3.859 0.745-5.698 1.047-3.365 3.161-6.302 5.969-8.307 1.688-1.219 3.609-2.073 5.651-2.5l0.589-0.13zM16.776 0.714c-2.583 0.151-5.036 1.021-7.042 2.484-2.5 1.828-4.411 4.328-5.443 7.13-0.193 0.531-0.375 1.094-0.375 1.172 0 0.016 5.104 0.031 13.745 0.031 11.286 0 13.755-0.010 13.755-0.047 0-0.063-0.203-0.698-0.375-1.172-0.203-0.557-0.771-1.745-1.094-2.297-0.531-0.911-1.214-1.828-1.964-2.656-2.203-2.427-4.792-3.911-7.76-4.443-1.047-0.188-2.401-0.266-3.448-0.203zM31.771 13.292c-0.026 0-6.385 0-14.141 0.005l-14.099 0.010-0.016 0.078c-0.047 0.214-0.177 1.443-0.177 1.661 0 0.036 2.375 0.042 14.328 0.042h14.333v-0.099c0-0.135-0.094-1.057-0.141-1.406-0.026-0.214-0.052-0.292-0.083-0.292zM17.677 16.807c-12.495-0.005-14.307 0-14.323 0.047-0.031 0.052 0.031 0.745 0.099 1.297 0.026 0.208 0.047 0.396 0.047 0.422 0 0.031 2.849 0.047 14.167 0.047h14.161l0.036-0.255c0.057-0.432 0.135-1.292 0.125-1.422l-0.010-0.125zM17.682 20.432c-11.844 0-13.766 0.005-13.766 0.047 0 0.026 0.073 0.276 0.161 0.557 0.589 1.828 1.526 3.521 2.76 4.99 0.375 0.458 1.26 1.38 1.641 1.719 2.089 1.865 4.328 2.953 6.906 3.37 0.807 0.125 1.182 0.151 2.333 0.146 1.214 0 1.729-0.042 2.698-0.234 2.813-0.552 5.219-1.932 7.375-4.224 1.688-1.797 2.807-3.682 3.5-5.885l0.156-0.484z" />
                    </svg>
                  </div>
                  <div className="icon" title="Github">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
                    </svg>
                  </div>
                  <div className="icon" title="Git">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M31.396 14.573l-13.974-13.969c-0.802-0.807-2.109-0.807-2.917 0l-2.896 2.901 3.682 3.677c0.859-0.286 1.839-0.094 2.516 0.589 0.688 0.688 0.88 1.677 0.589 2.531l3.542 3.547c0.859-0.297 1.849-0.104 2.531 0.583 0.964 0.958 0.964 2.51 0 3.469-0.958 0.958-2.505 0.958-3.464 0-0.719-0.719-0.901-1.781-0.542-2.661l-3.318-3.302v8.703c0.234 0.115 0.458 0.271 0.651 0.464 0.953 0.964 0.953 2.51 0 3.469-0.958 0.958-2.516 0.958-3.479 0-0.958-0.958-0.958-2.505 0-3.469 0.245-0.24 0.516-0.417 0.807-0.536v-8.786c-0.286-0.125-0.563-0.297-0.802-0.536-0.724-0.724-0.901-1.786-0.526-2.677l-3.615-3.635-9.583 9.578c-0.797 0.802-0.797 2.109 0 2.917l13.974 13.969c0.807 0.807 2.109 0.807 2.917 0l13.906-13.906c0.807-0.802 0.807-2.109 0-2.917z" />
                    </svg>
                  </div>
                  <div className="icon" title="Raspberry Pi">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M21.479 23.12c-1.14 1.317-1.776 3.719-0.943 4.495 0.792 0.593 2.933 0.521 4.511-1.641 1.151-1.443 0.76-3.859 0.109-4.5-0.973-0.739-2.369 0.22-3.677 1.663zM10.74 23.516c-1.213-1.385-2.787-2.209-3.803-1.599-0.683 0.509-0.807 2.249 0.161 3.957 1.437 2.032 3.464 2.24 4.297 1.745 0.88-0.651 0.401-2.855-0.656-4.104zM16.213 27.708c-1.473-0.031-3.735 0.589-3.703 1.38-0.027 0.537 1.776 2.095 3.609 2.016 1.765 0.041 3.593-1.52 3.573-2.197-0.005-0.699-1.996-1.235-3.475-1.177zM16.115 9.12c-1.703-0.041-3.339 1.244-3.339 1.989-0.005 0.907 1.344 1.833 3.349 1.86 2.057 0.009 3.353-0.745 3.375-1.683 0.021-1.057-1.86-2.183-3.36-2.167zM12.016 9.828c-2.844-0.459-5.213 1.199-5.12 4.255 0.093 1.177 6.172-4.052 5.125-4.233zM25.016 14.161c0.093-3.036-2.276-4.692-5.125-4.235-1.047 0.183 5.031 5.417 5.125 4.235zM25.5 15.26c-1.651-0.437-0.557 6.735 0.787 6.156 1.479-1.161 1.953-4.599-0.787-6.135zM5.636 21.495c1.343 0.599 2.437-6.573 0.785-6.135-2.733 1.541-2.265 4.973-0.785 6.156zM18.193 13.563c-1.532 1-1.808 3.24-0.615 4.995 1.187 1.76 3.391 2.416 4.916 1.437 1.532-0.973 1.808-3.213 0.62-4.995-1.193-1.776-3.396-2.416-4.921-1.416zM14.063 13.745c-1.527-0.98-3.735-0.339-4.917 1.416-1.192 1.781-0.916 4.016 0.615 5.016 1.527 1 3.729 0.359 4.923-1.417 1.177-1.76 0.896-4-0.62-4.995zM19.885 23.292c-0.011-1.855-1.667-3.355-3.703-3.333-2.037 0.020-3.683 1.515-3.672 3.375v0.036c0.011 1.86 1.672 3.36 3.708 3.339 2.036 0 3.677-1.515 3.656-3.353v-0.043zM24.167 3.115c-3.079 1.579-4.869 2.839-5.855 3.916 0.505 2 3.125 2.079 4.089 2.016-0.199-0.077-0.365-0.197-0.423-0.353 0.24-0.163 1.095-0.021 1.693-0.344-0.229-0.037-0.339-0.079-0.443-0.261 0.563-0.176 1.167-0.317 1.52-0.619-0.187 0-0.369 0.041-0.619-0.12 0.5-0.256 1.036-0.48 1.457-0.876-0.26 0-0.541 0-0.619-0.099 0.457-0.281 0.843-0.583 1.167-0.943-0.36 0.063-0.516 0.027-0.605-0.036 0.349-0.344 0.792-0.641 1-1.084-0.271 0.104-0.52 0.12-0.697 0 0.125-0.255 0.631-0.416 0.921-1.036-0.285 0.041-0.588 0.063-0.651 0 0.136-0.521 0.36-0.817 0.584-1.14-0.609 0-1.537 0-1.491-0.037l0.376-0.38c-0.595-0.161-1.204 0.021-1.647 0.161-0.197-0.14 0-0.344 0.245-0.541-0.521 0.083-0.975 0.183-1.375 0.344-0.219-0.204 0.135-0.38 0.317-0.584-0.797 0.161-1.12 0.36-1.459 0.557-0.24-0.219-0.020-0.416 0.141-0.593-0.6 0.219-0.901 0.495-1.219 0.755-0.12-0.14-0.281-0.239-0.084-0.599-0.416 0.24-0.74 0.521-0.979 0.839-0.256-0.177-0.156-0.401-0.156-0.599-0.443 0.359-0.72 0.719-1.057 1.083-0.084-0.041-0.141-0.203-0.183-0.463-1.037 1-2.521 3.5-0.38 4.473 1.796-1.459 3.973-2.536 6.375-3.339zM7.823 3.115c2.396 0.803 4.557 1.88 6.371 3.359 2.124-1 0.656-3.5-0.381-4.473-0.052 0.255-0.109 0.437-0.176 0.479-0.339-0.359-0.615-0.724-1.052-1.083 0 0.203 0.104 0.443-0.157 0.599-0.233-0.317-0.547-0.599-0.963-0.839 0.197 0.344 0.031 0.443-0.079 0.599-0.317-0.296-0.62-0.577-1.197-0.796 0.161 0.197 0.4 0.401 0.161 0.62-0.319-0.199-0.661-0.401-1.437-0.563 0.176 0.197 0.536 0.4 0.317 0.604-0.423-0.167-0.88-0.287-1.38-0.349 0.239 0.203 0.453 0.385 0.255 0.541-0.459-0.161-1.073-0.339-1.672-0.176l0.375 0.375c0.043 0.052-0.875 0.041-1.495 0.047 0.224 0.303 0.453 0.599 0.584 1.14-0.063 0.057-0.36 0.021-0.645 0 0.301 0.6 0.796 0.761 0.916 1.021-0.177 0.125-0.417 0.099-0.697 0 0.219 0.417 0.661 0.719 1 1.079-0.1 0.057-0.24 0.099-0.62 0.052 0.317 0.344 0.697 0.656 1.161 0.937-0.084 0.093-0.365 0.088-0.641 0.099 0.417 0.407 0.959 0.62 1.459 0.885-0.26 0.183-0.443 0.141-0.62 0.141 0.339 0.296 0.959 0.437 1.521 0.615-0.125 0.181-0.219 0.224-0.464 0.26 0.599 0.339 1.437 0.183 1.683 0.359-0.063 0.161-0.219 0.281-0.421 0.365 0.957 0.057 3.599-0.021 4.099-2.021-0.985-1.077-2.781-2.339-5.86-3.896zM10.136 0.136c0.312-0.005 0.577 0.181 0.869 0.271 0.703-0.229 0.864 0.083 1.208 0.213 0.771-0.161 1.005 0.187 1.375 0.557l0.428-0.016c1.161 0.677 1.739 2.052 1.943 2.756 0.203-0.704 0.781-2.079 1.943-2.756l0.427 0.011c0.369-0.375 0.604-0.719 1.375-0.557 0.349-0.141 0.505-0.437 1.215-0.219 0.443-0.141 0.828-0.5 1.411-0.063 0.489-0.197 0.969-0.26 1.391 0.12 0.661-0.079 0.869 0.083 1.031 0.281 0.147 0 1.079-0.141 1.511 0.479 1.084-0.12 1.423 0.62 1.032 1.317 0.224 0.339 0.453 0.663-0.063 1.303 0.197 0.36 0.077 0.735-0.365 1.213 0.125 0.5-0.099 0.844-0.495 1.12 0.079 0.683-0.64 1.084-0.839 1.219-0.083 0.401-0.244 0.781-1.061 0.979-0.12 0.6-0.62 0.699-1.1 0.819 1.584 0.9 2.917 2.077 2.917 4.973l0.244 0.401c1.797 1.079 3.417 4.536 0.896 7.355-0.156 0.875-0.437 1.495-0.681 2.192-0.36 2.817-2.776 4.136-3.412 4.297-0.921 0.697-1.917 1.359-3.255 1.817-1.261 1.281-2.636 1.781-3.996 1.781h-0.119c-1.38 0-2.756-0.5-4.016-1.781-1.344-0.459-2.344-1.115-3.265-1.817-0.641-0.156-3.043-1.475-3.417-4.292-0.249-0.697-0.525-1.339-0.687-2.219-2.527-2.817-0.912-6.271 0.885-7.355l0.229-0.396c0-2.895 1.337-4.077 2.916-4.973-0.479-0.12-0.959-0.219-1.093-0.823-0.823-0.199-0.985-0.579-1.063-0.98-0.199-0.135-0.917-0.536-0.839-1.233-0.401-0.281-0.62-0.62-0.5-1.141-0.417-0.459-0.536-0.859-0.36-1.219-0.52-0.64-0.281-0.979-0.061-1.297-0.381-0.703-0.037-1.457 1.041-1.337 0.416-0.62 1.359-0.48 1.495-0.48 0.161-0.203 0.38-0.38 1.041-0.301 0.417-0.381 0.901-0.319 1.396-0.136 0.203-0.161 0.38-0.219 0.541-0.219z" />
                    </svg>
                  </div>
                  <div className="icon" title="Visual Studio Code">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M23.438 0.094c-0.505-0.005-1 0.177-1.375 0.521-0.021 0.021-0.047 0.042-0.068 0.063l-10.62 11.745-6.203-5.083-0.542-0.469c-0.38-0.313-0.906-0.396-1.365-0.203-0.005 0-0.010 0.005-0.016 0.005l-2.422 1c-0.031 0.016-0.068 0.031-0.099 0.047-0.026 0.016-0.047 0.026-0.068 0.036-0.016 0.010-0.031 0.021-0.047 0.031-0.021 0.016-0.047 0.031-0.068 0.047-0.010 0.010-0.026 0.021-0.036 0.031-0.021 0.016-0.042 0.031-0.057 0.047-0.021 0.016-0.036 0.031-0.052 0.047-0.010 0.010-0.026 0.026-0.042 0.047-0.016 0.016-0.031 0.031-0.042 0.047-0.016 0.021-0.031 0.042-0.047 0.063-0.010 0.010-0.021 0.026-0.031 0.042-0.016 0.021-0.031 0.047-0.047 0.068-0.005 0.016-0.016 0.031-0.026 0.047-0.010 0.021-0.021 0.042-0.031 0.068-0.010 0.021-0.016 0.036-0.026 0.057-0.005 0.021-0.016 0.042-0.021 0.063-0.010 0.021-0.016 0.042-0.021 0.063-0.010 0.021-0.016 0.047-0.021 0.073-0.005 0.016-0.010 0.031-0.016 0.052 0 0.021-0.005 0.047-0.010 0.073 0 0.021-0.005 0.042-0.005 0.068-0.005 0.036-0.005 0.073-0.005 0.109v14.208c0 0.536 0.323 1.021 0.818 1.224l2.422 1.021c0.464 0.193 1 0.104 1.38-0.219l0.542-0.469 6.203-5.083 10.62 11.745c0.031 0.031 0.068 0.063 0.099 0.089 0.026 0.021 0.052 0.047 0.078 0.068 0.021 0.021 0.047 0.036 0.073 0.057 0.031 0.021 0.057 0.036 0.083 0.057 0.031 0.016 0.063 0.036 0.089 0.052 0.031 0.016 0.057 0.031 0.089 0.047s0.057 0.026 0.089 0.042c0.031 0.016 0.063 0.026 0.094 0.036 0.031 0.016 0.068 0.026 0.099 0.036 0.026 0.010 0.057 0.016 0.089 0.026s0.068 0.021 0.104 0.026c0.031 0.005 0.063 0.016 0.094 0.021s0.063 0.010 0.099 0.010c0.031 0.005 0.068 0.010 0.099 0.010s0.063 0.005 0.099 0.005c0.031 0 0.068 0 0.099 0 0.036 0 0.073-0.005 0.104-0.005 0.031-0.005 0.063-0.010 0.089-0.010 0.042-0.005 0.078-0.010 0.12-0.021 0.026-0.005 0.052-0.010 0.078-0.016 0.036-0.010 0.073-0.016 0.109-0.031 0.026-0.005 0.057-0.016 0.089-0.026s0.063-0.021 0.094-0.036c0.042-0.016 0.078-0.031 0.12-0.047l6.589-3.172c0.24-0.115 0.458-0.276 0.63-0.479 0.047-0.047 0.083-0.099 0.125-0.151 0 0 0-0.005 0.005-0.010 0.036-0.052 0.073-0.109 0.104-0.167 0.031-0.052 0.057-0.104 0.083-0.156 0.005-0.010 0.005-0.016 0.010-0.026 0.021-0.047 0.042-0.094 0.057-0.141 0.005-0.016 0.010-0.031 0.016-0.052 0.016-0.047 0.031-0.094 0.042-0.141 0.005-0.016 0.010-0.031 0.010-0.047 0.010-0.047 0.016-0.094 0.026-0.135 0-0.021 0.005-0.047 0.010-0.068 0-0.042 0.005-0.078 0.005-0.12 0.005-0.036 0.005-0.073 0.005-0.104v-21.484c0-0.016 0-0.031 0-0.047 0-0.063-0.005-0.13-0.010-0.198-0.083-0.677-0.505-1.266-1.12-1.557l-6.589-3.167c-0.26-0.125-0.542-0.193-0.828-0.198zM23.995 9.229v13.542l-8.26-6.771zM4.005 11.432l4.13 4.568-4.13 4.568z" />
                    </svg>
                  </div>
                  <div className="icon" title="Trello">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M28 0h-24c-2.208 0-4 1.792-4 4v24c0 2.208 1.792 4 4 4h24c2.208 0 4-1.792 4-4v-24c0-2.208-1.792-4-4-4zM13.922 24.24c0 1.063-0.859 1.922-1.922 1.922h-5.922c-1.057 0-1.917-0.865-1.917-1.922v-18.161c0-1.057 0.859-1.917 1.917-1.917h5.922c1.063 0 1.922 0.859 1.922 1.917zM27.839 16.24c0 1.057-0.859 1.922-1.917 1.922h-5.922c-1.063 0-1.922-0.865-1.922-1.922v-10.161c0-1.057 0.865-1.917 1.922-1.917h5.922c1.057 0 1.917 0.859 1.917 1.917z" />
                    </svg>
                  </div>
                  <div className="icon" title="Slack">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M6.724 20.219c-0.005 1.855-1.505 3.36-3.36 3.365-1.859-0.005-3.359-1.505-3.364-3.365 0.005-1.855 1.511-3.355 3.364-3.359h3.36zM8.416 20.219c0.005-1.855 1.511-3.355 3.365-3.359 1.849 0.004 3.355 1.504 3.359 3.359v8.417c-0.004 1.853-1.504 3.359-3.359 3.364-1.86-0.005-3.36-1.511-3.365-3.364zM11.781 6.724c-1.855-0.005-3.36-1.505-3.365-3.36 0.005-1.853 1.505-3.359 3.365-3.364 1.855 0.005 3.355 1.511 3.359 3.364v3.36zM11.781 8.416c1.855 0.005 3.355 1.505 3.359 3.365-0.004 1.855-1.504 3.355-3.359 3.359h-8.417c-1.853-0.004-3.359-1.504-3.364-3.359 0.005-1.86 1.511-3.36 3.364-3.365zM25.276 11.781c0.005-1.86 1.505-3.36 3.36-3.365 1.853 0.005 3.359 1.505 3.364 3.365-0.005 1.855-1.511 3.355-3.364 3.359h-3.36zM23.584 11.781c-0.005 1.855-1.511 3.355-3.365 3.359-1.855-0.004-3.355-1.509-3.359-3.359v-8.417c0.004-1.853 1.504-3.359 3.359-3.364 1.86 0.005 3.36 1.505 3.365 3.364zM20.219 25.276c1.86 0 3.36 1.505 3.365 3.36-0.005 1.859-1.505 3.359-3.365 3.364-1.855-0.005-3.355-1.511-3.359-3.364v-3.36zM20.219 23.584c-1.855-0.005-3.355-1.511-3.359-3.365 0.004-1.855 1.504-3.355 3.359-3.359h8.417c1.853 0.004 3.359 1.504 3.364 3.359-0.005 1.86-1.505 3.36-3.364 3.365z" />
                    </svg>
                  </div>
                  <div className="icon" title="Solidworks">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 512 512"
                      enableBackground="new 0 0 512 512"
                    >
                      <g id="2069a460dcf28295e231f3111e04100d">
                        <path
                          display="inline"
                          d="M511.48,198.149c-0.49,3.747-4.809,5.925-25.622,5.771c-101.008-0.876-113.669,14.367-113.669,14.367s-8.52,4.931-2.677,16.214c6.242,12.035,82.003,100.599,98.417,131.066c10.66,19.771,25.618,54.013-33.825,74.291c-58.168,20.261-167.269,0.19-167.989,0c-26.44-6.646-25.8-11.16-25.505-13.111c0.521-3.737,4.763-5.752,25.564-5.743c95.817,0.082,142.136-6.687,153.346-13.687c6.868-4.251,8.021-10.774,7.386-16.5c-1.393-12.493-31.066-48.904-55.587-77.575c-25.174-29.497-78.751-80.96-42.631-112.189c43.325-37.454,138.793-20.986,157.465-16.967C505.95,188.322,511.894,195.055,511.48,198.149z M198.447,35.444c42.177-0.055,74.967,2.69,97.415,6.714c45.665,8.243,34.913,31.289,21.935,53.346c-31.493,53.7-116.545,114.113-121.486,117.525c-6.483,4.464-2.936,7.067,2.735,4.963c68.965-25.65,138.458-69.891,166.525-123.631c23.804-45.583,6.741-67.205-29.547-77.394c-64.791-18.228-131.965-1.529-137.618,0.136c-8.057,2.363-24.293,6.832-22.924,12.757C176.363,33.652,179.588,35.458,198.447,35.444z M239.589,253.051c-67.224-19.875-140.508-2.595-151.694,0.363c-16.922,4.491-26.834,9.014-26.14,14.317c0.521,3.919,4.85,6.614,25.645,6.088c49.571-1.198,90.642,0.485,116.604,7.748c32.15,8.982,36.11,25.541,20.188,58.068c-7.363,15.034-18.246,30.567-34.736,47.09c-32.913,33.026-74.056,54.512-97.233,66.243c-22.533,11.441-30.776,5.362-28.276-5.925c3.085-13.81,67.015-124.438,67.015-124.438c4.813-8.401,5.661-16.286,0-18.649c-4.845-2.064-13.633,4.745-22.76,15.306C70.892,362.601,2.063,494.456,0.783,498.784c-1.252,4.142,1.982,4.668,3.216,4.695c29.134-0.227,208.016-53.133,265.736-161.267C300.13,285.274,284.746,266.429,239.589,253.051z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="icon" title="Photoshop">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 512 512"
                      enableBackground="new 0 0 512 512"
                    >
                      <g id="2069a460dcf28295e231f3111e037552">
                        <path
                          display="inline"
                          d="M426.333,0.5H85.667C38.825,0.5,0.5,38.825,0.5,85.667v340.667c0,46.842,38.325,85.167,85.167,85.167h340.667c46.842,0,85.167-38.325,85.167-85.167V85.667C511.5,38.825,473.175,0.5,426.333,0.5z M245.329,260.524c-17.736,17.736-45.611,26.065-77.103,26.065c-8.326,0-15.927-0.365-21.72-1.451v91.945h-44.159V136.363c15.927-2.895,38.009-5.069,68.05-5.069c32.582,0,56.473,6.878,72.039,19.911c14.48,11.947,23.89,31.131,23.89,53.936C266.325,228.309,259.086,247.492,245.329,260.524z M337.981,380.706c-21.358,0-40.542-5.069-53.574-12.31l8.687-32.216c10.135,6.154,29.322,12.671,45.249,12.671c19.545,0,28.236-7.964,28.236-19.549c0-11.943-7.239-18.099-28.96-25.7c-34.391-11.947-48.866-30.769-48.505-51.403c0-31.131,25.7-55.383,66.604-55.383c19.549,0,36.562,5.069,46.695,10.496l-8.687,31.493c-7.602-4.342-21.721-10.135-37.285-10.135c-15.928,0-24.615,7.602-24.615,18.46c0,11.224,8.326,16.655,30.77,24.618c31.854,11.582,46.696,27.871,47.058,53.937C409.653,357.539,384.678,380.706,337.981,380.706z M221.8,206.95c0,28.598-20.273,44.887-53.574,44.887c-9.049,0-16.289-0.362-21.72-1.809v-82.534c4.708-1.085,13.395-2.171,25.704-2.171C202.979,165.323,221.8,179.803,221.8,206.95z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div className="icon" title="Audacity">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 256 256"
                    >
                      <g fillRule="evenodd">
                        <path d="M61.264 122.309c0-3.998.603-29.443.603-34.157 0-4.714 3.124-12.91 13-22.55 9.877-9.641 19.451-11.343 30.057-14.97 10.606-3.625 14.1-2.743 23.508-2.743 9.407 0 9.79-.342 23.76 3.533 13.97 3.875 23.794 10.105 31.89 17.047s7.9 13.254 9.522 19.46c1.62 6.208 1.62 21.313 1.62 34.157 12.556 11.611 14.366 17.133 14.366 38.821 0 21.689-11.056 37.037-18.988 42.863-7.933 5.825-4.441 4.586-9.018 5.078-4.577.491-9.639-3.075-9.639-3.075l-.183-80.164 7.312-4.511s.998-24.812.998-29.657c0-4.844-4.225-12.684-6.765-16.199-2.54-3.514-10.434-6.773-19.471-9.64-9.037-2.868-13.725-3.533-25.404-3.487-11.68.047-15.175.015-27.09 3.487-11.915 3.471-10.543 3.688-16.764 9.64-6.22 5.952-8.713 11.33-8.56 16.506.152 5.176.804 30.703.804 30.703l9.14 5.281-1.384 75.297s-3.958 4.19-8.408 4.86c-4.45.67-7.615-1.718-14.906-6.995-7.291-5.278-14.742-17.096-14.742-38.16 0-21.063.044-29.037 14.742-40.425z" />
                        <path d="M92.731 155.314l7.613-23.496 15.719 45.975 12.555-62.277 10.81 62.45 15.869-45.726 9.202 22.975-.778 29.69-7.743-28.322-15.685 45.376-11.98-45.711-11.762 45.583-15.436-45.686-8.447 28.612z" />
                      </g>
                    </svg>
                  </div>
                  <div className="icon" title="Microsoft Powerpoint">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                    >
                      <rect width="24" height="24" fill="none" />
                      <path d="M14,5V7.78A3,3,0,0,1,16,7v3h3a3,3,0,0,1-5,2.22V14h6v1H14v1h6v1H14v2h8V5Zm3,4V6a3,3,0,0,1,3,3Z" />
                      <g>
                        <path d="M2,4.8V19.21L14,21V3.08ZM9.6,12.61a3.4,3.4,0,0,1-2.5.72l-.89,0v3.34l-1.4-.18V7.89L7.27,7.6a3.11,3.11,0,0,1,2.41.47,2.71,2.71,0,0,1,.8,2.17A3,3,0,0,1,9.6,12.61Z" />
                        <path d="M7.18,8.86l-1,.08v3.14H7a2.43,2.43,0,0,0,1.58-.41A1.61,1.61,0,0,0,9,10.35a1.48,1.48,0,0,0-.45-1.2A1.94,1.94,0,0,0,7.18,8.86Z" />
                      </g>
                    </svg>
                  </div>
                  <div className="icon" title="Microsoft Excel">
                    <svg
                      width="800px"
                      height="800px"
                      viewBox="0 0 192 192"
                      fill="none"
                    >
                      <path
                        d="M56 30c0-1.662 1.338-3 3-3h108c1.662 0 3 1.338 3 3v132c0 1.662-1.338 3-3 3H59c-1.662 0-3-1.338-3-3v-32m0-68V30"
                        style={{
                          fillOpacity: ".402658",
                          stroke: "#FFF",
                          strokeWidth: "12",
                          strokeLinecap: "round",
                          paintOrder: "stroke fill markers",
                        }}
                      />
                      <rect
                        width="68"
                        height="68"
                        x="-58.1"
                        y="40.3"
                        rx="3"
                        style={{
                          fill: "none",
                          fillOpacity: ".402658",
                          stroke: "#FFF",
                          strokeWidth: "12",
                          strokeLinecap: "round",
                          strokeLinejoin: "miter",
                          strokeDasharray: "none",
                          strokeOpacity: "1",
                          paintOrder: "stroke fill markers",
                        }}
                        transform="translate(80.1 21.7)"
                      />
                      <path
                        d="M138.79 164.725V27.175M56.175 58.792H170M170 96H90.328M169 133.21H56.175M44.5 82l23 28m0-28-23 28"
                        style={{
                          fill: "none",
                          stroke: "#FFF",
                          strokeWidth: "12",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeDasharray: "none",
                          strokeOpacity: "1",
                        }}
                      />
                    </svg>
                  </div>
                  <div className="icon" title="Microsoft Word">
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 192 192"
                      fill="none"
                    >
                      <path
                        d="M56 30c0-1.662 1.338-3 3-3h108c1.662 0 3 1.338 3 3v132c0 1.662-1.338 3-3 3H59c-1.662 0-3-1.338-3-3v-32m0-68V30"
                        style={{
                          fillOpacity: "0.402658",
                          stroke: "#FFF",
                          strokeWidth: "12",
                          strokeLinecap: "round",
                          paintOrder: "stroke fill markers",
                        }}
                      />
                      <rect
                        width="68"
                        height="68"
                        x="-58.1"
                        y="40.3"
                        rx="3"
                        transform="translate(80.1 21.7)"
                        style={{
                          fill: "none",
                          fillOpacity: "0.402658",
                          stroke: "#FFF",
                          strokeWidth: "12",
                          strokeLinecap: "round",
                          strokeLinejoin: "miter",
                          strokeDasharray: "none",
                          strokeOpacity: "1",
                          paintOrder: "stroke fill markers",
                        }}
                      />
                      <path
                        d="M55.944 58.791H170M170 96H90.328M169 133.21H55.944"
                        style={{
                          fill: "none",
                          stroke: "#FFF",
                          strokeWidth: "12",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeDasharray: "none",
                          strokeOpacity: "1",
                        }}
                      />
                      <path
                        d="m73 82-8.5 28m0 0L56 82l-8.5 28M39 82l8.5 28"
                        style={{
                          fontVariationSettings: "normal",
                          vectorEffect: "none",
                          fill: "none",
                          fillOpacity: "1",
                          stroke: "#FFF",
                          strokeWidth: "12",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeMiterlimit: "4",
                          strokeDasharray: "none",
                          strokeDashoffset: "0",
                          strokeOpacity: "1",
                          inkscapeStroke: "none",
                          stopColor: "#000",
                        }}
                      />
                    </svg>
                  </div>
                  <div className="icon" title="Pycharm">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                      role="img"
                    >
                      <title>PyCharm icon</title>
                      <path d="M7.833 6.666v-.055c0-1-.667-1.5-1.778-1.5H4.389v3.055h1.723c1.111 0 1.721-.666 1.721-1.5zM0 0v24h24V0H0zm2.223 3.167h4c2.389 0 3.833 1.389 3.833 3.445v.055c0 2.278-1.778 3.5-4.001 3.5H4.389v2.945H2.223V3.167zM11.277 21h-9v-1.5h9V21zm4.779-7.777c-2.944.055-5.111-2.223-5.111-5.057C10.944 5.333 13.056 3 16.111 3c1.889 0 3 .611 3.944 1.556l-1.389 1.61c-.778-.722-1.556-1.111-2.556-1.111-1.658 0-2.873 1.375-2.887 3.084.014 1.709 1.174 3.083 2.887 3.083 1.111 0 1.833-.445 2.61-1.167l1.39 1.389c-.999 1.112-2.166 1.779-4.054 1.779z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className={`sklanguages ${isSkillsVisible ? 'fade-in' : ''}`}>
                <h2>Languages</h2>
                <div className="icons-column">
                  <div className="icon" title="HTML">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M2 0h28l-2.547 28.75-11.484 3.25-11.417-3.25zM11.375 13l-0.307-3.625 13.411 0.005 0.307-3.495-17.573-0.005 0.932 10.682h12.167l-0.432 4.568-3.88 1.068-3.938-1.078-0.255-2.813h-3.479l0.443 5.563 7.229 1.932 7.172-1.927 0.99-10.875z" />
                    </svg>
                  </div>
                  <div className="icon" title="CSS">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.192 3.143h15.615l-1.42 16.034-6.404 1.812-6.369-1.813L4.192 3.143zM16.9 6.424l-9.8-.002.158 1.949 7.529.002-.189 2.02H9.66l.179 1.913h4.597l-.272 2.62-2.164.598-2.197-.603-.141-1.569h-1.94l.216 2.867L12 17.484l3.995-1.137.905-9.923z" />
                    </svg>
                  </div>
                  <div className="icon" title="JavaScript">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M2 2v28h28v-28zM17.238 23.837c0 2.725-1.6 3.969-3.931 3.969-2.106 0-3.325-1.087-3.95-2.406l2.144-1.294c0.413 0.731 0.788 1.35 1.694 1.35 0.862 0 1.412-0.338 1.412-1.656v-8.944h2.631zM23.462 27.806c-2.444 0-4.025-1.162-4.794-2.688l2.144-1.237c0.563 0.919 1.3 1.6 2.594 1.6 1.087 0 1.788-0.544 1.788-1.3 0-0.9-0.713-1.219-1.919-1.75l-0.656-0.281c-1.9-0.806-3.156-1.825-3.156-3.969 0-1.975 1.506-3.475 3.85-3.475 1.675 0 2.875 0.581 3.738 2.106l-2.050 1.313c-0.45-0.806-0.938-1.125-1.694-1.125-0.768 0-1.256 0.488-1.256 1.125 0 0.788 0.488 1.106 1.619 1.6l0.656 0.281c2.238 0.956 3.494 1.938 3.494 4.137 0 2.363-1.863 3.662-4.357 3.662z" />
                    </svg>
                  </div>
                  <div className="icon" title="Python">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                    >
                      <path d="M19.079 0.24l1.203 0.265 0.973 0.349 0.787 0.4 0.599 0.428 0.453 0.453 0.333 0.452 0.213 0.439 0.131 0.4 0.057 0.344 0.027 0.271-0.016 0.172v7.12l-0.068 0.839-0.172 0.735-0.281 0.615-0.344 0.505-0.4 0.411-0.437 0.333-0.469 0.256-0.469 0.187-0.437 0.136-0.4 0.088-0.344 0.057-0.281 0.027h-7.964l-0.916 0.067-0.787 0.183-0.667 0.297-0.547 0.359-0.443 0.428-0.36 0.463-0.265 0.485-0.199 0.489-0.135 0.468-0.093 0.428-0.053 0.359-0.025 0.281v4.079h-2.975l-0.28-0.043-0.376-0.093-0.421-0.156-0.469-0.24-0.479-0.348-0.479-0.48-0.469-0.615-0.427-0.787-0.376-0.973-0.276-1.172-0.187-1.401-0.068-1.64 0.079-1.625 0.213-1.385 0.323-1.161 0.427-0.948 0.48-0.76 0.531-0.584 0.563-0.443 0.557-0.317 0.536-0.213 0.48-0.136 0.427-0.068 0.317-0.011h0.213l0.084 0.011h10.875v-1.104h-7.787l-0.011-3.667-0.025-0.495 0.068-0.453 0.145-0.411 0.224-0.376 0.333-0.343 0.417-0.308 0.504-0.265 0.589-0.245 0.677-0.197 0.776-0.161 0.848-0.131 0.948-0.083 1.027-0.052 1.12-0.027 1.692 0.068zM10.683 2.88l-0.308 0.437-0.109 0.547 0.109 0.548 0.308 0.452 0.437 0.297 0.547 0.12 0.547-0.12 0.437-0.297 0.308-0.452 0.109-0.548-0.109-0.547-0.308-0.437-0.437-0.292-0.547-0.119-0.547 0.119zM28.136 8.145l0.369 0.084 0.427 0.156 0.469 0.24 0.479 0.359 0.48 0.469 0.468 0.625 0.427 0.785 0.371 0.975 0.281 1.177 0.187 1.385 0.068 1.64-0.083 1.641-0.215 1.385-0.317 1.145-0.427 0.948-0.48 0.76-0.536 0.6-0.557 0.437-0.563 0.323-0.531 0.213-0.48 0.12-0.427 0.068-0.317 0.025-0.213-0.015h-10.964v1.093h7.787l0.016 3.683 0.025 0.479-0.068 0.453-0.145 0.411-0.229 0.385-0.333 0.333-0.411 0.324-0.505 0.265-0.589 0.229-0.677 0.197-0.776 0.172-0.853 0.12-0.943 0.093-1.032 0.052-1.12 0.016-1.692-0.052-1.427-0.188-1.199-0.265-0.973-0.333-0.787-0.401-0.599-0.443-0.453-0.453-0.333-0.452-0.213-0.439-0.136-0.4-0.052-0.333-0.027-0.267 0.011-0.171v-7.12l0.068-0.855 0.177-0.724 0.276-0.609 0.349-0.511 0.4-0.421 0.439-0.323 0.468-0.267 0.464-0.187 0.443-0.136 0.401-0.077 0.343-0.052 0.453-0.043h7.787l0.921-0.067 0.787-0.183 0.667-0.281 0.547-0.375 0.439-0.428 0.359-0.463 0.271-0.485 0.199-0.479 0.135-0.464 0.095-0.427 0.052-0.375 0.025-0.281v-4.079h2.787l0.188 0.011zM19.505 27.145l-0.308 0.443-0.104 0.548 0.104 0.547 0.308 0.437 0.443 0.307 0.547 0.104 0.547-0.104 0.437-0.307 0.308-0.437 0.109-0.547-0.109-0.548-0.308-0.443-0.437-0.307-0.547-0.104-0.547 0.104z" />
                    </svg>
                  </div>
                  <div className="icon" title="C++">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.078 12A5.928 5.928 0 0 1 12 6.078a5.946 5.946 0 0 1 5.129 2.959l-1.499.867 5.027-2.902a1.579 1.579 0 0 0-.543-.575l-7.345-4.24c-.424-.245-1.116-.245-1.539 0l-7.345 4.24c-.422.244-.768.844-.768 1.333v8.48c0 .245.086.517.226.758l3.529-2.038A5.883 5.883 0 0 1 6.078 12z" />
                      <path d="M14.564 10.519A2.971 2.971 0 0 0 12 9.039a2.964 2.964 0 0 0-2.564 4.441L12 12l2.564-1.481z" />
                      <path d="m20.657 7.002-5.046 2.913-1.046.605-.001-.001L12 12l-2.563 1.48A2.964 2.964 0 0 0 12 14.961a2.97 2.97 0 0 0 2.565-1.481l2.563 1.483a5.944 5.944 0 0 1-5.129 2.959 5.926 5.926 0 0 1-5.128-2.962l-3.529 2.038c.14.242.332.453.543.575l7.345 4.24c.423.245 1.115.245 1.539 0l7.345-4.24c.211-.122.403-.333.543-.575.14-.241.226-.513.226-.758V7.76c0-.245-.086-.517-.226-.758zm-2.735 5.327h-.658v.658h-.657v-.658h-.658v-.658h.658v-.658h.657v.658h.658v.658zm2.468 0h-.658v.658h-.658v-.658h-.657v-.658h.657v-.658h.658v.658h.658v.658z" />
                    </svg>
                  </div>
                  <div className="icon" title="Matlab">
                    <svg
                      fill="#FFF"
                      width="30px"
                      height="30px"
                      viewBox="0 0 512 512"
                      enableBackground="new 0 0 512 512"
                    >
                      <g id="5151e0c8492e5103c096af88a51fbe2a">
                        <path
                          display="inline"
                          d="M343.158,24.759l0.009-0.74c-0.096,0-0.191-0.004-0.287-0.004c-1.318,0-2.604,0.116-3.867,0.312c-2.013,0.108-3.984,0.665-5.931,1.68c-14.695,6.03-26.281,25.28-40.275,48.589c-20.493,34.142-45.993,76.629-89.724,87.313c-17.25,4.208-37.639,28.647-57.046,53.32c-1.771,2.245-3.402,4.316-4.857,6.138l-0.482,0.599L0.5,279.95l113.657,80.011c47.719-22.41,62.32,20.51,101.834,128.024c79.515-8.925,132.87-136.009,177.182-144.359c54.955-10.351,59.563,31.729,118.327,67.983C452.449,283.864,389.775,36.669,343.158,24.759z M172.019,316.313l-56.789,28.785l-88.381-62.224L145.99,233.6l23.125,17.184l35.397,26.847C194.62,291.332,183.845,304.365,172.019,316.313z M212.078,266.797l-35.264-26.206l-21.595-16.381c0.283-0.357,0.565-0.72,0.856-1.085c12.451-15.832,35.63-45.291,50.04-48.81c40.188-9.817,65.588-41.959,85.416-73.182C272.418,149.307,248.71,212.35,212.078,266.797z"
                        ></path>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={`sktraining ${isSkillsVisible ? 'fade-in' : ''}`}>
                <h2>Training</h2>
                <div className="icons-column">
                  <div className="icon" title="FDM/SLA 3D Printing">
                    <svg fill="#FFF" id="Layer_1" viewBox="0 0 490 490">
                      <g>
                        <g>
                          <g>
                            <path d="M470,120c11.028,0,20-8.972,20-20V20c0-11.028-8.972-20-20-20H20C8.972,0,0,8.972,0,20v80c0,11.028,8.972,20,20,20h15v250H20c-11.028,0-20,8.972-20,20v80c0,11.028,8.972,20,20,20h450c11.028,0,20-8.972,20-20v-80c0-11.028-8.972-20-20-20h-15V120H470z M325,470H165v-40h160V470z M470,390l0.002,80H345v-50c0-5.522-4.478-10-10-10H155c-5.523,0-10,4.478-10,10v50H20v-80H470zM220,190v-35h50v35H220z M270,210v15h-50v-15H270z M55,135v-15h380v15H55z M200,155v80c0,5.523,4.477,10,10,10h25v25h20v-25h25c5.522,0,10-4.477,10-10v-80h145v15H305v20h85v180H100V190h85v-20H55v-15H200z M435,190v180h-25V190H435z M80,190v180H55V190H80zM20,100V20h450l0.002,80H20z" />
                            <path d="M290,35h-90c-5.523,0-10,4.478-10,10v30c0,5.523,4.477,10,10,10h90c5.522,0,10-4.477,10-10V45C300,39.478,295.522,35,290,35z M280,65h-70V55h70V65z" />
                            <rect x="315" y="50" width="20" height="20" />
                            <rect x="355" y="50" width="60" height="20" />
                            <rect x="75" y="50" width="60" height="20" />
                            <rect x="155" y="50" width="20" height="20" />
                            <rect x="215" y="440" width="60" height="20" />
                            <rect x="425" y="420" width="20" height="20" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="project-container">
          <div className="wave2-background"></div>
          <section id="projects" ref={projectRef}>
            <h1 className="section-title">Projects</h1>
            <div className="projects-grid">
              {projectData.map((project, index) => (
                <ProjectCard
                  key={index}
                  image={project.image}
                  title={project.title}
                  description={project.description}
                  date={project.date}
                  status={project.status}
                  onLearnMore={(cardRef) => handleLearnMore(project, cardRef)}
                  objectPosition={project.objectPosition}
                />
              ))}
            </div>
          </section>
          <ProjectModal project={selectedProject} onClose={handleCloseModal} cardRef={selectedCardRef} />
        </div>

        <div className="contact-container">
          <div className="wave3-background"></div>
          <section id="contact" ref={contactRef}>
            <h1 className="section-title" style={{ color: "#132852" }}>Contact</h1>
            <ul className="contact-items">
              <li>
                <svg fill="#132852" width="30px" height="30px" viewBox="0 0 32 32">
                  <path d="M27.26 27.271h-4.733v-7.427c0-1.771-0.037-4.047-2.475-4.047-2.468 0-2.844 1.921-2.844 3.916v7.557h-4.739v-15.271h4.552v2.083h0.061c0.636-1.203 2.183-2.468 4.491-2.468 4.801 0 5.692 3.161 5.692 7.271v8.385zM7.115 9.912c-1.527 0-2.751-1.235-2.751-2.756 0-1.516 1.229-2.749 2.751-2.749s2.755 1.233 2.755 2.749c0 1.521-1.233 2.756-2.755 2.756zM9.489 27.271h-4.749v-15.271h4.749zM29.636 0h-27.276c-1.303 0-2.36 1.031-2.36 2.307v27.387c0 1.276 1.057 2.307 2.36 2.307h27.271c1.301 0 2.369-1.031 2.369-2.307v-27.387c0-1.276-1.068-2.307-2.369-2.307z" />
                </svg>
                <a
                  className="contact-text"
                  href="https://linkedin.com/cole-rabe"
                  target="_blank"
                >
                  {" "}
                  linkedin.com/cole-rabe
                </a>
              </li>
              <li>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                  <g clipPath="url(#clip0_429_11225)">
                    <path
                      d="M3 5H21V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V5Z"
                      stroke="#132852"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 5L12 14L21 5"
                      stroke="#132852"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_429_11225">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <a className="contact-text" href="mailto:colerabe@gmail.com">
                  colerabe@gmail.com
                </a>
              </li>
              <li>
                <svg fill="#132852" width="30px" height="30px" viewBox="0 0 24 24">
                  <path d="M1.277,8.858C2.606,14.138,9.863,21.4,15.142,22.723a8.938,8.938,0,0,0,2.18.274,8.54,8.54,0,0,0,4.006-1,3.11,3.11,0,0,0,.764-4.951h0L20.006,14.96a3.111,3.111,0,0,0-3.444-.651,4.859,4.859,0,0,0-1.471.987c-.178.177-.506.205-.977.077A9.981,9.981,0,0,1,8.626,9.886c-.126-.471-.1-.8.078-.977a4.864,4.864,0,0,0,.988-1.473,3.112,3.112,0,0,0-.651-3.442L6.955,1.909A3.065,3.065,0,0,0,4.3,1.035,3.1,3.1,0,0,0,2,2.672,8.58,8.58,0,0,0,1.277,8.858ZM3.773,3.6A1.115,1.115,0,0,1,4.6,3.013,1.044,1.044,0,0,1,4.767,3a1.088,1.088,0,0,1,.774.323L7.626,5.408a1.1,1.1,0,0,1,.239,1.213A2.9,2.9,0,0,1,7.29,7.5,2.817,2.817,0,0,0,6.7,10.4c.722,2.7,4.205,6.179,6.9,6.9a2.821,2.821,0,0,0,2.907-.6,2.906,2.906,0,0,1,.874-.576,1.1,1.1,0,0,1,1.214.239l2.085,2.085a1.089,1.089,0,0,1,.31.942,1.114,1.114,0,0,1-.591.826,6.517,6.517,0,0,1-4.766.556C11.089,19.641,4.36,12.912,3.216,8.37A6.53,6.53,0,0,1,3.773,3.6Z" />
                </svg>
                <a className="contact-text" href="tel:+16177569014">
                  617-756-9014
                </a>
              </li>
            </ul>
          </section>
          <Copyright />
        </div>
        <Routes>
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
