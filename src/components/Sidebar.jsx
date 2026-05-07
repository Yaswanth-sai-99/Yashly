import React from 'react'
import { useDispatch } from 'react-redux';
import {logoutCart} from '../RTK/Products'
import { replace, useNavigate } from 'react-router-dom';

export default function Sidebar({isOpen, isClose,onClose, setIsLoggedIn, setIsSidebarOpen}) {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const Handlelogout = ()=>{
    const storeddata = localStorage.getItem('userCredentials');
    if(storeddata){
      const user = JSON.parse(storeddata);
      user.isLoggedIn = false;
      localStorage.setItem('userCredentials', JSON.stringify(user));
    }
    setIsLoggedIn(false);
    dispatch(logoutCart());
    setIsSidebarOpen(false)
    navigate('/login', {replace:true});

  }
  return (
    <>
    {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60]" 
          onClick={onClose} 
        />
    )}
    <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-[70] transition-transform duration-500
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        <div className='flex justify-between items-center p-4 bg-gray-100'>
           <h2 className="font-bold text-xl">Menu</h2>
           <button onClick={onClose} className="text-2xl">✕</button>
        </div>

        <ul className="p-4 flex flex-col gap-4">
           <li>Profile</li>
           <li>Settings</li>
           <li><button className='active:scale-95 transition-transform cursor-pointer' onClick={Handlelogout}>Logout</button></li>
        </ul>
      </aside>
    </>
  )
}
