import React from 'react'
import Logo from "../assets/yasly_logo_video.mp4"
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header({setIsLoggedIn, onOpenSidebar}) {
  const cartitems = useSelector((items)=> items.cartItems.Cart)
  const TotalItems = cartitems.length

 
  return (
    <>
      <div className='flex bg-gradient-to-b from-[#f2e3d5] to-[#9ca3af] sticky top-0 z-50 w-full '>
       
        <button onClick={onOpenSidebar}><video src={Logo} width="100" autoPlay muted loop playsInline className='rounded-full my-2 mx-2'/></button>
        <ul className='flex items-center w-full justify-around text-white font-bold text-xl'>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/home">Home</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Beauty">Beauty</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Fragrances">Fragrances</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Furniture">Furniture</Link></li>
          <li className='font-futuristic cursor-pointer hover:text-orange-600 transition-all'><Link to="/Groceries">Groceries</Link></li>
          <li className='text-4xl text-brand-orange'><Link to="/cart" className='relative'>
          <span><CiShoppingCart /></span>
          {TotalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-600 text-white 
                           text-xs font-bold px-2 py-1 rounded-full 
                           animate-bounce transition-all">
            {TotalItems}
          </span>
          )}
          </Link></li>
        </ul>
      </div>
      
    </>
  )
}
