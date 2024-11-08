// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Header.css';

const Header = () => (
  <header>
    <h1>Find a Mentor</h1>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/find-mentor">Find a Mentor</Link></li>
        <li><Link to="/become-mentor">Become a Mentor</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
