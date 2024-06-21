import React, { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import UserContext from "../utils/UserContext.js";

export const Header = () => {
  const isOnline = useOnlineStatus();

  //named export
  const [btnName, setBtnName] = useState("Login");

  const { loggedInUser } = useContext(UserContext);
  //console.log(loggedInUser);

  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  //console.log(cartItems);

  return (
    <div className="flex mt-2 ml-2 mr-2 justify-between border-2 border-black rounded-2xl ">
      <div>
        <img
          src={LOGO_URL}
          className="logo-custom mt-2 mb-2 ml-2.5 rounded-lg"
        />
      </div>
      <div>
        <ul className="flex text-xl font-semibold list-none mt-10 mr-8">
          <li
            className={`${
              isOnline ? "text-green-500" : "text-red-500"
            } mt-1 mr-4 `}
          >
            {isOnline ? <CiWifiOn /> : <CiWifiOff />}
          </li>
          <li className="mr-4">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </li>
          <li className="mr-4">
            <Link to="/cart">Cart ({cartItems.length} Items)</Link>
          </li>
          <button
            className="  hover:text-orange-500"
            onClick={() => {
              if (btnName == "Login") {
                setBtnName("Logout");
              } else {
                setBtnName("Login");
              }
            }}
          >
            {btnName}
          </button>
          <li className="font-bold">({loggedInUser})</li>
        </ul>
      </div>
    </div>
  );
};
