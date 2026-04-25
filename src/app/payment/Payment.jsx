"use client";

import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "@/lib/stripe";
import CheckoutForm from "./CheckoutForm";

import Navigate from "@/components/shared/Navigate";
import NoData from "@/components/NoData";
const PaymentPage = () => {
      const searchParams = useSearchParams();
  const clientSecret = searchParams.get("clientSecret");

  if (!clientSecret) return <NoData></NoData>;

  return (
   <div>
       <div className="flex items-center justify-between relative pt-6 pb-6">
        <Navigate />
        <h1 className="text-[16px] italic">Payment</h1>
        <div></div>
      </div>
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
   </div>
  )
}

export default PaymentPage