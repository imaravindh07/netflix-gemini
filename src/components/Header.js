import React from 'react'
import {signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import {useEffect } from 'react';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const user=useSelector((store)=>store.user)
  const handleSignOut=()=>{
    signOut(auth)
    .then(() => {
    })
    .catch((error) => {
    });
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (user) => {
        if (user) { 
            const {uid,email,displayName,photoURL}= user;
            dispatch(addUser({uid:uid, email:email, displayName:displayName,photoURL:photoURL}))
            navigate('/browse')
        } 
        else {
            dispatch(removeUser())
            navigate('/')
        }
    });
    return()=>unsubscribe()
  },[])
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
        <div>
            <img 
                className='w-44'
                src={LOGO}
                alt='logo'>
             </img>
        </div>
        {user&&(<div className='flex p-2 m-2'>
          <img 
            className='w-12 h-12'
            src={user?.photoURL} 
            alt='user-icon'
          >  
          </img>
          <button onClick={handleSignOut} className='font-bold text-white m-2'>(Sign Out)</button>
        </div>)}
    </div>
  )
}

export default Header