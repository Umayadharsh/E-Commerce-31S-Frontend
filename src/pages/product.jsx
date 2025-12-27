import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Faq from "../components/faq";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, currency } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [qty, setQty] = useState(1);
  const [openCare, setOpenCare] = useState(false);

  useEffect(() => {
    const found = products.find(
      (item) => String(item._id) === String(productId)
    );

    if (found) {
      setProductData(found);
      setMainImage(found.images[0]);
    }
  }, [productId, products]);

  if (!productData) return null;

  const currentIndex = productData.images.indexOf(mainImage);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* LEFT – IMAGE GALLERY */}
        <div className="flex gap-4">

          {/* THUMBNAILS */}
          <div className="flex flex-col gap-3">
            {productData.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border
                  ${mainImage === img ? "border-black" : "border-gray-300"}`}
              />
            ))}
          </div>

          {/* MAIN IMAGE WITH ARROWS + SWIPE */}
          <div
            className="relative flex-1"
            onTouchStart={(e) =>
              (window.startX = e.touches[0].clientX)
            }
            onTouchEnd={(e) => {
              const diff =
                window.startX - e.changedTouches[0].clientX;

              if (diff > 50 && currentIndex < productData.images.length - 1) {
                setMainImage(productData.images[currentIndex + 1]);
              }

              if (diff < -50 && currentIndex > 0) {
                setMainImage(productData.images[currentIndex - 1]);
              }
            }}
          >
            <img
              src={mainImage}
              alt={productData.name}
              className="w-full rounded-xl object-cover"
            />

            {/* LEFT ARROW */}
            {currentIndex > 0 && (
              <button
                onClick={() =>
                  setMainImage(productData.images[currentIndex - 1])
                }
                className="absolute left-4 top-1/2 -translate-y-1/2
                  bg-white/80 backdrop-blur p-2 rounded-full shadow
                  hover:bg-white"
              >
                ←
              </button>
            )}

            {/* RIGHT ARROW */}
            {currentIndex < productData.images.length - 1 && (
              <button
                onClick={() =>
                  setMainImage(productData.images[currentIndex + 1])
                }
                className="absolute right-4 top-1/2 -translate-y-1/2
                  bg-white/80 backdrop-blur p-2 rounded-full shadow
                  hover:bg-white"
              >
                →
              </button>
            )}
          </div>
        </div>

        {/* RIGHT – PRODUCT INFO */}
        <div>
          <h1 className="text-3xl font-semibold mb-4 uppercase">
            {productData.name}
          </h1>

          <p className="text-2xl font-semibold mb-6">
            {currency} {productData.price}
          </p>

          {/* QTY + ADD TO CART */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border rounded-full px-4">
              <button onClick={() => qty > 1 && setQty(qty - 1)}>
                −
              </button>
              <span className="px-4">{qty}</span>
              <button onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>

            <button
              onClick={() => addToCart({ ...productData, qty })}
              className="flex-1 bg-black text-white rounded-full py-4 text-sm hover:opacity-90"
            >
              ⊕ Add to cart
            </button>
          </div>

          {/* SEAMLESS DELIVERY CARD */}
          <div
            className="border rounded-xl p-6 mb-8
              transition-all duration-200
              hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              🚚 <span className="font-medium">SEAMLESS DELIVERY</span>
            </div>

            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">EXPECTED</p>
                <p className="font-medium">Jan 07 – Jan 11</p>
              </div>
              <div>
                <p className="text-gray-500">ORDER WITHIN</p>
                <p className="font-medium">16 hours 28 min</p>
              </div>
            </div>
          </div>

          {/* CARE INSTRUCTIONS */}
          <div className="border rounded-xl">
            <button
              onClick={() => setOpenCare(!openCare)}
              className="w-full flex justify-between items-center p-5"
            >
              ✨ CARE INSTRUCTIONS
              <span>{openCare ? "−" : "+"}</span>
            </button>

            {openCare && (
              <div className="px-5 pb-5 text-sm text-gray-600">
                Avoid water, perfume, and harsh chemicals. Store in a dry place after use.
              </div>
            )}
          </div>
        </div>
      </div>

      <Faq />
    </div>
  );
};

export default Product;
