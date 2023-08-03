import React from "react";
import "../styles/navbar.css";

const Navbar = () => {
  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo</div>
      <div className="navbar-logout">
        <button className="button logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
