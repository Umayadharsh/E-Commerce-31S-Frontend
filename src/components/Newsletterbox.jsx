import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    // 🔗 Later you can connect API / Mailchimp here
    console.log("Subscribed email:", email);

    setStatus("Thanks for subscribing! 💖");
    setEmail("");
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold mb-3">
          Join Our Newsletter 💌
        </h2>
        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
          New arrivals, exclusive offers & special drops—straight to your inbox.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
          className="w-full sm:flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black text-sm"
        />

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-900 transition"
        >
          Subscribe
        </button>
      </form>

      {/* Status Message */}
      {status && (
        <p className="text-center text-sm mt-4 text-gray-700">
          {status}
        </p>
      )}
    </section>
  );
};

export default Newsletter;
