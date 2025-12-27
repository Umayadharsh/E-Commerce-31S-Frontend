import React, { useState } from "react";

const Filter = ({ filters, setfilters }) => {
  const [open, setOpen] = useState({
    gender: true,
    type: true,
    price: true,
    sort: true,
  });

  const toggleGender = (value) => {
    setfilters((prev) => ({
      ...prev,
      gender: prev.gender.includes(value)
        ? prev.gender.filter((g) => g !== value)
        : [...prev.gender, value],
    }));
  };

  const clearFilters = () => {
    setfilters({
      gender: [],
      price: "",
      type: "",
      sort: "",
      bestseller: false,
      priceRange: 2000,
    });
  };

  return (
    <div className="sticky top-[180px] bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-xs text-gray-500 hover:text-black"
        >
          Clear All
        </button>
      </div>

      {/* GENDER */}
      <div className="mb-6">
        <button
          onClick={() => setOpen({ ...open, gender: !open.gender })}
          className="w-full flex justify-between items-center text-sm font-medium mb-3"
        >
          Gender
          <span>{open.gender ? "−" : "+"}</span>
        </button>

        {open.gender && (
          <div className="space-y-2">
            {["Men", "Women", "Unisex"].map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.gender.includes(g)}
                  onChange={() => toggleGender(g)}
                />
                {g}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* PRODUCT TYPE */}
      <div className="mb-6">
        <button
          onClick={() => setOpen({ ...open, type: !open.type })}
          className="w-full flex justify-between items-center text-sm font-medium mb-3"
        >
          Product Type
          <span>{open.type ? "−" : "+"}</span>
        </button>

        {open.type && (
          <select
            className="w-full border rounded-lg px-3 py-2 text-sm"
            value={filters.type}
            onChange={(e) =>
              setfilters((prev) => ({ ...prev, type: e.target.value }))
            }
          >
            <option value="">All</option>
            <option value="chain">Chain</option>
            <option value="pendant">Pendant</option>
            <option value="bracelet">Bracelet</option>
          </select>
        )}
      </div>

      {/* PRICE RANGE */}
      <div className="mb-6">
        <button
          onClick={() => setOpen({ ...open, price: !open.price })}
          className="w-full flex justify-between items-center text-sm font-medium mb-3"
        >
          Price Range
          <span>{open.price ? "−" : "+"}</span>
        </button>

        {open.price && (
          <>
            <input
              type="range"
              min="100"
              max="2000"
              step="50"
              value={filters.priceRange || 2000}
              onChange={(e) =>
                setfilters((prev) => ({
                  ...prev,
                  priceRange: Number(e.target.value),
                }))
              }
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-2">
              Up to ₹{filters.priceRange || 2000}
            </p>
          </>
        )}
      </div>

      {/* BESTSELLER */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.bestseller || false}
            onChange={(e) =>
              setfilters((prev) => ({
                ...prev,
                bestseller: e.target.checked,
              }))
            }
          />
          Bestseller Only
        </label>
      </div>

      {/* SORT */}
      <div>
        <p className="text-sm font-medium mb-2">Sort By</p>
        <select
          className="w-full border rounded-lg px-3 py-2 text-sm"
          value={filters.sort}
          onChange={(e) =>
            setfilters((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="">Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
