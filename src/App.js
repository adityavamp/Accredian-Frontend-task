import {BrowserRouter,Routes,Route} from "react-router-dom";
import React from 'react';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Home from "./Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

