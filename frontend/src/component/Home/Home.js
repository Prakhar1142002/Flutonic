import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import SearchIcon from "@mui/icons-material/Search";
import MetaData from "../layout/MetaData";
import "./Home.css";

import Product from "./ProductCard";
import Loader from "../layout/Loader/Loader";
import { clearErrors, getProduct } from "../../actions/productAction";

import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      // return alert.error(error);
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
        <Fragment>
          <MetaData title="Flutonic" />

          <div className="banner">
            <p>Welcome to Flutonic</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="search">
            <p>Search more Products</p>
            <Link to="/search">
              <SearchIcon fontSize="large" />
            </Link>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home;
