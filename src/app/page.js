import GuestLoginEffect from "@/components/HomePage/GuestLoginEffect";
import HomePage from "@/components/HomePage/HomePage";
import { Navbar } from "@/components/shared/Navbar";


export default function Home() {
  return (
    <div className="">
      <Navbar></Navbar>
      <GuestLoginEffect /> 
      
      <HomePage></HomePage>
      
    </div>
  );
}
