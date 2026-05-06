

import LeftArray from "@/components/icon/LeftArray";

import React from "react";
import logo from "../../../public/img/logo.png";
import Image from "next/image";
import Glass from "@/components/icon/Glass";
import Mark from "@/components/icon/Mark";
import HomeIco from "@/components/icon/HomeIco";
import HowWork from "./HowWork";
import Navigate from "@/components/shared/Navigate";
import Link from "next/link";
const JoinNow = () => {


  return (
    <div className="">
      {/* Header */}
      <div className="px-3">
        <div className="flex items-center justify-between relative pt-6">
        <Navigate></Navigate>

          <h1 className="text-[16px] italic">Join Now</h1>
          <div></div>
        </div>

        {/* Logo Section */}
        <div className="text-center mt-12">
          <div className="flex justify-center">
            <Image src={logo} alt="Logo" width={120} height={40} priority />
          </div>

          <h3 className="mt-8 text-2xl font-semibold leading-snug">
            Faster orders. No lines. <br />
            Better nights.
          </h3>

          <p className="mt-6 text-[#C9C6D6] text-sm leading-relaxed max-w-md mx-auto">
            FLŌNX lets you order drinks, track your order in real time, and pick
            up faster — right from your phone.
          </p>

          <p className="mt-4 text-gray-400 text-sm">
            No waiting. No shouting. No confusion.
          </p>
        </div>

        {/* Card 1 */}
        <div className="mt-12 bg-gradient-to-br from-[#2A124B] to-[#1A0830] rounded-3xl p-3 shadow-xl border border-[#2A2448]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#822CE7] to-[#BB82FF] flex items-center justify-center">
              <Glass></Glass>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Join as a Bartender</h4>
              <p className="text-sm text-[#C9C6D6]">For professionals</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-[#C9C6D6]">
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Create a bartender profile
            </h1>
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Receive tips via Stripe
            </h1>
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Accept bar & private event gigs
            </h1>
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Get rated and reviewed
            </h1>
          </ul>

          <Link href="https://flonx-bartender-flow-client.vercel.app/joinAs">
          <button className="mt-8 w-full py-3 rounded-full bg-gradient-to-r from-[#822CE7] to-[#BB82FF] font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition">
            Join as Bartender
          </button></Link>
        </div>

        {/* Card 2 */}
        <div className="mt-8 bg-gradient-to-br from-[#2A124B] to-[#1A0830] rounded-3xl p-3 shadow-xl border border-[#2A2448]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#822CE7] to-[#BB82FF] flex items-center justify-center">
              <HomeIco></HomeIco>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Join as a Bar Owner</h4>
              <p className="text-sm text-[#C9C6D6]">For venues</p>
            </div>
          </div>

          <ul className="mt-6 space-y-3 text-sm text-[#C9C6D6]">
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Create your bar profile
            </h1>
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Access the admin dashboard
            </h1>
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Add menus & prices
            </h1>
            <h1 className="flex items-center gap-2">
              <Mark></Mark> Invite and manage bartenders
            </h1>
          </ul>

          <Link href={'https://flonx-venue-owner-dashboard-client.vercel.app/joinAs'}>
          <button className="mt-8 w-full py-3 rounded-full bg-gradient-to-r from-[#822CE7] to-[#BB82FF] font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition">
        Join as a venue

          </button></Link>
        </div>
      </div>
      <HowWork></HowWork>
    </div>
  );
};

export default JoinNow;
