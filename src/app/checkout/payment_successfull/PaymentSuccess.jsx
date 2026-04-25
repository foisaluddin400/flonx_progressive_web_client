"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import RIghtArray from "@/components/icon/RIghtArray";
import RightMarkIco from "@/components/icon/RightMarkIco";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();

  const status = searchParams.get("redirect_status");
  const paymentIntent = searchParams.get("payment_intent");

  const isSuccess = status === "succeeded";

  return (
    <div className="h-screen bg-white rounded-lg shadow-lg p-6">
      
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl flex gap-1 items-center font-bold text-gray-800">
          <RIghtArray /> Payment
        </h2>
      </div>

      <div className="text-center py-6">
        <div className="flex justify-center">
          <RightMarkIco />
        </div>

        <h3 className="text-[24px] mt-3 font-bold text-gray-800">
          {isSuccess ? "Success" : "Failed"}
        </h3>

        <p className="text-gray-600 mt-2">
          {isSuccess
            ? "Payment completed successfully"
            : "Payment failed or canceled"}
        </p>

        {/* Optional debug */}
        <p className="text-xs mt-2 text-gray-400">
          Payment ID: {paymentIntent}
        </p>
      </div>

      <Link href="/myOrder">
        <button className="w-full bg-[#00D66F] text-black py-3 rounded-lg font-semibold">
          See my orders
        </button>
      </Link>
    </div>
  );
}