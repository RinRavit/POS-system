import React from "react";
import Box from "../../../assets/image/Box.png";
import Supplies from "../../../assets/image/Supplies.png";
import Idcard from "../../../assets/image/Idcard.png";
import Truck from "../../../assets/image/Truck.png";
import Dollar from "../../../assets/image/Dollar.png";
import Download from "../../../assets/image/Download.png";
import Dollarsymbol from "../../../assets/image/Dollarsymbol.png";
import "../../../assets/css/admin/Dashboard/Dashboard.css";
import { CircleArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div>
        <h1 style={{ marginLeft: "23px", marginTop: "24px", fontSize: "24px" }}>
          Dashbord
        </h1>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "15px" }}>
        <div className="dash-conten" style={{ backgroundColor: "#6F62FF" }}>
          <div className="dash-box1">
            <div>
              <h1 style={{ color: "white", opacity: "0.7" }}>Count</h1>
            </div>
            <div>
              <img
                src={Box}
                alt="Box"
                style={{ width: "70px", height: "70px", opacity: "0.5" }}
              />
            </div>
          </div>
          <Link to="Category" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "220px",
                height: "29px",
                backgroundColor: "#8C82FF",
                opacity: "0.5",
              }}
            >
              <h3 style={{ color: "white" }}>View</h3>
              <CircleArrowRight size={18} color="white" />
            </div>
          </Link>
        </div>
        <div className="dash-conten" style={{ backgroundColor: "#FF9179" }}>
          <div className="dash-box1">
            <div>
              <h1 style={{ color: "white", opacity: "0.7" }}>Count</h1>
            </div>
            <div>
              <img
                src={Supplies}
                alt="Supplies"
                style={{ width: "70px", height: "70px", opacity: "0.5" }}
              />
            </div>
          </div>
          <Link to="Product" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "220px",
                height: "29px",
                backgroundColor: "#AB6353",
                opacity: "0.25",
              }}
            >
              <h3 style={{ color: "white" }}>View</h3>
              <CircleArrowRight size={18} color="white" />
            </div>
          </Link>
        </div>
        <div className="dash-conten" style={{ backgroundColor: "#FF8024" }}>
          <div className="dash-box1">
            <div>
              <h1 style={{ color: "white", opacity: "0.7" }}>Count</h1>
            </div>
            <div>
              <img
                src={Idcard}
                alt="Idcard"
                style={{ width: "70px", height: "70px", opacity: "0.5" }}
              />
            </div>
          </div>
          <Link to="Member" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "220px",
                height: "29px",
                backgroundColor: "#FDA15F",
                opacity: "0.5",
              }}
            >
              <h3 style={{ color: "white" }}>View</h3>
              <CircleArrowRight size={18} color="white" />
            </div>
          </Link>
        </div>
        <div className="dash-conten" style={{ backgroundColor: "#F262FF" }}>
          <div className="dash-box1">
            <div>
              {" "}
              <h1 style={{ color: "white", opacity: "0.7" }}>Count</h1>
            </div>
            <div>
              <img
                src={Truck}
                alt="Truck"
                style={{ width: "70px", height: "70px", opacity: "0.5" }}
              />
            </div>
          </div>
          <Link to="Supplier" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "220px",
                height: "29px",
                backgroundColor: "#F3A6FD",
                opacity: "0.5",
              }}
            >
              <h3 style={{ color: "white" }}>View</h3>
              <CircleArrowRight size={18} color="white" />
            </div>
          </Link>
        </div>
      </div>

      {/* box-row2 */}
      <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        <div className="dash-conten1" style={{ backgroundColor: "#1CC700" }}>
          <div className="dash-box2">
            <div>
              {" "}
              <h1 style={{ color: "white", opacity: "0.7" }}>Count</h1>
            </div>
            <div>
              <img
                src={Dollar}
                alt="Dollar"
                style={{ width: "70px", height: "70px", opacity: "0.5" }}
              />
            </div>
          </div>
          <Link to="Expenses" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "305px",
                height: "29px",
                backgroundColor: "#20A50A",
                opacity: "0.5",
              }}
            >
              <h3 style={{ color: "white" }}>View</h3>
              <CircleArrowRight size={18} color="white" />
            </div>
          </Link>
        </div>

        <div className="dash-conten1" style={{ backgroundColor: "#05E4AF" }}>
          <div className="dash-box2">
            <div>
              {" "}
              <h1 style={{ color: "white", opacity: "0.7" }}>Count</h1>
            </div>
            <div>
              <img
                src={Download}
                alt="Download"
                style={{ width: "70px", height: "70px", opacity: "0.5" }}
              />
            </div>
          </div>
          <Link to="Purchase" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "305px",
                height: "29px",
                backgroundColor: "#05D0A0",
                opacity: "0.5",
              }}
            >
              <h3 style={{ color: "white" }}>View</h3>
              <CircleArrowRight size={18} color="white" />
            </div>
          </Link>
        </div>
        <div className="dash-conten1" style={{ backgroundColor: "#FFE63C" }}>
          <div className="dash-box2">
            <div>
              {" "}
              <h1 style={{ color: "white", opacity: "0.7" }}>Count</h1>
            </div>
            <div>
              <img
                src={Dollarsymbol}
                alt="Dollarsymbol"
                style={{ width: "70px", height: "70px", opacity: "0.5" }}
              />
            </div>
          </div>
          <Link to="SalesList" style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
                width: "305px",
                height: "29px",
                backgroundColor: "#EFD000",
                opacity: "0.5",
              }}
            >
              <h3 style={{ color: "white" }}>View</h3>
              <CircleArrowRight size={18} color="white" />
            </div>
          </Link>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "white",
          width: "100%",
          height: "300px",
          marginTop: "50px",
        }}
      ></div>
    </div>
  );
}

export default Dashboard;
