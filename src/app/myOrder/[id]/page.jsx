"use client";

import PrgressIco from "@/components/icon/PrgressIco";
import QueuedIco from "@/components/icon/QueuedIco";
import Navigate from "@/components/shared/Navigate";
import { useParams } from "next/navigation";
import { useGetSingleOrderQuery } from "@/redux/Api/stipApi";
import { PageLoader } from "@/components/Loading";

const SingleOrder = () => {
  const { id } = useParams();
console.log(id)
  const { data: singleOrder, isLoading } = useGetSingleOrderQuery({ id });
  console.log(singleOrder)
  

  if (isLoading) return <PageLoader></PageLoader>;

  const order = singleOrder?.data;

  // 🎯 Status Config
  const statusConfig = {
    QUEUED: {
      text: "Queued",
      subText: "Your order is waiting in queue",
      textColor: "#FFB020",
      bg: "#F973161A",
      border: "#F97316",
      icon: <QueuedIco />,
    },
    IN_PROGRESS: {
      text: "In Progress",
      subText: "Your drink is being prepared",
      textColor: "#22C55E",
      bg: "#126b333f",
      border: "#22C55E",
      icon: <PrgressIco />,
    },
  };

  const currentStatus = statusConfig[order?.status] || statusConfig.QUEUED;

  return (
    <div className="px-3">
      {/* Header */}
      <div className="flex items-center justify-between relative pt-6 pb-6">
        <Navigate />
        <h1 className="text-[16px] italic">My Order</h1>
        <div></div>
      </div>

      {/* Order Info */}
      <div>
        {/* Order Code */}
        <div
          className="p-11 rounded-3xl text-center"
          style={{
            backgroundColor: currentStatus.textColor,
          }}
        >
          <h1 className="text-4xl font-bold">{order?.orderCode || "----"}</h1>
          <p className="text-2xl">Order Code</p>
        </div>

        {/* Status Box */}
        <div
          className="mt-6 flex gap-2 items-center p-3 rounded-xl"
          style={{
            backgroundColor: currentStatus.bg,
            border: `1px solid ${currentStatus.border}`,
          }}
        >
          <div
            className="flex justify-center items-center w-[50px] h-[50px] rounded-xl"
            style={{ border: `1px solid ${currentStatus.border}` }}
          >
            {currentStatus.icon}
          </div>

          <div>
            <h1
              className="font-semibold"
              style={{ color: currentStatus.textColor }}
            >
              {currentStatus.text}
            </h1>
            <p className="text-[#8C88A3]">{currentStatus.subText}</p>
          </div>
        </div>

        {/* Bottom Text */}
        <p className="text-center pt-2 text-[#C9C6D6]">
          We'll update you when your order is ready
        </p>
      </div>
    </div>
  );
};

export default SingleOrder;
