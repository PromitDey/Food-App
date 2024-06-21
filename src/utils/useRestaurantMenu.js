import React, { useEffect, useState } from "react";
import { RES_API1, RES_API2 } from "./constants";

const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async function () {
    const data = await fetch(RES_API1 + resId + RES_API2);
    const jsonData = await data.json();
    //console.log(jsonData);
    setResInfo(jsonData.data);
  };

  return resInfo;
};

export default useRestaurantMenu;
