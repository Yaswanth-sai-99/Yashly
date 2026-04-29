import React from 'react'
import { CiHome } from "react-icons/ci";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useDispatch} from 'react-redux';
export default function Groceries({ products }) {
    const dispatch = useDispatch()

  return (
    <>
      <div className='flex flex-1  items-center bg-green-50 mt-6'>
        <span className='text-3xl px-2'><Link to={-1}><IoMdArrowRoundBack /></Link></span>
        <span className='text-3xl ps-3'><Link to="/home"><CiHome /></Link></span>
        <h1 className='text-green-600 font-bold font-futuristic text-3xl my-4 px-10'>Groceries</h1>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 max-w-full px-5 py-10'>
        {products.filter((data1) => data1.category === "groceries").map((item, index) => (
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src={item?.images?.[0]} alt="product_image" className="w-full h-55 py-5 object-contain " />
                <p className="title py-5">{item.title}</p>
                <p>Point Cursor here</p>
              </div>
              <div className="flip-card-back">
                <img src={item?.images?.[0]} className='w-full h-20 object-contain' />
                <p className="title py-1 ">Category: {item.category}</p>
                <p className=" py-1 text-green-900">Price: ${item.price}</p>
                <p className=" py-1 text-red-800">discount - {item.discountPercentage}</p>
                <p className=" py-2 px-2">DESC: {item.description}</p>
                <div className='flex items-center bg-green-700 rounded mx-10 mt-auto mb-5 '>
                  <button className='mx-auto active:scale-65 shadow-md cursor-pointer' onClick={()=>{dispatch(Addtocart(item))}}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
