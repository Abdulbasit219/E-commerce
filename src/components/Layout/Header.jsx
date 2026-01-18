import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { FaBolt, FaChevronDown } from "react-icons/fa6";
import { MdClose, MdOutlineMenu, MdOutlineShoppingCart } from "react-icons/md";
import SearchInput from "../Forms/SearchInput";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [isCategopen, setisCategopen] = useState(false);
  const categories = useCategory();
  const [cart] = useCart();
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("authData");
  };

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 left-0 w-full h-20 z-50 flex items-center transition-all duration-300 shadow-lg ${
          scrolled ? "bg-white/70 shadow backdrop-blur" : "bg-transparent"
        }`}
      >
        <div className="flex w-full justify-between items-center container mx-auto px-4">
          {/* Logo */}
          <div className="flex items-center gap-x-2 text-2xl font-extrabold tracking-wide text-blue-600">
            <span className="p-2 bg-blue-100 rounded-full">
              <FaBolt className="text-blue-600" />
            </span>
            <p>QuickMart</p>
          </div>

          {/* mobile cart and toggle button */}
          <div className="flex flex-row-reverse gap-4">
            {/* Mobile toggle button */}
            <div
              className="text-2xl cursor-pointer lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <MdOutlineMenu />
            </div>

            {/* mobile Cart */}
            <div className="lg:hidden">
              <Badge
                count={cart?.length}
                className="transition-all duration-300 hover:text-blue-600 hover:underline"
                showZero
              >
                <Link
                  to="/cart"
                  className="text-2xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <MdOutlineShoppingCart />
                </Link>
              </Badge>
            </div>
          </div>

          {/* // Search box */}
          <div className="w-[25%] hidden lg:block">
            <SearchInput />
          </div>

          {/* ul both Desktop & Mobile */}
          <ul
            className={`fixed top-0 left-0 h-full w-64 lg:w-auto lg:h-auto lg:static bg-white lg:bg-transparent flex flex-col lg:flex-row gap-y-4 lg:gap-x-6 p-6 lg:p-0 font-medium shadow-lg lg:shadow-none lg:items-center transform transition-transform duration-300 z-50 text-gray-700
            ${
              mobileOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }`}
          >
            {/* Close btn (only mobile) */}
            <li className="flex flex-col-reverse lg:hidden mb-6">
              {/* Logo */}
              <div className="flex items-center gap-x-2 text-2xl font-extrabold tracking-wide text-blue-600 lg:hidden mt-4">
                <span className="p-2 bg-blue-100 rounded-full">
                  <FaBolt className="text-blue-600" />
                </span>
                <p>QuickMart</p>
              </div>

              <button
                className="flex justify-end"
                onClick={() => setMobileOpen(false)}
              >
                <MdClose className="text-2xl" />
              </button>
            </li>

            {/* Home */}
            <li>
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="transition-all duration-300 hover:text-blue-600 hover:underline"
              >
                Home
              </Link>
            </li>

            {/* Categories dropdown */}
            <li className="relative">
              <button
                className="transition-all duration-300 hover:text-blue-600 hover:underline flex gap-1 items-center py-2"
                type="button"
                onClick={() => setisCategopen(!isCategopen)}
              >
                Categories <FaChevronDown className="h-4 w-4" />
              </button>

              {/* Dropdown (desktop absolute / mobile inline) */}
              {isCategopen && (
                <div
                  className={`lg:absolute lg:top-full lg:left-0 lg:mt-2 lg:z-20 border bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
                >
                  <ul className="py-2 text-sm text-gray-700">
                    {categories.map((c) => (
                      <li key={c._id}>
                        <Link
                          to={`/category-product/${c.slug}`}
                          className="block px-4 py-2 border-b hover:bg-gray-100"
                          onClick={() => {
                            setisCategopen(false);
                            setMobileOpen(false);
                          }}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            {/* User menu */}
            {auth.user ? (
              <li className="relative">
                <button
                  className="transition-all duration-300 hover:text-blue-600 hover:underline flex gap-1 items-center py-2"
                  type="button"
                  onClick={() => setisMenuOpen(!isMenuOpen)}
                >
                  {auth?.user?.name} <FaChevronDown className="h-4 w-4" />
                </button>

                {isMenuOpen && (
                  <div className="lg:absolute lg:top-full lg:right-0 mt-2 lg:z-20 border bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <Link
                          to={`/dashboard/${
                            auth?.user?.isAdmin === 1 ? "admin" : "user"
                          }`}
                          className="block px-4 py-2 border-b hover:bg-gray-100"
                          onClick={() => {
                            setisMenuOpen(false);
                            setMobileOpen(false);
                          }}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          onClick={() => {
                            handleLogout();
                            setisMenuOpen(false);
                            setMobileOpen(false);
                          }}
                        >
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="transition-all duration-300 hover:text-blue-600 hover:underline"
                  >
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="transition-all duration-300 hover:text-blue-600 hover:underline"
                  >
                    Sign In
                  </Link>
                </li>
              </>
            )}

            {/* Cart */}
            <li className="hidden lg:block">
              <Badge
                count={cart?.length}
                className="transition-all duration-300 hover:text-blue-600 hover:underline"
                showZero
              >
                <Link
                  to="/cart"
                  className="text-2xl"
                  onClick={() => setMobileOpen(false)}
                >
                  <MdOutlineShoppingCart />
                </Link>
              </Badge>
            </li>
          </ul>
        </div>

        {/* Overlay */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          ></div>
        )}
      </nav>
    </>
  );
};

export default Header;
