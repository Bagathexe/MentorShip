import { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './pages/home';
import FindMentor from './pages/findmentor';
import BecomeMentor from './pages/becomeMentor';
import Contactus from './pages/contactUs';

function App() {
  const [header, setHeader] = useState("MentorShip");

  return (
    <div className="body">
      <header>

        <img src="/assets/Logo.png" alt="Mentorship Logo" className="logo" />
        <h1>{header}</h1>
        <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/findmentor">Find a Mentor</Link></li>
              <li><Link to="/becomementor">Become a Mentor</Link></li>
              <li><Link to="/contact-us">Contact Us</Link></li>
            </ul>
          </nav>
      </header>

      <Routes>
        <Route path="/home" element={<Header />} />
        <Route path="/findmentor" element={<FindMentor />} />
        <Route path="/becomementor" element={<BecomeMentor />} />
        <Route path="/contact-us" element={<Contactus />} />
      </Routes>
      
    <footer>
        <p>© 2024 Mentorship Platform. All rights reserved.</p>
    </footer>
    </div>
  );
}

export default App;
