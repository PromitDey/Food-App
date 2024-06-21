import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { CDN_URL2 } from "../utils/constants";

const CategoryItemList = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //dispatch a action
    dispatch(addItem(item));
  };

  //console.log(items);

  return (
    <div>
      {items.map((i) => (
        <div
          key={i?.card?.info?.id}
          className="border-b-2 border-t-color-custom mb-8 flex justify-between"
        >
          <div className="w-9/12">
            <li className="list-none font-semibold">{i?.card?.info?.name}</li>
            <li className="list-none ml-2">
              ₹{" "}
              {i?.card?.info?.price / 100 || i?.card?.info?.defaultPrice / 100}
            </li>
            <li className="list-none ml-4 font-light text-base text-slate-400 mb-8">
              {i?.card?.info?.description}
            </li>
          </div>
          <div className="w-3/12 my-[60px]">
            <div className="absolute">
              <button
                className="border-2 border-green-300 bg-white text-green-600 px-6 py-1 rounded-lg mx-[50px] mt-[80px] font-semibold"
                onClick={() => handleAddItem(i)}
              >
                ADD +
              </button>
            </div>

            <img
              src={CDN_URL2 + i?.card?.info?.imageId}
              className="w-full h-[100px] object-cover border-2 border-black rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryItemList;
