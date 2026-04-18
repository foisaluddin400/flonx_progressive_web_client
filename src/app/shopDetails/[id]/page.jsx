'use client';
import Image from "next/image";
import Navigate from "@/components/shared/Navigate";
import { useGetSingleVenueQuery } from "@/redux/Api/venueApi";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { data: getSingleVenue } = useGetSingleVenueQuery({ id });

  const venue = getSingleVenue?.data;

  return (
    <div className="px-4 pt-6 pb-11">
      {/* Header */}
      <div className="flex justify-between">
        <Navigate />
        <h1 className="text-[16px] italic">Shop Details</h1>
        <div></div>
      </div>
 {/* Logo */}
      <div className="flex justify-center py-4">
        <Image
          className="w-[90px] h-[90px] object-cover rounded-2xl"
          src={venue?.logo || "/img/shopImage.png"}
          alt={venue?.name || "Logo"}
          width={100}
          height={100}
        />
      </div>

      {/* Info Cards */}
      <div>
        {/* Name */}
        <div className="bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Venue Name</h1>
          <p>{venue?.name}</p>
        </div>

        {/* Status */}
        <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Status</h1>
          <p className={venue?.isOpen ? "text-green-400" : "text-red-400"}>
            {venue?.isOpen ? "Open" : "Closed"}
          </p>
        </div>

        {/* Address */}
        <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Address</h1>
          <p>{venue?.address}</p>
        </div>

        {/* Email */}
        <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Email</h1>
          <p>{venue?.email}</p>
        </div>

        {/* Phone */}
        <div className="mt-4 bg-[#1A0E2E] rounded-2xl p-4 shadow-lg border border-[#2A2448]">
          <h1 className="text-[#C9C6D6] text-sm mb-2">Phone</h1>
          <p>{venue?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;