
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
    <section className="bg-white py-20">
      <div className="container-luxe">
        <div className="bg-luxe-mint bg-opacity-50 rounded-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          {/* Background abstract elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-luxe-mint bg-opacity-50"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-luxe-mint bg-opacity-30"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-medium text-luxe-taupe-dark mb-4">
              Join Our Exclusive Community
            </h2>
            <p className="text-luxe-taupe mb-8">
              Subscribe to receive skincare tips, special offers, and a <span className="font-medium">free face towel</span> on your first order.
            </p>
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                />
                <button 
                  type="submit" 
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe & Get Free Towel
                </button>
              </form>
            ) : (
              <div className="bg-white text-luxe-taupe-dark p-4 rounded-md shadow-sm animate-fade-in">
                <p className="font-medium">Thank you for subscribing!</p>
                <p className="text-sm">Check your email for your special welcome gift.</p>
              </div>
            )}
            
            <p className="text-xs text-luxe-taupe mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
