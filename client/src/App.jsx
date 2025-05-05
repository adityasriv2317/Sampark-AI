import React from "react";
import HomeLayout from "./layouts/HomeLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MailingLayout from "./layouts/MailingLayout";
import LearnPage from "./pages/LearnPage";
import MyMails from "./pages/MyMails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/learn-more" element={<LearnPage />} />
          <Route path="/new-mailing" element={<MailingLayout />} />
          <Route path="/my-mails" element={<MyMails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
