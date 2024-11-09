// src/components/Header.js
import React from 'react';
import '../css/style1.css'; // Adjust path if your CSS is in a different file

function Main() {
  return (
    <section class="hero">
    <h2>Find the right mentor to guide your career</h2>
    <button onclick="window.location.href='find-mentor.html'">Find a Mentor</button>
</section>
  );
}

export default Main;
