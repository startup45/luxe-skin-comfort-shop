
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navLinkClass = (path) => {
    return `transition-colors ${isActive(path) 
      ? "text-luxe-gold font-medium" 
      : "text-luxe-taupe-dark hover:text-luxe-gold"}`;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-luxe flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold tracking-tighter">
            LUXE<span className="text-luxe-gold">SKIN</span>
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={navLinkClass("/")}>
            Home
          </Link>
          <Link to="/shop" className={navLinkClass("/shop")}>
            Shop
          </Link>
          <Link to="/science" className={navLinkClass("/science")}>
            Our Science
          </Link>
          <Link to="/about" className={navLinkClass("/about")}>
            About
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="text-luxe-taupe-dark hover:text-luxe-gold transition-colors">
            <Search size={20} />
          </button>
          <Link to="/cart" aria-label="Cart" className="text-luxe-taupe-dark hover:text-luxe-gold transition-colors relative">
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-luxe-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden text-luxe-taupe-dark"
            onClick={toggleMenu}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 w-full shadow-md animate-fade-in">
          <div className="container-luxe py-4 flex flex-col space-y-4">
            <Link to="/" className={navLinkClass("/")} onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/shop" className={navLinkClass("/shop")} onClick={toggleMenu}>
              Shop
            </Link>
            <Link to="/science" className={navLinkClass("/science")} onClick={toggleMenu}>
              Our Science
            </Link>
            <Link to="/about" className={navLinkClass("/about")} onClick={toggleMenu}>
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
