"use client";

import { useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/Api/stipApi";
import { PageLoader } from "@/components/Loading";

const ReadyForPickup = () => {
  const { id } = useParams();
  console.log(id)
  const router = useRouter();

  const { data: singleOrder } = useGetSingleOrderQuery({ id });
  console.log(singleOrder) 
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);

  if (isLoading) return <PageLoader></PageLoader>;

  const order = singleOrder?.data;
const color = order?.colorCode || "#F97316";
  // 👉 Move handle
  const handleMove = (clientX) => {
    if (!dragging) return;

    const rect = sliderRef.current.getBoundingClientRect();
    let newX = clientX - rect.left - 28;

    const max = rect.width - 56;

    if (newX < 0) newX = 0;
    if (newX > max) newX = max;

    setPosition(newX);
  };

  // 👉 End handle
  const handleEnd = async () => {
  setDragging(false);

  const rect = sliderRef.current.getBoundingClientRect();
  const max = rect.width - 56;

  if (position >= max * 0.9) {
    setPosition(max);

    try {
      setIsLoading(true); // 👉 start loading

      await updateOrderStatus({
        id: order?._id,
        data: { status: "PICKED" },
      }).unwrap();

      router.push(`/completeOrder/${order?._id}`);
    } catch (err) {
      console.error(err);
      setPosition(0);
    } finally {
      setIsLoading(false); // 👉 stop loading
    }
  } else {
    setPosition(0);
  }
};

  return (
   <div
  className="min-h-screen text-white flex flex-col justify-between p-6"
  style={{
    backgroundColor: color,
  }}
>
      
      {/* Title */}
      <h1 className="text-center text-lg italic">
        Ready for pickup
      </h1>

      {/* Order Code */}
      <div className="text-center">
        <h1 className="text-7xl font-bold tracking-widest">
          {order?.orderCode || "----"}
        </h1>
        <p className="text-xl mt-3 opacity-90">
          Pickup Code
        </p>
      </div>

      {/* Slider */}
      <div>
       <div
  ref={sliderRef}
  className="relative bg-[#D9D9D9] h-14 rounded-full flex items-center px-2 overflow-hidden"
>
  <span className="absolute inset-0 flex items-center justify-center text-gray-700 font-medium">
    {isLoading ? "Processing..." : "Slide to confirm"}
  </span>

  <div
    onMouseDown={() => !isLoading && setDragging(true)}
    onMouseUp={handleEnd}
    onMouseLeave={handleEnd}
    onMouseMove={(e) => handleMove(e.clientX)}
    onTouchStart={() => !isLoading && setDragging(true)}
    onTouchEnd={handleEnd}
    onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    style={{
      left: position,
      transition: dragging ? "none" : "all 0.3s ease",
      pointerEvents: isLoading ? "none" : "auto",
      background: color, // 👉 dynamic colorCode
    }}
    className="absolute w-14 h-14 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
  >
    {isLoading ? (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    ) : (
      "Slide"
    )}
  </div>
</div>

        <p className="text-center mt-4 text-sm opacity-80">
          • Copper Alley Bar
        </p>
      </div>
    </div>
  );
};

export default ReadyForPickup;