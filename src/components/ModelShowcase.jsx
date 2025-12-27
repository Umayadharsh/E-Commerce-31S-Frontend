import React, { useRef } from "react";

const models = [
  `${import.meta.env.BASE_URL}Model/men1.jpg`,
  `${import.meta.env.BASE_URL}Model/women1.jpg`,
  `${import.meta.env.BASE_URL}Model/men3.jpg`,
  `${import.meta.env.BASE_URL}Model/women2.webp`,
  `${import.meta.env.BASE_URL}Model/men2.jpg`,
  `${import.meta.env.BASE_URL}Model/women3.jpg`,
];

const ModelShowcase = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: window.innerWidth, behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">

      {/* LEFT ARROW */}
      <button
        onClick={scrollLeft}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 rounded-full bg-white shadow-lg
                   flex items-center justify-center
                   hover:scale-110 transition"
      >
        ‹
      </button>

      {/* SLIDER */}
      <div
        ref={scrollRef}
        className="flex h-full w-full overflow-x-auto snap-x snap-mandatory scrollbar-hide"
      >
        {models.map((img, index) => (
          <div
            key={index}
            className="w-screen h-screen flex items-center justify-center snap-center"
          >
            {/* SQUARE CARD */}
            <div className="w-[90vmin] h-[90vmin] bg-gray-100 rounded-2xl overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={img}
                alt={`Model ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={scrollRight}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20
                   w-12 h-12 rounded-full bg-white shadow-lg
                   flex items-center justify-center
                   hover:scale-110 transition"
      >
        ›
      </button>
    </section>
  );
};

export default ModelShowcase;
