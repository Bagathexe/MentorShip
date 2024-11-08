// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import FindMentor from '../components/FindMentor';
import BecomeMentor from '../components/BecomeMentor';
import Contact from '../components/Contact';
import Header from '../components/Header';
import Footer from '../components/Footer';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="../" element={<Home />} />
        <Route path="../find-mentor" element={<FindMentor />} />
        <Route path="../become-mentor" element={<BecomeMentor />} />
        <Route path="../contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
