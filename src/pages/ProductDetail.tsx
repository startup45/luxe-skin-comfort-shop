
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useCart } from '../contexts/CartContext';

// Using the same product data as in the Shop page
const allProducts = [
  {
    id: 1,
    name: "Ultra-Soft Bath Towel",
    description: "Our signature bath towel with anti-microbial silver threads and dermatologist-approved softness. The perfect blend of luxury and functionality, this towel is designed to provide an exceptional bathing experience while keeping your skin healthy and irritation-free.",
    price: 59.99,
    image: "/images/products/bath-towel.jpg",
    category: "Bath Towels",
    tags: ["Anti-Bacterial", "Quick-Dry", "700 GSM", "100% Cotton"],
    rating: 5,
    bestseller: true,
    features: [
      "Anti-microbial silver threads prevent bacteria growth",
      "Ultra-absorbent 700 GSM cotton",
      "Quick-dry technology",
      "Dermatologist tested for sensitive skin",
      "Reinforced edges for durability"
    ]
  },
  {
    id: 2,
    name: "Luxury Face Towel Set",
    description: "Set of 3 ultra-gentle face towels designed specifically for sensitive facial skin. Each towel is crafted with our proprietary weave that provides gentle exfoliation while being incredibly soft on your skin.",
    price: 39.99,
    image: "/images/products/face-towel.jpg",
    category: "Face Towels",
    tags: ["Hypoallergenic", "Gentle", "Set of 3", "Compact"],
    rating: 5,
    features: [
      "Extra gentle on facial skin",
      "Hypoallergenic material",
      "Perfect size for facial cleansing",
      "Includes 3 matching towels",
      "Lightweight and travel-friendly"
    ]
  },
  {
    id: 3,
    name: "Premium Hand Towel",
    description: "The perfect blend of absorption and quick-drying technology for daily hand drying. These hand towels are designed to withstand frequent use while maintaining their softness and absorbency.",
    price: 29.99,
    image: "/images/products/hand-towel.jpg",
    category: "Hand Towels",
    tags: ["Quick-Dry", "700 GSM", "Durable"],
    rating: 4.5,
    features: [
      "Fast-drying technology",
      "Medium weight 500 GSM cotton",
      "Reinforced hanging loop",
      "Perfect size for bathroom and kitchen",
      "Available in matching colors with other products"
    ]
  },
  {
    id: 4,
    name: "Complete Luxury Bundle",
    description: "Our complete set featuring 2 bath towels, 2 hand towels, and 2 face towels. The perfect starter set for a new home or a complete bathroom refresh.",
    price: 179.99,
    image: "/images/products/towel-bundle.jpg",
    category: "Bundles",
    tags: ["Gift Set", "Value Pack", "Complete Set"],
    rating: 5,
    bestseller: true,
    features: [
      "Complete matching set for bathroom coordination",
      "Includes 2 bath towels, 2 hand towels, and 2 face towels",
      "Save 15% compared to buying separately",
      "Gift-ready packaging",
      "Available in 5 color options"
    ]
  },
  {
    id: 5,
    name: "Plush Bath Sheet",
    description: "Extra-large bath sheet for ultimate luxury and full-body coverage after bathing. Experience spa-like comfort with this oversized towel that wraps completely around you.",
    price: 69.99,
    image: "/images/products/bath-towel.jpg",
    category: "Bath Towels",
    tags: ["Extra Large", "Ultra Plush", "Oversized"],
    rating: 4.5,
    features: [
      "Oversized dimensions (40\" x 70\")",
      "Ultra-plush 800 GSM cotton",
      "Maximum absorbency",
      "Generously sized for full coverage",
      "Hanging loop for convenient storage"
    ]
  },
  {
    id: 6,
    name: "Spa Wrap Towel",
    description: "Luxurious wrap towel with secure closure for spa-like comfort at home. Move freely while keeping your towel securely in place.",
    price: 49.99,
    image: "/images/products/face-towel.jpg",
    category: "Specialty",
    tags: ["Wrap Style", "Adjustable", "Secure Fit"],
    rating: 4,
    features: [
      "Elastic top for secure fit",
      "Adjustable hook and loop closure",
      "Soft and absorbent material",
      "Perfect for spa days at home",
      "One-size-fits-most design"
    ]
  },
  {
    id: 7,
    name: "Hair Drying Turban",
    description: "Quick-drying hair towel that reduces frizz and damage while speeding up dry time. The specialized microfiber fabric is gentler on hair than traditional cotton towels.",
    price: 34.99,
    image: "/images/products/hand-towel.jpg",
    category: "Specialty",
    tags: ["Hair Care", "Microfiber", "Anti-Frizz"],
    rating: 4.5,
    features: [
      "Special microfiber blend absorbs water quickly",
      "Button closure keeps turban secure",
      "Reduces hair drying time by up to 50%",
      "Lightweight and comfortable to wear",
      "Helps reduce frizz and hair damage"
    ]
  },
  {
    id: 8,
    name: "Baby Towel Set",
    description: "Ultra-soft hooded towels specially designed for baby's sensitive skin. The perfect gift for new parents.",
    price: 44.99,
    image: "/images/products/towel-bundle.jpg",
    category: "Baby",
    tags: ["Hooded", "Extra Gentle", "Baby-Safe"],
    rating: 5,
    features: [
      "Extra soft 500 GSM cotton safe for delicate skin",
      "Cute hood design keeps baby warm",
      "Set includes 2 hooded towels",
      "Free from harmful chemicals",
      "Machine washable and durable"
    ]
  }
];

