import React from "react";
import HomeLayout from "./layouts/HomeLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MailingLayout from "./layouts/MailingLayout";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* <HomeLayout>
          <Routes>
            
          </Routes>
        </HomeLayout> */}
        <Routes>
          <Route path="/" element={<HomeLayout />} />
          <Route path="/new-mailing" element={<MailingLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
