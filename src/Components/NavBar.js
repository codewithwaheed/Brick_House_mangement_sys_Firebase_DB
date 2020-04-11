import React, { Component } from "react";
import logo from "../image/logo1.png";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <a className="navbar-brand" href="#">
          <img className="logo" src={logo}></img>Brick Klin
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ml-5">
            <li className="nav-item ml-5">
              <Link className="nav-link" to="/">
                <i class="home icon"></i>Dashboard{" "}
                <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item ml-5">
              <Link className="nav-link" to="/purchase">
                <i class="barcode icon"></i>Purchase
              </Link>
            </li>
            <li className="nav-item ml-5">
              <Link className="nav-link" to="/sale">
                <i class="clipboard check icon"></i>Sales
              </Link>
            </li>
            <li className="nav-item ml-5 dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="user icon"></i> Employee
              </a>
              <div
                className="dropdown-menu bg-light"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <Link className="dropdown-item" to="/newEmployee">
                  Employee Registration
                </Link>
                <Link className="dropdown-item" to="/employee">
                  Employee Record
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown ml-5">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenu"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="folder icon" />
                Account
              </a>
              <div
                className="dropdown-menu bg-light"
                aria-labelledby="navbarDropdownMenu"
              >
                <Link className="dropdown-item" to="accountPayable">
                  Account Payable
                </Link>
                <Link className="dropdown-item" to="/accountReciveable">
                  Account Reciveable
                </Link>
                <Link className="dropdown-item" to="/employeeAccount">
                  Employee Account
                </Link>
              </div>
            </li>
          </ul>
          <input className="ml-5" type="text" name="search"></input>
          <button class="button">
            <i class="search icon"></i>
          </button>
        </div>
      </nav>
    );
  }
}
export default NavBar;
