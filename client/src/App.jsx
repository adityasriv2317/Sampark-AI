import React from "react";
import HomeLayout from "./layouts/HomeLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <HomeLayout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </HomeLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
