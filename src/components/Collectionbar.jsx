import React from "react";
import { NavLink } from "react-router-dom";

const collections = [
  { name: "Classic Chains", path: "/collection/classic" },
  { name: "Pendant Chains", path: "/collection/pendant" },
  { name: "Minimal Chains", path: "/collection/minimal" },
];

const CollectionsBar = () => {
  return (
    <div className="relative w-full bg-gray-50 border-b border-gray-200 z-30">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-wrap justify-center gap-4">
          {collections.map((item) => (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <div
                  className={`
                    whitespace-nowrap
                    px-5 py-2 rounded-full
                    text-sm font-medium
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100 hover:text-black"
                    }
                    hover:-translate-y-0.5
                  `}
                >
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsBar;
