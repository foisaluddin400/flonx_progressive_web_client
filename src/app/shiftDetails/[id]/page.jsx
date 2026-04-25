"use client";
import React, { useRef, useState } from "react";
import Navigate from "@/components/shared/Navigate";
import ShopDetailsIco from "@/components/icon/ShopDetailsIco";
import LocationIco from "@/components/icon/LocationIco";
import DateIcon from "@/components/icon/DateIcon";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { useGetCurrentShiftQuery } from "@/redux/Api/venueApi";
import {
  useGetMyOrderQuery,
  useMarkUnavailableMutation,
  useUpdateStatusMutation,
} from "@/redux/Api/stipApi";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { PageLoader } from "@/components/Loading";
import NoData from "@/components/NoData";

const Page = () => {
  const sliderRef = useRef(null);
  const [sliderState, setSliderState] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const [loadingType, setLoadingType] = useState("");
  const { data: currentShiftData, isLoading: isShiftLoading } = useGetCurrentShiftQuery();

  const currentShift = currentShiftData?.data?.currentShift;
  const shiftId = currentShift?._id;

  const [activeTab, setActiveTab] = useState("QUEUED");

  const { data: myOrder, refetch, isLoading: isOrderLoading } = useGetMyOrderQuery(
    { status: activeTab, shift: shiftId },
    { skip: !shiftId },
  );

  const [updateStatus] = useUpdateStatusMutation();
  const [markUnavail] = useMarkUnavailableMutation();

  const orders = myOrder?.data?.result || [];

  // ================= HANDLERS =================

  const handleMarkUnavailable = async (id) => {
    try {
      setLoadingId(id);
      setLoadingType("mark");
      const res = await markUnavail(id).unwrap();
      toast.success(res?.message || "Marked as unavailable");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to mark as unavailable");
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleUpdateStatus = async (id, status, type) => {
    try {
      setLoadingId(id);
      setLoadingType(type);
      await updateStatus({ id, data: { status } }).unwrap();
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingId(null);
    }
  };

  const handleMove = (clientX, orderId) => {
    if (!sliderState[orderId]?.dragging) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let newX = clientX - rect.left - 28;
    const max = rect.width - 56;
    if (newX < 0) newX = 0;
    if (newX > max) newX = max;
    setSliderState((prev) => ({
      ...prev,
      [orderId]: { ...prev[orderId], position: newX },
    }));
  };

  const handleEnd = async (orderId) => {
    const state = sliderState[orderId];
    if (!state) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const max = rect.width - 56;
    if (state.position >= max * 0.9) {
      await handleUpdateStatus(orderId, "READY_FOR_PIC", "ready");
    }
    setSliderState((prev) => ({
      ...prev,
      [orderId]: { dragging: false, position: 0 },
    }));
  };

  // ================= UI HELPERS =================

  const getBgColor = (status) => {
    switch (status) {
      case "QUEUED": return "bg-[#F97316]";
      case "IN_PROGRESS": return "bg-[#22C55E]";
      case "READY_FOR_PIC": return "bg-[#822CE7]";
      case "PICKED": return "bg-[#3D8BFF]";
      case "CANCELLED": return "bg-[#EF4444]";
      default: return "bg-gray-500";
    }
  };

  // ================= SHIFT LOADING =================

  if (isShiftLoading) {
    return (
     <PageLoader></PageLoader>
    );
  }

  return (
    <div className="px-3">
      <Navbar />

      {/* HEADER */}
      <div className="flex items-center justify-between pt-24 pb-6">
        <div className="flex items-center gap-3">
          <Navigate />
          <h2 className="text-[16px] italic">Shifts Details</h2>
        </div>

        <Link href={"/venueDetails"}>
          <button className="border flex gap-2 border-[#822CE7] text-[#822CE7] px-4 py-2 rounded-full text-sm">
            <ShopDetailsIco /> Venue Details
          </button>
        </Link>
      </div>

      {/* SHIFT CARD */}
      {currentShift ? (
        <div className="bg-gradient-to-r from-[#1A0E2E] to-[#241046] p-4 rounded-2xl mb-6 flex justify-between items-center">
          <div className="flex gap-3">
            <img
              className="w-[70px] h-[70px] object-cover rounded-2xl"
              src={currentShift?.venue?.logo}
              alt=""
            />
            <div>
              <h3 className="font-semibold text-[18px]">
                {currentShift?.venue?.name}
              </h3>
              <p className="text-[#C9C6D6] text-[12px] flex gap-1 items-center">
                <LocationIco /> {currentShift?.venue?.address}
              </p>
              <p className="text-[#C9C6D6] text-[12px] flex gap-1 items-center">
                <DateIcon />
                {new Date(currentShift?.startDateTime).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="text-right text-sm">
            <p>Shift Rate</p>
            <p className="font-semibold">${currentShift?.shiftRate}</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#1A0E2E] p-5 rounded-2xl text-center text-gray-400">
          No current shift → orders hidden
        </div>
      )}

      {/* ONLY IF SHIFT EXISTS */}
      {currentShift && (
        <>
          {/* TABS */}
          <div className="flex gap-3 mb-6 overflow-x-auto px-1">
            {[
              { label: "Queued", value: "QUEUED" },
              { label: "In Progress", value: "IN_PROGRESS" },
              { label: "Ready For Pickup", value: "READY_FOR_PIC" },
              { label: "Picked", value: "PICKED" },
              { label: "Cancelled", value: "CANCELLED" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-full border ${
                  activeTab === tab.value
                    ? "border-white text-white"
                    : "border-gray-600 text-gray-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ORDER LOADING */}
          {isOrderLoading ? (
            <PageLoader></PageLoader>
          ) : (
            <>
              {/* EMPTY */}
              {orders.length === 0 && (
                <NoData></NoData>
              )}

              {/* ORDERS */}
              {orders.map((order) => (
                <div
                  key={order._id}
                  className={`${getBgColor(order.status)} text-white rounded-2xl p-4 mb-5`}
                >
                  {/* HEADER */}
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-sm opacity-80">Order Code</p>
                      <h3 className="text-xl font-bold">{order.orderCode}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-80">Placed At</p>
                      <p>{new Date(order.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  {/* ITEMS */}
                  <div className="border-t border-white/40 pt-3 text-sm">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between mb-2">
                        <div>
                          <p className="italic">{item.product.name}</p>
                          <p className="opacity-80">Quantity: {item.quantity}</p>
                        </div>
                        <p>${item.price}</p>
                      </div>
                    ))}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex border-t border-white/40 pt-3 gap-3 mt-4 flex-col">

                    {/* QUEUED */}
                    {order.status === "QUEUED" && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleMarkUnavailable(order._id)}
                          disabled={loadingId === order._id}
                          className={`flex-1 py-2 rounded-full flex justify-center items-center gap-2 ${
                            loadingId === order._id ? "bg-gray-300 text-black" : "bg-white text-black"
                          }`}
                        >
                          {loadingId === order._id && loadingType === "mark" ? (
                            <><Spin size="small" /><span>Processing...</span></>
                          ) : (
                            "Mark Unavailable"
                          )}
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(order._id, "IN_PROGRESS", "start")}
                          disabled={loadingId === order._id}
                          className={`flex-1 py-2 rounded-full flex justify-center items-center gap-2 ${
                            loadingId === order._id ? "bg-gray-300 text-black" : "bg-white text-black"
                          }`}
                        >
                          {loadingId === order._id && loadingType === "start" ? (
                            <><Spin size="small" /><span>Starting...</span></>
                          ) : (
                            "Start Making"
                          )}
                        </button>
                      </div>
                    )}

                    {/* IN_PROGRESS */}
                    {order.status === "IN_PROGRESS" && (
                      <div
                        ref={sliderRef}
                        className="relative bg-[#D9D9D9] h-14 rounded-full flex items-center px-2 overflow-hidden"
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-medium">
                          Slide to confirm
                        </span>
                        <div
                          onMouseDown={() =>
                            setSliderState((prev) => ({
                              ...prev,
                              [order._id]: { ...prev[order._id], dragging: true },
                            }))
                          }
                          onMouseUp={() => handleEnd(order._id)}
                          onMouseLeave={() => handleEnd(order._id)}
                          onMouseMove={(e) => handleMove(e.clientX, order._id)}
                          onTouchStart={() =>
                            setSliderState((prev) => ({
                              ...prev,
                              [order._id]: { ...prev[order._id], dragging: true },
                            }))
                          }
                          onTouchEnd={() => handleEnd(order._id)}
                          onTouchMove={(e) => handleMove(e.touches[0].clientX, order._id)}
                          style={{
                            left: sliderState[order._id]?.position || 0,
                            transition: sliderState[order._id]?.dragging ? "none" : "all 0.3s ease",
                          }}
                          className="absolute w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full flex items-center justify-center text-white cursor-pointer"
                        >
                          Slide
                        </div>
                      </div>
                    )}

                    {/* READY */}
                    {order.status === "READY_FOR_PIC" && (
                      <button className="w-full bg-white text-black py-2 rounded-full">
                        Waiting for pickup
                      </button>
                    )}

                    {/* PICKED */}
                    {order.status === "PICKED" && (
                      <button className="w-full border py-2 rounded-full">
                        Completed
                      </button>
                    )}

                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Page;