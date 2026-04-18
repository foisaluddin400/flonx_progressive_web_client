
'use client'
import { useState } from "react";
import Image from "next/image";
import JuicImage from "../../../public/img/juic.png";
import { ArrowLeft } from "lucide-react";
import LeftArray from "@/components/icon/LeftArray";
import Plus from "@/components/icon/Plus";

import Navigate from "@/components/shared/Navigate";
import Link from "next/link";
import ItemIco from "@/components/icon/ItemIco";

const ItemDetails = () => {
  const [qty, setQty] = useState(4);

  return (
    <div className="">

      {/* Top Header */}
      <div className="flex items-center justify-between relative pt-6 pb-4 px-3">
     <Navigate></Navigate>
        <h1 className="text-[16px] italic">
          Item Details
        </h1>
        <div></div>
      </div>

      {/* Image Card */}
      <div className="flex justify-center mt-8 relative z-10">
        <div className="w-[260px] h-[260px] rounded-3xl border border-purple-400/20  flex items-center justify-center">
          <Image
            src={JuicImage}
            alt="Mojito"
            width={220}
            height={220}
            priority
          />
        </div>
      </div>

      {/* Bottom Curved Section */}
      <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-br from-[#2A124B] to-[#140625] rounded-t-[60px] px-6 pt-36">

        {/* Item Info */}
        <div className="text-center">
          <h2 className="text-[20px] font-semibold">Mojito</h2>
          <p className="text-gray-400 text-[14px] italic mt-2">
            Rum, mint, lime, soda
          </p>

          <div className="inline-block text-[#22C55E] bg-[#22C55E33] p-1 rounded-full px-3 text-sm mt-2">
            • In Stock
          </div>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <button
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#822CE7] to-[#BB82FF] text-2xl flex items-center justify-center shadow-lg"
          >
            −
          </button>

          <span className="text-xl font-semibold">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#822CE7] to-[#BB82FF] text-2xl flex items-center justify-center shadow-lg"
          >
           <Plus></Plus>
          </button>
        </div>

        {/* Add To Cart Button */}
        <div className="mt-12">
          <Link href={'/'}><div className="w-full flex justify-center items-center gap-4 cursor-pointer py-3 rounded-full
            bg-gradient-to-br from-[#BB82FF] to-[#822CE7]
            shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300">
             
              <ItemIco></ItemIco>
           Add To Cart
          </div></Link>
        </div>

      </div>
    </div>
  );
};

export default ItemDetails;