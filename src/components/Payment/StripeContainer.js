import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "../Payment/Payment";

const PUBLIC_KEY =
  "pk_test_51JHVCtF05VKCAD6XaAoUOjh61U2WFauH8XPiSqlYGWhRjK1ZiNuzy5qHdz4dWL7XCSEHQVN9nWJqeuqpo2rv26sZ00FxQhEMCq";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default React.memo(function StripeContainer({
  open,
  setOpen,
  success,
  setSuccess,
  fetchProducts,
  subTotal,
  cartId,
}) {
  return (
    <Elements stripe={stripeTestPromise} >
      <Payment
        setOpen={setOpen}
        open={open}
        success={success}
        setSuccess={setSuccess}
        fetchProducts={fetchProducts}
        subTotal={subTotal}
        cartId={cartId}
      />
    </Elements>
  );
})
