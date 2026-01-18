import React from "react";
import Slider from "../Slider";

function Hero() {
  return (
    <>
      <section className="bg-white relative overflow-hidden h-[90vh] flex flex-col items-center justify-center">
        <div className="bg-white flex relative z-20 items-center overflow-hidden">
          <div className="container mx-auto px-6 flex flex-col-reverse items-center justify-center lg:flex-row relative py-16">
            <div className="sm:w-2/3 lg:w-3/5 flex flex-col justify-center relative z-20">
              <span className="w-20 h-2 bg-gray-800  mb-12" />
              <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none">
                <span className="text-5xl sm:text-6xl">
                  Shop Smarter, Live Better
                </span>
              </h1>
              <p className="mt-6 text-sm sm:text-base text-gray-700">
                From trendy fashion to everyday essentials, discover everything
                you need in one place. Quality products, great prices, and a
                shopping experience made simple.
              </p>
              <div className="flex mt-8">
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-[#2563EB] hover:bg-white hover:text-[#2563EB] hover:border-[#2563EB] border-2 border-transparent text-white text-md mr-4"
                >
                  Shop Now
                </a>
                <a
                  href="#"
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white text-md"
                >
                  Browse Categories
                </a>
              </div>
            </div>
            {/* image  */}
            <div className="sm:w-2/3 lg:w-3/5 flex justify-center">
              <Slider />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
