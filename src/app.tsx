import React, { FC, useState } from "react";
import * as styles from "./app.module.scss";
import RegisterCardForm from "./components/RegisterCardForm";
import Menu from "./components/Menu";
import Header from "./components/Header";

export const App: React.FC = () => {
  const [isMenu, setIsMenu] = useState<boolean>(false);

  // Function to toggle between "User Card Form" and "Menu"
  const toggleContent = () => {
    setIsMenu(!isMenu);
  };
  return (
    
      <div className={styles.container}>
        {/* Pass the toggleContent function to the Header */}
        <Header isMenu={isMenu} toggleContent={toggleContent} />

        {/* Conditionally render the body content based on the state */}
        <div style={bodyStyle}>
          
        {isMenu ? <Menu /> : <RegisterCardForm onSubmit={(data: { cardNumber: string; cvv: string; expiry: string }) => {
            console.log("Form Data Submitted:", data);
          }}/>}
        </div>
      </div>
    
  );
};

// Style for the body content
const bodyStyle: React.CSSProperties = {
  padding: "20px",
  marginTop: "20px",
};

export default App;
