import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState(true)
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
          <Header />
          <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_small.jpg" alt="logo"></img>
          </div>
          <form className='w-3/12 absolute p-12 m-4 bg-black my-36 mx-auto left-10 right-0 text-white rounded-lg bg-opacity-80 '>
            <h1 className='font-bold text-3xl py-4'>
              {isSignInForm? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm&&(<input 
                type='text' 
                placeholder='Full Name' 
                className='my-2 p-3 w-full bg-gray-700'>
            </input>) } 
            <input 
              type='text' 
              placeholder='Email Address' 
              className='my-2 p-3 w-full bg-gray-700'>
            </input>
            <input type='password' 
              placeholder='Password' 
              className='my-4 p-3 w-full bg-gray-700'>
            </input>
            <button className='p-4 my-6 bg-red-700  w-full rounded-lg cursor-pointer'>{isSignInForm? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
              {isSignInForm
              ? "New to netflix? Sign Up Now" 
              : "Already registered? Sign In Now"}
            </p>
          </form>
    </div>
  )
}

export default Login