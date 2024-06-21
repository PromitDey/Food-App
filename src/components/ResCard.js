import { CDN_URL } from "../utils/constants";

const ResCard = (props) => {
  const { resData } = props; //destructuring
  const { cloudinaryImageId, avgRating, cuisines, locality } = resData?.info; //chaining
  const { deliveryTime } = resData?.info.sla;

  return (
    <div className="w-64 h-auto border-2 rounded-xl bg-gray-200 m-2.5 hover:border-1 hover:shadow-md hover:shadow-black hover:transition-shadow hover:duration-500 hover:bg-gray-300">
      <div>
        <img
          className="m-2.5 mb--2.5 mx-1.5 w-60 h-40 border-1 border-black rounded-xl "
          alt="res-img"
          src={CDN_URL + cloudinaryImageId}
        />
      </div>

      <ul className="flex list-none justify-between text-lg font-semibold">
        <li className="absolute mt-[-35px] ml-2 font-semibold text-white text-shadow-md">
          {resData.info.aggregatedDiscountInfoV3?.header}{" "}
          {resData.info.aggregatedDiscountInfoV3?.subHeader}
        </li>

        <li className="ml-1.5">{resData.info.name}</li>
      </ul>
      <div className="cuisine-add">
        <ul className="list-none ml--4 text-sm mt--6">
          <li className="font-semibold text-sm pl-2 mb-2 mt--2">
            ⭐ {avgRating}/5
          </li>
          <li className="font-light text-sm mx-2">{cuisines.join(", ")}</li>
          <li className="font-light text-sm mx-2">{locality}</li>
        </ul>
      </div>
      <h8 className="ml-2">Delivery Time: {deliveryTime + "mins"}</h8>
      {/* <button id="res-card-btn">Open Menu</button> */}
    </div>
  );
};

//higher order function
export const openResCard = (ResCard) => {
  return (props) => {
    const { isOpen } = props?.resData?.info;
    return (
      <div>
        {isOpen ? (
          <label className="absolute ml-[-5px] border-2 rounded-lg p-2 bg-green-200 ">
            Opened Now !!
          </label>
        ) : (
          <label className="absolute ml-[-5px] border-2 rounded-lg p-2 bg-red-400">
            Closed Now !!
          </label>
        )}
        <ResCard {...props} />
      </div>
    );
  };
};

export default ResCard;
