import React, { useState, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';

const Wireframe = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setRotation({ x: scrollY * 0.01, y: scrollY * 0.005, z: scrollY * 0.02 });
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const springConfig = { mass: 1, tension: 150, friction: 40 };

  const animatedStyle = useSpring(rotation, springConfig);

  return (
    <animated.div style={{ ...animatedStyle, transform: `rotateX(${animatedStyle.x}rad) rotateY(${animatedStyle.y}rad) rotateZ(${animatedStyle.z}rad)` }}>
      {/* Define your wireframe content here (SVG, CSS) */}
      <svg width="200" height="200">
        <line x1="0" y1="100" x2="200" y2="100" stroke="black" stroke-width="2" />
        <line x1="100" y1="0" y2="200" x2="100" stroke="black" stroke-width="2" />
        <line x1="0" y1="0" x2="200" y2="200" stroke="black" stroke-width="2" />
        <line x1="0" y1="200" x2="200" y2="0" stroke="black" stroke-width="2" />
      </svg>
    </animated.div>
  );
};

export default Wireframe;
