"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../../../public/img/logo.png";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdDeleteOutline, MdOutlineNotificationImportant } from "react-icons/md";
import { useDeleteNotificationMutation, useGetNotificationQuery, useSeeAllNotificationsMutation } from "@/redux/Api/webmanageApi";
import { toast } from "react-toastify";

export const Navbar = () => {
const { data: notificationData } = useGetNotificationQuery();
const [deleteNotification] = useDeleteNotificationMutation();
  const [allSeeNotification]  = useSeeAllNotificationsMutation();
  const [showNotifications, setShowNotifications] = useState(false);
const notifications = notificationData?.data?.result || [];
const unreadCount = notificationData?.data?.meta?.unreadCount || 0;
 const handleReadAll = async () => {
  try {
    await allSeeNotification().unwrap();
  } catch (error) {
    console.log(error);
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};
const handleDeleteNotification = async (id) => {
  try {
    const res = await deleteNotification(id).unwrap();
    toast.success(res?.message || "Notification deleted");
  } catch (error) {
    console.log(error);
    toast.error(error?.data?.message || "Failed to delete notification");
  }
};
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#822CE71A] backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-3 md:px-12 py-4">
        {/* Left - Logo */}
        <Link href="/">
          <Image src={logo} alt="Logo" width={120} height={40} priority />
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2 relative">
          {/* Notification Button */}
         

          <Link href="/myOrder">
            <button
              className="px-3 py-2 text-sm rounded-full text-[#BB82FF] font-semibold
              border border-[#822CE7]
              hover:scale-105 active:scale-95
              transition-all duration-300 shadow-md hover:shadow-lg"
            >
              My Order
            </button>
          </Link>

          <Link href="/joinNow">
            <button
              className="px-3 py-2 text-base rounded-full text-white font-semibold
              bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]
              hover:scale-105 active:scale-95
              transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Join Now
            </button>
          </Link>

           <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 rounded-full text-white 
              bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]
              hover:scale-105 active:scale-95
              transition-all duration-300 shadow-md hover:shadow-lg"
          >
           <MdOutlineNotificationImportant  className="text-2xl"/>

           {unreadCount > 0 && (
    <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-[10px] font-bold text-white bg-red-500 rounded-full">
      {unreadCount}
    </span>
  )}
          </button>

          {/* Notification Popup */}
          {showNotifications && (
  <div className="absolute top-14 right-0 w-[380px] bg-[#1A102C] border border-[#822CE7]/30 rounded-2xl shadow-2xl overflow-hidden">

    {/* Header */}
    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#822CE7] to-[#BB82FF]">
      <div>
        <h3 className="font-semibold text-white">Notifications</h3>
        <p className="text-xs text-white/80">
          {unreadCount} unread
        </p>
      </div>

      {notifications.length > 0 && (
        <button
          onClick={handleReadAll}
          className="text-xs bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
        >
          Mark all read
        </button>
      )}
    </div>

    {/* Body */}
    <div className="max-h-[450px] overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((item) => (
          <div
            key={item._id}
            className={`p-4 border-b border-white/10 hover:bg-[#25153f] transition ${
              !item.isRead ? "bg-[#24123f]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
  <div className="flex-1">
    <div className="flex items-center gap-2 mb-1">
      <span className="text-xs px-2 py-1 rounded-full bg-[#822CE7]/20 text-[#BB82FF]">
        {item.type.replaceAll("_", " ")}
      </span>

      {!item.isRead && (
        <span className="w-2 h-2 rounded-full bg-red-500" />
      )}
    </div>

    <h4 className="font-semibold text-white">
      {item.title}
    </h4>

    <p className="text-sm text-gray-300 mt-1">
      {item.message}
    </p>

    {item?.data?.meta?.orderCode && (
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
          Order #{item.data.meta.orderCode}
        </span>

        {item?.data?.meta?.status && (
          <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-300">
            {item.data.meta.status}
          </span>
        )}
      </div>
    )}

    <p className="text-[11px] text-gray-500 mt-2">
      {formatDate(item.createdAt)}
    </p>
  </div>

  {/* Delete Button */}
  <button
    onClick={() => handleDeleteNotification(item._id)}
    className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
  >
    <MdDeleteOutline className="text-xl" />
  </button>
</div>
          </div>
        ))
      ) : (
        <div className="p-10 text-center">
          <MdOutlineNotificationImportant className="mx-auto text-5xl text-gray-500 mb-3" />
          <p className="text-gray-400">No notifications found</p>
        </div>
      )}
    </div>
  </div>
)}
        </div>
      </div>
    </nav>
  );
};