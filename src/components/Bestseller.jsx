import React from 'react'
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";
    

const Bestseller = () => {
  const { products } = useContext(ShopContext);
  const [bestseller, setbestseller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setbestseller(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1="BEST" text2="COLLECTIONS" />
       <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Anti-Tarnish Jewellery | Curated chains & pendants made to elevate your everyday style | Quality you can feel.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestseller.map((item) => (
  <Productitem
    key={item._id}
    id={item._id}
    name={item.name}
    price={item.price}
     image={item.images[0]} 
    bestseller={item.bestseller}
  />
))}

      </div>
    </div>
  );
};

export default Bestseller;
