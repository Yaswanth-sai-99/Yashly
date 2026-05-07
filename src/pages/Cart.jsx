import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RemoveFromcart, incrementQty, decrementQty } from "../RTK/Products";

export default function Cart() {
  const data = useSelector((items) => items.cartItems.Cart)
  const dispatch = useDispatch();
  const [Qty, setQty] = useState()
  const [count,setcount]= useState(0)
  
  if (!data || data.length === 0) {
    return <div className="text-blue-400 font-bold p-5">Cart is Empty</div>;
  }
  return (
    
   <div className="grid grid-cols-1 border border-1 m-2 p-2">
    
      {data.map((item) => ( // Note: Changed { to ( for implicit return
        <div key={item.id} className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
            <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-contain" />
            <div>
              <h3 className="font-bold line-clamp-1">{item.title}</h3>
              <p className="text-green-600 font-semibold">${item.price}</p>
              <button
                onClick={() => dispatch(RemoveFromcart({ id: item.id }))}
                className="text-red-500 text-sm active:scale-65 shadow-md cursor-pointer">Remove
              </button>
            </div>
          </div>

          <div className="flex justify-center w-1/3">
            <div className="grid grid-cols-3 border border-1 w-24 text-center">
              <button className="bg-gray-100 hover:bg-gray-200" onClick={() => { dispatch(decrementQty({ id: item.id })) }}>-</button>
              <span className="py-1">{item.quantity}</span>
              <button className="bg-gray-100 hover:bg-gray-200" onClick={() => { dispatch(incrementQty({ id: item.id })) }}>+</button>
            </div>
          </div>
          <p className="mt-2 text-sm w-1/3 text-right font-bold text-gray-700">
            Total: <span> ${(item.price * item.quantity).toFixed(2)}</span>
          </p>
        </div>
      ))}
      
     </div> 
  )
}