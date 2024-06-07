import React from "react";

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="copyright" style={{color: "#132852"}}>
      &copy; {currentYear} Cole Rabe. All rights reserved.
    </footer>
  );
};

export default Copyright;
