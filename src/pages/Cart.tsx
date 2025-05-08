
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, X } from 'lucide-react';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-luxe-offwhite">
        <div className="container-luxe">
          <h1 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark mb-8">Shopping Cart</h1>
          
          {itemCount === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <ShoppingCart className="mx-auto h-16 w-16 text-luxe-taupe mb-4" />
              <h2 className="text-2xl font-medium text-luxe-taupe-dark mb-4">Your cart is empty</h2>
              <p className="text-luxe-taupe mb-6">Looks like you haven't added any products to your cart yet.</p>
              <Link to="/" className="btn-primary">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
                
                <div className="mt-6">
                  <Link to="/" className="text-luxe-taupe-dark hover:text-luxe-gold">
                    &larr; Continue shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-medium text-luxe-taupe-dark mb-4">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-base text-luxe-taupe">
                      <p>Subtotal ({itemCount} items)</p>
                      <p>${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-base text-luxe-taupe">
                      <p>Shipping</p>
                      <p>Free</p>
                    </div>
                    <div className="flex justify-between text-base text-luxe-taupe">
                      <p>Tax</p>
                      <p>${(total * 0.08).toFixed(2)}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex justify-between text-lg font-medium text-luxe-taupe-dark">
                        <p>Order total</p>
                        <p>${(total + total * 0.08).toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <button className="mt-6 w-full btn-primary">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
