"use client";

import { usePathname } from "next/navigation";

import Footer from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import GuestLoginEffect from "@/components/HomePage/GuestLoginEffect";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  const hideNavbarFooter =
    pathname === "/signIn" ||
    pathname === "/signUp" ||
    pathname === "/signIn/forgot" ||
    pathname === "/signIn/verify" ||
    pathname === "/signIn/newpass" ||
    pathname === "/signUp/done" ||
    pathname === "/signUp/seller" ||
    pathname === "/signUp/accountverify";

  return (
    <>
      <div className="flex flex-col min-h-screen max-w-3xl m-auto">
        
        <div className=" text-white bg-[#0F0B1A]  flex-grow">{children}</div>
      </div>
    </>
  );
}