const ProductDetail = () => {
  const { id } = useParams<{id: string}>();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Simulate fetching product data
    setTimeout(() => {
      const foundProduct = allProducts.find(p => p.id === parseInt(id || '0'));
      setProduct(foundProduct);
      setLoading(false);
    }, 300);
  }, [id]);
  
  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity
      });
      
      toast.success(`Added to your cart`, {
        description: `${quantity} x ${product.name}`,
        duration: 3000,
      });
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse space-y-8 w-full max-w-6xl mx-auto p-8">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="bg-gray-200 rounded-lg aspect-square w-full"></div>
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2 mt-8"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-medium text-luxe-taupe-dark mb-4">Product Not Found</h1>
            <p className="text-luxe-taupe mb-6">We couldn't find the product you're looking for.</p>
            <Link to="/shop" className="btn-primary">Return to Shop</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12">
        <div className="container-luxe">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex text-sm">
              <Link to="/" className="text-luxe-taupe hover:text-luxe-gold">Home</Link>
              <span className="mx-2 text-luxe-taupe">/</span>
              <Link to="/shop" className="text-luxe-taupe hover:text-luxe-gold">Shop</Link>
              <span className="mx-2 text-luxe-taupe">/</span>
              <Link to={`/shop/${product.category.toLowerCase().replace(' ', '-')}`} className="text-luxe-taupe hover:text-luxe-gold">{product.category}</Link>
              <span className="mx-2 text-luxe-taupe">/</span>
              <span className="text-luxe-taupe-dark">{product.name}</span>
            </nav>
          </div>
          
          {/* Product Info */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div>
              <div className="bg-luxe-offwhite rounded-lg overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              {product.bestseller && (
                <div className="inline-block bg-luxe-gold text-white text-xs py-1 px-3 rounded-full mb-2">
                  Bestseller
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-medium text-luxe-taupe-dark">{product.name}</h1>
              
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-5 h-5 ${i < product.rating ? "text-luxe-gold" : "text-gray-300"}`} 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-luxe-taupe">{product.rating} stars</span>
              </div>
              
              <div className="text-2xl font-medium text-luxe-taupe-dark">${product.price.toFixed(2)}</div>
              
              <p className="text-luxe-taupe">{product.description}</p>
              
              <div>
                <h3 className="font-medium text-luxe-taupe-dark mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-luxe-gold mr-2 mt-1">•</span>
                      <span className="text-luxe-taupe">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="mr-6">
                    <label htmlFor="quantity" className="block text-sm font-medium text-luxe-taupe-dark mb-1">
                      Quantity
                    </label>
                    <div className="flex items-center border border-luxe-offwhite rounded-md">
                      <button 
                        className="px-3 py-1 text-luxe-taupe-dark"
                        onClick={decrementQuantity}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center py-1 text-luxe-taupe-dark">
                        {quantity}
                      </span>
                      <button 
                        className="px-3 py-1 text-luxe-taupe-dark"
                        onClick={incrementQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <button 
                      onClick={handleAddToCart}
                      className="w-full btn-primary flex items-center justify-center"
                    >
                      <ShoppingCart size={18} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-luxe-taupe text-sm">
                    <Truck size={16} />
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center gap-2 text-luxe-taupe text-sm">
                    <ShieldCheck size={16} />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="text-xs bg-luxe-offwhite px-2 py-1 rounded text-luxe-taupe-dark">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
