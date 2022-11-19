// import React, { useEffect, useRef, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
// import LockOpenIcon from "@mui/icons-material/LockOpenOutlined";
// import FaceIcon from "@mui/icons-material/FaceOutlined";
// import AvatarIcon from "@mui/icons-material/AccountCircleOutlined";
// import { useDispatch, useSelector } from "react-redux";
// import { useAlert } from "react-alert";

// import { login, clearErrors, signup } from "../../../actions/userActions";

// import "./Login.scss";
// import Loader from "../../layout/Loading/Loader";
// import UseHelmet from "../../layout/UseHelmet";
// import {useAuth0} from "@auth0/auth0-react"

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const alert = useAlert();
//   const location = useLocation();

//   const { error, loading, isAuthenticated } = useSelector(
//     (state) => state.user
//   );

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const loginTab = useRef(null);
//   const signupTab = useRef(null);
//   const switcherTab = useRef(null);

//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const { name, email, password, confirmPassword } = user;

//   const [avatarPreview, setAvatarPreview] = useState();
//   const [avatar, setAvatar] = useState();

//   //Function to switch from Login to Signup Container
//   const switchTabs = (e, tab) => {
//     if (tab === "login") {
//       switcherTab.current.classList.add("shiftToNeutral");
//       switcherTab.current.classList.remove("shiftToRight");

//       signupTab.current.classList.remove("shiftToNeutralForm");
//       loginTab.current.classList.remove("shiftToLeft");
//     }

//     if (tab === "signup") {
//       switcherTab.current.classList.add("shiftToRight");
//       switcherTab.current.classList.remove("shiftToNeutral");

//       signupTab.current.classList.add("shiftToNeutralForm");
//       loginTab.current.classList.add("shiftToLeft");
//     }
//   };

//   // Login Function
//   // const handleLoginSubmit = (e) => {
//   //   e.preventDefault();
//   //   dispatch(login(loginEmail, loginPassword));
//   // };

//   //Signup Function
//   const handleSignupSubmit = (e) => {
//     e.preventDefault();
//     const signupForm = new FormData();

//     signupForm.set("name", name);
//     signupForm.set("email", email);
//     signupForm.set("password", password);
//     signupForm.set("confirmPassword", confirmPassword);
//     signupForm.set("avatar", avatar);

//     // console.log("Signup submitted");
//     dispatch(signup(signupForm));
//   };

//   // Signup change function
//   const handleSignupChange = (e) => {
//     if (e.target.name === "avatar") {
//       const reader = new FileReader();
//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatar(reader.result);
//           setAvatarPreview(reader.result);
//         }
//       };

//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       setUser({ ...user, [e.target.name]: e.target.value });
//     }
//   };

//   const redirect = location.search ? location.search.split("=")[1] : "/profile";

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (isAuthenticated) {
//       navigate(redirect);
//     }
//   }, [dispatch, error, alert, isAuthenticated, navigate, redirect]);

//   return (
//     <>
//       <UseHelmet title="Welcome User --ApniDukaan" />
//       {loading ? (
//         <Loader />
//       ) : (
//         <div className="loginContainer">
//           <div className="loginBox">
//             <div className="loginExtra">
//               <div className="toggleLogin">
//                 <p onClick={(e) => switchTabs(e, "login")}>Login</p>
//                 <p onClick={(e) => switchTabs(e, "signup")}>Signup</p>
//               </div>
//               <button ref={switcherTab} />
//             </div>

//             <form
//               className="loginForm"
//               onSubmit={handleLoginSubmit}
//               ref={loginTab}
//             >
//               <div className="loginDetails">
//                 <MailOutlineIcon />

//                 <input
//                   type="email"
//                   placeholder="Email"
//                   required
//                   value={loginEmail}
//                   onChange={(e) => setLoginEmail(e.target.value)}
//                 />
//               </div>

//               <div className="loginDetails">
//                 <LockOpenIcon />

//                 <input
//                   type="password"
//                   placeholder="Password"
//                   required
//                   value={loginPassword}
//                   onChange={(e) => setLoginPassword(e.target.value)}
//                 />
//               </div>
//               <Link to="/password/forget">Forget Password</Link>
//               <button type="submit">Login</button>
//             </form>

//             <form
//               className="loginForm signup"
//               onSubmit={handleSignupSubmit}
//               ref={signupTab}
//             >
//               <div className="loginDetails">
//                 <FaceIcon />
//                 <input
//                   type="text"
//                   placeholder="Name"
//                   required
//                   name="name"
//                   value={name}
//                   onChange={handleSignupChange}
//                 />
//               </div>

//               <div className="loginDetails">
//                 <MailOutlineIcon />
//                 <input
//                   type="email"
//                   placeholder="Email"
//                   required
//                   name="email"
//                   value={email}
//                   onChange={handleSignupChange}
//                 />
//               </div>

//               <div className="loginDetails">
//                 <LockOpenIcon />

//                 <input
//                   type="password"
//                   placeholder="Password"
//                   required
//                   name="password"
//                   value={password}
//                   onChange={handleSignupChange}
//                 />
//               </div>

//               <div className="loginDetails">
//                 <LockOpenIcon />

//                 <input
//                   type="password"
//                   placeholder="Re-Enter your Password"
//                   required
//                   name="confirmPassword"
//                   value={confirmPassword}
//                   onChange={handleSignupChange}
//                 />
//               </div>

//               <div className="loginDetails" id="signupImage">
//                 <AvatarIcon />
//                 <input
//                   type="file"
//                   name="avatar"
//                   accept="image/*"
//                   onChange={handleSignupChange}
//                 />
//               </div>
//               <button type="submit">Signup</button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Login;
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default Login;
