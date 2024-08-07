import React, { useEffect, useState } from 'react';
import CountAPI from 'countapi-js';

const NAMESPACE = import.meta.env.VITE_NAMESPACE;

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // console.log("useEffect triggered");

    const getCount = async () => {
      // console.log("getCount function called");
      try {
        const result = await CountAPI.get(NAMESPACE, 'visits');
        // console.log("getCount API call result:", result);
        setCount(result.value);
        // console.log(`Current visitor count: ${result.value}`);
      } catch (err) {
        // console.error("Error in getCount:", err);
      }
    };

    const incrementCount = async () => {
      // console.log("incrementCount function called");
      try {
        const result = await CountAPI.hit(NAMESPACE, 'visits');
        // console.log("incrementCount API call result:", result);
        setCount(result.value);
        // console.log(`Visitor count after increment: ${result.value}`);
      } catch (err) {
        // console.error("Error in incrementCount:", err);
      }
    };

    if (localStorage.getItem("hasVisited") === null) {
      // console.log("First visit detected");
      incrementCount()
        .then(() => {
          // console.log("Setting hasVisited in localStorage");
          localStorage.setItem("hasVisited", "true");
        })
        .catch((err) => console.error("Error in incrementCount then block:", err));
    } else {
      // console.log("Returning visitor detected");
      getCount().catch((err) => console.error("Error in getCount catch block:", err));
    }
  }, []);

  return (
    <div id="visit-count">
      Total Unique Visitor: {count}
    </div>
  );
};

export default VisitorCounter;
