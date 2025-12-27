import { useState } from "react";
import React from 'react'
const faqs = [
  {
    question: "Is your jewellery anti-tarnish?",
    answer:
      "Yes, all our chains and jewellery are made with high-quality anti-tarnish materials designed for daily wear.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 3–7 business days depending on your location.",
  },
  {
    question: "Do you offer returns or exchanges?",
    answer:
      "Yes, we offer a hassle-free exchange policy within the specified period after delivery.",
  },
  {
    question: "Can I wear the chains daily?",
    answer:
      "Absolutely! Our jewellery is designed for everyday use and comfort.",
  },
  {
    question: "How should I take care of my jewellery?",
    answer:
      "Avoid direct contact with water, perfumes, and chemicals. Store in a dry place when not in use.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-4xl mx-auto px-4 py-20">
      <h2 className="text-center text-3xl font-semibold mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-sm"
            >
              <button
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
                className="w-full flex justify-between items-center px-6 py-5 text-left text-sm sm:text-base font-medium bg-white hover:bg-gray-50 transition"
              >
                <span>{faq.question}</span>

                {/* Chevron */}
                <span
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </button>

              {/* Animated answer */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden px-6 pb-5 text-gray-600 text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faq;
