// import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import About from "../Pages/About";
import ContactPage from "../Pages/ContactPage";
import Page from "../admin/pages/index";
import Login from "../components/login";
// import { Layout } from "../admin/layouts/dashboard/layout";
import { Home } from "../admin/layouts/dashboard/Home";
import { Quizzes } from "../admin/layouts/dashboard/Quizzes";
import { SettingProfile } from "../admin/layouts/dashboard/SettingProfile";
import { ThemePage } from "../admin/layouts/dashboard/Theme";
import { AttemptQuiz } from "../admin/layouts/dashboard/AttemptQuiz";
import { Edit } from "@mui/icons-material";
import UsersPage from "../admin/pages/index";

const Allroutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />

      <Route path="/users" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />

      <Route path="/dashboard" element={<Quizzes />} />
      <Route path="/settings" element={<SettingProfile />} />
      <Route path="/theme" element={<ThemePage />} />

      <Route path="/login" element={<Login />} />
      <Route path="/attemptquiz" element={<AttemptQuiz />} />
      <Route path="/attemptquiz/:id" element={<AttemptQuiz />} />
    </Routes>
  );
};

export default Allroutes;
