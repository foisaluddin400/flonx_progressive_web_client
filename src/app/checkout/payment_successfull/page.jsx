'use client'
import RIghtArray from '@/components/icon/RIghtArray'
import RightMarkIco from '@/components/icon/RightMarkIco'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
         <div
        className=" h-screen  bg-white rounded-lg shadow-lg p-6 "
      >
          
        <div className="items-center mb-6">
        <div className="flex justify-center">
            <h2 className="text-2xl flex gap-1 items-center font-bold text-gray-800">
            <RIghtArray></RIghtArray> link
          </h2>
        </div>
       
        </div>

        <div className="text-center py-6">
          <div className="flex justify-center"><RightMarkIco></RightMarkIco></div>
          <h3 className="text-[24px] mt-3 font-bold text-gray-800">Success</h3>
          <p className="text-gray-600 mt-2">successfully completed</p>
        </div>

        <Link href={'/myOrder'}><button
          onClick={() => setShowSuccess(false)}
          className="w-full bg-[#00D66F] text-black py-3 rounded-lg font-semibold"
        >
         See my orders 
        </button></Link>
      </div>
    </div>
  )
}

export default page