import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductInfo.scss";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loading/Loader";
import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component";
import Header from "../layout/Header/Header";
import Footer from "../layout/Footer/Footer";

function ProductInfo() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { product, loading, error } = useSelector((state) => state.productInfo);
  const { id } = useParams();
  // console.log(product);
  // console.log(typeof product);

  const options = {
    edit: false,
    color: "rgba(20 , 20 , 20, 0.1)",
    activeColor: "green",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  };

  useEffect(() => {
    if (error) alert.error(error);

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className="productInfo">
            <div className="carouselComponent">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="productImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div className="infoComponent">
              <div className="infoBlock-1">
                <h2>{product.name}</h2>
                <p> Product #: {product._id}</p>
              </div>

              <div className="infoBlock-2">
                <ReactStars {...options} />
                <span>{product.numOfReviews} Reviews</span>
              </div>

              <div className="infoBlock-3">
                <h1>{`Rs.${product.price}`}</h1>
                <div className="infoBlock-3-1">
                  <div className="infoBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>

                  <button className="cartButton">Buy Now</button>
                </div>
                <div className="infoBlock-3-2">
                  <p>Status: </p>
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </div>
              </div>

              <div className="infoBlock-4">
                Description: <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <Footer />
        </>
      )}
    </Fragment>
  );
}

export default ProductInfo;
