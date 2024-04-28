import Link from 'next/link';
import React, { FC, useState } from 'react'

const Signup: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

   
    return (
    <>
            <div className='flex-1 bg-white'>
                <h1 className="text-3xl lg:text-4xl font-bold text-center mt-10 mobile:text-2xl "><i className="fa-sharp fa-solid fa-bowl-food px-2"></i>
                    HungaryHaste
                </h1>
                <div className="container mobile:w-10/12 lg:w-8/12  xl:w-4/12 mx-auto px-4 mt-6 lg:mt-16 bg-gray-200 p-8 rounded-lg shadow-lg ">
                    <h1 className="text-2xl lg:text-4xl font-semibold text-center text-black-700 underline decoration-solid uppercase">
                        Sign in
                    </h1>
                    <form className="flex flex-col items-center">
                        <div className="mb-6 w-4/5">
                            <label htmlFor='email' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Email</label>
                            <input
                                type="email"
                                className="block w-full lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500 dark:text-black"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                id='email'
                            />
                        </div>
                        <div className="mb-6 w-4/5">
                            <label htmlFor='password' className="block text-base lg:text-lg font-medium text-gray-800 mb-2">Password</label>
                            <input
                                type="password"
                                className="block w-full lg:px-4 lg:py-2 text-lg lg:text-xl bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-gray-500 focus:border-gray-500 dark:text-black"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name='password'
                                id='password'
                            />
                        </div>
                        <div className="w-1/2 mt-5">
                            <button type='button' className="w-full lg:px-1 py-2 mobile:text-sm text-lg lg:text-xl font-medium text-white transition-colors duration-200 transform bg-black rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Login
                            </button>
                            <p className='lg:text-lg font-semibold text-center py-3 dark:text-black'>OR</p>

                            <button type='button' className="w-full lg:px-1 py-2 mobile:text-sm text-lg lg:text-sm font-medium text-white transition-colors duration-200 transform bg-black rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                                Login With OTP
                            </button>
                        </div>
                    </form>
                </div>
                </div>
                </>
            );
        }

            export default Signup;
