
import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ProductCard from '../components/ui/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

// Extended product data
const products = [
  {
    id: 1,
    name: "Ultra-Soft Bath Towel",
    description: "Our signature bath towel with anti-microbial silver threads and dermatologist-approved softness.",
    price: 59.99,
    image: "bath-towel.jpg",
    category: "Bath Towels",
    tags: ["Anti-Bacterial", "Quick-Dry"],
    rating: 5,
    bestseller: true
  },
  {
    id: 2,
    name: "Luxury Face Towel Set",
    description: "Set of 3 ultra-gentle face towels designed specifically for sensitive facial skin.",
    price: 39.99,
    image: "face-towel.jpg",
    category: "Face Towels",
    tags: ["Hypoallergenic", "Gentle"],
    rating: 5
  },
  {
    id: 3,
    name: "Premium Hand Towel",
    description: "The perfect blend of absorption and quick-drying technology for daily hand drying.",
    price: 29.99,
    image: "hand-towel.jpg",
    category: "Hand Towels",
    tags: ["Quick-Dry", "700 GSM"],
    rating: 4.5
  },
  {
    id: 4,
    name: "Complete Luxury Bundle",
    description: "Our complete set featuring 2 bath towels, 2 hand towels, and 2 face towels.",
    price: 179.99,
    image: "towel-bundle.jpg",
    category: "Bundles",
    tags: ["Gift Set", "Value Pack"],
    rating: 5,
    bestseller: true
  },
  {
    id: 5,
    name: "Plush Bath Sheet",
    description: "Extra-large bath sheet for ultimate luxury and full-body coverage after bathing.",
    price: 69.99,
    image: "bath-towel.jpg",
    category: "Bath Towels",
    tags: ["Extra Large", "Ultra Plush"],
    rating: 4.5
  },
  {
    id: 6,
    name: "Spa Wrap Towel",
    description: "Luxurious wrap towel with secure closure for spa-like comfort at home.",
    price: 49.99,
    image: "face-towel.jpg",
    category: "Specialty",
    tags: ["Wrap Style", "Adjustable"],
    rating: 4
  },
  {
    id: 7,
    name: "Hair Drying Turban",
    description: "Quick-drying hair towel that reduces frizz and damage while speeding up dry time.",
    price: 34.99,
    image: "hand-towel.jpg",
    category: "Specialty",
    tags: ["Hair Care", "Microfiber"],
    rating: 4.5
  },
  {
    id: 8,
    name: "Baby Towel Set",
    description: "Ultra-soft hooded towels specially designed for baby's sensitive skin.",
    price: 44.99,
    image: "towel-bundle.jpg",
    category: "Baby",
    tags: ["Hooded", "Extra Gentle"],
    rating: 5
  }
];

// Available filters
const categories = ["All", "Bath Towels", "Face Towels", "Hand Towels", "Bundles", "Specialty", "Baby"];
const tags = ["Anti-Bacterial", "Quick-Dry", "Hypoallergenic", "Gentle", "700 GSM", "Gift Set", "Value Pack", "Extra Large", "Ultra Plush", "Wrap Style", "Adjustable", "Hair Care", "Microfiber", "Hooded", "Extra Gentle"];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Filter products when selections change
  useEffect(() => {
    let results = products;
    
    // Filter by category
    if (selectedCategory !== "All") {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      results = results.filter(product => 
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }
    
    setFilteredProducts(results);
  }, [selectedCategory, selectedTags]);
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gradient-to-br from-luxe-cream to-luxe-offwhite py-20">
          <div className="container-luxe">
            <div className="text-center">
              <h1 className="heading-lg mb-4">Shop Our Collection</h1>
              <p className="text-luxe-taupe text-lg max-w-2xl mx-auto">
                Experience the perfect harmony of luxury comfort and skin-friendly technology with our premium towel collections.
              </p>
            </div>
          </div>
        </section>
        
        {/* Shop Section */}
        <section className="py-16 bg-white">
          <div className="container-luxe">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Mobile filter toggle */}
              <div className="md:hidden mb-4">
                <button 
                  onClick={toggleMobileFilters}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-luxe-offwhite rounded-lg text-luxe-taupe-dark"
                >
                  <SlidersHorizontal size={18} />
                  {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
              
              {/* Sidebar filters - desktop or mobile when open */}
              <div className={`w-full md:w-1/4 lg:w-1/5 ${mobileFiltersOpen ? 'block' : 'hidden md:block'}`}>
                <div className="bg-luxe-offwhite p-6 rounded-lg sticky top-24">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-luxe-taupe-dark mb-4 flex items-center">
                      <Filter size={18} className="mr-2" /> Categories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center">
                          <button
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-2 py-1.5 rounded ${
                              selectedCategory === category 
                                ? 'bg-luxe-gold/20 text-luxe-gold font-medium' 
                                : 'hover:bg-luxe-offwhite text-luxe-taupe-dark'
                            }`}
                          >
                            {category}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-luxe-taupe-dark mb-4">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagToggle(tag)}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedTags.includes(tag)
                              ? 'bg-luxe-gold text-white'
                              : 'bg-white border border-luxe-offwhite text-luxe-taupe-dark hover:bg-luxe-offwhite'
                          } transition-colors`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Grid */}
              <div className="w-full md:w-3/4 lg:w-4/5">
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-luxe-taupe">
                    Showing {filteredProducts.length} products
                  </p>
                  
                  <select 
                    className="bg-white border border-luxe-offwhite rounded-md px-3 py-2 text-luxe-taupe-dark"
                  >
                    <option>Sort by Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest First</option>
                  </select>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-luxe-offwhite rounded-lg">
                    <h3 className="text-xl text-luxe-taupe-dark mb-2">No products found</h3>
                    <p className="text-luxe-taupe">Try adjusting your filters to find what you're looking for.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
