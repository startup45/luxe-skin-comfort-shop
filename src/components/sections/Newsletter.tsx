
import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real implementation, you'd call an API to subscribe the user
    console.log('Subscribing email:', email);
    
    // Show success message
    setIsSubmitted(true);
    setEmail('');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };
  
  return (
    <section className="py-24 bg-gradient-to-b from-luxe-offwhite to-white">
      <div className="container-luxe">
        <div className="bg-gradient-to-br from-luxe-sage to-luxe-blue bg-opacity-30 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-elegant">
          {/* Background abstract elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"></div>
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white bg-opacity-10 backdrop-blur-sm"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-luxe-gold bg-opacity-20"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-luxe-blue bg-opacity-30"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <span className="inline-block mb-2 text-luxe-gold uppercase tracking-widest text-sm font-medium">Join Our Community</span>
            <h2 className="heading-md mb-4 text-luxe-taupe-dark">
              Exclusive Benefits for Members
            </h2>
            <div className="w-20 h-1 bg-luxe-gold mx-auto mt-4 mb-6"></div>
            <p className="text-luxe-taupe-dark mb-8 text-lg">
              Subscribe to receive skincare tips, special offers, and a <span className="font-medium text-luxe-gold">free face towel</span> on your first order.
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 rounded-md border border-white bg-white bg-opacity-70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-luxe-gold focus:bg-white"
                />
                <button 
                  type="submit" 
                  className="btn-primary whitespace-nowrap hover:scale-105 transition-transform"
                >
                  Get Free Towel
                </button>
              </form>
            ) : (
              <div className="bg-white text-luxe-taupe-dark p-6 rounded-xl shadow-soft animate-fade-in max-w-md mx-auto border border-luxe-offwhite">
                <div className="w-16 h-16 bg-luxe-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-luxe-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="font-medium text-lg">Thank you for subscribing!</p>
                <p className="text-luxe-taupe mt-2">Check your email for your special welcome gift.</p>
              </div>
            )}
            
            <p className="text-xs text-luxe-taupe-dark mt-6 max-w-md mx-auto">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
