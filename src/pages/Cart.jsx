import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { RemoveFromcart } from "../RTK/Products";

export default function Cart() {
  const data = useSelector((items) => items.cartItems.Cart)
  const dispatch = useDispatch();

  if (!data || data.length === 0) {
    return <div className="text-blue-400 font-bold p-5">Cart is Empty</div>;
  }
  return (
    <div className="grid grid-cols-1 border border-1 m-2 p-2">
      {data.map((item) => ( // Note: Changed { to ( for implicit return
        <div key={item.id} className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <img src={item.images[0]} alt={item.title} className="w-20 h-20 object-contain" />
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-green-600 font-semibold">${item.price}</p>
              <button
                onClick={() => dispatch(RemoveFromcart({ id: item.id }))}
                className="text-red-500 text-sm hover:bg-red-400 active:scale-65 shadow-md cursor-pointer">Remove
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="grid grid-cols-3 border border-1 w-24 text-center">
              <button className="bg-gray-100 hover:bg-gray-200">-</button>
              <span className="py-1">1</span> {/* Use a span or value for now */}
              <button className="bg-gray-100 hover:bg-gray-200">+</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}