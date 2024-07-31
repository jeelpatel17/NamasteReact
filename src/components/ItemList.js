import { addItem, removeItem } from "../utils/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const ItemList = ({ item, btn, testid = "null" }) => {
  // null will be assigned if no test-id is passed, the test-id is only passed by the cart page res-items, so that it can be distinguished during integration testing
  let {
    id,
    name,
    desc,
    display_price,
    default_price,
    item_image_thumb_url,
    item_tag_image,
  } = item;
  let dispatch = useDispatch();
  let cart = useSelector((store) => store.cart.items);
  // console.log(item);
  return (
    <li
      key={id}
      data-testid={testid}
      className="flex justify-between my-3 shadow-sm"
    >
      <div className="w-3/4  fgap-3">
        <h2>{name}</h2>
        <p>₹ {display_price || default_price}</p>
        <p className="text-sm text-gray-700">{desc}</p>
      </div>
      <div className="relative h-28 w-1/4 flex justify-end items-end">
        <img src={item_tag_image} className="w-3 absolute top-0 m-2" />
        {btn == "add" ? (
          <button
            onClick={() => dispatch(addItem(item))}
            className="absolute bg-slate-900 p-1 text-sm text-white rounded-tl-md rounded-br-md"
          >
            Add +{" "}
          </button>
        ) : (
          <button
            onClick={() => dispatch(removeItem(item))}
            className="absolute bg-red-600 p-1 text-sm text-white rounded-tl-md rounded-br-md"
          >
            Remove -{" "}
          </button>
        )}
        <img
          src={item_image_thumb_url}
          className="h-full w-full object-cover rounded-md"
        />
      </div>
    </li>
  );
};

export default ItemList;
