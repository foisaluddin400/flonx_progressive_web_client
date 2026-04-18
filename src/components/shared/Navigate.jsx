'use client'
import React from 'react'
import LeftArray from '../icon/LeftArray';
import { useRouter } from 'next/navigation';

const Navigate = () => {
     const router = useRouter();
  return (

        <button
          onClick={() => router.back()}
          className=" w-10 h-10  rounded-full border border-purple-400/30 flex items-center justify-center bg-white/5 backdrop-blur-md"
        >
          <LeftArray></LeftArray>
        </button>
       
  
  )
}

export default Navigate