import React, { useState } from "react";
import CategoryItemList from "./CategoryItemList";

const RestaurantCategory = ({ data, showItems, setShowIdx }) => {
  //uncontrolled components
  //   const [showItems, setShowItems] = useState(false);
  const handleClick = () => {
    setShowIdx();
  };
  // console.log(data);
  return (
    <div>
      {/* Accordion Header */}
      <div className="bg-gray-100 shadow-lg shadow-slate-500 p-4 my-6">
        <div
          className=" flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-bold text-2xl">
            {data.title} ({data.itemCards.length})
          </span>
          <span> 🔽</span>
        </div>

        {/* Accordion Body */}
        {showItems && <CategoryItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategory;
