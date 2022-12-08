import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(
      "pk_test_51MC3heJoMpGSOaYHWCVuK7EP7SZ6zNauKIK6brT65RRKNjUcwa0eYvad9YofEi8T5ep4c2X1LcIBbRx7MAhEt0UV00K1Nmx2A3"
    );
  }
  return stripePromise;
};

export default initializeStripe;