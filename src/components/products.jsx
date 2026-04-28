import React from 'react'

export default function Products({products}) {
   
if (!products) return <div className="text-white text-center">Loading Products...</div>;
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 max-w-full px-5'>
            {products.map((item, index) => (
                <div className="flip-card" key={item.id}>
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <img src={item.images[0]} alt="product_image" className="w-full h-55 py-5 object-contain " />
                            <p className="title py-5">{item.title}</p>
                            <p>Point Cursor here</p>
                        </div>
                        <div className="flip-card-back">
                            <img src={item.images[0]} className='w-full h-20 object-contain'/>
                            <p className="title py-1 ">Category: {item.category}</p>
                            <p  className=" py-1 text-green-900">Price: ${item.price}</p>
                            <p  className=" py-1 text-red-800">discount - {item.discountPercentage}%</p>
                            <p  className=" py-2 px-2">DESC: {item.description}</p>
                            <div className='flex items-center bg-green-700 rounded mx-10 mt-auto mb-5 '>
                            <button className='mx-auto'>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
