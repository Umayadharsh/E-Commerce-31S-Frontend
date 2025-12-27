import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Filter from "../components/Filter";
import Productitem from "../components/Productitem";
import Title from "../components/Title";

const Products = () => {
  const { products } = useContext(ShopContext);

  const [filteredProducts, setfilteredProducts] = useState([]);
  const [filters, setfilters] = useState({
    gender: [],
    price: "",
    type: "",
    sort: "",
    bestseller: false,
    priceRange: 1000,
  });

  useEffect(() => {
    let temp = [...products];

    // 🔹 Gender filter
    if (filters.gender.length > 0) {
      temp = temp.filter((item) => filters.gender.includes(item.gender));
    }

    // 🔹 Product type filter
    if (filters.type) {
      temp = temp.filter((item) => item.type === filters.type);
    }

    // 🔹 Price filter
    if (filters.price === "low") {
      temp = temp.filter((item) => item.price < 1000);
    } else if (filters.price === "mid") {
      temp = temp.filter((item) => item.price >= 1000 && item.price <= 1999);
    } else if (filters.price === "high") {
      temp = temp.filter((item) => item.price >= 2000);
    }

    // 🔹 Sorting
    if (filters.sort === "low-high") {
      temp.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "high-low") {
      temp.sort((a, b) => b.price - a.price);
    }

    // Price range
    if (filters.priceRange) {
      temp = temp.filter((item) => item.price <= filters.priceRange);
    }

    // Bestseller
    if (filters.bestseller) {
      temp = temp.filter((item) => item.bestseller === true);
    }

    setfilteredProducts(temp);
  }, [products, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-10 flex gap-8 mt-20">
      {/* LEFT FILTERS */}
      <div className="w-64 hidden md:block">
        <Filter filters={filters} setfilters={setfilters} />
      </div>

      {/* RIGHT PRODUCTS */}
      <div className="flex-1">
        <div className="mb-6">
          <Title text1="ALL" text2="PRODUCTS" />
          <p className="text-sm text-gray-500 mt-1">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((item) => (
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
    </div>
  );
};

export default Products;
