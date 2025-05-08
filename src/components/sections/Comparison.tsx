
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
    <section className="bg-luxe-offwhite py-20">
      <div className="container-luxe">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark mb-4">
            See Why We're Better
          </h2>
          <p className="text-luxe-taupe text-lg">
            Our towels outperform Doctor Towel in the areas that matter most for your skin's health.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="grid grid-cols-3 bg-luxe-offwhite">
            <div className="p-6 text-luxe-taupe-dark font-medium">Features</div>
            <div className="p-6 text-center bg-luxe-green text-luxe-taupe-dark font-medium">
              LUXE<span className="text-luxe-gold">SKIN</span>
            </div>
            <div className="p-6 text-center text-luxe-taupe font-medium">Doctor Towel</div>
          </div>
          
          {/* Comparison rows */}
          {comparisonPoints.map((point, index) => (
            <div 
              key={index} 
              className={`grid grid-cols-3 border-t border-gray-100 ${point.highlight ? 'bg-luxe-green bg-opacity-20' : ''}`}
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
                  <Check className="text-luxe-gold h-6 w-6" />
                ) : (
                  <X className="text-red-500 h-6 w-6" />
                )}
              </div>
              
              <div className="p-6 flex justify-center items-center">
                {point.them ? (
                  <Check className="text-green-500 h-6 w-6" />
                ) : (
                  <X className="text-red-500 h-6 w-6" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <button className="btn-primary">
            Experience The Difference
          </button>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
