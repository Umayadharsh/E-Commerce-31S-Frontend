import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Productitem from "../components/Productitem";

const Search = () => {
  const { products } = useContext(ShopContext);
  const [params] = useSearchParams();

  const query = params.get("q")?.toLowerCase() || "";

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-xl mb-6">
        Search results for "<strong>{query}</strong>"
      </h2>

      {results.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {results.map((item) => (
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

export default Search;
