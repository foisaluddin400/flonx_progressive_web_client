'use client'
import { useState } from "react";
import Image from "next/image";
import Navigate from "@/components/shared/Navigate";
import Plus from "@/components/icon/Plus";
import ItemIco from "@/components/icon/ItemIco";
import { useParams } from "next/navigation";
import { useAddToCartMutation, useGetSingleProductQuery } from "@/redux/Api/venueApi";
import { toast } from "react-toastify";
import { PageLoader } from "@/components/Loading";

const ItemDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSingleProductQuery({ id });
  const product = data?.data;

  const [addToCart] = useAddToCartMutation();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!product?._id) return;

    try {
      setLoading(true);
      const res = await addToCart({
        productId: product._id,
        quantity: qty,
      }).unwrap();

      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <PageLoader></PageLoader>;

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between pt-6 pb-4 px-3">
        <Navigate />
        <h1 className="text-[16px] italic">Item Details</h1>
        <div />
      </div>

      {/* Image */}
      <div className="flex justify-center mt-8">
        <div className="w-[260px] h-[260px] z-20 rounded-3xl border border-purple-400/20 flex items-center justify-center">
          <Image
            src={product?.image}
            alt={product?.name}
            width={220}
            height={220}
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-br from-[#2A124B] to-[#140625] rounded-t-[60px] px-6 pt-36">

        {/* Info */}
        <div className="text-center">
          <h2 className="text-[20px] font-semibold">{product?.name}</h2>

          <p className="text-gray-400 text-[14px] italic mt-2">
            {product?.description}
          </p>

          <div className="inline-block text-[#22C55E] bg-[#22C55E33] p-1 rounded-full px-3 text-sm mt-2">
            • {product?.stock > 0 ? "In Stock" : "Out of Stock"}
          </div>

          <p className="mt-2 text-lg font-bold">৳ {product?.price}</p>
        </div>

        {/* Quantity */}
        <div className="flex items-center justify-center gap-8 mt-10">
          <button
            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            className="w-14 h-14 rounded-full bg-purple-500 text-2xl"
          >
            −
          </button>

          <span className="text-xl font-semibold">{qty}</span>

          <button
            onClick={() => setQty(qty + 1)}
            className="w-14 h-14 flex justify-center items-center rounded-full bg-purple-500 text-2xl"
          >
            <Plus />
          </button>
        </div>

        {/* Add To Cart */}
        <div className="mt-12">
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full flex justify-center items-center gap-4 py-3 rounded-full
            bg-gradient-to-br from-[#BB82FF] to-[#822CE7]
            shadow-lg"
          >
            <ItemIco />
            {loading ? "Adding..." : "Add To Cart"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ItemDetails;