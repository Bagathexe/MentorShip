// src/components/Header.js
import React from 'react';
import '../css/style1.css'; // Adjust path if your CSS is in a different file

function Header() {
  return (
    <header>
        <img src="../assets/Logo.png" alt="Mentorship Logo" class="logo">
        <h1>Find a Mentor</h1>
        <nav>
            <ul>
                <li><a href="../public/index.html">Home</a></li>
                <li><a href="../find-mentor.html">Find a Mentor</a></li>
                <li><a href="../become-mentor.html">Become a Mentor</a></li>
                <li><a href="../contact.html">Contact Us</a></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;
