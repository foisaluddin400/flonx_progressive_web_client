"use client";

import { PageLoader } from "@/components/Loading";
import NoData from "@/components/NoData";
import Navigate from "@/components/shared/Navigate";
import { useGetMyOrderQuery } from "@/redux/Api/stipApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MyOrder = () => {
  const [status, setStatus] = useState("CURRENT_ORDER");

  const { data: myOrder, isLoading, isFetching } = useGetMyOrderQuery({ status }); // ✅ isFetching যোগ

  if (isLoading) return <PageLoader />;

  return (
    <div className="px-3">
      {/* Header */}
      <div className="flex items-center justify-between relative pt-6 pb-6">
        <Navigate />
        <h1 className="text-[16px] italic">My Order</h1>
        <div></div>
      </div>

      {/* Status */}
      <div className="flex gap-3 mt-6 overflow-x-auto">
        <button
          className={`px-5 w-full py-2 rounded-full ${
            status === "CURRENT_ORDER"
              ? "bg-purple-600 text-white"
              : "bg-[#1A0830] text-white border border-[#2A2448]"
          }`}
          onClick={() => setStatus("CURRENT_ORDER")}
        >
          Current orders
        </button>

        <button
          className={`px-5 w-full py-2 rounded-full ${
            status === "PAST_ORDER"
              ? "bg-purple-600 text-white"
              : "bg-[#1A0830] text-white border border-[#2A2448]"
          }`}
          onClick={() => setStatus("PAST_ORDER")}
        >
          Past orders
        </button>
      </div>

      {/* ✅ Status change হলে এই অংশে PageLoader দেখাবে */}
      {isFetching ? (
        <PageLoader />
      ) : (
        <>
          {/* Orders */}
          <div className="space-y-4 mt-4">
            {myOrder?.data?.result?.map((order) => {
              const redirectPath =
                order?.status === "READY_FOR_PIC"
                  ? `/ready_for_pickup/${order?._id}`
                  : order?.status === "PICKED"
                    ? `/past_order_details/${order?._id}`
                    : `/myOrder/${order?._id}`;

              const statusStyle =
                order.status === "QUEUED"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : order.status === "READY_FOR_PIC"
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-green-500/20 text-green-400";

              return (
                <div
                  key={order._id}
                  className="bg-[#1A0E2E] rounded-2xl p-4 border border-[#2A2448]"
                >
                  <Link href={redirectPath}>
                    {/* Top */}
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h2 className="text-white font-semibold">
                          Order #{order.orderCode}
                        </h2>
                        <p className="text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${statusStyle}`}>
                        • {order.status}
                      </span>
                    </div>

                    {/* Products */}
                    <div className="space-y-3">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Image
                            src={item?.product?.image || "/img/shopImage.png"}
                            alt={item?.product?.name || "product"}
                            width={50}
                            height={50}
                            className="rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="text-white text-sm">
                              {item?.product?.name}
                            </p>
                            <p className="text-gray-400 text-xs">
                              Qty: {item?.quantity}
                            </p>
                          </div>
                          <p className="text-white font-semibold">
                            ${item?.price * item?.quantity}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Bottom */}
                    <div className="flex justify-between items-center mt-4 border-t border-[#2A2448] pt-3">
                      <p className="text-gray-400 text-sm">
                        Total Items: {order.totalQuantity}
                      </p>
                      <p className="text-white font-bold">${order.totalPrice}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {!myOrder?.data?.result?.length && <NoData />}
        </>
      )}
    </div>
  );
};

export default MyOrder;