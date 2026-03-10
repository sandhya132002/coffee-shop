import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoPersonCircleOutline } from "react-icons/io5";
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#111111] text-yellow-400 fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">

        {/* Logo */}
        <div className="flex items-center gap-2 text-2xl font-black">
          <i className="bi bi-cup-hot"></i>
          <a href="/" className="text-yellow-500 hover:text-yellow-300 navbar no-underline">Coffee Shop</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          <a href="#carts" className="text-yellow-400 hover:text-yellow-300 navbar">Cart</a>
          <a href="#contact" className="text-yellow-400 hover:text-yellow-300 navbar no-underline">Contact</a>
          <a href="#admin" className="text-yellow-400 hover:text-yellow-300 no-underline navbar">Admin</a>
        </div>


        {/* Login Button */}
        <div className="hidden md:flex">
          <Link to="/login" className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300">
            <IoPersonCircleOutline className="text-xl" />
            Login
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-3xl text-yellow-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#111111] flex flex-col items-start gap-4 px-6 py-4 shadow-lg animate-slide-down">
          <a href="#cart" className="text-yellow-400 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Cart</a>
          <a href="#admin" className="text-yellow-400 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Admin</a>
          <a href="#contact" className="text-yellow-400 hover:text-yellow-300" onClick={() => setIsOpen(false)}>Contact</a>
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 w-full justify-center"
          >
            <IoPersonCircleOutline className="text-xl" />
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
