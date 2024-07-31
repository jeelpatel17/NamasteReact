import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext, useEffect, useState } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  let onlineStatus = useOnlineStatus();
  let { user, city_name, setCity } = useContext(UserContext);
  let searchCity;
  let changeCity = () => {
    // console.log(city_name + "going to change to " + searchCity);
    setCity(searchCity);
  };

  const cart = useSelector((store) => store.cart.items);
  // console.log(cart);

  return (
    <div
      data-testid="header"
      className="header flex justify-around items-center h-40 mb-10"
    >
      <div className="">
        <Link to={"/"}>
          <img
            className="w-36"
            src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
          />
        </Link>
      </div>
      <div
        className="flex gap-5"
        onKeyDown={(e) => {
          if (e.keyCode == 13) {
            changeCity();
          }
        }}
      >
        <input
          type="search"
          placeholder={`📍 ${
            city_name.charAt(0).toUpperCase() + city_name.slice(1)
          }`}
          className="shadow-md px-5 py-2 rounded-md"
          data-testid="searchInput"
          id="cityElem"
          onChange={(e) => (searchCity = e.target.value)}
        />
        <button
          onClick={changeCity}
          className="p-1 px-2 bg-white outline outline-red-600 outline-2 rounded-md hover:bg-red-600 hover:text-white"
        >
          Search
        </button>
      </div>
      <div className="nav-two ">
        <ul className="flex gap-10">
          <li data-testid="online-status">
            Online Status: {onlineStatus ? "🟢" : "🔴"}
          </li>
          <Link to={"/Cart"}>
            <li data-testid="cartLength">Cart({cart.length})</li>
          </Link>
          <li>User: {user}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
