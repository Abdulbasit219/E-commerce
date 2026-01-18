import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaBolt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white/70 shadow-md mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
       
        {/* Logo */}
        <div className="tracking-wide text-blue-600">
          <div className="flex items-center gap-x-2 font-extrabold text-2xl">
            <span className="p-2 bg-blue-100 rounded-full">
              <FaBolt className="text-blue-600" />
            </span>
            <p>QuickMart</p>
          </div>
          <div>
            <p className="text-gray-600 mt-2">Shopping Made Simple</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">
            About Us
          </a>
          <a href="/categories" className="text-gray-700 hover:text-blue-600">
            Categories
          </a>
          <a href="/faqs" className="text-gray-700 hover:text-blue-600">
            FAQs
          </a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact Us
          </a>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
          <p className="text-gray-600">+123-456-7890</p>
          <p className="text-gray-600">contact@quickmart.com</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
              <FaFacebook />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-xl">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t text-center py-4 text-gray-500 text-sm">
        © 2025 QuickMart. All rights reserved.
      </div>
    </footer>
  );
}
