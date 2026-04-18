"use client";

import AppStore from "@/components/icon/AppStore";
import BrowserIco from "@/components/icon/BrowserIco";
import EyeIco from "@/components/icon/EyeIco";
import Mark from "@/components/icon/Mark";
import MarkTIco from "@/components/icon/MarkTIco";
import PickIco from "@/components/icon/PickIco";
import PlayStoreIco from "@/components/icon/PlayStoreIco";
import ScanIco from "@/components/icon/ScanIco";
import SecureIco from "@/components/icon/SecureIco";
import SupportIco from "@/components/icon/SupportIco";
import React from "react";

const HowWork = () => {
  return (
    <div className=" ">
      {/* ===== How It Works ===== */}
   <div className="px-3">
       <div className="pt-10 text-center">
        <h1 className="text-xl font-semibold">How It Works</h1>
        <p className="text-sm text-[#C9C6D6] mt-2">Simple. Quick. Reliable.</p>
      </div>

      <div className="mt-10 space-y-8">
        {[
          {
            title: "Scan the QR at the bar",
            desc: "Open FLŌNX instantly in your browser.",
            Icon: <ScanIco></ScanIco>
          },
          {
            title: "Browse & order drinks",
            desc: "See the full menu, choose your drinks, and pay securely.",
             Icon: <BrowserIco></BrowserIco>
          },
          {
            title: "Track your order",
            desc: "Watch your order move from Queued → In Progress → Ready.",
             Icon: <EyeIco></EyeIco>
          },
          {
            title: "Pick up with confidence",
            desc: "Show your unique color and code to the bartender and grab your drink.",
             Icon: <PickIco></PickIco>
          },
        ].map((item, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#822CE7] to-[#BB82FF] flex items-center justify-center text-xl">
              {item?.Icon}
            </div>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-[#C9C6D6] mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Why Download ===== */}
      <div className="mt-14 text-center">
        <h2 className="text-lg font-semibold">Why Download the App?</h2>
        <p className="text-sm text-[#C9C6D6] mt-3 max-w-md mx-auto">
          You can use FLŌNX without an account — but the app gives you more
          control.
        </p>
      </div>

      <div className="mt-8 bg-gradient-to-br from-[#2A124B] to-[#1A0830] rounded-3xl p-6 border border-[#2A2448]">
        <ul className="space-y-4 text-sm text-[#C9C6D6]">
          <h1 className="flex items-center gap-2"><Mark></Mark> Track current & past orders</h1>
          <h1 className="flex items-center gap-2"><Mark></Mark> Re-open orders faster</h1>
          <h1 className="flex items-center gap-2"><Mark></Mark> Discover nearby bars</h1>
          <h1 className="flex items-center gap-2"><Mark></Mark> Access future features like events & bartender booking</h1>
          <h1 className="flex items-center gap-2"><Mark></Mark> Enjoy a smoother, app-optimized experience</h1>
        </ul>
      </div>

      {/* ===== Get the App ===== */}
      <div className="mt-14 text-center">
        <h2 className="text-lg font-semibold">Get the App</h2>
        <p className="text-sm text-[#C9C6D6] mt-2">
          Available on iOS & Android
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="w-full flex justify-center gap-3 items-center py-4 rounded-full bg-[#822CE7] font-semibold shadow-lg">
          <AppStore></AppStore> Download on the App Store
        </div>

        <button className="w-full flex justify-center gap-3 items-center py-4 rounded-full bg-[#822CE7] font-semibold shadow-lg">
          <PlayStoreIco></PlayStoreIco> Get it on Google Play
        </button>

        <p className="text-center text-sm text-[#C9C6D6] mt-2">
          • Takes less than a minute to install
        </p>
      </div>

      {/* ===== Good to Know ===== */}
      <div className="mt-14 text-center">
        <h2 className="text-lg font-semibold">Good to Know</h2>
      </div>

      <div className="mt-6  space-y-4 text-sm text-[#C9C6D6]">
        <p className="flex items-center gap-3"><SecureIco></SecureIco> Secure payments powered by Stripe</p>
        <p className="flex items-center gap-3"><SupportIco></SupportIco> Supports Apple Pay, Google Pay, and Cards</p>
        <p className="flex items-center gap-3"><MarkTIco></MarkTIco> Supports Apple Pay, Google Pay, and Cards</p>
      </div>
   </div>

      {/* ===== Bottom Light Section ===== */}
      <div className=" bottom-0 left-0 w-full mt-11 bg-[#E5E5E5] text-black  p-4">
        <div className="text-center">
          <h3 className="font-semibold">Continue Without App</h3>
          <p className="text-sm text-gray-600 mt-2">
            Prefer not to download right now?
          </p>
          <p className="text-sm text-gray-600">
            You can continue ordering directly in your browser — the app is
            optional.
          </p>
        </div>

        <button className="mt-6 w-full py-3 rounded-full bg-[#822CE7] text-white font-semibold">
          Continue in Browser →
        </button>
      </div>
    </div>
  );
};

export default HowWork;
