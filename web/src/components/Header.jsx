import React from "react";
import UserLogo from "../assets/image/UserLogo.png";
import { Menu } from "lucide-react";
import { useState } from "react";
import "../assets/css/admin/Header.css";

function Header() {
  //   const [isVisible, setIsVisible] = useState(true);
  //   const handleToggle = () => {
  //     setIsVisible(!isVisible);
  //   };
  return (
    <div style={{ width: "1049px" }}>
      <div className="conten-header">
        <div>
          {/* <Menu onClick={handleToggle} /> */}
          <Menu className="btn-bar" size={25} color="white" />
          {/* <div>
            {isVisible && <NavBar />}
            <button onClick={handleToggle}>Toggle Header</button>
          </div> */}
        </div>
        <div className="header-right">
          <img src={UserLogo} alt="Userlogo" />
          <h4>Administration </h4>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Header;
