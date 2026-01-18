import React from "react";
import {
  FaLaptop,
  FaTshirt,
  FaAppleAlt,
  FaCouch,
  FaFootballBall,
} from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Electronics",
    icon: <FaLaptop size={40} className="text-blue-600" />,
  },
  {
    id: 2,
    name: "Fashion",
    icon: <FaTshirt size={40} className="text-pink-500" />,
  },
  {
    id: 3,
    name: "Grocery",
    icon: <FaAppleAlt size={40} className="text-green-500" />,
  },
  {
    id: 4,
    name: "Furniture",
    icon: <FaCouch size={40} className="text-yellow-600" />,
  },
  {
    id: 5,
    name: "Sports",
    icon: <FaFootballBall size={40} className="text-red-500" />,
  },
];

const ShopByCat = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Shop by Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              {category.icon}
              <h3 className="mt-4 font-semibold text-lg">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCat;
