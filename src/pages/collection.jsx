import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Productitem from "../components/Productitem";
import Title from "../components/Title";

const Collection = () => {
  const { collectionName } = useParams();
  const { products } = useContext(ShopContext);

  const filteredProducts = products.filter(
    (item) => item.collection === collectionName
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <Title
          text1={collectionName.toUpperCase()}
          text2="COLLECTION"
        />
        <p className="text-sm text-gray-500 mt-2">
          Curated pieces from our {collectionName} collection
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products found in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
      )}
    </div>
  );
};

export default Collection;
