import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate'
import { auth } from '../utils/firebase';
import {updateProfile } from "firebase/auth";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const[isSignInForm,setIsSignInForm]=useState(true);
  const [erroMessage,setErrorMessage]=useState(null);
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const name=useRef(null)
  const email=useRef(null);
  const password=useRef(null);

  const handleButtonClick=()=>{
    const message=checkValidData(email.current.value,password.current.value)
    setErrorMessage(message);
    if(message) return;
    if(!isSignInForm){
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name.current.value, photoURL: "https://th.bing.com/th/id/OIP.hsT_JKY5ORDggodhkdjlwAHaHa?rs=1&pid=ImgDetMain"
        })
        .then(() => {
          const {uid,email,displayName,photoURL}= auth.currentUser;
          dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL}))
          navigate('/browse')
        })
        .catch((error) => {
          setErrorMessage(error.message)
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode+"-"+erroMessage);
      });
    }
    else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;
        navigate('/browse')
      })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
    }
     
  }
  const toggleSignInForm=()=>{
    setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
          <Header />
          <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/f268d374-734d-474f-ad13-af5ba87ef9fc/web/IN-en-20250210-TRIFECTA-perspective_92338d5d-6ccd-4b1a-8536-eb2b0240a55e_small.jpg" alt="logo"></img>
          </div>
          <form onSubmit={(e)=>e.preventDefault()} className='w-3/12 absolute p-12 m-4 bg-black my-36 mx-auto left-10 right-0 text-white rounded-lg bg-opacity-80 '>
            <h1 className='font-bold text-3xl py-4'>
              {isSignInForm? "Sign In" : "Sign Up"}</h1>
            {!isSignInForm&&(<input 
                ref={name}
                type='text' 
                placeholder='Full Name' 
                className='my-2 p-3 w-full bg-gray-700'>
            </input>) } 
            <input 
              ref={email}
              type='text' 
              placeholder='Email Address' 
              className='my-2 p-3 w-full bg-gray-700'>
            </input>
            <input type='password' 
              ref={password}
              placeholder='Password' 
              className='my-4 p-3 w-full bg-gray-700'>
            </input>
            <p className='text-red-500 font-bold text-lg py-2'>{erroMessage}</p>
            <button className='p-4 my-6 bg-red-700  w-full rounded-lg cursor-pointer' onClick={handleButtonClick}> 
              {isSignInForm? "Sign In" : "Sign Up"}</button>
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