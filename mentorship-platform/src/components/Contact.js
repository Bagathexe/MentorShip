// src/components/Contact.js
import React from 'react';
import '../Form.css';

const Contact = () => (
  <section className="contact-form">
    <h2>Contact Us</h2>
    <form>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required />
      
      <label htmlFor="message">Message:</label>
      <textarea id="message" name="message" rows="5" required></textarea>
      
      <button type="submit">Send Message</button>
    </form>
  </section>
);

export default Contact;
