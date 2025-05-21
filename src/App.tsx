
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import Index from './pages/Index';
import About from './pages/About';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Science from './pages/Science';
import NotFound from './pages/NotFound';
import { CartProvider } from './contexts/CartContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <Router>
      <CartProvider>
        <Toaster position="top-right" richColors />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/science" element={<Science />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </CartProvider>
    </Router>
  );
}

export default App;
