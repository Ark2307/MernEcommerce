import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { loadUser } from "./actions/userActions";

import "./App.css";
import Home from "./components/Home/Home";
import ProductInfo from "./components/Product/ProductDetails/ProductInfo";
import AllProducts from "./components/Product/Products/AllProducts";
import Search from "./components/Product/Search/Search";
import Login from "./components/User/Auth/Login";
import Profile from "./components/User/Profile/Profile";
import EditProfile from "./components/User/Profile/EditProfile";

import AuthenticatedRoute from "./components/Routes/AuthenticatedRoute";
import store from "./reactStore";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import UpdatePassword from "./components/User/Passwords/UpdatePassword";
import ForgetPassword from "./components/User/Passwords/ForgetPassword";
import ResetPassword from "./components/User/Passwords/ResetPassword";

function App() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Router>
      <section>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductInfo />} />
          <Route
            exact
            path="/profile"
            element={<AuthenticatedRoute Component={Profile} />}
          />

          <Route
            exact
            path="/profile/edit"
            element={<AuthenticatedRoute Component={EditProfile} />}
          />
          <Route
            exact
            path="/user/password/update"
            element={<AuthenticatedRoute Component={UpdatePassword} />}
          />

          <Route exact path="/password/forget" element={<ForgetPassword />} />
          <Route
            exact
            path="/password/reset/:token"
            element={<ResetPassword />}
          />
          <Route exact path="/products" element={<AllProducts />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/products/:keyword" element={<AllProducts />} />
        </Routes>
        <Footer />
      </section>
    </Router>
  );
}

export default App;
