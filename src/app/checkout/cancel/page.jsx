'use client'
import RIghtArray from '@/components/icon/RIghtArray'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div>
      <div className="h-screen bg-white rounded-lg shadow-lg p-6">

        {/* Header */}
        <div className="items-center mb-6">
          <div className="flex justify-center">
            <h2 className="text-2xl flex gap-1 items-center font-bold text-gray-800">
              <RIghtArray /> Error
            </h2>
          </div>
        </div>

        {/* Error Content */}
        <div className="text-center py-6">
          <div className="flex justify-center text-red-500 text-5xl">
            ❌
          </div>

          <h3 className="text-[24px] mt-3 font-bold text-red-600">
            Something went wrong
          </h3>

          <p className="text-gray-600 mt-2">
            Your request could not be completed. Please try again.
          </p>
        </div>

        {/* Button */}
        <Link href="/myOrder">
          <button
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold"
          >
            Back to Orders
          </button>
        </Link>

      </div>
    </div>
  )
}

export default Page