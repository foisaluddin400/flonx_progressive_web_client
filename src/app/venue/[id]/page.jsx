"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Plus from "../../../components/icon/Plus";
import Arrow from "../../../components/icon/Arrow";
import Link from "next/link";
import ItemIco from "../../../components/icon/ItemIco";
import LocationIco from "../../../components/icon/LocationIco";
import {
  useAddToCartMutation,
  useGetSingleVenueProductsQuery,
  useGetSingleVenueQuery,
  useGetViewCartQuery,
} from "@/redux/Api/venueApi";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { useGetCategoryQuery } from "@/redux/Api/categoryApi";
import { Input, Spin } from "antd";
import { toast } from "react-toastify";
import { PageLoader } from "@/components/Loading";
import NoData from "@/components/NoData";

export default function Venue() {
  const { id } = useParams();
  const [addToCart] = useAddToCartMutation();
  const [loadingIds, setLoadingIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [allVenues, setAllVenues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const { data: viewCart } = useGetViewCartQuery();

  const { data: getSingleVenue, isLoading: isVenueLoading } =
    useGetSingleVenueQuery({ id });
    console.log(getSingleVenue)

  const { data: getSinglecategory, isLoading: isCategoryLoading } =
    useGetCategoryQuery({ id });

  const queryParams = {
    id,
    ...(category && { category }),
    ...(searchTerm && { searchTerm }),
    page: currentPage,
    limit: 10,
  };

  const { data: singleVenueProducts, isLoading: isProductsLoading, isFetching: isProductsFetching } =
  useGetSingleVenueProductsQuery(queryParams, {
    refetchOnMountOrArgChange: true, 
  });

  useEffect(() => {
    if (singleVenueProducts?.data?.result) {
      if (currentPage === 1) {
        setAllVenues(singleVenueProducts.data.result);
      } else {
        setAllVenues((prev) => [...prev, ...singleVenueProducts.data.result]);
      }
    }
  }, [singleVenueProducts, currentPage]);
useEffect(() => {
  setCurrentPage(1);
  setAllVenues([]);
}, [searchTerm, category]);


useEffect(() => {
  if (singleVenueProducts?.data?.result) {
    if (currentPage === 1) {
      setAllVenues(singleVenueProducts.data.result);
    } else {
      setAllVenues((prev) => [...prev, ...singleVenueProducts.data.result]);
    }
  }
}, [singleVenueProducts, currentPage, category, searchTerm]); 



  const handleAddToCart = async (productId) => {
    try {
      setLoadingIds((prev) => [...prev, productId]);
      const res = await addToCart({ productId, quantity: 1 }).unwrap();
      toast.success(res?.message);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message);
    } finally {
      setLoadingIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  // ================= VENUE LOADING =================
  if (isVenueLoading) {
    return (
     <PageLoader></PageLoader>
    );
  }

  // ================= FIRST PAGE PRODUCTS LOADING =================
  const isFirstLoad = (isProductsLoading || isProductsFetching) && allVenues.length === 0;
  return (
    <div className="pt-16 px-3 pb-40">
      <Navbar />

      {/* Venue Info */}
      <div className="mt-6 bg-[#1A0E2E] rounded-2xl p-4 border border-[#2A2448]">
        <Link href={`/shopDetails/${getSingleVenue?.data?._id}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src={getSingleVenue?.data?.logo || "/img/shopImage.png"}
                alt={getSingleVenue?.data?.name}
                width={70}
                height={70}
                className="rounded-2xl"
              />
              <div>
                <h2 className="text-white font-semibold">
                  {getSingleVenue?.data?.name}
                </h2>
                <span
                  className={`text-sm ${
                    getSingleVenue?.data?.isOpen
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {getSingleVenue?.data?.isOpen ? "• Open" : "• Closed"}
                </span>
                <p className="text-gray-400 text-xs flex items-center gap-1">
                  <LocationIco />
                  {getSingleVenue?.data?.address}
                </p>
              </div>
            </div>
            <Arrow />
          </div>
        </Link>
      </div>

      {/* 🔍 SEARCH */}
      <div className="mt-4">
        <Input
          placeholder="Search product..."
          value={searchTerm}
          className="custom-input"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 🧠 CATEGORY */}
      {isCategoryLoading ? (
      
          <PageLoader></PageLoader>
       
      ) : (
        <div className="flex gap-3 mt-6 overflow-x-auto">
          <button
            onClick={() => setCategory("")}
            className={`px-5 py-2 rounded-full ${
              category === ""
                ? "bg-purple-600 text-white"
                : "bg-[#1E1233] text-gray-300"
            }`}
          >
            All
          </button>

          {getSinglecategory?.data?.result?.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setCategory(cat._id)}
              className={`px-5 py-2 rounded-full ${
                category === cat._id
                  ? "bg-purple-600 text-white"
                  : "bg-[#1E1233] text-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* 🛒 PRODUCTS */}
      <div className="mt-6 space-y-4">

        {/* FIRST PAGE LOADING */}
        {isFirstLoad ? (
         <PageLoader></PageLoader>
        ) : (
          <>
            {/* NO DATA */}
            {!isProductsFetching && allVenues.length === 0 && (
             
                <NoData></NoData>
                
           
            )}

            {/* PRODUCT LIST */}
            {allVenues.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-[#1A0E2E] p-4 rounded-2xl"
              >
                <Link
                  href={`/itemDetails/${item._id}`}
                  className="flex gap-4 items-center"
                >
                  <Image
                    src={item.image || "/img/shopImage.png"}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-xl"
                  />
                  <div>
                    <h3>{item.name}</h3>
                    <p className="text-sm text-gray-400">
                      {item.tags?.join(", ")}
                    </p>
                    <p className="font-bold">${item.price}</p>
                  </div>
                </Link>

                <button
                  onClick={() => handleAddToCart(item._id)}
                  disabled={loadingIds.includes(item._id)}
                  className="w-10 h-10 rounded-full flex justify-center items-center bg-purple-600"
                >
                  {loadingIds.includes(item._id) ? (
                    <span className="w-5 h-5 border-l-2 border-white rounded-full animate-spin"></span>
                  ) : (
                    <Plus />
                  )}
                </button>
              </div>
            ))}

            {/* LOAD MORE SPINNER (pagination) */}
            {isProductsFetching && currentPage > 1 && (
             <PageLoader></PageLoader>
            )}
          </>
        )}
      </div>

      {/* 💰 CHECKOUT */}
      {viewCart?.data?.items?.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-[#822CE7] px-6 py-4 flex items-center justify-between shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="border border-white w-[45px] h-[45px] flex justify-center items-center rounded-lg">
              <ItemIco />
            </div>
            <div>
              <p className="text-[16px] font-bold text-white">
                {viewCart?.data?.totalQuantity} Items
              </p>
              <p className="text-[16px] font-bold text-[#1D1733]">
                ${viewCart?.data?.totalPrice}
              </p>
            </div>
          </div>

          <Link href={`/checkout`}>
            <button className="bg-white text-black px-6 py-2 rounded-full font-semibold">
              Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}