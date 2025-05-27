import React from 'react'
import './Header.css'
import { useState, useContext } from "react";
const Header = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Discover and order your favorite dishes with ease</h2>
        <p>
          Craving something delicious? Dive into our menu full of tasty dishes made with love and quality ingredients. Every bite is made to make your day better.
        </p>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={`button-link ${menu === "menu" ? "active" : ""}`}
        >
          View Menu
        </a>
      </div>
    </div>
  ) 
}

export default Header
