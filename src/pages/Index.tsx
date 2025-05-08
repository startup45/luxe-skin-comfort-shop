
import React, { useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Comparison from '../components/sections/Comparison';
import Newsletter from '../components/sections/Newsletter';
import ProductCard from '../components/ui/ProductCard';

// Sample products data
const featuredProducts = [
  {
    id: 1,
    name: "Ultra-Soft Bath Towel",
    description: "Our signature bath towel with anti-microbial silver threads and dermatologist-approved softness.",
    price: 59.99,
    image: "https://placeholder.pics/svg/400x300/FFFFFF/8A898C/bath%20towel",
    category: "Bath Towels",
    tags: ["Anti-Bacterial", "Quick-Dry"],
    rating: 5,
    bestseller: true
  },
  {
    id: 2,
    name: "Luxury Face Towel Set",
    description: "Set of 3 ultra-gentle face towels designed specifically for sensitive facial skin.",
    price: 39.99,
    image: "https://placeholder.pics/svg/400x300/FFFFFF/8A898C/face%20towel",
    category: "Face Towels",
    tags: ["Hypoallergenic", "Gentle"],
    rating: 5
  },
  {
    id: 3,
    name: "Premium Hand Towel",
    description: "The perfect blend of absorption and quick-drying technology for daily hand drying.",
    price: 29.99,
    image: "https://placeholder.pics/svg/400x300/FFFFFF/8A898C/hand%20towel",
    category: "Hand Towels",
    tags: ["Quick-Dry", "700 GSM"],
    rating: 4.5
  },
  {
    id: 4,
    name: "Complete Luxury Bundle",
    description: "Our complete set featuring 2 bath towels, 2 hand towels, and 2 face towels.",
    price: 179.99,
    image: "https://placeholder.pics/svg/400x300/FFFFFF/8A898C/towel%20bundle",
    category: "Bundles",
    tags: ["Gift Set", "Value Pack"],
    rating: 5,
    bestseller: true
  }
];

const certifications = [
  {
    id: 1,
    name: "Dermatologically Tested",
    image: "https://placeholder.pics/svg/150x150/DEDEDE/555555/dermatologist%20tested",
    description: "Tested by leading dermatologists for skin safety and compatibility."
  },
  {
    id: 2,
    name: "OEKO-TEX® Certified",
    image: "https://placeholder.pics/svg/150x150/DEDEDE/555555/oeko-tex",
    description: "Meets the highest environmental and safety standards in textile production."
  },
  {
    id: 3,
    name: "Anti-Microbial Verified",
    image: "https://placeholder.pics/svg/150x150/DEDEDE/555555/anti-microbial",
    description: "Silver-infused fibers independently tested for bacterial resistance."
  },
  {
    id: 4,
    name: "Premium Material Rating",
    image: "https://placeholder.pics/svg/150x150/DEDEDE/555555/premium%20material",
    description: "Top-tier 700 GSM cotton recognized for exceptional quality."
  }
];

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <Features />
        
        {/* Featured Products Section */}
        <section className="bg-white py-20">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark mb-4">
                Our Bestselling Collections
              </h2>
              <p className="text-luxe-taupe text-lg max-w-2xl mx-auto">
                Experience the perfect balance of luxury comfort and skin-friendly technology.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <button className="btn-primary">
                View All Products
              </button>
            </div>
          </div>
        </section>
        
        {/* Comparison Section */}
        <Comparison />
        
        {/* Certifications Section */}
        <section className="bg-white py-20">
          <div className="container-luxe">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark mb-4">
                Backed By Science
              </h2>
              <p className="text-luxe-taupe text-lg max-w-2xl mx-auto">
                We've earned certifications from the most respected organizations in skincare and textile quality.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-luxe-offwhite p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                  <img src={cert.image} alt={cert.name} className="w-24 h-24 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-luxe-taupe-dark mb-2">{cert.name}</h3>
                  <p className="text-sm text-luxe-taupe">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Customer Reviews Section - Simple version */}
        <section className="bg-luxe-offwhite py-20">
          <div className="container-luxe text-center">
            <h2 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark mb-8">
              What Our Customers Say
            </h2>
            
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-luxe-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-luxe-taupe-dark text-lg italic mb-4">
                  "As a dermatologist, I'm extremely particular about what touches my skin. LuxeSkin towels are genuinely different - the anti-microbial technology and ultra-soft texture make them superior to any other premium towel I've used."
                </p>
                
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://placeholder.pics/svg/100x100/DEDEDE/555555/DR"
                      alt="Dr. Emily Chen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-luxe-taupe-dark">Dr. Emily Chen</p>
                    <p className="text-sm text-luxe-taupe">Board Certified Dermatologist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
