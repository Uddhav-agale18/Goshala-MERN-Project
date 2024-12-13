import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogos } from '../adminPages/logo/logoSlice'; // Assuming this is your action to fetch logos
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

import { useColor } from '../ColorContext';

const Footer = () => {
  const { footerColor } = useColor();
  const dispatch = useDispatch();
  const { logos, loading, error } = useSelector((state) => state.logo);

  // Fetch logos when the component mounts
  useEffect(() => {
    dispatch(fetchLogos());
  }, [dispatch]);

  return (
    <footer className=" text-white py-5" style={{
      backgroundColor: footerColor}} >
      <div className="max-w-screen-xl mx-auto px-6 space-y-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
          {/* Logo and Description */}
          <div className="flex flex-col items-center text-center md:text-left space-y-4">
            {loading && <p>Loading logo...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {logos.length > 0 && (
              <div className="h-20 sm:h-24 md:h-32 rounded-full mb-4">
                <img
                  src={`http://localhost:5000/uploads/${logos[0].logo}`}
                  alt="Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            )}
            <p className="text-sm text-white max-w-xs leading-relaxed">
              Gayatri Gaushala Dabhadi is dedicated to providing a safe and nurturing environment for cows. We focus on their health, well-being, and overall care while supporting the community with our sustainable initiatives.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Social Links</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-2xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition"
                aria-label="Twitter"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition"
                aria-label="Instagram"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition"
                aria-label="YouTube"
              >
                <FaYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about-us"
                  className="hover:text-yellow-400 transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/donate"
                  className="hover:text-yellow-400 transition"
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-yellow-400 transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/terms-and-condition"
                  className="hover:text-yellow-400 transition"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Gayatrigaushala.in. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
