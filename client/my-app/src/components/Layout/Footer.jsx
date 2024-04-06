import React from 'react'
import { FaLocationDot, FaSquareFacebook, FaSquareTwitter } from "react-icons/fa6";
import { FaPhoneAlt, FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link } from 'react-router-dom';
import '.css';

const Footer = () => {
  return (
    <>
      <div className='bg-gray-800 py-10 text-white flex justify-around mobile-scr relative z-1'>

        <div className='icon-div'>

          <div className='flex items-center p-2 text-xl my-4'><FaLocationDot /> <span className='ml-6'>14 Street <br /><span className='font-bold'>karachi Pakistan</span></span>
          </div>

          <div className='flex items-center p-2 text-xl my-4'><FaPhoneAlt /> <span className='ml-6 font-bold'>+92 316 2956262</span>
          </div>

          <div className='flex items-center p-2 text-xl my-4'><SiGmail /> <span className='ml-6 font-bold hover:text-blue-500'><a href="mailto:abdulbasit07677@gmail.com">abdulbasit07677gmail.com</a></span>
          </div>

          <div className='footer-div'>
            <ul className='flex justify-center'>
              <Link to="/about" className='flex '>
                <li className='hover:opacity-50'>About Us</li>
                <p className='ml-2 font-bold'>|</p>
              </Link>
              <Link to="/contactus" className='flex ml-2'>
                <li className='hover:opacity-50'>Contact Us</li>
              </Link>
            </ul>
          </div>

        </div>

        <hr className='w-[80%] m-auto' />

        <div className='w-[80%] md:w-[30%] text-div mt-10 mb-8'>

          <div>
            <p className='font-bold text-2xl mb-6'>About the Company</p>
            <p className='opacity-50'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur quia, commodi illo, officia enim amet fugit quae vero deleniti sequi quo ullam? Ea non natus libero temporibus sunt ipsum. Doloribus.</p>
          </div>
          <div >
            <div className='mt-6'>
              <p className='font-bold text-2xl'>Follow Us:</p>
            </div>
            <div className='flex text-4xl social-media'>
              <Link to={'/'}
                target="_blank"
                className='mt-2'><FaSquareFacebook />
              </Link>
              <Link to={'/'}
                target="_blank"
                className='ml-2 mt-2'><FaSquareTwitter />
              </Link>
              <Link to={'https://www.linkedin.com/in/abdul-basit-114a7322b/?original_referer=https%3A%2F%2Fgithub.com%2F'}
                target="_blank"
                className='ml-2 mt-2'><FaLinkedin />
              </Link>
              <Link to={'https://github.com/Abdulbasit219'}
                target="_blank"
                className='ml-2 mt-2'><FaGithubSquare />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default Footer