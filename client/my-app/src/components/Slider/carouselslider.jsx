import React, { useState } from 'react'
import MensCollection from '../../assets/1.png'
import BasicCollection from '../../assets/2.png'
import OnlineShopping from '../../assets/3.png'
import ShopAnyTime from '../../assets/4.png'
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom'

const carouselslider = () => {

  const [current, setCurrent] = useState(0);

  const slides = [
    BasicCollection,
    ShopAnyTime,
    MensCollection,
    OnlineShopping
  ]

  const prevSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  }

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  }


  return (
    <>
      <div className='overflow-hidden relative'>
        <div className={`flex transition ease-out duration-400`}
          style={{
            transform: `translateX(-${current * 100}%)`
          }}
        >
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="" />
          ))}
        </div>

        <div className='absolute top-0 w-full h-full flex justify-between items-center text-4xl font-bold px-10'>
          <button onClick={prevSlide} className='hover:opacity-50'>
            <FaArrowCircleLeft />
          </button>
          <button onClick={nextSlide} className='hover:opacity-50'>
            <FaArrowCircleRight />
          </button>
        </div>

        <div className='absolute bottom-0 py-4 w-full flex justify-center gap-6'>
          {slides.map((s, i) => (
            <div
              onClick={() => setCurrent(i)}
              className={`rounded-full w-4 h-4 ${i == current ? 'bg-white' : 'bg-gray-800'} cursor-pointer`}
              key={i}></div>
          ))
          }
        </div>

      </div>
    </>
  )
}

export default carouselslider