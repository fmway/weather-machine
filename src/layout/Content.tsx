import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import '../css/Content.css'

const Content:React.FC=()=>{
  return(
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Content;
