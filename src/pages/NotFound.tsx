
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-20 bg-luxe-offwhite">
        <div className="container-luxe">
          <div className="max-w-xl mx-auto text-center bg-white p-12 rounded-xl shadow-elegant">
            <h1 className="text-5xl md:text-7xl font-playfair font-medium text-luxe-gold mb-6">404</h1>
            <h2 className="text-2xl md:text-3xl font-medium text-luxe-taupe-dark mb-4">Page Not Found</h2>
            <p className="text-luxe-taupe mb-8">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Link to="/" className="btn-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
