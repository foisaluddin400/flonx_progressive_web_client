'use client'
import CompleteOrderIco from "@/components/icon/CompleteOrderIco";
import LeftArray from "@/components/icon/LeftArray";
import Navigate from "@/components/shared/Navigate";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const CompleteOrder = () => {
    const {id} = useParams(); 
  return (
    <div className="px-3">
      <div className="flex items-center justify-between relative pt-6 pb-6">
        <Link href={'/myOrder'}> <button className=" w-10 h-10  rounded-full border border-purple-400/30 flex items-center justify-center bg-white/5 backdrop-blur-md">
          <LeftArray></LeftArray>
        </button></Link>
        <h1 className="text-[16px] italic">My Order</h1>
        <div></div>
      </div>
      <div className="text-center">
    <div className="flex justify-center py-3">
            <CompleteOrderIco></CompleteOrderIco>
    </div>
        <h1 className="text-[24px]">Order Completed</h1>
        <p className="text-[13px]">Thank you for your order! Enjoy your drinks.</p>
      </div>
     <Link href={`/bartender/${id}`}> <button
        className="w-full py-3 mt-5 rounded-full
            bg-gradient-to-br from-[#BB82FF] to-[#822CE7]
            shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
      >
        Tip Bartender
      </button></Link>
     <Link href={'/myOrder'}> <button
        className="w-full py-3 mt-6 rounded-full
            bg-[white] 
            shadow-lg text-[#822CE7]"
      >
        Order Again
      </button></Link>
    </div>
  );
};

export default CompleteOrder;
