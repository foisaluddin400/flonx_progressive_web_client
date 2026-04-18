"use client";

import Navigate from "@/components/shared/Navigate";
import { useGetSingleOrderQuery } from "@/redux/Api/stipApi";
import { useParams } from "next/navigation";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const PastOrderDetails = () => {
  const { id } = useParams();
  const { data: singleOrder, isLoading } = useGetSingleOrderQuery({ id });
  const order = singleOrder?.data;

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-3  bg-[#0F0B1F] text-white">
      {/* Header */}
      <div className="flex items-center justify-between relative pt-6 pb-6">
        <Navigate />
        <h1 className="text-[16px] italic">My Order</h1>
        <div></div>
      </div>

      {/* Venue Info */}
      <div className="bg-[#1A0E2E] rounded-2xl p-4 flex items-center gap-3">
        <Image
          src={order?.venue?.logo || "/img/shopImage.png"}
          alt={order?.venue?.name || "Venue"}
          width={50}
          height={50}
          className="rounded-lg"
        />
        <div>
          <h2 className="font-semibold">{order?.venue?.name}</h2>
          <p className="text-gray-400 text-sm">{order?.venue?.address}</p>
        </div>
      </div>

      {/* Ordered On */}
      <div className="bg-[#1A0E2E] mt-4 p-4 rounded-2xl flex items-center gap-3">
        <div className="text-gray-400 text-sm">Ordered On</div>
        <div className="ml-auto">
          {new Date(order?.createdAt).toLocaleString()}
        </div>
      </div>

      {/* Items */}
      <div className="bg-[#1A0E2E] mt-4 p-4 rounded-2xl space-y-3">
        <h3 className="font-semibold text-lg">Items</h3>
        {order?.items?.map((item, i) => (
          <div key={i} className="flex justify-between items-center">
            <div>
              <p className="text-gray-300">{item.product.name}</p>
              <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${item.price * item.quantity}</p>
          </div>
        ))}

        {/* Total */}
        <div className="flex justify-between border-t border-gray-700 pt-2 mt-2">
          <p className="text-gray-400">Total</p>
          <p className="font-bold">${order?.totalPrice}</p>
        </div>
      </div>

      {/* Tip Bartender */}
      {order?.tipAmount ? (
        <div className="bg-[#1A0E2E] mt-4 p-4 rounded-2xl flex justify-between items-center">
          <p>You tipped the bartender</p>
          <p className="font-bold">${order.tipAmount}</p>
          <p>Order Code: {order.orderCode}</p>
        </div>
      ) : (
       <Link href={`/bartender/${order?._id}`}> <button className="w-full mt-4 py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold">
          Tip Bartender
        </button></Link>
      )}

      {/* Back Button */}
      <Link href={'/myOrder'}>
      <button className="w-full mt-4 py-4 rounded-full bg-white text-purple-600 font-semibold">
        Back To Orders
      </button></Link>
    </div>
  );
};

export default PastOrderDetails;