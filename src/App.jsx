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
import cover from './Assets/misc/cover.svg';

const Home = () => <p></p>;
const Skill = () => <h1>Skill</h1>;
const Project = () => <h1>Project</h1>;
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
  const [activeLink, setActiveLink] = useState("#");
  const [isSticky, setIsSticky] = useState(false);
  const linksContainerRef = useRef(null);
  const titleContainerRef = useRef(null);

  const homeRef = useRef(null);
  const projectRef = useRef(null);
  const skillRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sections = [
      { id: "#", ref: homeRef },
      { id: "#skill", ref: skillRef },
      { id: "#project", ref: projectRef },
      { id: "#contact", ref: contactRef },
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
           console.log(`Entry: ${entry.target.id}`);
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          } else {
             console.log(`Not intersecting: ${entry.target.id}, ratio: ${entry.intersectionRatio}`);
          }
        });
      },
      {
        threshold: [0],
        rootMargin: '0px 0px -50% 0px',
      }
    );

    sections.forEach(({ id, ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      } else {
        console.log(`Ref not set for: ${id}`);
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
  const projectData = [
    {
      folder: 'MacDeck',
      thumbnail: 'Proj_Images/MacDeck/Proj_MacDeck.jpg',
      title: 'MacDeck Dynamic Keyboard',
      summary: 'Back when the Stream Deck was first released I loved the concept of having a dynamic macro keyboard for productivity, but I felt that the design was lacking in terms of control. My goal for this project was to design a product where it would functionally work the same as that device but incorporates many of the missing features I was looking for.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Onshape', 'Altium Designer', '3D Printing', 'C++', 'Python'],
      date: 'August 2021',
      status: 'In Progress',
      objectPosition: 'center center',
    },
    {
      folder: 'Flashlight',
      thumbnail: 'Proj_Images/Flashlight/Proj_Flashlight.jpg',
      title: 'FWG Flashlight',
      summary: 'My friend and I love flashlights and the we wanted to challenge ourselves to make one from scratch, but by adding brand new features to increase ease of use.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', 'Altium Designer', '3D Printing'],
      date: 'February 2022',
      status: 'In Progress',
      objectPosition: '0% 40%',
    },
    {
      folder: 'Longboard',
      thumbnail: 'Proj_Images/Longboard/Proj_Longboard.jpg',
      title: 'DIY Electric Longboard',
      summary: 'From when I was a kid I loved longboarding and after seeing one in person and knew I had to make my own.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', '3D Printing', 'Spot Welding'],
      date: 'June 2020',
      status: 'Completed',
      objectPosition: '0% 25%',
    },
    {
      folder: 'Tendy',
      thumbnail: 'Proj_Images/Tendy/Proj_Tendy.jpg',
      title: 'Tendy: The Virtual Home Bartending Assistant ',
      summary: 'While in College I built a liquor cabinet for my apartment and wanted to have an easy way to find drink recipes with the ingredients I have already in my apartment, so I developed a localized assistant that can be easily downloaded.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Javascript', 'HTML', 'CSS', 'Python', 'Pycharm'],
      date: 'April 2023',
      status: 'In Progress',
      objectPosition: '40% 0%',
    },
    {
      folder: 'LEDControl',
      thumbnail: 'Proj_Images/LEDControl/Proj_LEDControl.jpg',
      title: 'Home LED Effect Controller',
      summary: 'While in College I built a liquor cabinet for my apartment and wanted to have an easy way to find drink recipes with the ingredients I have already in my apartment, so I developed a localized assistant that can be easily downloaded',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Python', 'C++', 'Arduino', 'Processing4'],
      date: 'August 2021',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      folder: 'LightBar',
      thumbnail: 'Proj_Images/LightBar/Proj_LightBar.jpg',
      title: 'Custom LED Headlights for Personal Electric Vehicles',
      summary: 'After building a bunch of electric boards I found that there were not many small but reliable solutions for head and tail lights (besides the individual solutions for bikes) so I decided that I was going to make one myself for my Onewheel and Longboard.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', 'Altium Designer'],
      date: 'November 2023',
      status: 'Paused',
      objectPosition: '58% 0%',
    },
    {
      folder: 'Battery',
      thumbnail: 'Proj_Images/Battery/Proj_Battery.jpg',
      title: 'Custom Electric Vehicles Battery Packs',
      summary: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application .',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', 'Spot Welding'],
      date: 'May 2022',
      status: 'Completed',
      objectPosition: '50% 0%',
    },
    {
      folder: 'Purchase',
      thumbnail: 'Proj_Images/Purchase/Proj_Purchase.jpg',
      title: 'Automated Item Purchaser',
      summary: "When moving into my dorm room I wanted to add more light but didn't want to damage anything, so LED lights were used instead. Instead of using low cost led lights, I took the opportunity to design a control system for them and the project became more complex from there.",
      description: 'Description Coming Soon',
      link: '',
      tools: ['Python', 'Selenium', 'BeautifulSoup', 'Pycharm'],
      date: 'June 2023',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      folder: 'Lamps',
      thumbnail: 'Proj_Images/Lamps/Proj_Lamps.jpg',
      title: 'Wirelessly Communicating Lamps',
      summary: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application ',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Arduino', 'C++', 'MQTT'],
      date: 'December 2023',
      status: 'Completed',
      objectPosition: '0% 56%',
    },
    {
      folder: 'VR',
      thumbnail: 'Proj_Images/VR/Proj_VR.jpg',
      title: 'Custom VR Headset',
      summary: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application ',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Prototyping', 'FreeTrack', 'RiftCat'],
      date: 'January 2016',
      status: 'Completed',
      objectPosition: '70% 0%',
    },
    {
      folder: 'CNC',
      thumbnail: 'Proj_Images/CNC/Proj_CNC.jpg',
      title: 'DIY CNC Machine',
      summary: 'Back when there was the Oculus Rift and Google Cardboard, I was inspired to try and see if I could make a prototype myself.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Fusion360 CAM', 'CNC', 'OpenGRBL', 'Arduino'],
      date: 'February 2018',
      status: 'Completed',
      objectPosition: '40% 0%',
    },
    {
      folder: 'Portfolio',
      thumbnail: 'Proj_Images/Portfolio/Proj_Portfolio.jpg',
      title: 'Portfolio Website',
      summary: 'When building the longboard and Onewheel I wanted to design and build battery packs that would fit within the restricting structure of the boards and create a process for easily building custom battery packs for any application ',
      description: 'Description Coming Soon',
      link: '',
      tools: ['React', 'Vite', 'CSS', 'HTML', 'Javascript', 'VSCode'],
      date: 'June 2024',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      folder: 'Onewheel',
      thumbnail: 'Proj_Images/Onewheel/Proj_Onewheel.jpg',
      title: 'Scratch Built Onewheel',
      summary: 'While updating my resume I found that I wanted to have a way of sharing the most recent version of my projects and resume without needing to resend.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', '3D Printing', 'Spot Welding', 'VESC'],
      date: 'July 2022',
      status: 'Completed',
      objectPosition: '0% 60%',
    },
    {
      folder: 'Arcade',
      thumbnail: 'Proj_Images/Arcade/Proj_Arcade.jpg',
      title: 'Custom Full Sized Arcade Machine',
      summary: 'After renovating my basement, I found that there was some extra space to put something and I found that an arcade machine would fit perfectly. After a bunch of research, I found the cost of an arcade machine to be too high and limiting in the games it would provide so I ended up building one myself.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Onshape', 'Power Tools', 'Raspberry Pi'],
      date: 'May 2018',
      status: 'Completed',
      objectPosition: '0% 40%',
    },
    {
      folder: 'Map',
      thumbnail: 'Proj_Images/Map/Proj_Map.jpg',
      title: 'Simple LED Mapper',
      summary: 'In order to determine the walls of the room and amount of LEDs on each wall for animations, I made a program that easily achieved this and gives an output that can be directly inputted into the LED Controller',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Arduino', 'C++'],
      date: 'December 2022',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      folder: 'Fog',
      thumbnail: 'Proj_Images/Fog/Proj_Fog.jpg',
      title: 'Handheld Fog Machine',
      summary: "For my friend's birthday I wanted to give him a gift that he could use for photography and found some really cool pictures that were achieved with smoke machines. In order to achieve this my goal is to use a small microcontroller to control a heating element and other useful features.",
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', 'Arduino', 'C++'],
      date: 'December 2022',
      status: 'In Progress',
      objectPosition: '0% 40%',
    },
    {
      folder: 'MQP',
      thumbnail: 'Proj_Images/MQP/Proj_MQP.jpg',
      title: 'Designing a Mechanism to Avoid Ice Deformation of Fixed Docks',
      summary: 'My senior capstone project was to design a mechanism that would reduce the deformation caused by ice on fixed docks. This project was started after my partner got frustrated with the process for winterization of a fixed dock and created a team to help solve that.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Matlab', 'CREO Parametric', 'Solidworks', 'Teamwork'],
      date: 'January 2023',
      status: 'Completed',
      objectPosition: '20% 0%',
    },
    {
      folder: 'Nantucket',
      thumbnail: 'Proj_Images/Nantucket/Proj_Nantucket.jpg',
      title: 'Reducing Traffic Congestion in Downtown Nantucket, MA',
      summary: "For my friend's birthday I wanted to give him a gift that he could use for photography and found some really cool pictures that were achieved with smoke machines. In order to achieve this my goal is to use a small microcontroller to control a heating element and other useful features.",
      description: 'Description Coming Soon',
      link: '',
      tools: ['ArcGIS', 'Google Forms', 'Communication', 'Teamwork'],
      date: 'October 2022',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      folder: 'Drone',
      thumbnail: 'Proj_Images/Drone/Proj_Drone.jpg',
      title: 'Radio Controlled FPV Racing Drones',
      summary: 'When I was a kid I always love the toy helicopters and when drones started to become a thing I built many different drones (with some that were autonomous and some that could carry payloads).',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Ardupilot', 'GPS', 'Radio Frequency'],
      date: 'February 2016',
      status: 'Completed',
      objectPosition: '0% 55%',
    },
    {
      folder: 'Game',
      thumbnail: 'Proj_Images/Game/Proj_Game.jpg',
      title: 'Developing a Local Multiplayer Game within Unreal Engine 4',
      summary: 'When I was a kid I always love the toy helicopters and when drones started to become a thing I built many different drones (with some that were autonomous and some that could carry payloads).',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Unreal Engine'],
      date: 'May 2016',
      status: 'Paused',
      objectPosition: '50% 0%',
    },
    {
      folder: 'Pipe',
      thumbnail: 'Proj_Images/Pipe/Proj_Pipe.jpg',
      title: 'Restoration of a Vintage Pipe Failure Tester',
      summary: "This project came about after I was given a broken tester that he didn't have time to fix and asked if I wanted to try and fix it.",
      description: 'Description Coming Soon',
      link: '',
      tools: ['Soldering', 'Troubleshooting'],
      date: 'April 2023',
      status: 'In Progress',
      objectPosition: '0% 0%',
    },
    {
      folder: 'Foot',
      thumbnail: 'Proj_Images/Foot/Proj_Foot.jpg',
      title: 'Reverse Engineering a Consumable Computer Foot',
      summary: "After a bunch of the feet on my computer case broke, I was in need of finding a solution and turned to taking a foot that wasn't broken and remade them within CAD and 3D printed them.",
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', '3D Printing'],
      date: 'July 2018',
      status: 'Completed',
      objectPosition: '0% 40%',
    },
    {
      folder: 'Voronoi',
      thumbnail: 'Proj_Images/Voronoi/Proj_Voronoi.jpg',
      title: 'Designing a Random Voronoi Generator',
      summary: "During an intro to programming class we were asked to build a program to do anything, as long as it was in Python. This program was built in 48 hours.",
      description: 'Description Coming Soon',
      link: '',
      tools: ['Javascript'],
      date: 'January 2023',
      status: 'Completed',
      objectPosition: '0% 45%',
    },
    {
      folder: 'Drums',
      thumbnail: 'Proj_Images/Drums/Proj_Drums.jpg',
      title: 'Using Wii Remotes to Play Air Drums',
      summary: "This was the final project for a music programming class where the goal was to use Max MSP to create an interactive program. Over the course of 2 weeks, this program was planned out, developed, and polished to deliver a fun experience for the user.",
      description: 'Description Coming Soon',
      link: '',
      tools: ['Max 8'],
      date: 'March 2021',
      status: 'Completed',
      objectPosition: '0% 40%',
    },
    {
      folder: 'Levitator',
      thumbnail: 'Proj_Images/Levitator/Proj_Levitator.jpg',
      title: 'Developing an Ultrasonic Levitating Device',
      summary: 'The first project I used CAD for was to design and build a device that uses low cost ultrasonic sensors to float very light objects.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', '3D Printing', 'Arduino', 'C++'],
      date: 'January 2019',
      status: 'Completed',
      objectPosition: '0% 0%',
    },
    {
      folder: 'DMX',
      thumbnail: 'Proj_Images/DMX/Proj_DMX.jpg',
      title: 'Designing a custom controller to interact with mains voltage devices',
      summary: 'For a theatrical performance we needed to have a rotary phone ring, instead of using a sound effect the director wanted to see if we could make a real rotary phone ring on command and tasked me with finding a solution.',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Solidworks', '3D Printing', 'Arduino', 'C++'],
      date: 'October 2019',
      status: 'Completed',
      objectPosition: '0% 60%',
    },
    {
      folder: 'Sign',
      thumbnail: 'Proj_Images/Sign/Proj_Sign.jpg',
      title: 'Designing a Vintage On Air Sign ',
      summary: 'For a theatrical performance we needed to have a rotary phone ring, instead of using a sound effect the director wanted to see if we could make a real rotary phone ring on command and tasked me with finding a solution..',
      description: 'Description Coming Soon',
      link: '',
      tools: ['Onshape', '3D Printing'],
      date: 'October 2019',
      status: 'Completed',
      objectPosition: '45% 0%',
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
          <section id="home" ref={homeRef}>
            <img src={cover} alt="Cover Background" className="cover-background" />
            <div className="name-profession-container">
              <h1 style={{ pointerEvents: "none" }}>Cole Rabe</h1>
              <p style={{ pointerEvents: "none" }}>Mechanical Engineer | Electrical Engineer</p>
              <a href="Resume_Cole_Rabe.pdf" download="Resume_Cole_Rabe.pdf" className="resume-button">Download Resume</a>
            </div>
            <a href="#contact" className="scroll-arrow">
              <img
                src="Icons/scroll_arrow.png"
                alt="Scroll Arrow"
                className="shrink-arrow"
              />
            </a>
          </section>
        </div>
        <div className={`links-container ${isSticky ? "sticky" : ""}`}
          ref={linksContainerRef}>
          <nav id="nav">
            <Nav activeLink={activeLink} onLinkClick={setActiveLink} />
          </nav>
        </div>
        <div className="skill-container">
          <div className="wave1-background"></div>
          <section id="skill" ref={skillRef}>
            <h1 className="section-title skill-title">Skills</h1>
            <div className="skill-categories">
              <div className={`sksoftware`}>
                <h2>Software</h2>
                <div className="icons-column">
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
                  <div className="icon" title="KiCAD">
                    <svg width="100%" viewBox="1100 1100 2250 2250" enableBackground="new 0 0 4500 4500">
                      <path fill="#FDFDFD" opacity="1.000000" stroke="none"
                        d="
M2383.998779,3322.356445 
	C1986.167358,3322.356445 1590.336060,3322.356445 1193.158081,3322.356445 
	C1192.635498,3317.321533 1192.064941,3313.603516 1191.908569,3309.868164 
	C1191.713623,3305.210205 1191.859497,3300.538330 1191.859497,3295.872314 
	C1191.859375,2601.985596 1191.858521,1908.098755 1191.869995,1214.212036 
	C1191.870239,1206.352783 1192.031738,1198.493652 1192.102905,1192.009521 
	C1194.089844,1190.262451 1194.535889,1189.722900 1195.106445,1189.410522 
	C1195.655518,1189.109985 1196.333496,1188.896729 1196.954712,1188.896606 
	C1903.500732,1188.780518 2610.046875,1188.684937 3316.592773,1188.627686 
	C3318.489502,1188.627563 3320.386230,1189.192871 3323.709717,1189.720459 
	C3324.112793,1193.460571 3324.707031,1197.194824 3324.871094,1200.947876 
	C3325.074951,1205.604980 3324.924072,1210.277588 3324.924072,1214.943481 
	C3324.924072,1908.830200 3324.925049,2602.717041 3324.920654,3296.603760 
	C3324.920654,3304.504395 3324.859375,3312.405029 3324.829834,3319.545410 
	C3322.186279,3320.895752 3321.013184,3322.019775 3319.839600,3322.020264 
	C3008.559326,3322.183838 2697.279297,3322.269287 2383.998779,3322.356445 
M1748.720337,1555.284302 
	C1757.007568,1528.328003 1768.265137,1502.899658 1786.712402,1481.141968 
	C1788.407349,1479.142578 1790.000610,1476.900024 1786.474365,1473.189209 
	C1783.000000,1473.189209 1778.444092,1473.189209 1773.888184,1473.189209 
	C1745.224243,1473.189209 1716.560303,1473.189209 1687.896362,1473.189209 
	C1559.908691,1473.189209 1431.920898,1473.158081 1303.933350,1473.312012 
	C1299.187500,1473.317749 1293.502930,1470.968994 1289.643555,1476.016602 
	C1289.969849,1477.026733 1290.032593,1477.764160 1290.404541,1478.277466 
	C1291.959351,1480.423584 1293.464966,1482.631592 1295.241699,1484.586792 
	C1328.645874,1521.347778 1343.693726,1565.031128 1344.390503,1614.207764 
	C1344.683228,1634.863892 1345.633057,1655.515747 1345.637085,1676.169800 
	C1345.713867,2067.465576 1345.693237,2458.761230 1345.695801,2850.057129 
	C1345.695801,2856.722900 1345.862061,2863.391602 1345.727051,2870.054199 
	C1345.120361,2900.021484 1345.368530,2930.044434 1343.535645,2959.938721 
	C1341.286499,2996.623047 1329.441162,3030.282471 1306.594849,3059.587158 
	C1302.498901,3064.841064 1298.159668,3069.908691 1294.160889,3075.233154 
	C1292.354370,3077.638672 1288.745605,3079.401367 1290.868774,3084.887695 
	C1296.870728,3084.887695 1303.369873,3084.887695 1309.868896,3084.887695 
	C1463.187500,3084.887695 1616.506104,3084.887451 1769.824707,3084.886719 
	C1773.824341,3084.886719 1777.828003,3084.985107 1781.822266,3084.835449 
	C1784.887573,3084.720703 1788.683472,3085.798828 1789.643433,3080.736816 
	C1764.912842,3052.583496 1751.885132,3018.752441 1743.757935,2982.532715 
	C1736.420288,2949.832764 1733.553345,2916.584473 1733.432129,2883.301514 
	C1732.912964,2740.650391 1733.200928,2597.996338 1733.278809,2455.343506 
	C1733.280151,2453.003906 1731.899048,2449.997559 1735.757080,2447.992676 
	C1741.511719,2449.970459 1743.659180,2455.918457 1746.975830,2460.434082 
	C1840.854126,2588.249268 1934.545288,2716.201904 2028.476196,2843.978271 
	C2052.189453,2876.236084 2073.694336,2909.907227 2093.708252,2944.500977 
	C2102.671143,2959.992920 2110.468750,2976.325928 2117.121582,2992.947266 
	C2126.674072,3016.813721 2130.059082,3041.758057 2125.255127,3067.435059 
	C2124.306641,3072.504150 2124.196045,3077.729980 2123.705566,3082.814941 
	C2140.201172,3085.542969 2457.863037,3086.698486 2658.033936,3084.823486 
	C2662.389648,3084.782715 2667.170410,3086.368408 2671.004639,3082.973389 
	C2672.033691,3079.206055 2668.740479,3078.259033 2667.038818,3076.903320 
	C2645.580078,3059.806152 2626.629395,3040.148193 2608.324219,3019.830078 
	C2572.152832,2979.681396 2538.552002,2937.439453 2506.791016,2893.753662 
	C2350.844727,2679.255615 2195.017334,2464.670898 2039.160522,2250.107666 
	C2035.278442,2244.763428 2031.543091,2239.312500 2027.376465,2233.395996 
	C2031.197632,2228.328125 2034.644043,2223.493896 2038.355469,2218.872559 
	C2193.602539,2025.576172 2348.868164,1832.294922 2504.143555,1639.021729 
	C2551.886230,1579.595947 2602.724365,1523.315674 2666.255127,1479.983398 
	C2668.815674,1478.237061 2669.751709,1476.285034 2667.918457,1473.504517 
	C2491.958252,1473.504517 2315.998047,1473.503662 2140.037842,1473.535522 
	C2139.420654,1473.535645 2138.757324,1473.934326 2138.199951,1474.281738 
	C2137.697510,1474.594849 2137.310791,1475.093628 2136.870850,1475.510254 
	C2136.665039,1476.795654 2135.986328,1478.223022 2136.322998,1479.345703 
	C2143.600098,1503.602905 2138.753174,1526.886108 2130.445312,1549.760132 
	C2122.450439,1571.771851 2111.595459,1592.501587 2098.320068,1611.681396 
	C2078.234375,1640.700317 2057.911621,1669.625610 2036.238281,1697.460815 
	C1983.422852,1765.291626 1929.779419,1832.477783 1876.457642,1899.914307 
	C1832.642456,1955.327637 1788.840698,2010.751587 1744.910889,2066.073730 
	C1742.300659,2069.360840 1741.122681,2074.892578 1733.507080,2074.143311 
	C1733.211304,2071.395996 1733.207397,2068.238037 1733.207397,2065.078369 
	C1733.206665,1935.090820 1732.851196,1805.101807 1733.418823,1675.116821 
	C1733.590698,1635.792480 1737.157349,1596.585571 1748.720337,1555.284302 
M2810.920410,2153.999512 
	C2810.920410,2404.642334 2810.995850,2655.285156 2810.798584,2905.927979 
	C2810.779541,2929.886230 2809.626953,2953.882080 2807.993164,2977.791504 
	C2805.622314,3012.491455 2794.963623,3044.272949 2772.315430,3071.423340 
	C2769.543213,3074.746582 2765.500244,3077.635742 2765.469727,3082.774170 
	C2784.368652,3085.763916 3058.072266,3086.947754 3220.722900,3084.705078 
	C3224.428711,3084.654053 3228.591309,3086.029541 3232.310791,3081.937500 
	C3231.022949,3075.499756 3225.431396,3071.394287 3221.702881,3066.296875 
	C3204.830811,3043.228516 3193.551514,3017.959229 3191.327881,2989.258057 
	C3189.682617,2968.025391 3187.831299,2946.730225 3187.815674,2925.461670 
	C3187.569092,2594.160645 3187.607178,2262.859375 3187.579590,1931.558228 
	C3187.579102,1925.558838 3187.704834,1919.555542 3187.528320,1913.561279 
	C3187.416748,1909.770264 3186.852295,1905.992676 3186.554688,1902.876709 
	C3183.955566,1901.875610 3182.760986,1901.013184 3181.566162,1901.012329 
	C3044.253906,1900.915161 2906.941895,1900.881592 2769.629639,1900.855835 
	C2768.968262,1900.855713 2768.187012,1900.826660 2767.680176,1901.151733 
	C2767.193848,1901.463745 2766.991943,1902.219727 2765.938965,1904.026001 
	C2769.272949,1908.743408 2772.887451,1914.070801 2776.716553,1919.239136 
	C2793.736816,1942.215088 2804.470459,1967.907471 2807.577881,1996.230835 
	C2809.898438,2017.379395 2810.898926,2038.737183 2811.247803,2060.022217 
	C2811.739502,2090.004639 2811.084717,2120.005859 2810.920410,2153.999512 
M2805.959473,1452.378906 
	C2782.873047,1498.778931 2777.012207,1547.414917 2787.662598,1597.983032 
	C2812.760498,1717.147827 2930.193359,1781.639038 3030.940674,1765.217163 
	C3153.188721,1745.290771 3242.939209,1626.096680 3207.834473,1494.386963 
	C3179.178467,1386.872314 3068.616455,1317.000244 2958.125244,1338.961670 
	C2890.913574,1352.320923 2840.506836,1389.502441 2805.959473,1452.378906 
z"/>
                      <title>KiCAD icon</title>
                    </svg>
                  </div>
                  <div className="icon" title="Multisim">
                    <svg viewBox="7 7 49 49" width="100%" height="100%" baseProfile="basic">
                      <path fill="#FFF" d="M45.723,30c-0.346,0.595-0.984,1-1.723,1c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2	c0.738,0,1.376,0.405,1.723,1H54v-5h-9.277c-0.346,0.595-0.984,1-1.723,1c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2	c0.738,0,1.376,0.405,1.723,1H54v-6c0-2.761-2.239-5-5-5H15c-2.761,0-5,2.239-5,5v2h25.277c0.346-0.595,0.984-1,1.723-1	c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2c-0.738,0-1.376-0.405-1.723-1H10v12h3v-7h18.277c0.346-0.595,0.984-1,1.723-1	c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2c-0.738,0-1.376-0.405-1.723-1H15v5h20.277c0.346-0.595,0.984-1,1.723-1	c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2c-0.738,0-1.376-0.405-1.723-1H10v5h10.777c0.346-0.595,0.984-1,1.723-1	c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2c-0.738,0-1.376-0.405-1.723-1H10v5h12.777c0.346-0.595,0.984-1,1.723-1	c1.105,0,2,0.895,2,2c0,1.105-0.895,2-2,2c-0.738,0-1.376-0.405-1.723-1H10v2c0,2.761,2.239,5,5,5h16V40.723	c-0.595-0.346-1-0.984-1-1.723c0-1.105,0.895-2,2-2s2,0.895,2,2c0,0.738-0.405,1.376-1,1.723V54h5V43.723	c-0.595-0.346-1-0.984-1-1.723c0-1.105,0.895-2,2-2s2,0.895,2,2c0,0.738-0.405,1.376-1,1.723V54h5V39.223	c-0.595-0.346-1-0.984-1-1.723c0-1.105,0.895-2,2-2s2,0.895,2,2c0,0.738-0.405,1.376-1,1.723V54h2c2.761,0,5-2.239,5-5V30H45.723z" />
                      <path fill="#FFF" d="M49,55H15c-3.309,0-6-2.691-6-6V15c0-3.309,2.691-6,6-6h34c3.309,0,6,2.691,6,6v34	C55,52.309,52.309,55,49,55z M15,11c-2.206,0-4,1.794-4,4v34c0,2.206,1.794,4,4,4h34c2.206,0,4-1.794,4-4V15c0-2.206-1.794-4-4-4H15	z" />
                      <title>Multisim icon</title>
                    </svg>
                  </div>
                  <div className="icon" title="Fusion 360">
                    <svg width="100%" viewBox="0 0 4267 4267" enableBackground="new 0 0 4267 4267">
                      <path fill="#FFFFFF" opacity="1.000000" stroke="none"
                        d="
M1990.765137,4100.892578 
	C1835.417725,4090.596680 1685.105835,4063.331299 1538.259277,4017.285889 
	C1303.883057,3943.795166 1093.526855,3826.410889 904.541504,3670.148193 
	C773.022034,3561.401367 655.473206,3439.137939 552.803833,3302.780273 
	C431.270782,3141.369141 337.499847,2965.158691 273.416382,2773.419678 
	C241.285400,2677.282959 217.517410,2578.991943 201.302841,2478.949219 
	C193.419113,2430.307373 187.547943,2381.386475 183.159302,2332.258789 
	C177.227234,2265.853271 174.702988,2199.353516 174.834946,2132.730469 
	C174.986725,2056.097168 179.039322,1979.692993 187.298691,1903.458862 
	C201.619476,1771.277710 228.719345,1641.893799 269.873169,1515.464111 
	C351.057220,1266.056030 482.110626,1045.419922 655.162781,849.197937 
	C771.136841,717.696350 900.377869,600.924255 1044.990356,501.457764 
	C1227.848267,375.685364 1426.560669,285.004517 1642.024536,231.181076 
	C1720.289307,211.630295 1799.403687,197.097855 1879.455444,187.193420 
	C1941.635010,179.500229 2004.026489,174.282333 2066.584717,172.700912 
	C2123.842285,171.253479 2181.225586,171.231232 2238.457520,173.271652 
	C2298.318359,175.405807 2358.072510,180.704849 2417.526611,188.510757 
	C2612.973633,214.171478 2800.482178,267.106995 2978.934814,351.450714 
	C3154.992188,434.662109 3313.491943,543.833923 3457.247314,674.700562 
	C3571.447998,778.662231 3674.314697,892.827087 3763.775879,1018.889893 
	C3905.424072,1218.490479 4003.905762,1437.525391 4059.012207,1675.946167 
	C4076.419678,1751.259521 4088.668457,1827.487427 4096.992188,1904.397339 
	C4106.253418,1989.966919 4109.892090,2075.726562 4109.250488,2161.735107 
	C4108.773438,2225.720947 4105.607910,2289.579102 4099.265625,2353.233398 
	C4075.513184,2591.623535 4011.760010,2818.425781 3901.788086,3031.746338 
	C3827.819580,3175.228760 3736.459961,3306.789062 3629.683105,3427.701904 
	C3508.221191,3565.243652 3372.692139,3686.905273 3220.133057,3789.253662 
	C3042.031738,3908.736816 2849.011475,3994.828369 2641.004883,4046.948242 
	C2566.694092,4065.568115 2491.415283,4079.458984 2415.320068,4088.931641 
	C2341.228027,4098.154297 2266.996338,4104.711426 2192.276367,4105.059570 
	C2172.968262,4105.149414 2153.638916,4106.912109 2134.362305,4106.373047 
	C2087.105469,4105.052246 2039.873657,4102.836914 1990.765137,4100.892578 
M2474.000244,1039.361328 
	C2190.042480,1039.624756 1906.084839,1039.887451 1622.127197,1040.205688 
	C1621.624756,1040.206177 1621.123291,1041.028931 1620.616089,1041.465454 
	C1620.148804,1042.626831 1619.272339,1043.788208 1619.272217,1044.949585 
	C1619.196533,1788.246948 1619.179565,2531.544189 1619.181396,3274.841553 
	C1619.181396,3275.489746 1619.348877,3276.208496 1619.664307,3276.766113 
	C1619.966064,3277.299561 1620.563354,3277.665771 1622.396973,3279.390869 
	C1628.174927,3279.464844 1635.390381,3279.637695 1642.605713,3279.638428 
	C1797.935913,3279.654053 1953.265991,3279.650391 2108.596191,3279.650146 
	C2171.928223,3279.650146 2235.260254,3279.678711 2298.592285,3279.594238 
	C2303.666992,3279.587402 2308.740479,3278.795410 2315.079834,3278.261719 
	C2315.079834,3269.123779 2315.079834,3261.222656 2315.079834,3253.321533 
	C2315.079834,2959.994141 2315.080078,2666.666748 2315.080566,2373.339355 
	C2315.080566,2367.339355 2314.908203,2361.332275 2315.153809,2355.342285 
	C2315.306152,2351.627686 2316.096436,2347.939209 2316.687744,2343.597168 
	C2325.173584,2343.597168 2332.443604,2343.597168 2339.713379,2343.597168 
	C2560.375488,2343.597168 2781.037598,2343.597412 3001.699707,2343.596436 
	C3007.699707,2343.596436 3013.707275,2343.758057 3019.695312,2343.487061 
	C3021.814941,2343.391357 3023.886230,2342.228760 3027.474121,2341.070557 
	C3021.208252,2335.133057 3016.487061,2330.493652 3011.592773,2326.044922 
	C2848.896484,2178.162598 2686.171387,2030.311523 2523.478271,1882.425903 
	C2457.911133,1822.826172 2392.386963,1763.178711 2326.921143,1703.467651 
	C2322.725586,1699.640869 2316.708496,1696.903564 2316.621826,1689.330811 
	C2531.339844,1474.436401 2746.191650,1259.408691 2961.032471,1044.370239 
	C2961.470703,1043.931274 2962.000488,1043.352051 2962.038330,1042.807251 
	C2962.079834,1042.211182 2961.598633,1041.578735 2960.687500,1039.363037 
	C2800.233643,1039.359619 2639.117188,1039.362061 2474.000244,1039.361328 
z"/>
                      <title>Fusion360 icon</title>
                    </svg>
                  </div>
                  <div className="icon" title="AutoCAD">
                    <svg enableBackground="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" fill="#FFF">
                      <path clipRule="evenodd" d="m55.704 499.013c.082-.158.925-1.752 5.251-7.704 8.558-11.79 21.405-20.608 25.638-23.336l87.14-10.979c-7.754 7.46-13.905 16.777 1.123 18.68 65.263 8.235 162.189-28.477 200.286-44.379l.077.888 70.053-6.256c-33.935 17.05-119.062 50.789-302.894 80.874-81.813 13.389-87.59-6.064-87.655-6.213m89.858-500.088 70.877 8.266 244.397 398.478-74.336 6.635-40.14-70.836-154.282 9.476-4.882 85.457-92.752 11.682zm49.224 273.523 108.265-2.709-100.146-175.932h-2.707zm-118.321 180.53 51.032-448.409c-.256.743-.379 1.268-.379 1.268l-73.992 467.327c8.458-9.565 18.137-16.704 23.339-20.186z" fillRule="evenodd" />
                      <title>AutoCAD icon</title>
                    </svg>
                  </div>
                  <div className="icon" title="CREO Parametric">
                    <svg width="100%" viewBox="0 0 120 130" enableBackground="new 0 0 120 130">

                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M63.375000,131.000000 
	C62.953331,111.534737 62.845589,92.069077 62.974873,72.604980 
	C62.985325,71.032341 64.224617,68.792358 65.564041,68.006714 
	C82.168007,58.267635 98.896591,48.741028 116.038391,38.904175 
	C116.248413,40.266376 116.544830,41.298744 116.546410,42.331558 
	C116.574142,60.468258 116.495354,78.605560 116.637009,96.741196 
	C116.659752,99.653923 115.668755,101.155380 113.186867,102.555618 
	C98.736420,110.708305 84.383072,119.033356 70.016197,127.333527 
	C68.449150,128.238846 67.005356,129.357529 65.752197,130.688629 
	C65.250000,131.000000 64.500000,131.000000 63.375000,131.000000 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M1.000000,39.468658 
	C17.992819,48.686436 35.031548,58.294647 51.899498,68.193848 
	C53.401588,69.075371 54.560982,71.839706 54.582409,73.744194 
	C54.793724,92.525330 54.730568,111.309563 54.872612,130.546448 
	C53.933331,131.000000 52.866661,131.000000 51.685162,130.709122 
	C51.249779,130.049866 50.998550,129.561584 50.598682,129.330414 
	C34.746639,120.165848 18.886028,111.016029 2.994138,101.920891 
	C2.504795,101.640839 1.672440,101.960129 1.000000,102.000000 
	C1.000000,81.312439 1.000000,60.624878 1.000000,39.468658 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M61.562500,1.000000 
	C63.001648,2.090286 63.812111,3.508434 65.034035,4.220978 
	C79.948647,12.918166 94.924339,21.510614 109.880547,30.136541 
	C110.451950,30.466097 110.986526,30.859503 112.180984,31.646776 
	C104.490623,36.097401 97.149933,40.358032 89.797203,44.597786 
	C80.449013,49.988174 71.138107,55.447037 61.687767,60.652428 
	C60.232502,61.454006 57.681881,61.831303 56.372467,61.096218 
	C39.585087,51.672020 22.930588,42.011086 6.252213,32.393162 
	C5.992847,32.243587 5.857287,31.879328 5.404087,31.260321 
	C17.048393,24.554562 28.683012,17.933992 40.232162,11.167547 
	C45.470985,8.098215 50.540325,4.739601 55.343273,1.256108 
	C57.041668,1.000000 59.083332,1.000000 61.562500,1.000000 
z"/>
                      <title>CREO Parametric icon</title>
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
                  <div className="icon" title="Gimp">
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 32 32"
                      id="Camada_1"
                      version="1.1"
                      xmlSpace="preserve"
                    >
                      <style type="text/css">{`.st0 { fill: #FFF; }.st1 { fillRule: evenodd; clipRule: evenodd; fill: #FFF; }`}</style>
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
                      width="100%"
                      height="100%"
                      viewBox="35 35 180 170"
                    >
                      <g fillRule="evenodd">
                        <path d="M61.264 122.309c0-3.998.603-29.443.603-34.157 0-4.714 3.124-12.91 13-22.55 9.877-9.641 19.451-11.343 30.057-14.97 10.606-3.625 14.1-2.743 23.508-2.743 9.407 0 9.79-.342 23.76 3.533 13.97 3.875 23.794 10.105 31.89 17.047s7.9 13.254 9.522 19.46c1.62 6.208 1.62 21.313 1.62 34.157 12.556 11.611 14.366 17.133 14.366 38.821 0 21.689-11.056 37.037-18.988 42.863-7.933 5.825-4.441 4.586-9.018 5.078-4.577.491-9.639-3.075-9.639-3.075l-.183-80.164 7.312-4.511s.998-24.812.998-29.657c0-4.844-4.225-12.684-6.765-16.199-2.54-3.514-10.434-6.773-19.471-9.64-9.037-2.868-13.725-3.533-25.404-3.487-11.68.047-15.175.015-27.09 3.487-11.915 3.471-10.543 3.688-16.764 9.64-6.22 5.952-8.713 11.33-8.56 16.506.152 5.176.804 30.703.804 30.703l9.14 5.281-1.384 75.297s-3.958 4.19-8.408 4.86c-4.45.67-7.615-1.718-14.906-6.995-7.291-5.278-14.742-17.096-14.742-38.16 0-21.063.044-29.037 14.742-40.425z" />
                        <path d="M92.731 155.314l7.613-23.496 15.719 45.975 12.555-62.277 10.81 62.45 15.869-45.726 9.202 22.975-.778 29.69-7.743-28.322-15.685 45.376-11.98-45.711-11.762 45.583-15.436-45.686-8.447 28.612z" />
                      </g>
                    </svg>
                  </div>
                  <div className="icon" title="Cura">
                    <svg width="100%" height="100%" viewBox="400 300 400 360" enableBackground="new 0 0 1200 960">
                      <path fill="#FFF" opacity="1.000000" stroke="none" d="M489.000000,675.846497 C460.021545,675.846436 431.543091,675.846436 402.442444,675.846436 C402.330322,673.673340 402.145325,671.757080 402.144989,669.840820 C402.130280,587.535278 402.171844,505.229645 402.026154,422.924316 C402.018005,418.312500 403.544983,415.290039 406.756226,412.168427 C438.994263,380.829773 471.083740,349.338287 503.220917,317.895813 C513.102966,308.227325 522.924500,298.493988 532.975037,289.003448 C534.587830,287.480499 537.259460,286.279846 539.443787,286.276367 C624.914673,286.140198 710.385925,286.158844 795.857056,286.172791 
	C797.313354,286.173035 798.769714,286.363556 800.508972,286.485016 
	C800.595520,288.194733 800.733337,289.647491 800.733521,291.100250 
	C800.742554,373.905640 800.709412,456.711060 800.832031,539.516296 
	C800.838013,543.550598 799.568359,546.184814 796.727112,548.956787 
	C754.405579,590.246216 712.238098,631.693604 669.871155,672.936157 
	C668.029175,674.729187 664.621826,675.718872 661.940002,675.726196 
	C604.460327,675.883118 546.980103,675.846069 489.000000,675.846497 
M706.797852,576.818237 
	C707.192749,575.982239 707.928711,575.147644 707.932251,574.309998 
	C708.002319,557.656372 708.026489,541.002197 707.903381,524.349304 
	C707.895142,523.234680 706.641296,522.129333 705.225708,520.692383 
	C704.264221,520.474854 703.307800,520.094360 702.340576,520.064697 
	C690.554016,519.702820 678.767212,519.198364 666.977783,519.111694 
	C646.321777,518.959778 625.645081,518.548462 605.014465,519.289001 
	C594.242737,519.675720 584.499939,517.335632 575.897156,511.701904 
	C562.482666,502.917114 557.228760,489.238037 555.933044,473.730316 
	C555.273865,465.840729 557.277039,458.621155 559.468384,451.038055 
	C564.112976,434.965607 582.081726,422.062103 597.961060,421.989227 
	C631.944580,421.833252 665.929321,421.943848 699.913574,421.930298 
	C705.827026,421.927948 707.932129,419.813171 707.939880,413.879272 
	C707.958923,399.386017 707.952393,384.892700 707.944641,370.399414 
	C707.941284,364.244263 705.802612,362.063568 699.699219,362.062012 
	C665.881531,362.053497 632.050598,361.522766 598.253540,362.358398 
	C586.588135,362.646820 574.864502,365.783051 563.429260,368.658997 
	C552.805237,371.330933 543.293823,377.086823 535.095276,384.214569 
	C527.317261,390.976715 519.705444,398.309814 513.640991,406.580048 
	C502.703613,421.495667 497.921600,439.238800 496.356567,457.308014 
	C494.845032,474.759369 495.862610,492.260620 501.798981,509.292053 
	C509.710266,531.989380 522.891663,549.860352 543.531433,562.749512 
	C560.276733,573.206604 578.333984,578.416443 597.586060,578.772034 
	C631.558716,579.399658 665.551453,578.984131 699.535278,578.865295 
	C701.693970,578.857788 703.848450,577.646423 706.797852,576.818237 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M706.004883,576.995117 
	C703.848450,577.646423 701.693970,578.857788 699.535278,578.865295 
	C665.551453,578.984131 631.558716,579.399658 597.586060,578.772034 
	C578.333984,578.416443 560.276733,573.206604 543.531433,562.749512 
	C522.891663,549.860352 509.710266,531.989380 501.798981,509.292053 
	C495.862610,492.260620 494.845032,474.759369 496.356567,457.308014 
	C497.921600,439.238800 502.703613,421.495667 513.640991,406.580048 
	C519.705444,398.309814 527.317261,390.976715 535.095276,384.214569 
	C543.293823,377.086823 552.805237,371.330933 563.429260,368.658997 
	C574.864502,365.783051 586.588135,362.646820 598.253540,362.358398 
	C632.050598,361.522766 665.881531,362.053497 699.699219,362.062012 
	C705.802612,362.063568 707.941284,364.244263 707.944641,370.399414 
	C707.952393,384.892700 707.958923,399.386017 707.939880,413.879272 
	C707.932129,419.813171 705.827026,421.927948 699.913574,421.930298 
	C665.929321,421.943848 631.944580,421.833252 597.961060,421.989227 
	C582.081726,422.062103 564.112976,434.965607 559.468384,451.038055 
	C557.277039,458.621155 555.273865,465.840729 555.933044,473.730316 
	C557.228760,489.238037 562.482666,502.917114 575.897156,511.701904 
	C584.499939,517.335632 594.242737,519.675720 605.014465,519.289001 
	C625.645081,518.548462 646.321777,518.959778 666.977783,519.111694 
	C678.767212,519.198364 690.554016,519.702820 702.340576,520.064697 
	C703.307800,520.094360 704.264221,520.474854 705.609009,521.322449 
	C705.996460,540.300049 706.000671,558.647583 706.004883,576.995117 
M597.614990,576.338562 
	C631.441284,576.350464 665.268127,576.273132 699.093201,576.479553 
	C703.671143,576.507446 704.670288,574.968384 704.605835,570.748352 
	C704.386902,556.421387 704.323242,542.084473 704.637939,527.761047 
	C704.747192,522.786987 702.995850,521.749573 698.357666,521.776611 
	C666.365356,521.963318 634.371277,521.929932 602.378052,521.851379 
	C578.966919,521.793945 561.207031,508.570099 555.577820,485.919708 
	C550.540466,465.651337 553.585632,446.772522 569.316040,431.607697 
	C578.698242,422.562836 590.551636,419.492615 603.271790,419.461609 
	C635.264954,419.383636 667.258667,419.336304 699.251343,419.471588 
	C703.375183,419.489014 704.695374,418.334076 704.625671,414.149353 
	C704.389771,399.989471 704.535278,385.823334 704.525269,371.659576 
	C704.520386,364.798462 704.510620,364.778351 697.849609,364.777985 
	C666.356140,364.776154 634.860962,364.609558 603.370239,364.907898 
	C594.770203,364.989349 586.030273,365.733093 577.618103,367.458252 
	C546.748779,373.788879 523.429504,390.501282 509.505249,419.224609 
	C498.063873,442.826080 495.960938,467.712585 500.339966,493.274109 
	C503.792816,513.429016 511.874390,531.462158 526.272400,546.289612 
	C545.518738,566.109985 569.660339,574.569458 597.614990,576.338562 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M706.401367,576.906677 
	C706.000671,558.647583 705.996460,540.300049 705.979492,521.486084 
	C706.641296,522.129333 707.895142,523.234680 707.903381,524.349304 
	C708.026489,541.002197 708.002319,557.656372 707.932251,574.309998 
	C707.928711,575.147644 707.192749,575.982239 706.401367,576.906677 
z"/>
                      <title>Cura icon</title>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={`sktraining`}>
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
                  <div className="icon" title="Power Tools">
                    <svg width="100%" viewBox="230 230 340 340" enableBackground="new 0 0 800 800">
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M309.250946,254.749603 
	C338.838440,282.999023 368.158905,311.015259 397.520142,338.988708 
	C409.420227,350.326294 421.422241,361.556793 433.353027,372.862274 
	C440.590668,379.720520 447.650665,386.772980 455.045898,393.455475 
	C458.860413,396.902344 458.844818,399.906036 455.560059,403.508026 
	C447.972107,411.828979 440.448456,420.208679 432.920380,428.584045 
	C421.406708,441.393616 409.888947,454.199799 398.439819,467.066925 
	C397.186432,468.475555 396.372131,470.274933 395.418701,471.790497 
	C390.935516,470.501221 386.382965,469.443604 382.054504,467.796936 
	C380.721985,467.290070 379.218170,465.223755 379.127930,463.787628 
	C378.545471,454.520630 378.336792,445.230255 377.997711,435.947845 
	C377.804688,430.663910 374.695038,426.819580 368.995422,425.025421 
	C360.363037,422.308075 351.664642,419.791199 343.098694,416.881927 
	C341.779907,416.434021 340.220581,414.397430 340.129059,413.006348 
	C339.541595,404.077606 339.331512,395.124023 338.999481,386.178528 
	C338.806824,380.986755 335.613312,376.543915 330.527863,374.854645 
	C322.401093,372.155212 314.249908,369.519989 306.049133,367.057098 
	C302.540253,366.003296 301.004944,364.055176 300.940582,360.339325 
	C300.791565,351.738037 300.535797,343.127502 299.921356,334.549500 
	C299.559021,329.491180 296.798798,325.650116 291.788330,324.042114 
	C284.099060,321.574402 276.366272,319.232117 268.600586,317.016693 
	C263.936035,315.686005 261.707031,313.293579 261.856598,307.997528 
	C262.076355,300.215759 261.198303,292.408386 261.103760,284.608093 
	C261.082947,282.888855 261.955688,280.747803 263.145325,279.489685 
	C272.853455,269.222626 282.711548,259.096680 292.574127,248.976639 
	C296.619904,244.825241 299.101013,244.841583 303.327820,248.870956 
	C305.255402,250.708496 307.111694,252.620834 309.250946,254.749603 
M371.150726,344.685455 
	C374.542572,345.600525 377.338135,344.440979 377.862305,341.081116 
	C378.185150,339.011597 377.292236,335.970490 375.812897,334.522003 
	C360.034363,319.072235 344.041382,303.841187 328.073730,288.585236 
	C325.524109,286.149231 322.684479,284.420044 319.611969,287.803467 
	C316.761871,290.941986 317.179443,293.948639 320.252380,296.803894 
	C326.215973,302.345062 332.156464,307.912628 338.026672,313.552368 
	C348.093414,323.223938 358.089539,332.968964 368.150604,342.646484 
	C368.824921,343.295105 369.795471,343.635712 371.150726,344.685455 
M293.187256,270.709930 
	C296.215118,273.747101 299.129333,276.910004 302.306488,279.782013 
	C304.891327,282.118591 308.155548,282.275085 310.485901,279.773315 
	C312.766632,277.324829 313.087036,274.258026 310.091888,271.582916 
	C307.877625,269.605286 305.963837,267.292114 303.758728,265.303009 
	C301.603271,263.358704 299.353577,261.559875 296.029449,262.955811 
	C292.666107,264.368195 292.860992,267.118286 293.187256,270.709930 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M474.830292,554.342285 
	C469.700653,549.849915 464.748627,545.715393 459.954010,541.405701 
	C443.450806,526.571716 426.855042,511.833130 410.711182,496.616119 
	C408.575104,494.602661 408.744293,490.054871 408.040588,486.640656 
	C407.546631,484.243988 406.989227,481.747986 407.178101,479.352997 
	C407.387146,476.701691 407.624512,473.422607 409.212311,471.611908 
	C419.814392,459.521362 430.829102,447.793945 441.614929,435.862823 
	C452.362030,423.974457 462.998138,411.985718 474.157898,399.509949 
	C479.205292,403.945709 484.304260,408.340820 489.308929,412.840729 
	C505.791534,427.660828 522.239990,442.518829 538.701477,457.362366 
	C542.641052,460.914703 546.633362,464.410492 550.508301,468.031952 
	C558.185974,475.207489 562.311646,486.541565 551.612122,497.968140 
	C537.221191,513.336975 522.865051,528.759277 509.094574,544.678162 
	C503.489807,551.157410 497.658752,556.090942 489.049377,557.529419 
	C483.896606,558.390381 479.342590,557.483154 474.830292,554.342285 
M520.533875,497.977448 
	C524.650757,493.235199 528.610107,488.342926 532.936340,483.799957 
	C536.175110,480.398865 535.240845,477.526184 532.371948,474.927643 
	C524.279236,467.597443 515.932251,460.546082 507.898712,453.153076 
	C503.864502,449.440521 501.107727,450.874054 498.002960,454.312469 
	C486.898926,466.609741 475.659515,478.784668 464.482086,491.015778 
	C461.242340,494.560944 458.053131,498.152283 454.814850,501.698853 
	C451.624573,505.192871 450.279938,509.653015 454.969940,513.610168 
	C462.947388,520.341125 470.411011,527.677612 478.191803,534.646667 
	C481.362183,537.486328 484.429138,537.522949 487.545654,534.058167 
	C498.284180,522.119873 509.180023,510.323120 520.533875,497.977448 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M490.255859,256.200531 
	C485.875671,260.569458 481.846985,264.789001 477.599304,268.775116 
	C474.568542,271.619202 473.741852,274.624420 476.455200,277.900970 
	C478.857605,280.802124 482.196777,280.292358 485.797577,276.711365 
	C490.638702,271.896790 495.421112,267.023193 500.086975,262.317993 
	C505.299316,267.540710 510.420959,272.672546 516.148560,278.411560 
	C511.625885,282.777039 506.753113,287.420837 501.950348,292.135895 
	C498.387421,295.633728 497.925354,298.966736 500.500000,301.559235 
	C502.990265,304.066681 506.800842,303.653595 510.119232,300.383545 
	C514.863159,295.708771 519.537903,290.963684 524.079773,286.411438 
	C529.238586,291.575989 534.354370,296.697418 539.486633,301.835358 
	C530.027954,313.134399 518.638306,322.760559 503.079163,325.126740 
	C494.901184,326.370392 486.288422,326.754150 478.120270,325.664673 
	C458.552246,323.054657 440.991608,327.216644 424.968292,338.484314 
	C422.959747,339.896759 421.094299,341.512695 418.981445,343.177002 
	C412.272156,336.916351 405.620941,330.709930 397.985687,323.585266 
	C403.291351,318.603485 408.580933,313.874054 413.605164,308.877716 
	C434.262665,288.334961 454.843628,267.715271 475.442780,247.113876 
	C479.906616,242.649536 481.119598,242.631104 485.573730,247.104523 
	C487.335785,248.874207 489.302124,250.489410 490.774017,252.472855 
	C491.298096,253.179016 490.634918,254.766251 490.255859,256.200531 
M454.401917,308.097626 
	C459.095001,303.419617 463.794434,298.747925 468.478729,294.061157 
	C471.170288,291.368134 471.099640,288.189301 468.735443,285.717224 
	C466.370728,283.244629 463.382721,282.945557 460.576294,285.856201 
	C455.746460,290.865417 450.792419,295.758850 445.783539,300.589935 
	C442.864014,303.405823 441.653900,306.413666 444.918396,309.504456 
	C447.981750,312.404755 451.166656,311.714447 454.401917,308.097626 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M311.243408,546.301208 
	C323.612122,533.244995 335.751251,520.460999 347.853180,507.641876 
	C351.169586,504.128937 351.521057,500.480103 348.578735,498.152008 
	C345.192200,495.472443 342.298706,496.719574 339.549042,499.653595 
	C326.936523,513.112000 314.227142,526.479614 301.541901,539.891052 
	C296.499481,534.800537 291.471863,529.724976 286.032654,524.233826 
	C291.769684,518.577271 297.853729,513.018738 303.313538,506.902924 
	C304.780243,505.259979 305.242584,501.593750 304.469208,499.475952 
	C303.958099,498.076477 300.465210,497.482544 298.214203,497.140259 
	C297.303986,497.001862 296.012024,498.362335 295.122284,499.265808 
	C289.536896,504.937225 284.015930,510.672058 278.671936,516.181396 
	C273.037994,510.494873 267.920013,505.329132 262.565430,499.924591 
	C270.857269,492.175659 281.030762,486.202850 293.029358,485.248352 
	C302.954315,484.458801 313.041687,485.619019 323.052704,486.023956 
	C339.906128,486.705658 355.052521,481.878998 368.787842,471.995026 
	C375.568604,481.138977 387.348969,479.425262 396.304443,484.746094 
	C395.416321,485.781555 394.647675,486.806335 393.751526,487.703796 
	C371.159882,510.328522 348.521088,532.906433 325.988861,555.590149 
	C322.657227,558.944214 319.938812,558.865112 316.905762,555.428162 
	C315.146698,553.434875 313.033417,551.745850 311.355560,549.694153 
	C310.796112,549.009949 311.093903,547.624878 311.243408,546.301208 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M319.249268,446.249329 
	C324.799377,440.700317 330.200958,435.497284 335.348175,430.053772 
	C337.331696,427.956024 339.110474,427.519196 341.823761,428.439117 
	C348.765320,430.792603 355.781952,432.937469 362.822174,434.981079 
	C365.700531,435.816589 367.199066,436.998413 367.065308,440.397278 
	C366.863129,445.533936 367.719452,450.726532 367.328613,455.834320 
	C367.174530,457.847778 365.264526,460.214783 363.494629,461.540009 
	C348.559326,472.722717 332.240692,476.170166 313.429108,473.386078 
	C291.918030,470.202484 271.896484,475.689270 255.428375,490.997040 
	C255.068146,491.331940 254.661087,491.616455 253.200089,492.784637 
	C250.579391,489.805511 247.826401,486.765961 245.177200,483.638550 
	C242.637741,480.640625 244.111252,478.331360 246.461853,475.993103 
	C265.120331,457.432800 283.725739,438.819122 302.349365,420.223724 
	C310.666565,411.919159 318.988068,403.618866 327.588684,395.036163 
	C328.048401,400.886261 328.216858,406.302368 328.960968,411.638214 
	C329.814941,417.761749 327.748627,422.042908 323.148254,426.265778 
	C313.985748,434.676422 305.567780,443.893311 296.701324,452.634186 
	C293.892944,455.402740 292.882324,458.199707 295.769958,461.160645 
	C298.770966,464.237915 302.053040,463.387115 304.869629,460.633331 
	C309.632660,455.976379 314.294739,451.216156 319.249268,446.249329 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M549.751648,331.748779 
	C528.554993,352.958893 507.608337,373.918488 487.135559,394.403839 
	C483.154358,392.359497 479.461212,390.440765 475.741058,388.576019 
	C475.161346,388.285431 474.266510,387.896393 473.840820,388.133545 
	C466.342590,392.310089 463.621460,385.483673 459.502838,381.950439 
	C458.253632,380.878815 457.159576,379.626312 456.054932,378.517426 
	C458.640656,375.832001 461.140015,373.221191 463.656403,370.626923 
	C466.364410,367.835144 467.569824,364.516724 464.750092,361.467010 
	C462.027954,358.522827 458.746002,359.371033 456.120117,362.157501 
	C453.530212,364.905731 451.071075,367.777252 447.641357,371.617249 
	C441.274658,363.801086 435.548004,356.770660 429.533478,349.386871 
	C434.646729,344.551758 443.147461,340.443298 452.531830,338.027771 
	C462.089478,335.567566 471.547974,336.489380 481.320221,337.707642 
	C499.075928,339.921265 516.053162,336.264435 530.793335,325.537170 
	C537.032043,320.996887 542.531433,315.440765 548.880188,309.898193 
	C551.250183,312.416016 553.805542,315.211914 556.452148,317.918488 
	C558.887451,320.408966 558.848572,322.745331 556.357239,325.152649 
	C554.204651,327.232635 552.117676,329.380432 549.751648,331.748779 
z"/>
                    </svg>
                  </div>
                  <div className="icon" title="Lab Safety">
                    <svg fill="#FFF" height="800px" width="800px" viewBox="0 0 472.047 472.047">
                      <path d="M452.842,431.982l-10.925-32.184c-19.086-56.186-68.4-95.763-126.107-103.326c-21.408,23.559-49.274,37.939-79.797,37.939
		c-30.516,0-58.375-14.38-79.783-37.939c-57.7,7.563-107.014,47.14-126.1,103.326l-10.925,32.184
		c-3.145,9.255-1.638,19.458,4.061,27.409c5.692,7.945,14.869,12.656,24.645,12.656h376.224c9.777,0,18.954-4.712,24.645-12.656
		C454.48,451.44,455.987,441.237,452.842,431.982z"/>
                      <path d="M236.013,310.558c53.266,0,96.507-56.559,97.967-127.023H138.068C139.528,253.999,182.769,310.558,236.013,310.558z" />
                      <path d="M116.133,152.296c3.184,1.57,6.709,2.532,10.498,2.532h217.396h1.398c3.781,0,7.315-0.962,10.491-2.532
		c7.889-3.882,13.363-11.927,13.363-21.322c0-13.176-10.677-23.853-23.853-23.853h-1.878h-2.501
		c-0.682-3.456-1.49-6.871-2.352-10.273c-6.507-25.631-18.256-49.476-34.778-67.32v17.324c0,8.781-7.121,15.902-15.902,15.902
		c-8.783,0-15.902-7.121-15.902-15.902V6.079C265.782,3.238,259.004,1.272,251.921,0v64.191c0,8.781-7.119,15.902-15.902,15.902
		c-8.781,0-15.902-7.121-15.902-15.902V0c-7.081,1.272-13.852,3.238-20.18,6.071v40.781c0,8.781-7.121,15.902-15.902,15.902
		c-8.781,0-15.902-7.121-15.902-15.902V29.529c-16.516,17.836-28.257,41.665-34.762,67.282c-0.87,3.416-1.678,6.84-2.361,10.311
		h-2.508h-1.871c-13.177,0-23.853,10.677-23.853,23.853C102.777,140.362,108.251,148.407,116.133,152.296z"/>
                    </svg>
                  </div>
                  <div className="icon" title="OSHA Lift Certification">
                    <svg width="100%" viewBox="50 60 480 460" enableBackground="new 0 0 590 584">
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M198.172760,300.675964 
	C194.159988,298.632507 190.467499,296.769012 186.854935,294.761749 
	C178.268478,289.990784 173.651810,282.812347 174.232254,272.826233 
	C174.773743,263.510254 179.702148,256.962585 188.062469,253.227127 
	C200.388031,247.719940 212.862091,242.545380 225.265457,237.211746 
	C227.062683,236.438889 228.818329,235.569305 231.852707,234.159119 
	C223.969208,230.735031 217.100388,227.736649 210.219086,224.767151 
	C203.569305,221.897552 197.011627,218.774216 190.228012,216.263504 
	C175.862213,210.946564 169.727020,195.371063 177.442886,182.183594 
	C177.663574,181.806412 177.610825,181.269211 177.798172,180.109756 
	C169.529709,180.109756 161.459763,180.115997 153.389816,180.108231 
	C142.439194,180.097687 139.197800,176.841797 139.194901,165.867401 
	C139.193497,160.534149 139.304184,155.198059 139.164963,149.868454 
	C139.036774,144.960632 141.244385,141.232727 145.549316,139.632568 
	C148.213638,138.642242 148.235458,137.339035 148.217667,135.301697 
	C148.178360,130.802094 148.124771,126.300186 148.224670,121.802498 
	C148.323257,117.363556 148.946136,113.233459 143.207947,110.960884 
	C141.145309,110.143997 139.609497,105.843918 139.371796,103.004692 
	C138.817612,96.384613 139.130356,89.685516 139.217346,83.020065 
	C139.302063,76.530350 143.661209,72.265388 150.284546,72.216019 
	C159.950546,72.143959 169.617462,72.194481 179.283997,72.194481 
	C262.116150,72.194466 344.948303,72.193832 427.780457,72.196495 
	C437.046082,72.196793 440.790497,75.909332 440.803375,85.090752 
	C440.811310,90.757332 440.737305,96.424995 440.826050,102.090195 
	C440.904419,107.093735 438.825867,110.575287 434.314606,112.864067 
	C433.174805,113.442352 431.941498,115.148712 431.904053,116.371994 
	C431.679993,123.689308 431.793030,131.016937 431.793030,138.650436 
	C438.990265,140.500671 441.259460,145.495773 440.865387,152.448685 
	C440.564087,157.764862 440.833710,163.112000 440.798798,168.445023 
	C440.750732,175.789429 436.920410,179.906296 429.526611,180.061600 
	C420.567596,180.249771 411.601593,180.106247 402.332275,180.106247 
	C403.556458,184.168579 405.211761,187.796555 405.679443,191.571640 
	C406.957153,201.885986 401.746796,210.796860 391.928284,215.192978 
	C379.297760,220.848129 366.524841,226.185089 353.816681,231.667023 
	C352.341278,232.303482 350.887573,232.990143 348.107666,234.250031 
	C355.780243,237.591232 362.269684,240.425201 368.765717,243.243942 
	C376.322479,246.522980 383.889648,249.777924 391.443787,253.062912 
	C400.104889,256.829285 405.199127,263.340912 405.742920,272.831512 
	C406.324829,282.986420 401.640778,290.281342 392.646698,294.916718 
	C377.080933,302.938995 361.526306,310.982941 345.983276,319.049133 
	C344.146210,320.002502 342.411530,321.153046 339.919220,322.634216 
	C352.191467,329.050232 363.708130,335.085052 375.239471,341.091675 
	C378.762054,342.926544 382.353149,344.630615 385.864197,346.486694 
	C398.321960,353.072418 402.389771,364.898682 396.731598,377.947510 
	C396.418915,378.668640 396.129211,379.399719 395.549438,380.801971 
	C403.425690,380.801971 410.874969,381.089508 418.294434,380.741211 
	C433.065918,380.047852 441.604675,390.515137 440.978912,403.472961 
	C440.240173,418.770447 440.810455,434.130829 440.803009,449.463959 
	C440.796387,463.147705 433.269043,470.725342 419.640503,470.784332 
	C418.168610,470.790680 416.696686,470.785187 415.304413,470.785187 
	C410.866882,500.679108 393.181152,517.879883 367.311127,517.799377 
	C342.515167,517.722229 325.091431,500.235504 320.927338,471.034241 
	C299.878448,471.034241 278.793427,471.034241 257.241608,471.034241 
	C256.755768,486.615112 250.532501,499.325806 238.088165,508.634125 
	C229.322708,515.190674 219.289307,518.355103 208.346741,517.735718 
	C195.955185,517.034363 185.311600,512.145874 176.698624,503.101227 
	C168.217499,494.195007 164.326172,483.347290 163.775803,471.333496 
	C159.799927,470.807129 156.122223,470.729095 152.683380,469.782867 
	C144.666611,467.577057 139.259705,460.397736 139.220306,452.145325 
	C139.136780,434.645966 139.127792,417.145569 139.224457,399.646332 
	C139.277374,390.063965 146.375992,382.082611 156.043228,381.276459 
	C163.488739,380.655579 171.008499,380.920624 178.495453,380.804749 
	C180.293213,380.776917 182.091782,380.800629 183.418228,380.800629 
	C182.431168,375.516449 180.548264,370.544983 180.802124,365.685150 
	C181.267258,356.780762 186.358383,350.389801 194.364471,346.309113 
	C208.046387,339.335510 221.674545,332.256256 235.315796,325.203064 
	C236.614334,324.531677 237.845734,323.730438 240.133224,322.388000 
	C225.789276,314.941772 212.159332,307.866180 198.172760,300.675964 
M287.561859,339.101257 
	C289.682312,339.320129 292.107605,338.942841 293.877319,339.847687 
	C318.848816,352.615875 343.746643,365.528809 368.623535,378.481110 
	C374.234863,381.402679 379.753510,381.890472 384.885284,377.896271 
	C393.093445,371.507538 391.737610,360.187561 382.000031,355.020599 
	C364.804688,345.896271 347.409454,337.148804 330.208557,328.034760 
	C328.091309,326.912903 325.108856,324.348419 325.279999,322.746674 
	C325.503693,320.653839 328.121704,318.199310 330.312561,317.030975 
	C349.689728,306.697723 369.191223,296.597198 388.678680,286.471558 
	C393.282227,284.079590 396.001282,280.662903 396.305389,275.247101 
	C396.681213,268.554504 393.788239,264.239685 387.772369,261.646851 
	C370.522461,254.212219 353.259369,246.804977 336.113922,239.135529 
	C334.185852,238.273056 331.979706,235.918854 331.760254,234.039474 
	C331.593964,232.615433 334.090668,230.256622 335.917206,229.341705 
	C341.205048,226.693008 346.758575,224.576660 352.197113,222.226593 
	C364.437347,216.937378 376.735199,211.774704 388.880341,206.275055 
	C394.879944,203.558273 397.171783,198.601303 396.171173,191.468994 
	C395.397888,185.957138 391.743408,182.174530 386.606812,181.356232 
	C382.812347,180.751740 378.339325,181.602997 374.724030,183.125031 
	C348.007355,194.372757 321.470673,206.048111 294.746857,217.278381 
	C292.051758,218.410950 288.211395,218.304337 285.387512,217.345062 
	C278.864441,215.129211 272.642120,212.029785 266.292847,209.300247 
	C245.402100,200.319427 224.536392,191.279572 203.606262,182.391495 
	C192.078033,177.496002 182.409912,184.561432 183.821716,196.778961 
	C184.550034,203.081665 189.323776,205.800674 194.491974,208.016373 
	C210.678864,214.956024 226.913773,221.787567 243.002548,228.947601 
	C245.218948,229.933975 246.714401,232.540283 248.543640,234.396622 
	C246.748993,236.141190 245.257721,238.568161 243.111618,239.522263 
	C226.104279,247.083496 208.957230,254.329803 191.888107,261.753326 
	C186.988693,263.884125 183.984024,267.441315 183.685028,273.106720 
	C183.361282,279.241669 185.669876,283.572662 191.198990,286.400208 
	C201.928650,291.887268 212.558456,297.569214 223.252014,303.127380 
	C232.471283,307.919220 241.788330,312.529327 250.901016,317.514343 
	C252.688385,318.492065 254.839371,320.829926 254.820480,322.518127 
	C254.801407,324.224213 252.378510,325.983826 250.839859,327.554657 
	C250.186172,328.221954 249.094254,328.452209 248.215424,328.907928 
	C231.372147,337.643036 214.474045,346.274933 197.714996,355.168854 
	C190.128860,359.194733 187.883041,366.533905 191.528488,373.571350 
	C195.044434,380.358795 203.023529,382.788696 210.316589,379.023468 
	C235.848007,365.842072 261.330872,352.566620 287.561859,339.101257 
M245.335312,440.175659 
	C249.337662,446.911316 253.340012,453.646942 257.897583,461.317017 
	C277.497894,461.317017 298.643341,461.377136 319.785797,461.156342 
	C320.960754,461.144104 322.721436,458.997131 323.181122,457.523071 
	C329.135254,438.431213 346.825836,425.007019 367.090424,424.426666 
	C386.167572,423.880371 405.536804,436.501251 411.334473,454.560272 
	C413.262909,460.567108 415.942139,461.806854 421.380951,461.389679 
	C427.745911,460.901489 431.243256,457.888641 431.279816,451.450287 
	C431.377289,434.287872 431.365540,417.124176 431.266998,399.961700 
	C431.235046,394.396454 428.078644,391.047485 422.609650,390.339020 
	C420.968018,390.126343 419.285461,390.192841 417.621674,390.192719 
	C342.970184,390.186676 268.318726,390.187683 193.667236,390.187378 
	C182.335953,390.187347 171.004089,390.114960 159.673630,390.210724 
	C152.927734,390.267761 148.858307,393.476440 148.809448,399.153900 
	C148.655991,416.980896 148.677521,434.810577 148.801910,452.638031 
	C148.836136,457.542877 152.459900,460.989227 157.294754,461.253387 
	C159.763367,461.388275 162.245422,461.277039 164.629852,461.277039 
	C175.462112,421.810242 220.776047,413.354034 245.335312,440.175659 
M412.499359,148.135010 
	C324.712036,148.135010 236.924683,148.135010 148.985077,148.135010 
	C148.985077,155.831100 148.985077,163.044983 148.985077,170.310394 
	C243.214127,170.310394 337.100281,170.310394 431.112610,170.310394 
	C431.112610,162.817825 431.112610,155.715454 431.112610,148.135010 
	C425.083557,148.135010 419.291138,148.135010 412.499359,148.135010 
M307.500214,81.673424 
	C254.742554,81.673424 201.984894,81.673424 148.945221,81.673424 
	C148.945221,89.330170 148.945221,96.551926 148.945221,103.994171 
	C243.068085,103.994171 336.921722,103.994171 430.885345,103.994171 
	C430.885345,96.455078 430.885345,89.120003 430.885345,81.673409 
	C389.783447,81.673409 349.141846,81.673409 307.500214,81.673424 
M220.499878,138.772614 
	C279.392059,138.772614 338.284241,138.772614 397.317810,138.772614 
	C397.317810,130.129654 397.317810,122.079842 397.317810,114.000824 
	C325.522552,114.000824 254.050232,114.000824 182.669312,114.000824 
	C182.669312,122.427887 182.669312,130.475647 182.669312,138.772614 
	C195.214249,138.772614 207.357040,138.772614 220.499878,138.772614 
M217.509796,434.721558 
	C212.425201,434.754578 207.208176,434.056396 202.279312,434.949188 
	C182.567352,438.519684 168.993256,460.650208 174.245819,479.999512 
	C179.322311,498.700134 195.859314,510.138397 215.025055,508.205627 
	C232.568985,506.436401 246.587677,491.415894 247.753815,473.137970 
	C248.907562,455.054626 236.777893,439.228119 217.509796,434.721558 
M400.268250,489.603210 
	C404.934296,481.514648 406.380096,472.922058 404.373596,463.765625 
	C401.128540,448.956726 392.082703,439.264740 377.681519,435.230835 
	C363.349274,431.216187 350.580078,435.139069 340.590454,446.052673 
	C330.451660,457.129272 327.873230,470.318298 333.230316,484.416321 
	C338.503937,498.294586 349.012665,506.487000 363.709839,508.072113 
	C379.229828,509.745911 391.503754,503.559326 400.268250,489.603210 
M273.379120,356.782776 
	C258.850311,364.323578 244.321487,371.864380 229.792664,379.405182 
	C229.998657,379.769684 230.204636,380.134216 230.410614,380.498749 
	C270.177490,380.498749 309.944336,380.498749 349.711182,380.498749 
	C348.646454,378.776672 347.288116,377.781616 345.810730,377.016388 
	C332.347778,370.043762 318.267731,364.040680 305.564026,355.890167 
	C294.186737,348.590637 284.421387,348.339783 273.379120,356.782776 
M232.171036,184.372925 
	C250.760696,192.396240 269.331329,200.464584 287.978455,208.352051 
	C289.376465,208.943390 291.513916,208.697144 292.982391,208.073944 
	C312.844879,199.644638 332.653259,191.087723 352.457001,182.520706 
	C353.332947,182.141785 354.036591,181.364532 355.400299,180.335175 
	C311.467621,180.335175 268.478394,180.335175 225.489166,180.335175 
	C225.358673,180.641220 225.228180,180.947250 225.097687,181.253296 
	C227.205811,182.234863 229.313934,183.216415 232.171036,184.372925 
M422.505615,123.542786 
	C422.505615,120.414810 422.505615,117.286835 422.505615,113.993332 
	C417.086792,113.993332 412.069519,113.993332 406.968567,113.993332 
	C406.968567,122.231979 406.968567,130.139557 406.968567,138.262878 
	C412.185303,138.262878 417.202515,138.262878 422.505585,138.262878 
	C422.505585,133.434204 422.505585,128.977631 422.505615,123.542786 
M172.936676,120.555183 
	C172.936676,118.317383 172.936676,116.079582 172.936676,113.887505 
	C167.451645,113.887505 162.682480,113.887505 157.782349,113.887505 
	C157.782349,122.158981 157.782349,130.199142 157.782349,138.288971 
	C162.964294,138.288971 167.845444,138.288971 172.936676,138.288971 
	C172.936676,132.473022 172.936676,127.009079 172.936676,120.555183 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M336.289185,268.858276 
	C339.779114,270.806183 344.716827,270.659027 345.116394,275.490997 
	C345.535431,280.558502 340.535217,281.030487 337.437683,282.676819 
	C323.023590,290.337830 308.528137,297.854858 293.890594,305.076355 
	C291.781189,306.117035 288.287262,306.186951 286.204132,305.153625 
	C270.257019,297.243225 254.460800,289.023102 238.741180,280.666962 
	C236.999130,279.740936 234.930161,277.300629 235.012634,275.663300 
	C235.097122,273.985992 237.333572,271.744019 239.155197,270.932953 
	C254.795242,263.969055 270.511627,257.169098 286.329926,250.621582 
	C288.464966,249.737854 291.597961,249.779922 293.749298,250.661362 
	C307.903473,256.460449 321.915161,262.607330 336.289185,268.858276 
M264.559326,269.853180 
	C260.157501,271.866882 255.755646,273.880585 250.465210,276.300781 
	C258.639648,280.571259 266.318390,283.542084 272.791656,288.191254 
	C284.579681,296.657471 295.355469,296.667755 307.150879,288.202606 
	C313.671112,283.523254 321.394806,280.520752 329.044342,276.517303 
	C327.814575,275.617279 327.343292,275.122040 326.765808,274.871918 
	C315.279877,269.896942 303.819977,264.856842 292.240265,260.109406 
	C290.692719,259.474915 288.354614,259.924561 286.675934,260.600616 
	C279.496155,263.492096 272.426361,266.656586 264.559326,269.853180 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M211.754852,448.367493 
	C222.188477,449.622192 229.220627,454.951050 232.230072,464.504364 
	C234.708282,472.371368 233.112381,479.943756 227.503952,486.271118 
	C220.990967,493.618896 210.423264,495.902374 201.710953,492.037445 
	C192.513672,487.957367 186.810150,478.643311 187.850464,469.402771 
	C189.036896,458.864227 195.845673,451.119843 205.907562,448.980713 
	C207.681946,448.603485 209.524490,448.546997 211.754852,448.367493 
M208.802979,484.297424 
	C216.759766,485.613129 223.305344,479.609314 223.913773,472.190887 
	C224.470749,465.399963 219.430222,458.794495 212.942032,457.788605 
	C205.792709,456.680206 199.190674,461.076935 197.677292,467.954346 
	C195.909592,475.987549 199.589966,481.816223 208.802979,484.297424 
z"/>
                      <path fill="#FFF" opacity="1.000000" stroke="none"
                        d="
M387.874146,460.217072 
	C392.914825,470.597137 391.302460,480.246155 383.479126,487.692566 
	C376.406586,494.424316 366.015625,495.807922 357.361420,491.170319 
	C348.636505,486.494781 343.786804,476.822479 345.490631,467.495270 
	C347.377228,457.167297 355.020660,449.607788 365.636200,448.559906 
	C375.184723,447.617432 382.652740,451.635742 387.874146,460.217072 
M360.551697,482.257141 
	C365.565063,485.359039 370.637634,485.362335 375.531189,482.161621 
	C380.572235,478.864380 382.112091,473.803772 381.044037,468.205750 
	C380.080597,463.155914 376.680115,459.769806 371.728546,458.181030 
	C366.121185,456.381897 359.295898,459.192596 356.299408,464.431335 
	C353.020477,470.163849 354.285492,476.331268 360.551697,482.257141 
z"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={`sklanguages`}>
                <h2>Languages</h2>
                <div className="icons-column">
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
                      width="100%"
                      height="100%"
                      viewBox="4 4 17 17"
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
                </div>
              </div>

            </div>
          </section>
        </div>
        <div className="project-container">
          <div className="wave2-background"></div>
          <section id="project" ref={projectRef}>
            <h1 className="section-title">Projects</h1>
            <div className="projects-grid">
              {projectData.map((project, index) => (
                <ProjectCard
                  key={index}
                  thumbnail={project.thumbnail}
                  title={project.title}
                  summary={project.summary}
                  date={project.date}
                  status={project.status}
                  onLearnMore={(cardRef) => handleLearnMore(project, cardRef)}
                  objectPosition={project.objectPosition}
                  objectScale={project.objectScale}
                />
              ))}
            </div>
          </section>
          <ProjectModal project={selectedProject} onClose={handleCloseModal} cardRef={selectedCardRef} />
        </div>

        <div className="contact-container">
          <div className="wave3-background"></div>
          <section id="contact" ref={contactRef}>
            <a href="#" className="scroll-arrow">
              <img
                src="Icons/return_arrow.png"
                alt="Return Arrow"
                className="return-arrow"
              />
            </a>
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
          <Route path="/" element={<Home />} />
          <Route path="/skill" element={<Skill />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
