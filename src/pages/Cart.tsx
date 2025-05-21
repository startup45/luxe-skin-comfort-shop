import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, X, CreditCard, Truck, ShieldCheck, Lock } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(1);

  // Ensure shipping, tax, and grandTotal are properly typed as numbers
  const shipping: number = 0; // Free shipping
  const tax: number = total * 0.08;
  const grandTotal: number = total + tax + shipping;
  
  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    // Promo code logic would go here
    console.log("Applied promo code:", promoCode);
  };
  
  const handleContinue = () => {
    setCheckoutStep(checkoutStep + 1);
    window.scrollTo(0, 0);
  };
  
  const handleBack = () => {
    setCheckoutStep(checkoutStep - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-luxe-offwhite">
        <div className="container-luxe">
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
                              src={item.image.startsWith('http') ? item.image : `/images/products/${item.image}`} 
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = '/placeholder.svg';
                              }}
                            />
                          </div>
                          
                          <div className="ml-4 flex-1 flex flex-col">
                            <div className="flex justify-between text-base font-medium text-luxe-taupe-dark">
                              <h3>{item.name}</h3>
                              <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                  className="px-3 py-1 text-luxe-taupe-dark"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="px-3 py-1 text-luxe-taupe-dark">
                                  {item.quantity}
                                </span>
                                <button 
                                  className="px-3 py-1 text-luxe-taupe-dark"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                              
                              <button 
                                className="text-luxe-taupe hover:text-luxe-taupe-dark"
                                onClick={() => removeFromCart(item.id)}
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
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-luxe-taupe-dark mb-2">Last Name</label>
                            <input 
                              type="text" 
                              id="lastName"
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-luxe-taupe-dark mb-2">Email Address</label>
                          <input 
                            type="email" 
                            id="email"
                            className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="address" className="block text-luxe-taupe-dark mb-2">Address</label>
                          <input 
                            type="text" 
                            id="address"
                            className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6">
                          <div className="col-span-1">
                            <label htmlFor="city" className="block text-luxe-taupe-dark mb-2">City</label>
                            <input 
                              type="text" 
                              id="city"
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="state" className="block text-luxe-taupe-dark mb-2">State</label>
                            <select 
                              id="state"
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            >
                              <option value="">Select State</option>
                              <option value="CA">California</option>
                              <option value="NY">New York</option>
                              <option value="TX">Texas</option>
                              {/* More states would be added */}
                            </select>
                          </div>
                          <div className="col-span-1">
                            <label htmlFor="zipCode" className="block text-luxe-taupe-dark mb-2">Zip Code</label>
                            <input 
                              type="text" 
                              id="zipCode"
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-luxe-taupe-dark mb-2">Phone Number</label>
                          <input 
                            type="tel" 
                            id="phone"
                            className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
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
                          <div className="text-luxe-taupe-dark font-medium">Free</div>
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
                          <div className="text-luxe-taupe-dark font-medium">$12.99</div>
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
                            placeholder="Exactly as appears on card"
                            className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="cardNumber" className="block text-luxe-taupe-dark mb-2">Card Number</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              id="cardNumber"
                              placeholder="0000 0000 0000 0000"
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                              <img src="https://placeholder.pics/svg/30x20/DEDEDE/555555/visa" alt="Visa" className="h-6" />
                              <img src="https://placeholder.pics/svg/30x20/DEDEDE/555555/mc" alt="Mastercard" className="h-6" />
                              <img src="https://placeholder.pics/svg/30x20/DEDEDE/555555/amex" alt="Amex" className="h-6" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="expiryDate" className="block text-luxe-taupe-dark mb-2">Expiry Date</label>
                            <input 
                              type="text" 
                              id="expiryDate"
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block text-luxe-taupe-dark mb-2">CVV</label>
                            <input 
                              type="text" 
                              id="cvv"
                              placeholder="123"
                              className="w-full px-4 py-2 border border-luxe-offwhite rounded-md focus:outline-none focus:ring-2 focus:ring-luxe-gold"
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <input type="checkbox" id="saveCard" className="mr-3" />
                          <label htmlFor="saveCard" className="text-luxe-taupe">Save this card for future purchases</label>
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
                    </div>
                  </div>
                </div>
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
