import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./layout/Content";
import Home from "./pages/Home";
import Forecast from "./pages/Forecast";
import About from "./pages/About";

const App:React.FC=()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Content />}>
          <Route index element={<Home />} />
          <Route path="forecast" element={<Forecast />}/>
          <Route path="about" element={<About/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
