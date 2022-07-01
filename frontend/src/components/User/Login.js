import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpenOutlined";
import FaceIcon from "@mui/icons-material/FaceOutlined";
import AvatarIcon from "@mui/icons-material/AccountCircleOutlined";

import "./Login.scss";

function Login() {
  const loginTab = useRef(null);
  const signupTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatarPreview, setAvatarPreview] = useState();
  const [avatar, setAvatar] = useState();

  //Function to switch from Login to Signup Container
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      signupTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "signup") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      signupTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  // Login Function
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  //Signup Function
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const signupForm = new FormData();

    signupForm.set("name", name);
    signupForm.set("email", email);
    signupForm.set("password", password);
    signupForm.set("avatar", avatar);

    console.log("Signup submitted");
  };

  // Signup change function
  const handleSignupChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginBox">
          <div className="loginExtra">
            <div className="toggleLogin">
              <p onClick={(e) => switchTabs(e, "login")}>Login</p>
              <p onClick={(e) => switchTabs(e, "signup")}>Signup</p>
            </div>
            <button ref={switcherTab} />
          </div>

          <form
            className="loginForm"
            onSubmit={handleLoginSubmit}
            ref={loginTab}
          >
            <div className="loginDetails">
              <MailOutlineIcon />

              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>

            <div className="loginDetails">
              <LockOpenIcon />

              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forget">Forget Password</Link>
            <button type="submit">Login</button>
          </form>

          <form
            className="loginForm signup"
            onSubmit={handleSignupSubmit}
            ref={signupTab}
          >
            <div className="loginDetails">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={handleSignupChange}
              />
            </div>

            <div className="loginDetails">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={handleSignupChange}
              />
            </div>

            <div className="loginDetails">
              <LockOpenIcon />

              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={handleSignupChange}
              />
            </div>

            <div className="loginDetails" id="signupImage">
              <AvatarIcon />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleSignupChange}
              />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
