import React, { useContext } from "react";
import ResCard, { openResCard } from "./ResCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {
  //local state variable
  const [listOfRestaurants, setListOfRestaurants] = useState([]);

  //Its a copy of listofRestaurants, to do all types of filters
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [searchText, setSearchText] = useState("");

  const IsOpenRes = openResCard(ResCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.572646&lng=88.36389500000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await data.json();
    //console.log(jsonData);
    setListOfRestaurants(
      //optional chaining
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurants(
      jsonData?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();

  //modifying userContext
  const { loggedInUser, setUserName } = useContext(UserContext);
  console.log(listOfRestaurants.length);

  //conditional rendering
  if (listOfRestaurants.length == 0) {
    return <Shimmer />;
  }

  if (onlineStatus === false) {
    return (
      <h1>Looks like you're Offline !! Check your internet connection...</h1>
    );
  }

  //using ternary operator
  return (
    <div className="body">
      <div className="flex m-2.5">
        <div className="border-2 border-black rounded-xl">
          <input
            type="text"
            className="border-2 border-black rounded-lg"
            value={searchText}
            onChange={function (e) {
              setSearchText(e.target.value);
            }}
          ></input>
          <button
            className="cursor-pointer ml-2.5 border-1 border-black pl-2 pr-2 font-semibold rounded-lg "
            onClick={() => {
              //fiter the restaurants according to the search text and update the UI
              //console.log(searchText);

              const searchFilter = listOfRestaurants.filter((restaurant) =>
                restaurant.info.name
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              );
              //console.log(searchFilter);
              setFilteredRestaurants(searchFilter);
              //console.log(listOfRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="cursor-pointer ml-2.5 border-2 border-black pl-2 pr-2 font-semibold rounded-lg "
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (restaurant) => restaurant.info.avgRating > 4.5
            );
            //console.log(filteredList);
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
        {/* Modifying UserContext */}
        {/* <div className="ml-4">
          UserName:
          <input
            className="border-2 border-black px-1"
            value={loggedInUser}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div> */}
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredRestaurants.map(function (restaurant) {
          //looping over the resList to iterate and returning each and every resCard
          //always give a key while using map
          return (
            <Link
              className="decoration-inherit"
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              {restaurant?.info?.isOpen ? (
                <IsOpenRes resData={restaurant} />
              ) : (
                <ResCard resData={restaurant} />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Body;
