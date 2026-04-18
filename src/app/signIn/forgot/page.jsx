import Image from "next/image";
import Link from "next/link";


const forgot = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white via-orange-50 to-white">
      <div className="md:flex md:w-3/4 md:max-w-5xl rounded-lg overflow-hidden m-4 md:m-0">
        
       
        <div className="md:w-1/2 p-8 flex justify-center items-center">
          <div className="text-center">
            <div className=" text-white ">
              <Image className='w-[400px]' src={'/img/forgot.png'} width={500} height={200} alt='login'/>
            </div>
          </div>
        </div>


        <div className="md:w-1/2 mt-14">
          <h2 className="text-2xl  my-11  font-bold text-gray-800 ">Forgot Password ?</h2>
          <p className="my-6">Enter your details below to request an your capture award account password reset.</p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semiboldtext-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full p-2 border  border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-[#00000000]"
                placeholder="Email"
                required
              />
            
            </div>

            <Link href={'/signIn/verify'} ><button
            type="submit"
            className="w-full py-2 px-4 mt-5 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Submit
          </button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default forgot;