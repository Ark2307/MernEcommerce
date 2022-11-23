import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import BackDrop from "@mui/material/Backdrop";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Bars from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

import { useAuth0 } from "@auth0/auth0-react";

import "./Header.scss";
import UserProfile from "./UserProfile";

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const options = [
    { icon: <HomeIcon />, name: "Home", func: home },
    { icon: <SearchIcon />, name: "Search", func: search },
    { icon: <ShoppingBagIcon />, name: "Products", func: products },
    { icon: <ShoppingCartIcon />, name: "Cart", func: addCart },
  ];

  function home() {
    navigate("/");
  }

  function search() {
    navigate("/search");
  }

  function products() {
    navigate("/products");
  }

  function isLogin() {
    navigate("/login");
  }

  function addCart() {
    navigate("/cart");
  }

  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    options.push({ icon: <LoginIcon />, name: "Login", func: isLogin });
  }

  return (
    <Fragment>
      {isAuthenticated && <UserProfile user={user} />}
      <BackDrop open={open} />
      <SpeedDial
        className="headerComponent"
        ariaLabel="headerAvatar"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={<Bars className="headerIcon" htmlColor="black" />}
      >
        {options.map((index) => (
          <SpeedDialAction
            key={index.name}
            icon={index.icon}
            tooltipTitle={index.name}
            onClick={index.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
}

export default Header;
