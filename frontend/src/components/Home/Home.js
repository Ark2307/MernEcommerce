import React from "react";
import "./Home.scss";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";

const product = {
  name: "One Plus Nord CE 5g Pro",
  images: [{ url: "https://i.ibb.co/VTVFvm3/one-Plus-Nord-CE.jpg" }],
  price: 30000,
  _id: "Product1",
  numOfReviews: 812,
};

function Home() {
  return (
    <>
      <Header />
      <div className="titleAdd">
        <p> Welcome to Apni Dukaan </p>
        <h1> The Amazing products at your Doorstep</h1>
        <a href="#container">
          <button>
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>

      <span className="homeTitle">Featured Products</span>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
      <Footer />
    </>
  );
}

export default Home;
