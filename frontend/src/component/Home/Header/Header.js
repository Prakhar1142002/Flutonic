import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";

export default function Header() {
  const user = true;

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="Loading..."
        />
      </Link>

      <div className="header__search">
        <input
          placeholder="Search Here"
          className="header__searchInput"
          type="text"
        />
      </div>

      <div className="enable_mode">
        <button
          onClick={toggle}
          value="Light Mode"
          id="enable_button_id"
          className="enable_button"
        >
          {title}
        </button>
      </div>

      <div className="header__nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuthentication} className="header__option">
            {/* <span className="header__optionLineOne"> {user?'Hello '+userEmailName:'Hello Guest'}</span> */}
            <span className="header__optionLineOne">
              {" "}
              Hello {user ? "User" : "Guest"}{" "}
            </span>
            <span className="header__optionLineTwo">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
