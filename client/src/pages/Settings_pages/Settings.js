import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Settings.css";

import NavigationBar from "../../components/Navbar/Navbar";
import SettingsSidebar from "../../components/Navbar/SettingsSidebar"
import Footer from "../../components/footer/Footer";

function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavigationBar handleClick={toggleMenu} />
      <SettingsSidebar isOpen={isOpen} />
    </>
  );
}

export default Settings;
