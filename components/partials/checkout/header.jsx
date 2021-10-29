import ALink from "~/components/features/custom-link";

export default function Header() {
  return (
    <div className="step-by pr-4 pl-4">
      <h3 className="title title-simple title-step">
        <ALink href="/pages/cart">1. Shopping Cart</ALink>
      </h3>
      <h3 className="title title-simple title-step active">
        <ALink href="#">2. Checkout</ALink>
      </h3>
      <h3 className="title title-simple title-step">
        <ALink href="/pages/order">3. Order Complete</ALink>
      </h3>
    </div>
  );
}
