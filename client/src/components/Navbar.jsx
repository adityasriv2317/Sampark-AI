import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
// import './Navbar.css'; // Remove this line - CSS file is no longer needed

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
    // Navbar container: Fixed top on mobile, relative on medium screens+, background, padding, text color, shadow
    <nav className="bg-gray-800 text-white p-4 shadow-md fixed top-0 left-0 w-full z-50 md:relative md:flex md:items-center md:justify-between">
      {/* Brand/Logo and Toggle Button Container */}
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold" onClick={handleLinkClick}>
          Sampark AI
        </Link>
        {/* Mobile Menu Toggle Button (hidden on medium screens and up) */}
        <button className="md:hidden text-2xl" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Links */}
      {/* Menu: Hidden on mobile unless 'isOpen', flex row on medium screens+ */}
      {/* Added transition for smoother opening/closing on mobile */}
      <ul
        className={`
          list-none p-0 m-0 mt-4 md:mt-0 md:flex md:space-x-6
          ${isOpen ? 'block' : 'hidden'} md:block
          transition-all duration-300 ease-in-out
        `}
      >
        {/* Nav Items */}
        <li className="my-2 md:my-0">
          <Link
            to="/"
            className="block py-2 px-3 md:p-0 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
            onClick={handleLinkClick}
          >
            Home
          </Link>
        </li>
        <li className="my-2 md:my-0">
          <Link
            to="/new-mailing"
            className="block py-2 px-3 md:p-0 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
            onClick={handleLinkClick}
          >
            New Mailing
          </Link>
        </li>
        <li className="my-2 md:my-0">
          <Link
            to="/my-mails"
            className="block py-2 px-3 md:p-0 rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-gray-300"
            onClick={handleLinkClick}
          >
            My Mails
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

/*
Removed the CSS styles previously here as they are now handled by Tailwind classes.
You can now safely delete the Navbar.css file if it's no longer used by other components.
*/
