import React from 'react'
import {signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from '../utils/userSlice';
import {useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const showGptSearch=useSelector((store)=>store.gpt.showGptSearch)
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
  const handleGptSearch=()=>{
    dispatch(toggleGptSearchView());
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <div>
            <img 
                className='w-44 mx-auto md:mx-0'
                src={LOGO}
                alt='logo'>
             </img>
        </div>
        {user&&(<div className='flex p-2 m-2 justify-between'>
          {showGptSearch&&(
            <select className='p-2 m-2 bg-white text-black rounded-lg' onChange={handleLanguageChange}>
              {SUPPORTED_LANGUAGES.map((lang)=>(
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
        )}
          <button className='py-2 px-4 my-2 mx-4 rounded-lg text-black bg-white' onClick={handleGptSearch}>
            {showGptSearch?"Homepage":"GPT Search"}
          </button>
          <img 
            className='w-12 h-12 hidden md:block'
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