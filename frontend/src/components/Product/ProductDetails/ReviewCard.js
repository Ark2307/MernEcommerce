import React from "react";
import ReactStars from "react-rating-stars-component";

import "./ProductInfo.scss";
import profilePic from "../../../images/Profile.png";

function ReviewCard({ review }) {
  const options = {
    edit: false,
    color: "rgba(20 , 20 , 20, 0.1)",
    activeColor: "green",
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 15 : 20,
  };

  return (
    <div className="reviewCard">
      <img src={profilePic} alt="user" />
      <p>Aryan Khandelwal</p>
      <ReactStars {...options} />
      <span>{review.comment}</span>
    </div>
  );
}

export default ReviewCard;
