import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

import {
  clearErrors,
  getProductDetails,
} from "../../../actions/productActions";
import { addToCart } from "../../../actions/orderActions";

import "./ProductInfo.scss";
import Loader from "../../layout/Loading/Loader";
import ReviewCard from "./ReviewCard";
import UseHelmet from "../../layout/UseHelmet";

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

  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
    else setQuantity(product.stock);
  };

  const subQuantity = () => {
    if (quantity <= 0) setQuantity(0);
    else setQuantity(quantity - 1);
  };

  const addToCartHandler = () => {
    dispatch(addToCart(id, quantity));
    alert.success("Item added to cart successfully");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UseHelmet title={`${product.name} --APNI DUKAAN`} />

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
                    <button onClick={subQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={addQuantity}>+</button>
                  </div>

                  <button onClick={addToCartHandler} className="cartButton">
                    Add to Cart
                  </button>
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

          <h2 className="reviewsTitle">REVIEWS</h2>
          {product.reviews && product.reviews[0] ? (
            <div className="reviewsComponent">
              {product.reviews &&
                product.reviews.map((review, id) => (
                  <ReviewCard review={review} key={id} />
                ))}
            </div>
          ) : (
            <p className="noReviews">
              Be the First one to Reviews this Product
            </p>
          )}
        </>
      )}
    </Fragment>
  );
}

export default ProductInfo;
