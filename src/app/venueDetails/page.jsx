"use client";
import React from "react";
import Navigate from "@/components/shared/Navigate";
import Image from "next/image";
import { useGetCurrentShiftQuery } from "@/redux/Api/venueApi";
import NoData from "@/components/NoData";

const Page = () => {
  const { data: currentShiftData } = useGetCurrentShiftQuery();

  const shift =
    currentShiftData?.data?.currentShift ||
    currentShiftData?.data?.upcomingShift;

  const venue = shift?.venue;

  return (
    <div className="px-4 pt-6 pb-11">
      {/* HEADER */}
      <div className="flex justify-between">
        <Navigate />
        <h1 className="text-[16px] italic">Venue Details</h1>
        <div></div>
      </div>

      {/* NO DATA */}
      {!venue && (
      <NoData></NoData>
      )}

      {/* IMAGE */}
      {venue && (
        <>
          <div className="flex justify-center py-4">
            <Image
              className="w-[90px] h-[90px] object-cover rounded-2xl"
              src={venue?.logo}
              alt="Logo"
              width={100}
              height={100}
            />
          </div>

          {/* DETAILS */}
          <div>
            {/* NAME */}
            <div className="bg-[#1A0E2E] rounded-2xl p-4 border border-[#2A2448]">
              <h1 className="text-[#C9C6D6] text-sm mb-2">
                Venue Name
              </h1>
              <p>{venue?.name}</p>
            </div>

            {/* OWNER */}
            <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 border border-[#2A2448]">
              <h1 className="text-[#C9C6D6] text-sm mb-2">
                Owner ID
              </h1>
              <p>{venue?.venueOwner}</p>
            </div>

            {/* EMAIL */}
            <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 border border-[#2A2448]">
              <h1 className="text-[#C9C6D6] text-sm mb-2">
                Contact Email
              </h1>
              <p>{venue?.email}</p>
            </div>

            {/* PHONE */}
            <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 border border-[#2A2448]">
              <h1 className="text-[#C9C6D6] text-sm mb-2">
                Contact Number
              </h1>
              <p>{venue?.phone}</p>
            </div>

            {/* ADDRESS */}
            <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 border border-[#2A2448]">
              <h1 className="text-[#C9C6D6] text-sm mb-2">
                Venue Address
              </h1>
              <p>{venue?.address}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;