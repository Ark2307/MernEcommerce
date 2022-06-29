import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

import "./AllProducts.scss";
import "./Pagination.scss";
import Loader from "../../layout/Loading/Loader";
import { getProduct, clearErrors } from "../../../actions/productActions";
import ProductCard from "../../Home/ProductCard";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

function AllProducts() {
  const { products, loading, error, productCount, resultPerPage } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();
  // console.log(keyword);

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, error, alert, keyword, currentPage]);

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

          {resultPerPage < productCount ? (
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
