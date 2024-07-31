import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";
import useZomatoApi from "../utils/useZomatoApi";
import RestaurantCard, { PromotedResCard } from "./RestaurantCard";
import { useContext, useEffect } from "react";
import UserContext from "../utils/UserContext";

const Body = () => {
  let { city_name } = useContext(UserContext);
  let main_data = useZomatoApi(city_name);

  if (useOnlineStatus() === false)
    return (
      <center>
        <h1>Something's wrong! Please check your internet! :(</h1>
      </center>
    );
  if (main_data == undefined || main_data.length == 0) return <Shimmer />;

  const RestaurantCardPromoted = PromotedResCard(RestaurantCard);

  let { pageHeading } = main_data.SECTION_BASIC_INFO;

  return (
    <div data-testid="body" className="body transition-all">
      <h2 className="text-center text-4xl font-bold mb-5">{pageHeading}</h2>
      <div className=" flex flex-wrap gap-10 justify-center">
        {main_data.SECTION_SEARCH_RESULT.map((elem, idx) => {
          let cardLink;
          // console.log(elem);
          for (const key in elem.cardAction) {
            if (elem.cardAction[key][0] != undefined) {
              cardLink = elem.cardAction[key];
            }
          }
          return (
            elem.type == "restaurant" && (
              <Link className="w-1/4" key={idx} to={`/restaurants${cardLink}`}>
                {elem.isPromoted ? (
                  <RestaurantCardPromoted data={elem} />
                ) : (
                  <RestaurantCard data={elem} />
                )}
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Body;
