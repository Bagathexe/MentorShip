// src/components/FindMentor.js
import React from 'react';
import '../MentorList.css';

const FindMentor = () => (
  <section className="mentor-list">
    <div className="mentor-card">
      <h3>Jenny</h3>
      <img src="../assets/mentor1.jpeg" alt="Mentor Jenny" className="mentor-photo" />
      <p>Expert in Data Science and AI with 10+ years of experience.</p>
      <button>Request Mentorship</button>
    </div>

    <div className="mentor-card">
      <h3>Mosh</h3>
      <img src="../assets/mentor2.jpeg" alt="Mentor Mosh" className="mentor-photo" />
      <p>Software Engineer with expertise in Web Development.</p>
      <button>Request Mentorship</button>
    </div>

    <div className="mentor-card">
      <h3>Shradha</h3>
      <img src="../assets/mentor3.jpeg" alt="Mentor Shradha" className="mentor-photo" />
      <p>Software Engineer with expertise in Web Development.</p>
      <button>Request Mentorship</button>
    </div>
  </section>
);

export default FindMentor;
