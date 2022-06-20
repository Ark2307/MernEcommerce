import React from "react";
import "./Header.css";
function Header() {
  return (
    <>
      <input type="checkbox" id="active" />
      <label for="active" class="menu-btn">
        <span></span>
      </label>
      <label for="active" class="close"></label>
      <div class="wrapper">
        <ul>
          <li>
            <a href="/">Home</a>
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
