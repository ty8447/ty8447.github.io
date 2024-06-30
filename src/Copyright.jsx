import React from "react";

const Copyright = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="copyright" style={{color: "#132852", backgroundColor: "#e3d8ad", marginBottom: "10px", pointerEvents: "none"}}>
      &copy; {currentYear} Cole Rabe. All rights reserved.
    </footer>
  );
};

export default Copyright;
