import React from "react";

const Card = ({ name, price, image, onAddToCart }) => {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition duration-300">
      {/* Product Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-contain rounded-xl"
      />

      {/* Product Info */}
      <h3 className="mt-4 font-semibold text-gray-800">{name}</h3>
      <p className="text-blue-600 font-bold">{price}</p>

      {/* Action Button */}
      <button
        // onClick={onAddToCart}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;
