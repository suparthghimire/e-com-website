import React from "react";

export default function StepByStep({ active }) {
  const common_class = "title title-simple title-step ";
  const cart_class = common_class + (active === "cart" ? "active" : "");
  const checkout_class = common_class + (active === "checkout" ? "active" : "");
  const order_class = common_class + (active === "order" ? "active" : "");

  return (
    <div className="step-by pr-4 pl-4">
      <h3 className={cart_class}>1. Shopping Cart</h3>
      <h3 className={checkout_class}>2. Checkout</h3>
      <h3 className={order_class}>3. Order Complete</h3>
    </div>
  );
}
