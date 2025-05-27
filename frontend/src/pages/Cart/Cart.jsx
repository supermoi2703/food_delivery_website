import { useState, useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url, discount, setDiscount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const applyPromoCode = async () => {
    try {
      const response = await fetch(`${url}/api/promocode/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode, totalAmount: getTotalCartAmount() })
      });

      const data = await response.json();
      if (data.success) {
        setDiscount(data.discount);
        setPromoMessage(`Promo applied! You saved $${data.discount}`);
      } else {
        setPromoMessage(data.message);
      }
    } catch (err) {
      setPromoMessage("Error applying promo code");
    }
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            {discount > 0 && (
              <div className="cart-total-details">
                <p>Discount</p>
                <p>-${discount}</p>
              </div>
            )}
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                $
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + 2 - discount}
              </b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCESS TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={applyPromoCode}>Submit</button>
            </div>
            {promoMessage && <p className="promo-message">{promoMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;