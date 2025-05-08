
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-luxe-white min-h-screen flex items-center pt-16">
      <div className="container-luxe grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Left column - Text */}
        <div className="flex flex-col justify-center space-y-6 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-luxe-taupe-dark leading-tight">
              Science-backed luxury for your skin
            </h1>
            <p className="mt-6 text-lg text-luxe-taupe max-w-md">
              Dermatologist-tested towels designed for skin health, paired with the luxury feel of premium spa experiences.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <button className="btn-primary">
              Shop Collection
            </button>
            <button className="flex items-center text-luxe-taupe-dark hover:text-luxe-gold transition-colors font-medium">
              Learn Our Science <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap gap-8 pt-8 items-center">
            <div className="flex flex-col items-center">
              <img src="https://placeholder.pics/svg/120x60/DEDEDE/555555/dermatologist%20tested" alt="Dermatologist Tested" className="h-10 w-auto opacity-70" />
              <span className="text-xs text-luxe-taupe mt-2">Dermatologist Tested</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://placeholder.pics/svg/120x60/DEDEDE/555555/hypoallergenic" alt="Hypoallergenic" className="h-10 w-auto opacity-70" />
              <span className="text-xs text-luxe-taupe mt-2">Hypoallergenic</span>
            </div>
            <div className="flex flex-col items-center">
              <img src="https://placeholder.pics/svg/120x60/DEDEDE/555555/anti-bacterial" alt="Anti-bacterial" className="h-10 w-auto opacity-70" />
              <span className="text-xs text-luxe-taupe mt-2">Anti-bacterial</span>
            </div>
          </div>
        </div>
        
        {/* Right column - Image */}
        <div className="relative h-[500px] lg:h-[600px] animate-fade-in-right">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full md:w-[120%]">
            <div className="relative h-full w-full">
              {/* Main image */}
              <img 
                src="https://placeholder.pics/svg/800x600/F6F6F7/8A898C/towel%20stack" 
                alt="Premium towels" 
                className="h-full w-full object-cover rounded-lg shadow-xl"
              />
              
              {/* Floating accent elements */}
              <div className="absolute -bottom-4 -left-4 md:-left-10 bg-luxe-green p-6 rounded-lg shadow-lg w-40">
                <div className="text-luxe-taupe-dark">
                  <div className="text-4xl font-playfair font-medium">99%</div>
                  <div className="text-sm mt-1">prefer our towels over competitors</div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 md:-right-10 bg-white p-4 rounded-lg shadow-lg w-32 text-center">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-luxe-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs mt-1 text-luxe-taupe-dark">
                  500+ 5-star reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background accent */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-luxe-offwhite -z-10 rounded-tl-[80px]" />
    </div>
  );
};

export default Hero;
