
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, X, CreditCard, Truck, ShieldCheck, Lock, Package, PackageCheck } from 'lucide-react';
import { toast } from 'sonner';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, itemCount, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const navigate = useNavigate();

  // Ensure shipping, tax, and grandTotal are properly typed as numbers
  const shipping: number = total > 100 ? 0 : 12.99; // Free shipping over $100
  const tax: number = total * 0.08;
  const grandTotal: number = total + tax + shipping;
  
  // Shipping details state
  const [shippingDetails, setShippingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  // Payment details state
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });
  
  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Promo code logic would go here
    if (promoCode.toLowerCase() === 'welcome10') {
      toast.success('Promo code applied', {
        description: '10% discount has been applied to your order',
      });
    } else {
      toast.error('Invalid promo code', {
        description: 'The promo code you entered is invalid or expired',
      });
    }
  };
  
  const handleContinue = () => {
    setCheckoutStep(checkoutStep + 1);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setCheckoutStep(checkoutStep - 1);
    window.scrollTo(0, 0);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCompleteOrder = () => {
    // Generate random tracking and order numbers
    const randomTrackingId = `LX${Math.floor(100000000 + Math.random() * 900000000)}`;
    const randomOrderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}-LX`;
    
    setTrackingId(randomTrackingId);
    setOrderNumber(randomOrderNumber);
    setOrderComplete(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  const handleContinueShopping = () => {
    setCheckoutStep(1);
    setOrderComplete(false);
    navigate('/shop');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-luxe-offwhite">
        <div className="container-luxe">
          {orderComplete ? (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-20 h-20 bg-luxe-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PackageCheck size={34} className="text-luxe-gold" />
                </div>
                <h1 className="text-3xl font-medium text-luxe-taupe-dark mb-4">Order Confirmed!</h1>
                <p className="text-luxe-taupe mb-8">Thank you for your order. We've received your payment and will process your items shortly.</p>
                
                <div className="bg-luxe-offwhite p-6 rounded-lg mb-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4 pb-4 border-b border-gray-200">
                    <div className="text-left mb-4 sm:mb-0">
                      <p className="text-sm text-luxe-taupe">Order Number</p>
                      <p className="font-medium text-luxe-taupe-dark">{orderNumber}</p>
                    </div>
                    <div className="text-left">
                      <p className="text-sm text-luxe-taupe">Order Date</p>
                      <p className="font-medium text-luxe-taupe-dark">
                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-luxe-taupe mb-2">Tracking Number</p>
                    <div className="flex items-center">
                      <div className="flex-1 bg-white border border-luxe-offwhite py-2 px-4 rounded-lg font-mono text-luxe-taupe-dark">
                        {trackingId}
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(trackingId);
                          toast.success('Tracking number copied to clipboard');
                        }}
                        className="ml-2 p-2 bg-white border border-luxe-offwhite rounded-lg text-luxe-taupe-dark hover:bg-luxe-offwhite"
                      >
                        Copy
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-luxe-gold">
                    <Package size={18} className="mr-2" />
                    <span>Track your package with our carrier partner</span>
                  </div>
                </div>
                
                <div className="text-left mb-8">
                  <h3 className="font-medium text-luxe-taupe-dark mb-4">Order Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-base text-luxe-taupe">
                      <p>Subtotal</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base text-luxe-taupe">
                      <p>Shipping</p>
                      <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                    </div>
                    <div className="flex justify-between text-base text-luxe-taupe">
                      <p>Tax (8%)</p>
                      <p>${tax.toFixed(2)}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between text-lg font-medium text-luxe-taupe-dark">
                        <p>Total</p>
                        <p>${grandTotal.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-luxe-taupe mb-4">
                  A confirmation email has been sent to <span className="font-medium">{shippingDetails.email || 'your email address'}</span>
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary" onClick={handleContinueShopping}>
                    Continue Shopping
                  </button>
                  <Link to="/contact" className="btn-secondary">
                    Need Help?
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark mb-8">
                {checkoutStep === 1 ? "Shopping Cart" : checkoutStep === 2 ? "Shipping Details" : "Payment"}
              </h1>
              
              {/* Progress bar */}
              <div className="mb-12 max-w-3xl mx-auto">
                <div className="flex justify-between items-center">
                  <div className={`flex flex-col items-center ${checkoutStep >= 1 ? 'text-luxe-gold' : 'text-luxe-taupe'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 1 ? 'bg-luxe-gold text-white' : 'bg-luxe-offwhite border border-luxe-taupe text-luxe-taupe'}`}>
                      1
                    </div>
                    <span className="text-sm mt-1">Cart</span>
                  </div>
                  
                  <div className={`flex-1 border-t-2 mx-2 ${checkoutStep >= 2 ? 'border-luxe-gold' : 'border-luxe-taupe/30'}`}></div>
                  
                  <div className={`flex flex-col items-center ${checkoutStep >= 2 ? 'text-luxe-gold' : 'text-luxe-taupe'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 2 ? 'bg-luxe-gold text-white' : 'bg-luxe-offwhite border border-luxe-taupe text-luxe-taupe'}`}>
                      2
                    </div>
                    <span className="text-sm mt-1">Shipping</span>
                  </div>
                  
                  <div className={`flex-1 border-t-2 mx-2 ${checkoutStep >= 3 ? 'border-luxe-gold' : 'border-luxe-taupe/30'}`}></div>
                  
                  <div className={`flex flex-col items-center ${checkoutStep >= 3 ? 'text-luxe-gold' : 'text-luxe-taupe'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${checkoutStep >= 3 ? 'bg-luxe-gold text-white' : 'bg-luxe-offwhite border border-luxe-taupe text-luxe-taupe'}`}>
                      3
                    </div>
                    <span className="text-sm mt-1">Payment</span>
                  </div>
                </div>
              </div>
              
              {itemCount === 0 && checkoutStep === 1 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <ShoppingCart className="mx-auto h-16 w-16 text-luxe-taupe mb-4" />
                  <h2 className="text-2xl font-medium text-luxe-taupe-dark mb-4">Your cart is empty</h2>
                  <p className="text-luxe-taupe mb-6">Looks like you haven't added any products to your cart yet.</p>
                  <Link to="/shop" className="btn-primary">
                    Browse Our Collection
                  </Link>
                </div>
              ) : (
                <>
                  {checkoutStep === 1 && (
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                          {items.map(item => (
                            <div key={item.id} className="flex border-b border-gray-100 last:border-0 p-4">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={item.image} 
                                  alt={item.name}
                                  className="h-full w-full object-cover object-center"
                                  onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/placeholder.svg';
                                  }}
                                />
                              </div>
                              
                              <div className="ml-4 flex-1 flex flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-luxe-taupe-dark">
                                    <h3 className="pr-2">{item.name}</h3>
                                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-luxe-taupe">${item.price.toFixed(2)} each</p>
                                </div>
                                
                                <div className="flex items-center justify-between mt-4">
                                  <div className="flex items-center border border-gray-300 rounded-md">
                                    <button 
                                      className="px-3 py-1 text-luxe-taupe-dark"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                      aria-label="Decrease quantity"
                                    >
                                      -
                                    </button>
                                    <span className="px-3 py-1 text-luxe-taupe-dark">
                                      {item.quantity}
                                    </span>
                                    <button 
                                      className="px-3 py-1 text-luxe-taupe-dark"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                      aria-label="Increase quantity"
                                    >
                                      +
                                    </button>
                                  </div>
                                  
                                  <button 
                                    className="text-luxe-taupe hover:text-luxe-taupe-dark"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remove item"
                                  >
                                    <X size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Promo code */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                          <h3 className="text-lg font-medium text-luxe-taupe-dark mb-4">Have a promo code?</h3>
                          <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                            <input 
                              type="text" 
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value)}
                              placeholder="Enter promo code" 
                              className="flex-1 px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                            <button 
                              type="submit"
                              className="btn-secondary"
                            >
                              Apply
                            </button>
                          </form>
                        </div>
                        
                        <div className="mt-6">
                          <Link to="/shop" className="text-luxe-taupe-dark hover:text-luxe-gold">
                            &larr; Continue shopping
                          </Link>
                        </div>
                      </div>
                      
                      {/* Order Summary */}
                      <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                          <h2 className="text-lg font-medium text-luxe-taupe-dark mb-4">Order Summary</h2>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Subtotal ({itemCount} items)</p>
                              <p>${total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Shipping</p>
                              <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                            </div>
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Tax (8%)</p>
                              <p>${tax.toFixed(2)}</p>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 mt-4">
                              <div className="flex justify-between text-lg font-medium text-luxe-taupe-dark">
                                <p>Order total</p>
                                <p>${grandTotal.toFixed(2)}</p>
                              </div>
                            </div>
                            
                            <button 
                              className="mt-6 w-full btn-primary"
                              onClick={handleContinue}
                            >
                              Proceed to Checkout
                            </button>
                          </div>
                          
                          <div className="mt-6 flex flex-col gap-3">
                            <div className="flex items-center gap-2 text-luxe-taupe text-sm">
                              <ShieldCheck size={16} />
                              <span>Secure checkout</span>
                            </div>
                            <div className="flex items-center gap-2 text-luxe-taupe text-sm">
                              <Truck size={16} />
                              <span>Free shipping on orders over $100</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {checkoutStep === 2 && (
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                          <h2 className="text-xl font-medium text-luxe-taupe-dark mb-6">Shipping Information</h2>
                          
                          <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="firstName" className="block text-luxe-taupe-dark mb-2">First Name</label>
                                <input 
                                  type="text" 
                                  id="firstName"
                                  name="firstName"
                                  value={shippingDetails.firstName}
                                  onChange={handleShippingChange}
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="lastName" className="block text-luxe-taupe-dark mb-2">Last Name</label>
                                <input 
                                  type="text" 
                                  id="lastName"
                                  name="lastName"
                                  value={shippingDetails.lastName}
                                  onChange={handleShippingChange}
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="email" className="block text-luxe-taupe-dark mb-2">Email Address</label>
                              <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={shippingDetails.email}
                                onChange={handleShippingChange}
                                className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="address" className="block text-luxe-taupe-dark mb-2">Address</label>
                              <input 
                                type="text" 
                                id="address"
                                name="address"
                                value={shippingDetails.address}
                                onChange={handleShippingChange}
                                className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                required
                              />
                            </div>
                            
                            <div className="grid grid-cols-3 gap-6">
                              <div className="col-span-1">
                                <label htmlFor="city" className="block text-luxe-taupe-dark mb-2">City</label>
                                <input 
                                  type="text" 
                                  id="city"
                                  name="city"
                                  value={shippingDetails.city}
                                  onChange={handleShippingChange}
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                />
                              </div>
                              <div className="col-span-1">
                                <label htmlFor="state" className="block text-luxe-taupe-dark mb-2">State</label>
                                <select 
                                  id="state"
                                  name="state"
                                  value={shippingDetails.state}
                                  onChange={handleShippingChange}
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                >
                                  <option value="">Select State</option>
                                  <option value="CA">California</option>
                                  <option value="NY">New York</option>
                                  <option value="TX">Texas</option>
                                  <option value="FL">Florida</option>
                                  <option value="IL">Illinois</option>
                                  <option value="PA">Pennsylvania</option>
                                  <option value="OH">Ohio</option>
                                  <option value="GA">Georgia</option>
                                  <option value="NC">North Carolina</option>
                                  <option value="MI">Michigan</option>
                                </select>
                              </div>
                              <div className="col-span-1">
                                <label htmlFor="zipCode" className="block text-luxe-taupe-dark mb-2">Zip Code</label>
                                <input 
                                  type="text" 
                                  id="zipCode"
                                  name="zipCode"
                                  value={shippingDetails.zipCode}
                                  onChange={handleShippingChange}
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="phone" className="block text-luxe-taupe-dark mb-2">Phone Number</label>
                              <input 
                                type="tel" 
                                id="phone"
                                name="phone"
                                value={shippingDetails.phone}
                                onChange={handleShippingChange}
                                className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                required
                              />
                            </div>
                          </form>
                        </div>
                        
                        <div className="bg-white p-8 mt-6 rounded-lg shadow-sm">
                          <h3 className="text-xl font-medium text-luxe-taupe-dark mb-6">Shipping Method</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-luxe-offwhite rounded-lg hover:border-luxe-gold">
                              <div className="flex items-center">
                                <input 
                                  type="radio" 
                                  id="standard" 
                                  name="shipping"
                                  className="mr-3 text-luxe-gold"
                                  defaultChecked
                                />
                                <label htmlFor="standard">
                                  <div className="text-luxe-taupe-dark font-medium">Standard Shipping</div>
                                  <div className="text-luxe-taupe text-sm">Delivery in 3-5 business days</div>
                                </label>
                              </div>
                              <div className="text-luxe-taupe-dark font-medium">
                                {total >= 100 ? "Free" : "$12.99"}
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border border-luxe-offwhite rounded-lg hover:border-luxe-gold">
                              <div className="flex items-center">
                                <input 
                                  type="radio" 
                                  id="express" 
                                  name="shipping"
                                  className="mr-3 text-luxe-gold"
                                />
                                <label htmlFor="express">
                                  <div className="text-luxe-taupe-dark font-medium">Express Shipping</div>
                                  <div className="text-luxe-taupe text-sm">Delivery in 1-2 business days</div>
                                </label>
                              </div>
                              <div className="text-luxe-taupe-dark font-medium">$19.99</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex justify-between">
                          <button 
                            className="text-luxe-taupe-dark hover:text-luxe-gold flex items-center"
                            onClick={handleBack}
                          >
                            &larr; <span className="ml-2">Back to Cart</span>
                          </button>
                          
                          <button 
                            className="btn-primary"
                            onClick={handleContinue}
                          >
                            Continue to Payment
                          </button>
                        </div>
                      </div>
                      
                      {/* Order Summary - Same as in step 1 */}
                      <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                          <h2 className="text-lg font-medium text-luxe-taupe-dark mb-4">Order Summary</h2>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Subtotal ({itemCount} items)</p>
                              <p>${total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Shipping</p>
                              <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                            </div>
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Tax (8%)</p>
                              <p>${tax.toFixed(2)}</p>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 mt-4">
                              <div className="flex justify-between text-lg font-medium text-luxe-taupe-dark">
                                <p>Order total</p>
                                <p>${grandTotal.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <h3 className="font-medium text-luxe-taupe-dark mb-2">Order Details</h3>
                            <div className="max-h-64 overflow-auto pr-2 space-y-3">
                              {items.map(item => (
                                <div key={item.id} className="flex">
                                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/placeholder.svg';
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-luxe-taupe-dark truncate">{item.name}</p>
                                    <p className="text-xs text-luxe-taupe">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {checkoutStep === 3 && (
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-lg shadow-sm">
                          <div className="flex items-center mb-6">
                            <h2 className="text-xl font-medium text-luxe-taupe-dark">Payment Information</h2>
                            <div className="ml-auto flex items-center">
                              <Lock size={16} className="text-luxe-gold mr-1" />
                              <span className="text-sm text-luxe-taupe">Secure Payment</span>
                            </div>
                          </div>
                          
                          <form className="space-y-6">
                            <div>
                              <label className="block text-luxe-taupe-dark mb-2">Payment Method</label>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="border border-luxe-gold rounded-lg p-4 bg-luxe-gold/5 cursor-pointer">
                                  <div className="flex items-center">
                                    <input 
                                      type="radio" 
                                      id="creditCard" 
                                      name="paymentMethod"
                                      className="mr-3 text-luxe-gold"
                                      defaultChecked
                                    />
                                    <label htmlFor="creditCard" className="flex items-center cursor-pointer">
                                      <CreditCard size={18} className="mr-2" />
                                      <span>Credit Card</span>
                                    </label>
                                  </div>
                                </div>
                                
                                <div className="border border-luxe-offwhite rounded-lg p-4 cursor-pointer hover:border-luxe-gold">
                                  <div className="flex items-center">
                                    <input 
                                      type="radio" 
                                      id="paypal" 
                                      name="paymentMethod"
                                      className="mr-3 text-luxe-gold"
                                    />
                                    <label htmlFor="paypal" className="cursor-pointer">PayPal</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <label htmlFor="cardName" className="block text-luxe-taupe-dark mb-2">Name on Card</label>
                              <input 
                                type="text" 
                                id="cardName"
                                name="cardName"
                                value={paymentDetails.cardName}
                                onChange={handlePaymentChange}
                                placeholder="Exactly as appears on card"
                                className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                required
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cardNumber" className="block text-luxe-taupe-dark mb-2">Card Number</label>
                              <div className="relative">
                                <input 
                                  type="text" 
                                  id="cardNumber"
                                  name="cardNumber"
                                  value={paymentDetails.cardNumber}
                                  onChange={handlePaymentChange}
                                  placeholder="0000 0000 0000 0000"
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                />
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                                  <img src="/images/visa.svg" alt="Visa" className="h-6" onError={(e) => {e.currentTarget.src = '/placeholder.svg'}} />
                                  <img src="/images/mastercard.svg" alt="Mastercard" className="h-6" onError={(e) => {e.currentTarget.src = '/placeholder.svg'}} />
                                  <img src="/images/amex.svg" alt="Amex" className="h-6" onError={(e) => {e.currentTarget.src = '/placeholder.svg'}} />
                                </div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="expiryDate" className="block text-luxe-taupe-dark mb-2">Expiry Date</label>
                                <input 
                                  type="text" 
                                  id="expiryDate"
                                  name="expiryDate"
                                  value={paymentDetails.expiryDate}
                                  onChange={handlePaymentChange}
                                  placeholder="MM/YY"
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                />
                              </div>
                              <div>
                                <label htmlFor="cvv" className="block text-luxe-taupe-dark mb-2">CVV</label>
                                <input 
                                  type="text" 
                                  id="cvv"
                                  name="cvv"
                                  value={paymentDetails.cvv}
                                  onChange={handlePaymentChange}
                                  placeholder="123"
                                  className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                                  required
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id="saveCard" 
                                name="saveCard"
                                checked={paymentDetails.saveCard}
                                onChange={handlePaymentChange}
                                className="mr-3" 
                              />
                              <label htmlFor="saveCard" className="text-luxe-taupe">Save this card for future purchases</label>
                            </div>

                            <div className="p-4 bg-luxe-green/10 rounded-lg border border-luxe-green/30 mt-2">
                              <p className="text-sm text-luxe-taupe-dark">
                                <strong>Test Mode:</strong> No real payment will be processed. Click "Complete Order" to see the order confirmation.
                              </p>
                            </div>
                          </form>
                        </div>
                        
                        <div className="mt-8 flex justify-between">
                          <button 
                            className="text-luxe-taupe-dark hover:text-luxe-gold flex items-center"
                            onClick={handleBack}
                          >
                            &larr; <span className="ml-2">Back to Shipping</span>
                          </button>
                          
                          <button 
                            className="btn-primary"
                            onClick={handleCompleteOrder}
                          >
                            Complete Order
                          </button>
                        </div>
                      </div>
                      
                      {/* Order Summary - Same as in previous steps */}
                      <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                          <h2 className="text-lg font-medium text-luxe-taupe-dark mb-4">Order Summary</h2>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Subtotal ({itemCount} items)</p>
                              <p>${total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Shipping</p>
                              <p>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
                            </div>
                            <div className="flex justify-between text-base text-luxe-taupe">
                              <p>Tax (8%)</p>
                              <p>${tax.toFixed(2)}</p>
                            </div>
                            
                            <div className="border-t border-gray-200 pt-4 mt-4">
                              <div className="flex justify-between text-lg font-medium text-luxe-taupe-dark">
                                <p>Order total</p>
                                <p>${grandTotal.toFixed(2)}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-6">
                            <h3 className="font-medium text-luxe-taupe-dark mb-2">Order Details</h3>
                            <div className="max-h-64 overflow-auto pr-2 space-y-3">
                              {items.map(item => (
                                <div key={item.id} className="flex">
                                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mr-3">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-full w-full object-cover object-center"
                                      onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/placeholder.svg';
                                      }}
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-luxe-taupe-dark truncate">{item.name}</p>
                                    <p className="text-xs text-luxe-taupe">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 mt-6 pt-4">
                            <h3 className="font-medium text-luxe-taupe-dark mb-2">Shipping Information</h3>
                            {shippingDetails.firstName && (
                              <div className="text-sm text-luxe-taupe">
                                <p>{shippingDetails.firstName} {shippingDetails.lastName}</p>
                                <p>{shippingDetails.address}</p>
                                <p>{shippingDetails.city}, {shippingDetails.state} {shippingDetails.zipCode}</p>
                                <p>{shippingDetails.email}</p>
                                <p>{shippingDetails.phone}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
