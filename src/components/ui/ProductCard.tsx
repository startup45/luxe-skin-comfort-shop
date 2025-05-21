
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags: string[];
  rating?: number;
  bestseller?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  category, 
  tags,
  rating = 5,
  bestseller = false
}: ProductCardProps) => {
  const { addToCart } = useCart();
  
  // Function to handle adding items to cart
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price,
      image,
      quantity: 1
    });
    
    toast.success(`Added ${name} to your cart`, {
      description: `$${price.toFixed(2)}`,
      duration: 3000,
    });
  };
  
  return (
    <Link to={`/product/${id}`} className="block group">
      <div className="relative bg-white rounded-lg overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg">
        {/* Badge */}
        {bestseller && (
          <div className="absolute top-4 left-4 z-10 bg-luxe-gold text-white text-xs py-1 px-2 rounded">
            Bestseller
          </div>
        )}
        
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity" />
          
          {/* Quick add button - appears on hover */}
          <button 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-10 group-hover:translate-y-0 transition-all duration-300 bg-white text-luxe-taupe-dark hover:bg-luxe-gold hover:text-white rounded-full py-2 px-4 text-sm font-medium flex items-center shadow-lg"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </button>
        </div>
        
        {/* Product details */}
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-luxe-taupe mb-1 uppercase tracking-wide">{category}</p>
              <h3 className="font-medium text-luxe-taupe-dark text-lg">{name}</h3>
            </div>
            <div className="font-medium text-luxe-taupe-dark">${price.toFixed(2)}</div>
          </div>
          
          <p className="mt-2 text-sm text-luxe-taupe line-clamp-2">{description}</p>
          
          {/* Rating */}
          <div className="mt-3 flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < rating ? "text-luxe-gold" : "text-gray-300"}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* Tags */}
            <div className="ml-4 flex flex-wrap gap-1">
              {tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs bg-luxe-green px-2 py-0.5 rounded text-luxe-taupe-dark">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
