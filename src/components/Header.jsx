import React from 'react'
import Logo from "../assets/yasly_logo_video.mp4"
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';


export default function Header({setIsLoggedIn}) {
  return (
    <>
      <div className='flex bg-gradient-to-b from-[#f2e3d5] to-[#9ca3af] sticky top-0 z-50 w-full '>
        <Link to="/home"><video src={Logo} width="100" autoPlay muted loop playsInline className='rounded-full my-2 mx-2'/></Link>
        <ul className='flex items-center w-full justify-around text-white font-bold text-xl'>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/home">Home</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Beauty">Beauty</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Fragrances">Fragrances</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Furniture">Furniture</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Groceries">Groceries</Link></li>
          <li className='text-4xl text-brand-orange'><Link to="/cart"><CiShoppingCart /></Link></li>
        </ul>
      </div>
    </>
  )
}
