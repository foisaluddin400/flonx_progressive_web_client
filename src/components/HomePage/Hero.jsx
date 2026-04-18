import Image from "next/image";
import Link from "next/link";
export const metadata = {
  title: "Flonx App",
  description: "E-commerce",
};
const Hero = () => {
  return (
    <div className=" bg-white lg:mb-28 mb-10">
      <div className="lg:grid grid-cols-5 gap-6">
        <div className="col-span-1 border-r ">
          <div className="flex flex-col gap-2 pl-4 lg:pt-11 lg:bg-white bg-slate-100 py-5 lg:py-0">
          
            <Link href={'allnewproduct'}><li>Woman&apos;s Fashion</li></Link>
            <Link href={'allnewproduct'}><li>Men&apos;s Fashion</li></Link>
            <Link href={'allnewproduct'}> <li>Electronics</li></Link>
            <Link href={'allnewproduct'}><li>Home & Lifestyle</li></Link>
            <Link href={'allnewproduct'}><li>Medicine</li></Link>
            <Link href={'allnewproduct'}><li>Sports & Outdoor</li></Link>
            <Link href={'allnewproduct'}><li>Baby&apos;s & Toys</li></Link>
            <Link href={'allnewproduct'}><li>Groceries & pets</li></Link>
            <Link href={'allnewproduct'}><li>Health & Beauty</li></Link>
          </div>
        </div>
        <div className="col-span-4 lg:pt-11 lg:lg:pl-5 m-4 lg:m-0">
          <div>
            <Image
              alt="logo"
              src="/img/banner.png"
              height={400}
              width={800}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;