import React from 'react'
import No from './icon/No'

const NoData = () => {
  return (
    <div>
        <div className='flex border rounded-lg text-gray-400 border-[#2A2448] bg-[#822CE71A] flex-col items-center justify-center py-6 gap-3'>
            <No></No>
            <p>No Data</p>
        </div>
    </div>
  )
}

export default NoData