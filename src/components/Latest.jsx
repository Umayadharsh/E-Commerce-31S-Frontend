import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import Productitem from "./Productitem";

const Latest = () => {
  const context = useContext(ShopContext);

  // 🛑 Prevent crash if context is undefined
  if (!context) return null;

  const { products } = context;
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products?.length) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-7 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Anti-Tarnish Jewellery | Curated chains & pendants made to elevate your everyday style | Quality you can feel.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <Productitem
            key={item._id || item._id}
            id={item._id || item._id}
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

export default Latest;
