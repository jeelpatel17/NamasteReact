import { useSelector, useDispatch } from "react-redux";
import ItemList from "./ItemList";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  let cart = useSelector((store) => store.cart.items);
  let dispatch = useDispatch();

  return (
    <div className="w-1/2 mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Your Cart</h1>
        {cart.length >= 1 && (
          <button
            className="outline outline-red-600 p-1 rounded-sm"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        )}
      </div>
      {cart.length ? (
        <ul className="mt-8">
          {cart.map((elem) => {
            return (
              <ItemList
                key={elem.id}
                testid="cart-item"
                item={elem}
                btn={"remove"}
              />
            );
          })}
        </ul>
      ) : (
        <h1 className="text-2xl my-10 text-center">No Items Found! :(</h1>
      )}
    </div>
  );
};

export default Cart;
