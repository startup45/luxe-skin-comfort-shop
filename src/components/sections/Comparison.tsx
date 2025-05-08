
import React from 'react';
import { Check, X } from 'lucide-react';

const comparisonPoints = [
  {
    feature: "Dermatologist Tested & Approved",
    us: true,
    them: false,
    highlight: true
  },
  {
    feature: "Anti-Microbial Silver Threads",
    us: true,
    them: false,
    highlight: true
  },
  {
    feature: "Ultra-Absorption Technology",
    us: true,
    them: true,
    highlight: false
  },
  {
    feature: "Quick-Drying Technology",
    us: true,
    them: false,
    highlight: true
  },
  {
    feature: "700 GSM Premium Density",
    us: true,
    them: false,
    highlight: false
  },
  {
    feature: "OEKO-TEX® Certified Materials",
    us: true,
    them: true,
    highlight: false
  },
  {
    feature: "Hypoallergenic Fabric",
    us: true,
    them: false,
    highlight: true
  },
  {
    feature: "90-Day Trial Period",
    us: true,
    them: false,
    highlight: false
  }
];

const Comparison = () => {
  return (
    <section className="bg-luxe-sage bg-opacity-30 py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-luxe-sage rounded-full opacity-50 -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxe-blue rounded-full opacity-30 translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container-luxe relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-luxe-gold uppercase tracking-widest text-sm font-medium">Comparison</span>
          <h2 className="heading-lg mt-2">
            See Why We're Better
          </h2>
          <div className="w-20 h-1 bg-luxe-gold mx-auto mt-6 mb-6"></div>
          <p className="text-luxe-taupe text-lg">
            Our towels outperform Doctor Towel in the areas that matter most for your skin's health.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-elegant overflow-hidden border border-luxe-offwhite">
          {/* Header */}
          <div className="grid grid-cols-3">
            <div className="p-6 text-luxe-taupe-dark font-medium bg-luxe-offwhite">Features</div>
            <div className="p-6 text-center bg-luxe-gold bg-opacity-20 text-luxe-taupe-dark font-medium">
              <span className="font-playfair">LUXE<span className="text-luxe-gold">SKIN</span></span>
            </div>
            <div className="p-6 text-center text-luxe-taupe bg-luxe-offwhite font-medium">Doctor Towel</div>
          </div>
          
          {/* Comparison rows */}
          {comparisonPoints.map((point, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-3 border-t border-luxe-offwhite transition-colors duration-300 ${index % 2 === 0 ? 'bg-white' : 'bg-luxe-offwhite bg-opacity-30'} ${point.highlight ? 'hover:bg-luxe-gold hover:bg-opacity-10' : ''}`}
            >
              <div className="p-6 text-luxe-taupe-dark flex items-center">
                {point.feature}
                {point.highlight && (
                  <span className="ml-2 inline-block bg-luxe-gold text-white text-xs px-2 py-0.5 rounded-full">
                    Key Difference
                  </span>
                )}
              </div>
              
              <div className="p-6 flex justify-center items-center">
                {point.us ? (
                  <div className="bg-luxe-gold bg-opacity-20 w-10 h-10 rounded-full flex items-center justify-center">
                    <Check className="text-luxe-gold h-5 w-5" />
                  </div>
                ) : (
                  <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <X className="text-red-500 h-5 w-5" />
                  </div>
                )}
              </div>
              
              <div className="p-6 flex justify-center items-center">
                {point.them ? (
                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <Check className="text-green-500 h-5 w-5" />
                  </div>
                ) : (
                  <div className="bg-red-100 w-10 h-10 rounded-full flex items-center justify-center">
                    <X className="text-red-500 h-5 w-5" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <button className="btn-primary hover:scale-105 transition-transform">
            Experience The Difference
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
