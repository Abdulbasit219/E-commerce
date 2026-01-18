import React from "react";
import { FaTruck, FaUndoAlt, FaLock, FaHeadset, FaMoneyBillWave } from "react-icons/fa";

const features = [
  {
    icon: <FaTruck size={40} className="text-blue-600" />,
    title: "Free Delivery",
    desc: "Enjoy free and fast delivery on all your orders.",
  },
  {
    icon: <FaUndoAlt size={40} className="text-blue-600" />,
    title: "Easy Returns",
    desc: "Hassle-free returns within 7 days of purchase.",
  },
  {
    icon: <FaMoneyBillWave size={40} className="text-blue-600" />,
    title: "Cash on Delivery",
    desc: "Pay when your order arrives at your doorstep.",
  },
  {
    icon: <FaHeadset size={40} className="text-blue-600" />,
    title: "24/7 Support",
    desc: "We are always here to help, anytime you need.",
  },
];

const Trust = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Shop With Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition"
            >
              {feature.icon}
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;
