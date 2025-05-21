
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'confirmation';

const Checkout = () => {
  const [activeStep, setActiveStep] = useState<CheckoutStep>('cart');
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });
  const [orderInfo, setOrderInfo] = useState({
    orderId: '',
    trackingId: '',
  });
  
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate random order and tracking IDs
    const randomOrderId = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const randomTrackingId = 'TRK-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    
    setOrderInfo({
      orderId: randomOrderId,
      trackingId: randomTrackingId,
    });
    
    setActiveStep('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Clear the cart after successful order
    setTimeout(() => {
      clearCart();
    }, 1000);
  };
  
  const handleFinishShopping = () => {
    navigate('/');
    toast.success("Thank you for your order!");
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };
  
  // Display different content based on active step
  const renderStepContent = () => {
    switch (activeStep) {
      case 'cart':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2">
              <h2 className="text-2xl font-medium text-luxe-taupe-dark mb-6">Your Cart</h2>
              
              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div 
                      key={item.id}
                      variants={itemVariants}
                      className="flex items-center p-4 border border-gray-100 rounded-lg"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/placeholder.svg';
                          }}
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium text-luxe-taupe-dark">{item.name}</h3>
                        <p className="text-luxe-taupe text-sm">Qty: {item.quantity}</p>
                        <p className="text-luxe-taupe-dark mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-luxe-offwhite rounded-lg">
                  <p className="text-luxe-taupe-dark">Your cart is empty</p>
                  <button
                    onClick={() => navigate('/shop')}
                    className="mt-4 btn-primary"
                  >
                    Shop Now
                  </button>
                </div>
              )}
            </div>
            
            <div className="bg-luxe-offwhite p-6 rounded-lg h-fit sticky top-24">
              <h2 className="text-xl font-medium text-luxe-taupe-dark mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-luxe-taupe">Subtotal</span>
                  <span className="text-luxe-taupe-dark">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxe-taupe">Shipping</span>
                  <span className="text-luxe-taupe-dark">
                    {total >= 100 ? 'Free' : '$9.99'}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-medium">
                  <span className="text-luxe-taupe-dark">Total</span>
                  <span className="text-luxe-taupe-dark">
                    ${(total >= 100 ? total : total + 9.99).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => items.length > 0 && setActiveStep('shipping')}
                disabled={items.length === 0}
                className={`w-full btn-primary flex items-center justify-center ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Proceed to Shipping <ArrowRight size={16} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        );
        
      case 'shipping':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2">
              <h2 className="text-2xl font-medium text-luxe-taupe-dark mb-6">Shipping Information</h2>
              
              <form onSubmit={handleShippingSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label htmlFor="firstName" className="text-sm text-luxe-taupe-dark">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingInfoChange}
                      required
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label htmlFor="lastName" className="text-sm text-luxe-taupe-dark">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={shippingInfo.lastName}
                      onChange={handleShippingInfoChange}
                      required
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="space-y-1">
                  <label htmlFor="email" className="text-sm text-luxe-taupe-dark">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    required
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-1">
                  <label htmlFor="address" className="text-sm text-luxe-taupe-dark">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    required
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label htmlFor="city" className="text-sm text-luxe-taupe-dark">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingInfoChange}
                      required
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label htmlFor="state" className="text-sm text-luxe-taupe-dark">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={shippingInfo.state}
                      onChange={handleShippingInfoChange}
                      required
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label htmlFor="zipCode" className="text-sm text-luxe-taupe-dark">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={shippingInfo.zipCode}
                      onChange={handleShippingInfoChange}
                      required
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="space-y-1">
                  <label htmlFor="country" className="text-sm text-luxe-taupe-dark">Country</label>
                  <select
                    id="country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={handleShippingInfoChange}
                    required
                    className="w-full p-2 border border-gray-200 rounded"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep('cart')}
                    className="btn-secondary"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                  >
                    Proceed to Payment <ArrowRight size={16} className="ml-2" />
                  </button>
                </motion.div>
              </form>
            </div>
            
            <div className="bg-luxe-offwhite p-6 rounded-lg h-fit sticky top-24">
              <h2 className="text-xl font-medium text-luxe-taupe-dark mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-luxe-taupe">{item.name} x{item.quantity}</span>
                    <span className="text-luxe-taupe-dark">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-medium">
                  <span className="text-luxe-taupe-dark">Total</span>
                  <span className="text-luxe-taupe-dark">
                    ${(total >= 100 ? total : total + 9.99).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case 'payment':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            <div className="md:col-span-2">
              <h2 className="text-2xl font-medium text-luxe-taupe-dark mb-6">Payment Details</h2>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <motion.div variants={itemVariants} className="space-y-1">
                  <label htmlFor="cardNumber" className="text-sm text-luxe-taupe-dark">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-1">
                  <label htmlFor="nameOnCard" className="text-sm text-luxe-taupe-dark">Name on Card</label>
                  <input
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    value={paymentInfo.nameOnCard}
                    onChange={handlePaymentInfoChange}
                    required
                    className="w-full p-2 border border-gray-200 rounded"
                  />
                </motion.div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label htmlFor="expiryDate" className="text-sm text-luxe-taupe-dark">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      placeholder="MM/YY"
                      required
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label htmlFor="cvv" className="text-sm text-luxe-taupe-dark">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      placeholder="123"
                      required
                      className="w-full p-2 border border-gray-200 rounded"
                    />
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="flex items-center mt-4 text-sm text-luxe-taupe">
                  <ShieldCheck size={16} className="mr-2 text-luxe-gold" />
                  Your payment information is secure and encrypted
                </motion.div>
                
                <motion.div variants={itemVariants} className="pt-4 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveStep('shipping')}
                    className="btn-secondary"
                  >
                    Back to Shipping
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center"
                  >
                    Complete Order <ArrowRight size={16} className="ml-2" />
                  </button>
                </motion.div>
              </form>
            </div>
            
            <div className="bg-luxe-offwhite p-6 rounded-lg h-fit sticky top-24">
              <h2 className="text-xl font-medium text-luxe-taupe-dark mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-luxe-taupe">{item.name} x{item.quantity}</span>
                    <span className="text-luxe-taupe-dark">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-luxe-taupe">Subtotal</span>
                  <span className="text-luxe-taupe-dark">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-luxe-taupe">Shipping</span>
                  <span className="text-luxe-taupe-dark">
                    {total >= 100 ? 'Free' : '$9.99'}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-medium">
                  <span className="text-luxe-taupe-dark">Total</span>
                  <span className="text-luxe-taupe-dark">
                    ${(total >= 100 ? total : total + 9.99).toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center text-sm text-luxe-taupe mb-4">
                <Truck size={16} className="mr-2 text-luxe-gold" />
                {total >= 100 ? 'Free shipping on your order!' : 'Free shipping on orders over $100'}
              </div>
            </div>
          </motion.div>
        );
        
      case 'confirmation':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
            >
              <Check size={32} className="text-green-600" />
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-3xl font-medium text-luxe-taupe-dark mb-4"
            >
              Thank You for Your Order!
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="text-luxe-taupe mb-8"
            >
              Your order has been successfully placed. We'll send you a confirmation email shortly.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="bg-luxe-offwhite p-6 rounded-lg mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-luxe-taupe-dark mb-2">Order Information</h3>
                  <p className="text-luxe-taupe">Order ID: {orderInfo.orderId}</p>
                  <p className="text-luxe-taupe">Tracking ID: {orderInfo.trackingId}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-luxe-taupe-dark mb-2">Shipping Information</h3>
                  <p className="text-luxe-taupe">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                  <p className="text-luxe-taupe">{shippingInfo.address}</p>
                  <p className="text-luxe-taupe">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                  <p className="text-luxe-taupe">{shippingInfo.country}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h3 className="font-medium text-luxe-taupe-dark mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-luxe-taupe">{item.name} x{item.quantity}</span>
                      <span className="text-luxe-taupe-dark">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between font-medium">
                    <span className="text-luxe-taupe-dark">Total</span>
                    <span className="text-luxe-taupe-dark">
                      ${(total >= 100 ? total : total + 9.99).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <button
                onClick={handleFinishShopping}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </motion.div>
          </motion.div>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container-luxe">
          {/* Breadcrumb */}
          <div className="mb-8">
            <div className="mx-auto max-w-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className={`flex-1 text-center ${activeStep === 'cart' ? 'text-luxe-gold' : 'text-luxe-taupe'}`}>
                  <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1 ${activeStep === 'cart' ? 'bg-luxe-gold text-white' : 'bg-luxe-offwhite text-luxe-taupe'}`}>
                    1
                  </div>
                  <span className="text-sm">Cart</span>
                </div>
                
                <div className="w-16 h-0.5 bg-luxe-offwhite"></div>
                
                <div className={`flex-1 text-center ${activeStep === 'shipping' ? 'text-luxe-gold' : 'text-luxe-taupe'}`}>
                  <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1 ${activeStep === 'shipping' ? 'bg-luxe-gold text-white' : 'bg-luxe-offwhite text-luxe-taupe'}`}>
                    2
                  </div>
                  <span className="text-sm">Shipping</span>
                </div>
                
                <div className="w-16 h-0.5 bg-luxe-offwhite"></div>
                
                <div className={`flex-1 text-center ${activeStep === 'payment' ? 'text-luxe-gold' : 'text-luxe-taupe'}`}>
                  <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1 ${activeStep === 'payment' ? 'bg-luxe-gold text-white' : 'bg-luxe-offwhite text-luxe-taupe'}`}>
                    3
                  </div>
                  <span className="text-sm">Payment</span>
                </div>
                
                <div className="w-16 h-0.5 bg-luxe-offwhite"></div>
                
                <div className={`flex-1 text-center ${activeStep === 'confirmation' ? 'text-luxe-gold' : 'text-luxe-taupe'}`}>
                  <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-1 ${activeStep === 'confirmation' ? 'bg-luxe-gold text-white' : 'bg-luxe-offwhite text-luxe-taupe'}`}>
                    4
                  </div>
                  <span className="text-sm">Confirmation</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Step content */}
          {renderStepContent()}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
