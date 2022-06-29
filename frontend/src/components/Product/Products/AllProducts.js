import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import "./AllProducts.scss";
import "./Pagination.scss";
import Loader from "../../layout/Loading/Loader";
import { getProduct, clearErrors } from "../../../actions/productActions";
import ProductCard from "../../Home/ProductCard";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

// array for categories
const categories = [
  "Gadgets",
  "Electric Devices",
  "Clothing",
  "Footwear",
  "Accessories",
  "Watches",
  "Books",
];

function AllProducts() {
  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filteredCount,
  } = useSelector((state) => state.products);

  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();
  // console.log(keyword);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  // page number
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  // price filter handler
  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, error, alert, keyword, currentPage, price, category]);

  let count = filteredCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <h2 className="productTitle"> Products</h2>
          <div className="products">
            {products &&
              products.map((order) => (
                <ProductCard product={order} key={order._id} />
              ))}
          </div>

          {/* Add filters of categories and price here */}
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="category-box">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {resultPerPage < count ? (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="last"
                itemClass="page-items"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          ) : (
            ""
          )}

          <Footer />
        </>
      )}
    </Fragment>
  );
}

export default AllProducts;
