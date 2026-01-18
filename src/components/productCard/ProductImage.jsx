import React from "react";

const ProductImage = ({ src, alt }) => {
  return (
    <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 rounded-t-2xl">
      <img src={src} alt={alt} className="object-contain h-full" />
    </div>
  );
};

export default ProductImage;
