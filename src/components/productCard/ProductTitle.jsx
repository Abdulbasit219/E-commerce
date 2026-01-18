import React from "react";

const ProductTitle = ({ title, description, price }) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
      <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
      <p className="text-lg font-bold text-blue-600">${price}</p>
    </div>
  );
};

export default ProductTitle;
