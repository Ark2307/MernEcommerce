import React from "react";
import "./Header.css";
import logo from "../../../images/logo.png";
function Header() {
  return (
    <>
      <a href="/#">
        <img className="logo" src={logo} alt="" />
      </a>
      <input type="checkbox" id="active" />
      <label htmlFor="active" className="menu-btn">
        <span></span>
      </label>
      <label htmlFor="active" className="close"></label>
      <div className="wrapper">
        <ul>
          <li>
            <a href="/search">Search</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
