import React from "react";
import { useSelector } from "react-redux";

import "./Header.css";
import UserProfile from "./UserProfile";
function Header() {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      {isAuthenticated && <UserProfile user={user} />}
      <input type="checkbox" id="active" />
      <label htmlFor="active" className="menu-btn">
        <span></span>
      </label>
      <label htmlFor="active" className="close"></label>
      <div className="wrapper">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
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
