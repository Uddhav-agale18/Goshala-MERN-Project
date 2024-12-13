import React, { useState, useEffect } from "react";
import {
  FiMenu,
  FiMail,
  FiPhone,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiHome,
  FiGlobe,
  FiChevronDown,
  FiDollarSign,
  FiGift,
  FiCalendar,
  FiHeart,
  FiLink,
  FiCreditCard,
  FiAlertCircle,
  FiActivity,
  FiDownload,
  FiInfo,
  FiImage,
  FiFileText,
  FiTruck,
} from "react-icons/fi";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';

import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "../images/logo.jpg";
import { fetchContact } from '../adminPages/contacts/contactSlice';
import { useColor } from '../ColorContext';

const Header = ({ backgroundColor }) => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const [dropdownStates, setDropdownStates] = useState({});
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const { contact } = useSelector((state) => state.contact);
  const { headerColor } = useColor();
  useEffect(() => {
    dispatch(fetchContact());  // Fetch contact details when the component mounts
  }, [dispatch]);
  
  const toggleDropdown = (dropdown) => {
    setDropdownStates((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    alert(`Language switched to ${e.target.value}`);
  };

  return (
    // <header className="bg-red-950 text-white">
    <header
    className="text-white"
    style={{ backgroundColor: backgroundColor || headerColor }} // Default color if none selected
  >
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3 lg:px-6 lg:py-4">
        {/* Logo and Menu Button */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleMenu}
            className="flex items-center p-2 rounded-full bg-yellow-200 text-black hover:bg-yellow-300"
          >
            <FiMenu className="text-lg " />
          </button>
        </div>

        {/* Contact Info & Search */}
        <div className="flex items-center space-x-4 mr-2 lg:pr-4">
          <div className="hidden lg:flex items-center space-x-6 ">
            {/* Contact Info */}
            <div className="flex flex-col space-y-1 lg:pr-4">
              {contact && (
                <>
                  <span className="flex items-center text-sm">
                    <FiPhone className="mr-2 text-amber-200" />
                    {contact.email}
                  </span>
                  <span className="flex items-center text-sm">
                    <FiMail className="mr-2 text-amber-200" />
                    {contact.phone}
                  </span>
                </>
              )}
            </div>

            {/* Search Bar */}
            <div className="relative hidden md:flex lg:pr-4">
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-1 w-64 rounded-full text-gray-700 focus:outline-none focus:ring focus:ring-yellow-400"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* Search Icon for small screens */}
          <button className="lg:hidden p-2 rounded-full text-white hover:text-gray-300">
            <FiSearch className="text-lg" />
          </button>

          {/* Buttons and Language Selector (Hide on Mobile) */}
          <div className="hidden lg:flex items-center space-x-6 mr-4 lg:pr-4">
            <div className="relative">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-white text-black px-3 py-1 rounded-full focus:outline-none focus:ring focus:ring-yellow-400 pl-10 pr-3"
              >
                <option value="English">English</option>
                <option value="Marathi">Marathi</option>

                <option value="Hindi">Hindi</option>
              </select>

              {/* Add Earth Icon */}
              <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <button className="bg-green-500 px-3 py-2 rounded-full hover:bg-green-600 text-white lg:pr-4">
              <FiShoppingCart />
            </button>
            <button className="bg-yellow-400 px-3 py-2 rounded-full hover:bg-yellow-500 text-white lg:pr-4">
              Donate
            </button>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-gray-200 flex items-center  lg:pr-4">
              <FiUser className="mr-2" />
              Login
            </button>
          </div>

          {/* Show Donate, Cart, and Login on Mobile */}
          <div className="lg:hidden flex items-center space-x-3 md:space-x-6  mr-4">
            <button className="bg-green-500 px-3 py-2 rounded-full hover:bg-green-600 text-white">
              <FiShoppingCart />
            </button>
            <button className="bg-yellow-400 px-3 py-1 rounded-full hover:bg-yellow-500 text-white">
              Donate
            </button>
            <button className="bg-white text-blue-500 px-4 py-1 rounded-full hover:bg-gray-200 flex items-center mr-4">
              <FiUser className="mr-2" />
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-[350px] h-full bg-gray-50 shadow-lg text-gray-900 transition-transform transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} z-50 overflow-hidden rounded-lg`}
      >
        <div className="bg-red-700 flex justify-between items-center p-4">
          <img src={Logo} alt="Logo" className="h-14 rounded-full" />
          <p className="font-bold text-white text-lg">Gayatri Gaushala</p>
          <button onClick={toggleMenu} className="text-white text-3xl">
            <IoClose />
          </button>
        </div>

        {/* Sidebar Navigation with scrolling */}
        <nav className="flex flex-col p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-70px)] flex-grow">
          {/* Home */}
          <Link
            to="/"
            onClick={toggleMenu} // Close the sidebar on click
            className="flex items-center space-x-3 text-gray-800 hover:text-red-500 text-lg font-medium"
          >
            <FiHome />
            <span>Home</span>
          </Link>

          {/* My Profile */}
          <Link
            to=""
            onClick={toggleMenu} // Close the sidebar on click
            className="flex items-center space-x-3 text-gray-800 hover:text-red-500 text-lg font-medium"
          >
            <FiUser />
            <span>My Profile</span>
          </Link>

          {/* Gallery */}
          <Link
            to="/gallery"
            onClick={toggleMenu} // Close the sidebar on click
            className="flex items-center space-x-3 text-gray-800 hover:text-red-500 text-lg font-medium"
          >
            <FiImage className="mr-2" />
            <span>Gallery</span>
          </Link>

          {/* About Us */}
          <Link
            to="/about-us"
            onClick={toggleMenu} // Close the sidebar on click
            className="flex items-center space-x-3 text-gray-800 hover:text-red-500 text-lg font-medium"
          >
            <FiInfo className="mr-2" />
            <span>About Us</span>
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            onClick={toggleMenu} // Close the sidebar on click
            className="flex items-center space-x-3 text-gray-800 hover:text-red-500 text-lg font-medium"
          >
            <FiPhone />
            <span>Contact Us</span>
          </Link>

          <Link
            to="/services"
            onClick={toggleMenu} // Close the sidebar on click
            className="flex items-center space-x-3 text-gray-800 hover:text-red-500 text-lg font-medium"
          >
            <FiTruck className="mr-2" /> {/* Replace with service-related icon */}
            <span>Our Services</span>
          </Link>
          {/* Terms & Conditions */}
          <Link
            to="/terms-and-conditions"
            onClick={toggleMenu} // Close the sidebar on click
            className="flex items-center space-x-3 text-gray-800 hover:text-red-500 text-lg font-medium"
          >
            <FiFileText className="mr-2" />
            <span>Terms & Conditions</span>
          </Link>   
          <div>
            <button
              onClick={() => toggleDropdown("myDonation")}
              className="w-full flex items-center justify-between text-gray-800 hover:text-red-500 text-lg font-medium py-2 px-0 rounded-md transition duration-300"
            >
              <span className="flex items-center">
                <FiDollarSign className="mr-3" />
                My Donation
              </span>
              <FiChevronDown
                className={`transform ${dropdownStates.myDonation ? "rotate-180" : ""} transition duration-300`}
              />
            </button>

            {dropdownStates.myDonation && (
              <div className="pl-8 mt-2 space-y-2">
                <Link
                  to="/my-donation/my-payments"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-800 hover:text-white hover:bg-red-500 text-base py-2 px-4 rounded-md transition duration-300"
                >
                  <FiCreditCard className="mr-2" />
                  <span>My Payments</span>
                </Link>
                <Link
                  to="/my-donation/monthly-donation"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-800 hover:text-white hover:bg-red-500 text-base py-2 px-4 rounded-md transition duration-300"
                >
                  <FiCalendar className="mr-2" />
                  <span>Monthly Donation</span>
                </Link>
                <Link
                  to="/my-donation/consolidated-receipt"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-800 hover:text-white hover:bg-red-500 text-base py-2 px-4 rounded-md transition duration-300"
                >
                  <FiGift className="mr-2" />
                  <span>Consolidated Receipt</span>
                </Link>

              </div>
            )}
          </div>

          {/* Donation - Book Your Sewa with Dropdown */}
          <div>
            <button
              onClick={() => toggleDropdown("donationBook")}
              className="w-full flex items-center justify-between text-gray-800 hover:text-red-500 text-lg font-medium py-2 px-0 rounded-md transition duration-300"
            >
              <span className="flex items-center">
                <FiDollarSign className="mr-1" />
                Donation - Book Your Sewa
              </span>
              <FiChevronDown
                className={`transform ${dropdownStates.donationBook ? "rotate-180" : ""} transition duration-300`}
              />
            </button>

            {dropdownStates.donationBook && (
              <div className="pl-8 mt-2 space-y-2">
                <Link
                  to="/donation/book-your-sewa/food-for-under-privileged"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-800 hover:text-white hover:bg-red-500 text-base py-2 px-2 rounded-md transition duration-300"
                >
                  <FiGift className="mr-0" />
                  <span>Food For Under Privileged</span>
                </Link>
                <Link
                  to="/donation/book-your-sewa/adopt-cows"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-800 hover:text-white hover:bg-red-500 text-base py-2 px-2 rounded-md transition duration-300"
                >
                  <FiHeart className="mr-2" />
                  <span>Adopt Cows</span>
                </Link>
                <Link
                  to="/donation/book-your-sewa/service-to-mother-cow"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-800 hover:text-white hover:bg-red-500 text-base py-2 px-2 rounded-md transition duration-300"
                >
                  <FiGift className="mr-2" />
                  <span>Service To Mother Cow</span>
                </Link>
                <Link
                  to="/donation/book-your-sewa/medical-emergency"
                  onClick={toggleMenu}
                  className="flex items-center space-x-3 text-gray-800 hover:text-white hover:bg-red-500 text-base py-2 px-2 rounded-md transition duration-300"
                >
                  <FiAlertCircle className="mr-2" />
                  <span>Medical Emergency</span>
                </Link>
              </div>
            )}
          </div>

    
          {/* Social Media Links */}
          <div className="mt-auto flex justify-center items-center p-6 space-x-4 z-50">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-red-500 text-2xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-red-500 text-2xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-red-500 text-2xl"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-red-500 text-2xl"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom Navigation Bar for Small Screens */}
      <div className="fixed bottom-0 left-0 w-full bg-blue-400  shadow-lg lg:hidden flex justify-around items-center py-3 border-t border-gray-300">
        <Link
          to="/"
          className="flex flex-col items-center text-white hover:text-red-500"
        >
          <FiHome className="text-xl" />
          <span className="text-xs">Home</span>
        </Link>
        <Link
          to="/search"
          className="flex flex-col items-center text-white hover:text-red-500"
        >
          <FiSearch className="text-xl" />
          <span className="text-xs">Search</span>
        </Link>
        <Link
          to="/profile"
          className="flex flex-col items-center text-white hover:text-red-500"
        >
          <FiUser className="text-xl" />
          <span className="text-xs">Profile</span>
        </Link>
        <Link
          to="/contact"
          className="flex flex-col items-center text-white hover:text-red-500"
        >
          <FiMail className="text-xl" />
          <span className="text-xs">Contact</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
