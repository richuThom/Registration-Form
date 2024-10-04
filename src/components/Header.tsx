import React from "react";
import { FaBars } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

interface HeaderProps {
  isMenu: boolean; // Prop to determine if the current page is "Menu"
  toggleContent: () => void; // Function to toggle between pages
}

const Header: React.FC<HeaderProps> = ({ isMenu, toggleContent }) => {
  return (<div className="container">
    <header style={headerStyle}>
      {/* Render the back arrow or burger icon based on the current content */}
      {isMenu ? (
        <div style={backStyle} 
        data-testid="back-icon" // Added data-testid for testing
        onClick={toggleContent}>
          <FaArrowLeft />
          <span style={{ marginLeft: "8px" }}>Back</span>
        </div>
      ) : (
        <div style={burgerStyle} 
        data-testid="burger-icon" // Added data-testid for testing
        onClick={toggleContent}>
          <FaBars />
        </div>
      )}

      <h1 style={titleStyle}>{isMenu ? "Menu" : "User Card Form"}</h1>
    </header>
    </div>
  );
};

// Inline styles for the header
const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "white",
  borderRadius: "8px",
};

const burgerStyle: React.CSSProperties = {
  cursor: "pointer",
  marginRight: "20px",
};

const titleStyle: React.CSSProperties = {
  flex: 1,
  textAlign: "center",
  fontSize: "24px",
};

const backStyle: React.CSSProperties = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  fontSize: "20px",
  color: "white",
};

export default Header;