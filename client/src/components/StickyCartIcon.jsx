import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './StickyCartIcon.css';

const StickyCartIcon = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Only show sticky cart on products page
  if (location.pathname !== '/products') {
    return null;
  }

  const handleCartClick = () => {
    navigate('/cart');
    // Scroll to top only when going to cart page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="sticky-cart-container">
      <button 
        className="sticky-cart-button"
        onClick={handleCartClick}
        aria-label={`View cart with ${totalItems} items`}
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="sticky-cart-badge">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>
    </div>
  );
};

export default StickyCartIcon;
