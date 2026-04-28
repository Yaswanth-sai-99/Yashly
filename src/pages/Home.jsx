import React from 'react'
import Products from '../components/products'
import { CiHome} from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Background } from '../components/Background';
import { Link } from 'react-router-dom';

export default function Home({products}) {
  console.log("products:", products)
  return (
    <>  
    <div>
      <Background/>
    </div>
    <div className='flex flex-1  items-center bg-green-50 mt-6'>
            <span className='text-3xl px-2'><Link to={-1}><IoMdArrowRoundBack /></Link></span>
            <span className='text-3xl ps-3'><Link to="/home"><CiHome /></Link></span>
            <h1 className='text-green-600 font-bold font-futuristic text-3xl my-4 px-10'>ALL CATEGORIES</h1>  
    </div>
    <div className='my-10'>
      <Products products={products}/>
    </div>
    </>

  )
}
