import { useContext } from "react";
import UserContext from "../utils/UserContext";

const RestaurantCard = ({ data, promoted = false }) => {
  if (!data?.info) {
    return <></>;
  }

  let { user } = useContext(UserContext);

  const { name, cuisine, cft, image, rating } = data.info;

  return (
    <div data-testid="ResCard" className="rounded shadow-xl p-10 relative">
      {promoted && (
        <span className="bg-red-500 text-white p-1 absolute top-0 left-0 rounded-br-md rounded-tl-md">
          Promoted
        </span>
      )}
      <div className="flex justify-between pb-3">
        <h3 className="text-lg font-bold">{name}</h3>
        <span
          className="text-white rounded-md p-1"
          style={{ backgroundColor: "#" + rating.rating_color }}
        >
          {rating.aggregate_rating} ★
        </span>
      </div>
      <img className="w-full h-52 object-cover rounded-md" src={image.url} />
      <div className="flex justify-between items-center mt-3">
        <p className={`rounded-full w-fit`}>
          {cuisine.map((elem) => elem.name).join(", ") ||
            "Cuisines not available"}
        </p>
        <p className="price text-sm font-semibold">
          {cft.text || "Price not available"}
        </p>
      </div>
      <p>{data.order.deliveryTime}</p>
    </div>
  );
};

export default RestaurantCard;

// Higher Order Functions !!!

export const PromotedResCard = (SC) => {
  return (props) => {
    return <SC {...props} promoted="true" />;
  };
};
