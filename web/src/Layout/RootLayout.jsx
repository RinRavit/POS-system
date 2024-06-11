import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import "../assets/css/admin/RootLayout.css";

function RootLayout() {
  return (
    <>
      <div className="container">
        <div>
          <NavBar />
        </div>
        <div>
          <div>
            <Header />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default RootLayout;
