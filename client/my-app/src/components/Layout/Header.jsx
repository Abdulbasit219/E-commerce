import React, { useState } from 'react'
import { useAuth } from '../../context/auth'
import { Link } from 'react-router-dom';
import SearchInput from '../Forms/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { Badge } from 'antd';


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [isCategopen, setisCategopen] = useState(false);
  const categories = useCategory();
  const [cart, setCart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('authData')
  }

  return (
    <>
      <nav className="relative bg-gray-800 shadow dark:bg-gray-800">
        <div className="container px-6 py-3 mx-auto md:flex justify-around">


          {/* logo */}
          <div className="flex items-center justify-between">
            <h3 className='text-2xl font-bold ml-5 font-serif text-white'><span>E</span>commerce App</h3>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                {!isOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>


          {/* {search box} */}
          <SearchInput />

          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          <div className={`${isOpen ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-full'} absolute inset-x-0 z-20 px-6 py-4 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative md:opacity-100 md:translate-x-0 md:flex md:items-center md:justify-between`}>

            {/* menu item */}
            <div className="flex flex-col px-2 -mx-4 md:flex-row md:mx-10 md:py-0 text-white font-serif items-center bg-gray-800">

              <Link to="/" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg  hover:bg-gray-700 md:mx-2">Home</Link>

              <button className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg  hover:bg-gray-700 md:mx-2 flex"
                onClick={() => {
                  setisCategopen(!isCategopen);
                }}>
                Categories
                <svg className="h-5 w-5" fill='white' >
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                </svg>
              </button>

              {isCategopen &&
                <div className="relative">
                  <div className="absolute top-6 right-4 bg-black text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {categories.map((c) => (
                        <Link to={`/category-product/${c.slug}`} key={c._id} className='block px-4 py-2 hover:opacity-50' onClick={() => {
                          setisCategopen(!isCategopen);
                        }}>
                          <li>{c.name}</li>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              }

              {
                auth.user
                  ?
                  (
                    <>
                      <button
                        className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg  hover:bg-gray-700 md:mx-2 flex"
                        onClick={() => {
                          setisMenuOpen(!isMenuOpen);
                        }}>
                        {auth?.user?.name}
                        <svg className="h-5 w-5" fill='white' >
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                        </svg>
                      </button>

                      {isMenuOpen &&
                        <div className='relative'>
                          <div className="absolute top-6 right-1/2 bg-black text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                            <div className="py-1">

                              <Link to={`/dashboard/${auth?.user?.isAdmin === 1 ? 'admin' : 'user'}`} className='block px-4 py-2'>
                                <li >Dashboard</li>
                              </Link>

                              <Link to="/" className='block px-4 py-2' onClick={handleLogout}>
                                <li >Log out</li>
                              </Link>

                            </div>
                          </div>
                        </div>
                      }
                    </>
                  )
                  :
                  (
                    <>
                      <Link to="/signup" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-700 md:mx-2">
                        <li >Sign Up</li>
                      </Link>
                      <Link to="/signin" className="px-2.5 py-2 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-700 md:mx-2">
                        <li >Sign In</li>
                      </Link>
                    </>
                  )
              }
              <Badge count={cart?.length} showZero className='p-2 transition-colors duration-300 transform rounded-lg  md:mx-2 text-white font-serif text-xl hover:bg-gray-700'>
                <Link to="/cart" className="">
                  cart
                </Link>
              </Badge>
            </div>

          </div>


        </div>
      </nav>
    </>
  )
}

export default Header