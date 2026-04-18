import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white via-orange-50 to-white">
      <div className="w-full max-w-md p-8  rounded-lg text-center">
        <div className="flex flex-col items-center mb-6">
        <Image className='w-[300px]' src={'/img/done.png'} width={500} height={70} alt='login'/>

        <p className='py-4'>Your account has been created successfully</p>
        <p>Click Continue to create your business account for selling item on jus buy</p>

        <div className='flex gap-5 mt-4'>
          <Link href={'/signIn'}><button className='bg-[#00000000] border border-orange-600 text-orange-600 py-1 w-[100px] text-center rounded'>No</button></Link>
          <Link href={'/signUp/seller'}><button className='bg-orange-600  text-white py-1 w-[100px] text-center rounded'>Continue</button></Link>
        </div>
          
        </div>

        
      </div>
    </div>
  );
};

export default page;