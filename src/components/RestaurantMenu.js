/**
 * Res Name             Rating
 * Cuisines             Review
 * Address
 *
 * Del Time | Cost For Two
 */

import React, { useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  //custom hook that is fetching the restaurant menu
  const resInfo = useRestaurantMenu(resId);

  const [showIdx, setShowIdx] = useState(0); //accordion

  if (resInfo == null) return <Shimmer />;

  //console.log(resInfo?.cards[2]?.card?.card?.info);

  const {
    name,
    cuisines,
    city,
    areaName,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
  } = resInfo?.cards[2]?.card?.card?.info;

  const { slaString } = resInfo?.cards[2]?.card?.card?.info?.sla;

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card.card?.["@type"] ==
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

  return (
    <div className="justify-between pr-custom mt-12">
      <div className="flex mt-12 justify-between">
        <div>
          <h1 className="text-4xl font-semibold">{name}</h1>
          <div className="font-base text-sm ml-2.5 mb-9 t-color-custom">
            <p>{cuisines.join(", ")}</p>
            <p>
              {areaName} , {city}
            </p>
          </div>
        </div>
        <div>
          <ul className="border-2 border-solid t-color-custom rounded-xl">
            <li className="pt-3 list-none text-center text-lg font-bold text-green-700">
              {avgRating}
            </li>
            <li className="list-none text-center text-lg t-color-custom">
              ---------
            </li>
            <li className="p-2 list-none text-xs t-color-custom font-bold">
              {totalRatingsString}
            </li>
          </ul>
        </div>
      </div>
      <li className="list-none text-center t-color-custom">
        --------------------------------------------------------------------------------------------------------------------------------
      </li>
      <div className="flex list-none pb-5">
        <li className="mr-2.5">⏱️ {slaString}</li>
        <li className="mr-2.5">💰 {costForTwoMessage}</li>
      </div>
      <div className="menu">
        {categories.map((category, index) => (
          //controlled component
          <RestaurantCategory
            data={category?.card?.card}
            key={index}
            showItems={index == showIdx && true}
            setShowIdx={() => setShowIdx(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
