import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { CgMouse } from "react-icons/cg";

import { clearErrors, getProduct } from "../../actions/productActions";

import "./Home.scss";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";
import ProductCard from "./ProductCard";
import UseHelmet from "../layout/UseHelmet";
import Loader from "../layout/Loading/Loader";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

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
              products.map((product, id) => (
                <ProductCard product={product} key={id} />
              ))}
          </div>
          <Footer />
        </>
      )}
    </Fragment>
  );
}

export default Home;
