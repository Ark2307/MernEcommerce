import React, { Fragment, useEffect } from "react";
import "./Home.scss";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import { CgMouse } from "react-icons/cg";
import Product from "./Product";
import UseHelmet from "../layout/UseHelmet";

import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loading/Loader";

function Home() {
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UseHelmet title="APNI DUKAAN" />
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
            {products &&
              products.map((product) => <Product product={product} />)}
          </div>
          <Footer />
        </>
      )}
    </Fragment>
  );
}

export default Home;
