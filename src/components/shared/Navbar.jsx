import Image from "next/image";
import logo from "../../../public/img/logo.png";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#822CE71A] backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between px-3 md:px-12 py-4">

        {/* Left - Logo */}
        <Image 
          src={logo}
          alt="Logo"
          width={120}
          height={40}
          priority
        />

        {/* Right - Join Button */}
        <Link href={'/joinNow'}>
        <button className="px-6 py-2 rounded-full text-white font-semibold
          bg-gradient-to-tr from-[#822CE7] to-[#BB82FF]
          hover:scale-105 active:scale-95
          transition-all duration-300 shadow-md hover:shadow-lg">
          Join Now
        </button></Link>

      </div>
    </nav>
  );
};