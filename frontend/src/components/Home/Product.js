import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./Home.scss";

function Product({ product }) {
  const options = {
    edit: false,
    color: "rgba(20 , 20 , 20, 0.1)",
    activeColor: "green",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  };

  return (
    <Link className="productCard" to={product._id}>
      <img src={product.images[0].url} alt={product.name} />
      {console.log(product.images[0].url)}
      <p>{product.name}</p>

      <div className="cardComponent">
        <ReactStars {...options} />
      </div>

      <span className="reviews"> ({product.numOfReviews} people reviewed)</span>
      <span>Rs.{product.price}</span>
    </Link>
  );
}

export default Product;
