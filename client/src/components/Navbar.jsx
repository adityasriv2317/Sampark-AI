import React, { useState } from "react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Link } from "react-router-dom";
// Import necessary icons from lucide-react
import {
  Mail,
  Menu,
  X,
  Home,
  MailPlus,
  Mails,
  LogIn,
  UserPlus,
} from "lucide-react";

import icon from "/sampark.png";
import {
  Mail,
  Menu,
  X,
  Home,
  MailPlus,
  Mails,
  LogIn,
  UserPlus,
} from "lucide-react";

import icon from "/sampark.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when a link is clicked on mobile
  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    // Updated background to indigo, adjusted padding slightly
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50 md:relative md:flex md:items-center md:justify-between">
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50 md:relative md:flex md:items-center md:justify-between">
      {/* Brand/Logo and Toggle Button Container */}
      <div className="flex items-center justify-between">
        {/* Logo with Icon */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold"
          onClick={handleLinkClick}
        >
          {/* <Mail size={24} /> //Added Mail icon */}
          <img src={icon} alt="Sampark AI Logo" className="h-12" />
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-semibold"
          onClick={handleLinkClick}
        >
          {/* <Mail size={24} /> //Added Mail icon */}
          <img src={icon} alt="Sampark AI Logo" className="h-12" />
          Sampark AI
        </Link>
        {/* Mobile Menu Toggle Button using Lucide icons */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}{" "}
          {isOpen ? <X size={28} /> : <Menu size={28} />}{" "}
          {/* Use Lucide Menu/X icons */}
        </button>
      </div>

      {/* Navigation Links Container */}
      {/* Added flex-grow and justify-center for medium screens+ to center links */}
      <div
        className={`flex-grow md:flex md:items-center md:justify-center ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
      <div
        className={`flex-grow md:flex md:items-center md:justify-center ${
          isOpen ? "block" : "hidden"
        } md:block`}
      >
        <ul
          className={`
            list-none p-0 m-0 mt-4 md:mt-0 md:flex md:space-x-8  /* Increased space between links */
            transition-all duration-300 ease-in-out w-full md:w-auto /* Ensure full width on mobile for centering text */
            text-center md:text-left /* Center text on mobile */
          `}
        >
          <li className="my-2 md:my-0">
            <Link
              to="/"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 md:p-0 rounded hover:bg-indigo-700 md:hover:bg-transparent md:hover:text-indigo-200 transition-colors duration-200"
              onClick={handleLinkClick}
            >
              <Home size={18} /> {/* Home Icon */}
              Home
            </Link>
          </li>
          <li className="my-2 md:my-0">
            <Link
              to="/new-mailing"
              className="flex items-center justify-center md:justify-start gap-2 py-2 px-3 md:p-0 rounded hover:bg-indigo-700 md:hover:bg-transparent md:hover:text-indigo-200 transition-colors duration-200"
              onClick={handleLinkClick}
            >
              <MailPlus size={18} /> {/* New Mailing Icon */}
              New Mailing
            </Link>
          </li>
        </ul>
      </div>
      </div>
      {/* Login/Signup Buttons */}
      {/* Hidden on mobile (handled by menu toggle), flex on medium+ */}
      <div
        className={`hidden md:flex items-center gap-4 ${
          isOpen ? " flex flex-col items-center w-full mt-4" : ""
        }`}
      >
        <Link
          to="/login"
          className="flex items-center gap-1 bg-white text-indigo-600 px-4 py-2 rounded font-medium hover:bg-indigo-100 transition-colors duration-200 w-full md:w-auto justify-center"
          onClick={handleLinkClick}
        >
          <LogIn size={16} />
          Login
        </Link>
        <Link
          to="/signup"
          className="flex items-center gap-1 bg-indigo-700 text-white px-4 py-2 rounded font-medium hover:bg-indigo-800 transition-colors duration-200 w-full md:w-auto justify-center"
          onClick={handleLinkClick}
        >
          <UserPlus size={16} />
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
