"use client";

import { useState } from "react";
import Navigate from "@/components/shared/Navigate";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useCreateTipToBartenderMutation,
  useGetCustomerSavePaymentQuery,
} from "@/redux/Api/stipApi";
import { toast } from "react-toastify";

const Bartender = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const { data: savedCards } = useGetCustomerSavePaymentQuery();

  const [createTipToBartender, { isLoading }] =
    useCreateTipToBartenderMutation();

  const [selected, setSelected] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  const [customAmount, setCustomAmount] = useState("");

  const amounts = [5, 10, 15, 20];

  // total amount
  const totalPrice = showCustom
    ? Number(customAmount)
    : selected;

  /* =========================
     CREATE ORDER
  ========================= */

  const createOrder = async (paymentMethodId = "") => {
  console.log(paymentMethodId);

  let finalAmount = selected;

  if (showCustom) {
    finalAmount = Number(customAmount);
  }

  if (!finalAmount || finalAmount <= 0) {
    toast.error("Please select or enter amount");
    return;
  }

  try {
    // ✅ dynamic data
    const payload = paymentMethodId
      ? { amount: finalAmount, paymentMethodId }
      : { amount: finalAmount };

    const res = await createTipToBartender({
      id,
      data: payload,
    }).unwrap();

    const clientSecret = res?.data?.clientSecret;
    const orderId = res?.data?.orderId;

    toast.success(res?.message || "Tip added successfully!");

    if (paymentMethodId) {
      router.push(
        `/checkout/payment_successfull?payment_intent=${orderId}`
      );
    } else {
      if (!clientSecret) {
        throw new Error("No client secret received");
      }

      router.push(
        `/payment?clientSecret=${clientSecret}&orderId=${orderId}`
      );
    }
  } catch (err) {
    toast.error(
      err?.data?.message || "Something went wrong"
    );
  }
};

  return (
    <div className="px-3">
      {/* Header */}
      <div className="flex items-center justify-between pt-6 pb-6">
        <Navigate />
      </div>

      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold">
          Tip Your Bartender
        </h1>
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
            className={`w-full py-4 rounded-full border ${
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
            onChange={(e) =>
              setCustomAmount(e.target.value)
            }
            placeholder="Enter Your Amount"
            className="w-full mt-2 px-4 py-4 rounded-full bg-[#1A0830] border border-[#2A2448]"
          />
        </div>
      )}

      {/* Buttons */}
      <div className="mt-8 space-y-4">
        <div className="flex gap-4">
          {/* Custom */}
          <button
            onClick={() => {
              setShowCustom(true);
              setSelected(null);
            }}
            className="py-4 w-full rounded-full bg-gradient-to-br from-[#BB82FF] to-[#822CE7]"
          >
            Custom
          </button>

          {/* Continue */}
          <button
            onClick={() => {
              if ((savedCards?.data?.length || 0) > 0) {
                setShowPaymentModal(true);
              } else {
                createOrder("");
              }
            }}
            disabled={
              isLoading || (!selected && !customAmount)
            }
            className="w-full py-4 rounded-full bg-gradient-to-br from-[#BB82FF] to-[#822CE7] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? "Processing..." : "Continue"}
          </button>
        </div>

        {/* Skip */}
        <Link href="/myOrder">
          <button className="w-full mt-6 py-4 rounded-full bg-[#E5E5E5] text-[#BB82FF]">
            Skip & Continue Ordering
          </button>
        </Link>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#1A0E2E] w-[90%] max-w-md rounded-2xl p-5 border border-[#2A2448]">
            <h2 className="text-lg font-bold text-white mb-4">
              Previous Used Cards
            </h2>

            <p className="text-sm text-gray-400 mb-4">
              Total: ${totalPrice || 0}
            </p>

            <div className="space-y-3 max-h-[250px] overflow-y-auto">
              {savedCards?.data?.map((card) => (
                <div
                  key={card.id}
                  onClick={() =>
                    setSelectedCard(card.id)
                  }
                  className={`p-4 rounded-xl border cursor-pointer ${
                    selectedCard === card.id
                      ? "border-purple-500 bg-purple-900/30"
                      : "border-[#2A2448]"
                  }`}
                >
                  <p className="text-white font-semibold uppercase">
                    {card.brand}
                  </p>
                  <p className="text-gray-400 text-sm">
                    **** **** **** {card.last4}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Exp: {card.expMonth}/{card.expYear}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => {
                  if (!selectedCard) {
                    toast.error("Please select a card");
                    return;
                  }
                  setShowPaymentModal(false);
                  createOrder(selectedCard);
                }}
                className="w-full bg-white text-black py-2 rounded-full"
              >
                Pay
              </button>

              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  createOrder("");
                }}
                className="w-full border border-white text-white py-2 rounded-full"
              >
                Pay with New Card
              </button>

              <button
                onClick={() =>
                  setShowPaymentModal(false)
                }
                className="w-full text-gray-400 text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bartender;