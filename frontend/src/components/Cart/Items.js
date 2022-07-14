import React from "react";
import { Link } from "react-router-dom";

import "./Items.scss";

function Items({ item, deleteItem }) {
  return (
    <div className="cartItem">
      <img src={item.image} alt="product" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs.${item.price}`}</span>
        <p onClick={() => deleteItem(item.product)}>Remove</p>
      </div>
    </div>
  );
}

export default Items;
