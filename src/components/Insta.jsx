import React from "react";
import { assets } from "../assets/assets";

const images = [
  {
    img: assets.i1,
    link: "https://www.instagram.com/p/DRcb3xOEtjN/?img_index=3",
  },
  {
    img: assets.i2,
    link: "https://www.instagram.com/p/DRVitYTEhev/",
  },
  {
    img: assets.i3,
    link: "https://www.instagram.com/p/DRcb3xOEtjN/?img_index=2",
  },
];

const Insta = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold mb-3">
          Seen on Instagram?!
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Real people. Real style. Tag us{" "}
          <a
            href="https://www.instagram.com/31s.in/"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline hover:text-black"
          >
            @31s.in
          </a>
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {images.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
          >
            <img
              src={item.img}
              alt={`Instagram ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-300 flex items-center justify-center">
              <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition">
                View on Instagram
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <a
          href="https://www.instagram.com/31s.in/"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-3 border border-black text-sm font-medium rounded-full hover:bg-black hover:text-white transition"
        >
          Follow Us on Instagram
        </a>
      </div>
    </section>
  );
};

export default Insta;
