import { useEffect, useState } from "react";
import clock from "../assets/clock.png";
import shopping from "../assets/shopping.png";
import shirts from "../assets/shirts.jpg";
import henfree from "../assets/henfree.jpg";

const images = [clock, shopping, henfree, shirts];

const Slider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((currValue) =>
        currValue === images.length - 1 ? 0 : currValue + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sm:block sm:w-1/3 lg:w-3/5 relative">
      <img
        src={images[currentImage]}
        alt="slider"
        className="w-64 h-64 sm:w-96 sm:h-96 object-contain transition-opacity duration-500 ease-in-out"
      />
    </div>
  );
};

export default Slider;
