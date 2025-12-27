import React from "react";
import hero from "../assets/hero.jpg";

const reviews = [
  {
    name: "Aarav Mehta",
    text: "The quality is insane for the price. Minimal, classy and feels premium.",
    rating: 5,
  },
  {
    name: "Riya Kapoor",
    text: "I wear my chain every day and it still looks brand new. Love it!",
    rating: 4,
  },
  {
    name: "Karthik S",
    text: "Packaging, design, finish — everything feels thoughtfully done.",
    rating: 5,
  },
  {
    name: "Sneha R",
    text: "Perfect balance between bold and subtle. Exactly my style.",
    rating: 4,
  },
  {
    name: "Mohit Verma",
    text: "Didn’t expect this level of quality honestly. Totally worth it.",
    rating: 5,
  },
  {
    name: "Ananya Jain",
    text: "Looks even better in real life. Already ordered my second piece.",
    rating: 5,
  },
  {
    name: "Rahul N",
    text: "Minimal jewellery done right. Clean, modern and versatile.",
    rating: 4,
  },
  {
    name: "Pooja Sharma",
    text: "I get compliments every time I wear it. Love the vibe!",
    rating: 5,
  },
  {
    name: "Siddharth K",
    text: "Fast delivery and premium feel. Would recommend 100%.",
    rating: 4,
  },
  {
    name: "Neha Malhotra",
    text: "Finally found jewellery that fits my everyday style.",
    rating: 5,
  },
];

const About = () => {
  return (
    <div className="w-full">
      {/* HERO */}
      {/* HERO */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center text-center px-6 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        {/* overlay for readability */}
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 max-w-3xl text-white">
          <p className="text-xs tracking-widest uppercase mb-4 opacity-90">
            Bold enough to speak. Minimal enough to wear every day.
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
            Jewellery That Moves <br /> With You
          </h1>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
            Our Story
          </p>
          <div className="w-10 h-[2px] bg-black" />
        </div>

        <div className="text-gray-700 text-sm sm:text-base leading-relaxed space-y-6 max-w-3xl">
          <p>
            Founded with a vision to redefine everyday jewellery,{" "}
            <strong>ThirtyOne</strong>
            is built for those who believe style should feel effortless,
            personal, and timeless.
          </p>

          <p>
            Inspired by modern minimalism and bold self-expression, each piece
            is designed to seamlessly blend into your lifestyle — whether worn
            alone or layered, dressed up or down.
          </p>

          <p>
            We focus on clean silhouettes, durable materials, and thoughtful
            craftsmanship — creating jewellery that feels just as good as it
            looks.
          </p>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
              What Makes Us Different
            </p>
            <h2 className="text-2xl sm:text-3xl font-light">
              Designed for Real Life
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              {
                title: "Minimal Design",
                desc: "Clean forms that never go out of style.",
              },
              {
                title: "Everyday Wear",
                desc: "Built to be worn daily without worry.",
              },
              {
                title: "Premium Finish",
                desc: "Attention to detail in every piece.",
              },
              {
                title: "Made to Last",
                desc: "Durable materials you can rely on.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className="text-sm font-medium mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-xs tracking-widest uppercase text-gray-400 mb-3">
              Customer Love
            </p>
            <h2 className="text-2xl sm:text-3xl font-light">
              What Our Customers Say
            </h2>
          </div>

          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="min-w-[280px] bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="text-sm mb-4">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </div>

                <p className="text-sm text-gray-700 mb-4">“{review.text}”</p>
                <p className="text-xs font-medium">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-black text-white py-20 text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-light mb-4">
          Jewellery That Fits Your Life
        </h2>
        <p className="text-sm text-gray-300 max-w-xl mx-auto">
          Designed to move with you, evolve with you, and express who you are —
          without trying too hard.
        </p>
      </section>
    </div>
  );
};

export default About;
