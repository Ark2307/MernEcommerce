import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import BackDrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LisToAltIcon from "@mui/icons-material/ListAlt";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import { logout } from "../../../actions/userActions";

import "./UserProfile.scss";

function UserProfile({ user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const options = [
    { icon: <LisToAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: profile },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];
  const alert = useAlert();

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function profile() {
    navigate("/profile");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("You have been logged out successfully");
  }

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  //   console.log(user);
  return (
    <Fragment>
      <BackDrop open={open} />
      <SpeedDial
        className="avatarComponent"
        ariaLabel="userAvatar"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="avatarIcon"
            src={user.profilePic.url ? user.profilePic.url : "/Profile.png"}
            alt=""
          />
        }
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

export default UserProfile;
