import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import About from '../Pages/About';

const Allroutes = () => {




  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />}/>

    </Routes>

  );
};

export default Allroutes;