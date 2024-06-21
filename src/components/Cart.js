import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import CategoryItemList from "./CategoryItemList";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  //console.log(cartItems);

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const cartTotal = cartItems
    .map((item, index) => {
      return (
        item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100
      );
    })
    .reduce((accumulator, currentVal) => {
      return accumulator + currentVal;
    }, 0);
  //console.log(cartTotal);

  return cartItems.length == 0 ? (
    <div className="">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold mt-12 mb-12">Cart is empty !!</h1>
      </div>
      <div className="flex justify-center">
        <button
          className="border-2 px-4 border-gray-500 bg-slate-200 rounded-lg hover:bg-slate-300 hover:shadow-black font-semibold text-xl"
          onClick={handleRedirect}
        >
          Take me to home
        </button>
      </div>
    </div>
  ) : (
    <div className="flex justify-evenly">
      <div className="justify-between pl-[30px] wx-[100px]">
        <div className="flex justify-between border-b-2 border-t-color-custom ">
          <div className="text-2xl font-bold mt-12 mb-12">
            Cart Items ({cartItems.length})
          </div>
          <div className="text-2xl font-bold mt-12 mb-12">
            <button
              className="border-2 px-4 border-t-color-custom rounded-lg hover:bg-slate-300 hover:shadow-black"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
        <div className="my-10">
          <CategoryItemList items={cartItems} />
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="mt-12 text-2xl font-bold mb-2">
          Total Price :{" "}
          <span className="text-green-600">₹{cartTotal.toFixed(2)}</span>
        </p>
        <button className="border-2 border-black px-2 py-2 rounded-lg bg-yellow-300 font-semibold text-xl hover:text-green-600">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
