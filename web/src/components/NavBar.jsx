import { Link } from "react-router-dom";
import "../assets/css/admin/NavBar.css";
import Box from "../assets/image/Box.png";
import Supplier from "../assets/image/Supplies.png";
import Addcart from "../assets/image/Addcart.png";
import Dashboard from "../assets/image/Dashboard.png";
import Dollar from "../assets/image/Dollar.png";
import Dollarsymbol from "../assets/image/Dollarsymbol.png";
import Download from "../assets/image/Download.png";
import Idcard from "../assets/image/Idcard.png";
import Mechanicalgears from "../assets/image/Mechanicalgears.png";
import Multipleusers from "../assets/image/Multipleusers.png";
import Pdf from "../assets/image/Pdf.png";
import Shoppingcart from "../assets/image/Shoppingcart.png";
import Truck from "../assets/image/Truck.png";
import UserLogo from "../assets/image/UserLogo.png";
function NavBar() {
  return (
    <nav>
      <div className="nav-left">
        <div className="nav-top">
          <h2>PointOfSale</h2>
        </div>
        <div className="nav-contain">
          <div className="nav-userlogo">
            <div>
              <img src={UserLogo} className="img-userlogo" alt="UserLogo" />
            </div>
            <div>
              <div>
                <h2 style={{ color: "white" }}>Administration</h2>
              </div>
              <div>
                <h3 style={{ color: "white" }}>Online</h3>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "13px",
              marginBottom: "13px",
              marginLeft: "11px",
            }}
          >
            <div>
              <img src={Dashboard} alt="Dashboard" />
            </div>
            <div>
              <Link to="/" className="custom-link">
                <h5>Dashboard</h5>
              </Link>
            </div>
          </div>
          <div className="di-section">
            <h3 className="txt-section">MASTER</h3>
          </div>
          <div
            style={{
              marginTop: "13px",
              marginLeft: "11px",
            }}
          >
            <div>
              <img src={Box} alt="Box" />
            </div>
            <div>
              <Link to="Category" className="custom-link">
                <h5>Category</h5>
              </Link>
            </div>
          </div>
          <div className="nav-conten">
            <div>
              <img src={Supplier} alt="Supplier" />
            </div>
            <div>
              <Link to="Product" className="custom-link">
                <h5>Product</h5>
              </Link>
            </div>
          </div>
          <div className="nav-conten">
            <div>
              <img src={Idcard} alt="Idcard" />
            </div>
            <div>
              <Link to="Member" className="custom-link">
                <h5>Member</h5>
              </Link>
            </div>
          </div>
          <div
            style={{
              marginTop: "25px",
              marginBottom: "13px",
              marginLeft: "11px",
            }}
          >
            <div>
              <img src={Truck} alt="Truck" />
            </div>
            <div>
              <Link to="Supplier" className="custom-link">
                <h5>Supplier</h5>
              </Link>
            </div>
          </div>
          <div className="di-section">
            <h3 className="txt-section">TRANSACTION</h3>
          </div>
          <div
            style={{
              marginTop: "13px",
              marginLeft: "11px",
            }}
          >
            <div>
              <img src={Dollar} alt="Dollar" />
            </div>
            <div>
              <Link to="Expenses" className="custom-link">
                <h5>Expenses</h5>
              </Link>
            </div>
          </div>
          <div className="nav-conten">
            <div>
              <img src={Download} alt="Download" />
            </div>
            <div>
              <Link to="Purchase" className="custom-link">
                <h5>Purchase</h5>
              </Link>
            </div>
          </div>
          <div className="nav-conten">
            <div>
              <img src={Dollarsymbol} alt="Dollarsymbol" />
            </div>
            <div>
              <Link to="SalesList" className="custom-link">
                <h5>Sales List</h5>
              </Link>
            </div>
          </div>
          <div className="nav-conten">
            <div>
              <img src={Addcart} alt="Addcart" />
            </div>
            <div>
              <Link to="NewTransaction" className="custom-link">
                <h5>New Transaction</h5>
              </Link>
            </div>
          </div>
          <div
            style={{
              marginTop: "25px",
              marginBottom: "13px",
              marginLeft: "11px",
            }}
          >
            <div>
              <img src={Shoppingcart} alt="Shoppingcart" />
            </div>
            <div>
              <Link to="ActiveTransaction" className="custom-link">
                <h5>Active Transaction</h5>
              </Link>
            </div>
          </div>
          <div className="di-section">
            <h3 className="txt-section">REPORT</h3>
          </div>
          <div
            style={{
              marginTop: "13px",
              marginBottom: "13px",
              marginLeft: "11px",
            }}
          >
            <div>
              <img src={Pdf} alt="Pdf" />
            </div>
            <div>
              <Link to="Income" className="custom-link">
                <h5>Income</h5>
              </Link>
            </div>
          </div>
          <div className="di-section">
            <h3 className="txt-section">SYSTEM</h3>
          </div>
          <div
            style={{
              marginTop: "13px",
              marginLeft: "11px",
            }}
          >
            <div>
              <img src={Multipleusers} alt="Multipleusers" />
            </div>
            <div>
              <Link to="User" className="custom-link">
                <h5>User</h5>
              </Link>
            </div>
          </div>
          <div className="nav-conten">
            <div>
              <img src={Mechanicalgears} alt="Mechanicalgears" />
            </div>
            <div>
              <Link to="Setting" className="custom-link">
                <h5>Setting</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
