import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import About from '../Pages/About';
import ContactPage from '../Pages/ContactPage';

const Allroutes = () => {




  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<ContactPage />}/>

    </Routes>

  );
};

export default Allroutes;