"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  useGetViewCartQuery,
  useUpdateToCartMutation,
  useRemoveToCartMutation,
} from "@/redux/Api/venueApi";
import DeleteIco from "../icon/DeleteIco";
import Navigate from "../shared/Navigate";
import { toast } from "react-toastify";
import Plus from "../icon/Plus";
import { Minus } from "lucide-react";
import { useCreateOrderMutation } from "@/redux/Api/stipApi";
import { useRouter } from "next/navigation";
import { PageLoader } from "../Loading";
export default function CheckoutPage() {
  const { data: viewCart, isLoading } = useGetViewCartQuery();
  const [updateToCart] = useUpdateToCartMutation();
  const router = useRouter();
  const [removeCartItem] = useRemoveToCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const [orderLoading, setOrderLoading] = useState(false);
  // Track loading for each action type per item
  const [loadingStates, setLoadingStates] = useState({
    increase: new Set(),
    decrease: new Set(),
    delete: new Set(),
  });

  if (isLoading) return <PageLoader/>;

  const isLoadingAction = (productId, action) =>
    loadingStates[action].has(productId);

  const startLoading = (productId, action) => {
    setLoadingStates((prev) => ({
      ...prev,
      [action]: new Set(prev[action]).add(productId),
    }));
  };

  const stopLoading = (productId, action) => {
    setLoadingStates((prev) => {
      const newSet = new Set(prev[action]);
      newSet.delete(productId);
      return {
        ...prev,
        [action]: newSet,
      };
    });
  };

  const handleIncrease = async (productId, currentQty) => {
    try {
      startLoading(productId, "increase");
      await updateToCart({ productId, quantity: currentQty + 1 }).unwrap();
    } catch (err) {
      console.error(err);
    } finally {
      stopLoading(productId, "increase");
    }
  };

  const handleDecrease = async (productId, currentQty) => {
    if (currentQty <= 1) return;

    try {
      startLoading(productId, "decrease");
      await updateToCart({ productId, quantity: currentQty - 1 }).unwrap();
    } catch (err) {
      toast.error("Failed to decrease quantity!");
      console.error(err);
    } finally {
      stopLoading(productId, "decrease");
    }
  };

  const handleRemove = async (productId) => {
    try {
      startLoading(productId, "delete");
      await removeCartItem({ productId }).unwrap();
      toast.success("Item removed from cart!");
    } catch (err) {
      toast.error("Failed to remove item!");
      console.error(err);
    } finally {
      stopLoading(productId, "delete");
    }
  };

const crateOrder = async () => {
  try {
    setOrderLoading(true);
    const res = await createOrder().unwrap();

    const clientSecret = res?.data?.clientSecret;
    const orderId = res?.data?.orderId;

    if (!clientSecret) {
      throw new Error("No client secret received");
    }

    // 👉 redirect to payment page
    router.push(`/payment?clientSecret=${clientSecret}&orderId=${orderId}`);

  } catch (err) {
    toast.error(err?.data?.message || "Failed to place order!");
    console.error(err);
  } finally {
    setOrderLoading(false);
  }
};

  const totalPrice = viewCart?.data?.totalPrice || 0;
  const totalQuantity = viewCart?.data?.totalQuantity || 0;

  return (
    <div className="px-3">
      <div className="flex items-center justify-between relative pt-6 pb-6">
        <Navigate />
        <h1 className="text-[16px] italic">Checkout</h1>
        <div></div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {viewCart?.data?.items?.map((item) => {
          const productId = item.product._id;
          const isAnyLoading =
            isLoadingAction(productId, "increase") ||
            isLoadingAction(productId, "decrease") ||
            isLoadingAction(productId, "delete");

          return (
            <div
              key={item._id}
              className="bg-[#1A0E2E] p-4 rounded-2xl border border-[#2A2448]"
            >
              <div className="flex justify-between items-center border-b border-[#2A2448] pb-4">
                <div className="flex gap-4 items-center">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={70}
                    height={70}
                    className="rounded-xl bg-[#FEE2E2]"
                  />
                  <div>
                    <h3 className="text-[16px]">{item.product.name}</h3>
                    <p className="text-sm text-gray-400">
                      {item.product.tags?.join(", ")}
                    </p>
                    <p className="text-[13px] text-gray-400 italic">
                      ${item.product.price}
                    </p>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleRemove(productId)}
                  disabled={isLoadingAction(productId, "delete")}
                  className="w-[40px] h-[40px] rounded-full bg-[#471b1bc4] flex justify-center items-center disabled:opacity-70"
                >
                  {isLoadingAction(productId, "delete") ? (
                    <span className="loader-border w-5 h-5 border-l-2 border-white rounded-full animate-spin"></span>
                  ) : (
                    <DeleteIco />
                  )}
                </button>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4">
                  {/* Decrease Button */}

                  <button
                    onClick={() => handleDecrease(productId, item.quantity)}
                    disabled={
                      isLoadingAction(productId, "decrease") ||
                      item.quantity <= 1
                    }
                    className={`w-10 h-10 rounded-full flex justify-center items-center ${
                      isLoadingAction(productId, "decrease")
                        ? "bg-purple-600 cursor-not-allowed"
                        : "bg-purple-600"
                    }`}
                  >
                    {isLoadingAction(productId, "decrease") ? (
                      <span className="loader-border w-5 h-5 border-l-2 border-white rounded-full animate-spin"></span>
                    ) : (
                      <Minus />
                    )}
                  </button>

                  {/* Quantity Display */}
                  <span className="font-semibold text-white w-6 text-center">
                    {item.quantity}
                  </span>

                  {/* Increase Button */}

                  <button
                    onClick={() => handleIncrease(productId, item.quantity)}
                    disabled={isLoadingAction(productId, "increase")}
                    className={`w-10 h-10 rounded-full flex justify-center items-center ${
                      isLoadingAction(productId, "increase")
                        ? "bg-purple-600 cursor-not-allowed"
                        : "bg-purple-600"
                    }`}
                  >
                    {isLoadingAction(productId, "increase") ? (
                      <span className="loader-border w-5 h-5 border-l-2 border-white rounded-full animate-spin"></span>
                    ) : (
                      <Plus />
                    )}
                  </button>
                </div>

                <span className="font-bold text-white">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Total Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-[#822CE7] p-4 flex justify-between items-center">
        <div>
          <p className="text-white font-bold">{totalQuantity} Items</p>
          <p className="text-[#1D1733] font-bold">${totalPrice}</p>
        </div>

        <button
          onClick={crateOrder}
          disabled={orderLoading}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {orderLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
              Processing...
            </>
          ) : (
            "Place Order"
          )}
        </button>
      </div>
    </div>
  );
}
