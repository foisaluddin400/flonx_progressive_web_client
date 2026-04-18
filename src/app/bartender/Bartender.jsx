"use client";

import { useState } from "react";
import Navigate from "@/components/shared/Navigate";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCreateTipToBartenderMutation } from "@/redux/Api/stipApi";
import { toast } from "react-toastify";

const Bartender = () => {
  const { id } = useParams();
  const router = useRouter();

  const [createTipToBartender, { isLoading }] =
    useCreateTipToBartenderMutation();

  const [selected, setSelected] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [5, 10, 15, 20];

  
  const handleSubmit = async () => {
    let finalAmount = selected;

    if (showCustom) {
      finalAmount = Number(customAmount);
    }

    if (!finalAmount || finalAmount <= 0) {
      toast.error("Please select or enter amount");
      return;
    }

    try {
      const res = await createTipToBartender({
        id, 
        data: { amount: finalAmount },
      }).unwrap();

      toast.success(res?.message || "Tip added successfully!");

      router.push(res?.data?.paymentUrl);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="px-3">
      {/* Header */}
      <div className="flex items-center justify-between relative pt-6 pb-6">
        <Navigate />
      </div>

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold">Tip Your Bartender</h1>
        <p className="text-sm text-[#A59FBF] mt-2">
          Show Your Appreciation
        </p>
      </div>

      {/* Amount Buttons */}
      <div className="space-y-4">
        {amounts.map((amt) => (
          <button
            key={amt}
            onClick={() => {
              setSelected(amt);
              setShowCustom(false);
            }}
            className={`w-full py-4 rounded-full border transition-all duration-300 ${
              selected === amt
                ? "bg-gradient-to-r from-purple-600 to-indigo-500 border-transparent"
                : "border-[#2A2448] bg-[#1A0830]"
            }`}
          >
            <span className="bg-gradient-to-r from-[#BB82FF] to-[#822CE7] bg-clip-text text-transparent font-semibold">
              ${amt}
            </span>
          </button>
        ))}
      </div>

      {/* Custom Input */}
      {showCustom && (
        <div className="mt-6">
          <label className="text-sm text-white">
            Enter Tip Amount *
          </label>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter Your Amount"
            className="w-full mt-2 px-4 py-4 rounded-full bg-[#1A0830] border border-[#2A2448] outline-none"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 space-y-4">
        <div className="flex gap-4">
          {/* Custom Button */}
          <button
            onClick={() => {
              setShowCustom(true);
              setSelected(null);
            }}
            className="py-4 rounded-full w-full 
            bg-gradient-to-br from-[#BB82FF] to-[#822CE7]
            shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
          >
            Custom
          </button>

          {/* ✅ Continue Button with Loading */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full py-4 rounded-full
            bg-gradient-to-br from-[#BB82FF] to-[#822CE7]
            shadow-lg flex items-center justify-center gap-2
            hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </>
            ) : (
              "Continue"
            )}
          </button>
        </div>

        {/* Skip */}
        <Link href={"/myOrder"}>
          <button className="w-full mt-6 py-4 rounded-full bg-[#E5E5E5] text-[#BB82FF]">
            Skip & Continue Ordering
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Bartender;