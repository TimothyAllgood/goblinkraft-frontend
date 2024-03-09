import { React, useEffect, useState } from "react";
import User from "../../services/user.service";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import "./Subscribe.css";

const stripePromise = loadStripe(
  "pk_test_51Oa1w7CnGy8JPFhxbR01rsJhXIplQ6Sk6zGQVYnsUu30kdoiFiVP0o0nysyWpS2o2fEwM56tVvs7Du3IpPXSCo0N00ZZzyLmOO"
);

function Subscribe() {
  const { priceId } = useParams();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    createSubscription();
  }, []);

  const createSubscription = async () => {
    if (priceId) {
      let res = await User.createSubscription(priceId);
      setClientSecret(res.clientSecret);
    }
  };

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
}

export default Subscribe;
