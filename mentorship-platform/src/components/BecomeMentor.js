// src/components/BecomeMentor.js
import React from 'react';
import '../Form.css';

const BecomeMentor = () => (
  <section className="mentor-form">
    <h2>Become a Mentor</h2>
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      
      <label htmlFor="expertise">Area of Expertise:</label>
      <input type="text" id="expertise" name="expertise" required />
      
      <label htmlFor="bio">Short Bio:</label>
      <textarea id="bio" name="bio" rows="5" required></textarea>
      
      <button type="submit">Submit</button>
    </form>
  </section>
);

export default BecomeMentor;
