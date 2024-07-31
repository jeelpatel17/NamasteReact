import { RES_CITY_API } from "../components/Constants";

import { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext";

const useZomatoApi = (city) => {
  let { city_name } = useContext(UserContext);
  const [res, setRes] = useState([]);
  let API_LINK = RES_CITY_API(city.toLowerCase());

  useEffect(() => {
    fetchData();
  }, [city_name]);

  const fetchData = async () => {
    const data = await fetch(API_LINK);
    const json = await data.json();
    setRes(json?.page_data?.sections);

    // console.log(json?.page_data?.sections?.SECTION_POPULAR_LOCATIONS);
  };

  return res;
};

export default useZomatoApi;
