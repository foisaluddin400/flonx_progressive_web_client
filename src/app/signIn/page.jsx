import Image from 'next/image';
import Link from 'next/link';


export default function SignIn() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white via-orange-50 to-white">
      <div className="md:flex md:w-3/4 md:max-w-5xl rounded-lg overflow-hidden m-4 md:m-0">
        
        
        <div className="md:w-1/2 p-8 flex justify-center items-center">
          <div className="text-center">
            <div className=" text-white ">
              <Image className='w-[400px]' src={'/img/login.png'} width={500} height={200} alt='login'/>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 ">
         <div className='flex justify-center mb-6'>
         <Image className='w-[200px]' src={'/img/loginl.png'} width={300} height={70} alt='login'/>
         </div>
          <h2 className="text-2xl text-center my-11  font-bold text-gray-800 mb-8">Great to have you back!</h2>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">User Name or Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full p-2 border  border-black rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-[#00000000]"
                placeholder="Email"
                required
              />
            
            </div>

            <div>
              <div className='flex justify-between'>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <Link href="/signIn/forgot" className="text-sm 
              
              text-orange-500 hover:underline">Forgot</Link>
              </div>
              <div className="flex items-center">
                <input
                  type="password"
                  id="password"
                  className="mt-1 w-full p-2 border border-black bg-[#00000000] rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Password"
                  required
                />
                
              </div>
            </div>

            <div className="flex items-center justify-center">
              <p className="text-sm text-gray-600 text-center">Don&apos;t have an account? <Link href="/signUp" className="text-orange-500   hover:underline">Register</Link></p>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
