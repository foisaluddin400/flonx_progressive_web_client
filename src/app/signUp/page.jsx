import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white via-orange-50 to-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg ">
     
        <div className="flex flex-col items-center mb-6">
        <Image className='w-[200px]' src={'/img/logo.png'} width={300} height={70} alt='login'/>
          
        </div>

        <div className="flex justify-center mb-4">
          <label className="inline-flex items-center">
            <input type="radio" name="role" value="buyer" className="form-radio text-orange-500" />
            <span className="ml-2 text-orange-500 font-semibold">As a Buyer</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" name="role" value="seller" className="form-radio text-gray-600" />
            <span className="ml-2 text-gray-600">Seller</span>
          </label>
        </div>


        <form className="space-y-6">
         
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="mt-1 block w-full p-2 border border-black bg-[#00000000] rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

         
          <div>
            <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="tel"
              id="contact"
              placeholder="+88##########48"
              className="mt-1 block w-full p-2 border border-black bg-[#00000000] rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

         
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder=".....@gmail.com"
              className="mt-1 block w-full p-2 border border-black bg-[#00000000] rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

   
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="New Password"
              className="mt-1 block w-full p-2 border border-black bg-[#00000000] rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

        
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Enter your password"
              className="mt-1 block w-full p-2 border border-black bg-[#00000000] rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>


          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Dhaka, Bangladesh"
              className="mt-1 block w-full p-2 border border-black bg-[#00000000] rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

        
          <Link href={'/signUp/done'}><button
            type="submit"
            className="w-full py-2 mt-5 px-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            SIGN UP
          </button></Link>
        </form>
      </div>
    </div>
  );
}
