import React from "react";
import ProductTitle from "./ProductTitle";
import ProductImage from "./ProductImage";
import ProductAction from "./ProductAction";
import { Link } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

const ProductCard = ({ product, navigate }) => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();

  //add item into cart
  const addItem = (product) => {
    if (!auth.user) {
      return toast.error("Please Login First to add product");
    }
    const itemExists = cart.some((item) => item._id === product._id);
    if (itemExists) {
      toast.success("Item Already Exists in cart");
      return;
    } else {
      setCart([...cart, product]);
      localStorage.setItem("cart", JSON.stringify([...cart, product]));
      toast.success("Items added to Cart successfully");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between w-full h-[400px]">
      {/* Product Image */}
      <ProductImage
        src={`https://api-to2k.onrender.com/api/v1/product/get-productphoto/${product._id}`}
        alt={product.name}
      />

      {/* Product Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <ProductTitle
          title={product.name}
          description={product.description}
          price={product.price}
        />

        {/* Action Buttons */}
        <ProductAction
          onDetail={() => navigate(`/product/${product.slug}`)}
          onAddToCart={() => addItem(product)}
        />
      </div>
    </div>
  );
};

export default ProductCard;
