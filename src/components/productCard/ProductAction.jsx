import React from "react";

const ProductAction = ({ onDetail, onAddToCart }) => {
  return (
    <div className="flex items-center justify-between gap-3 mt-4">
      <button
        onClick={onDetail}
        className="flex-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition"
      >
        More Details
      </button>
      <button
        onClick={onAddToCart}
        className="flex-1 px-3 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductAction;
