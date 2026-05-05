"use client";

import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          "https://flonx-progressive-web-client.vercel.app/checkout/payment_successfull",
      },
    });

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
        options={{
      
          paymentMethodOrder: ["card"],

    
          layout: {
            type: "accordion",
            defaultCollapsed: false,
            
           radios: "never",
            spacedAccordionItems: false,
          },
        }}
      />
      <button
        className="w-full flex justify-center items-center gap-4 py-3 rounded-full
            bg-gradient-to-br from-[#BB82FF] to-[#822CE7]
            shadow-lg mt-3"
        type="submit"
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;