import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import './AddToCartButton.css';

const AddToCartButton = ({ product, className = '', variant = 'default' }) => {
  const { addToCart, removeFromCart, isInCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentQuantity = getItemQuantity(product._id);
  const isProductInCart = isInCart(product._id);

  const handleAddToCart = async () => {
    if (isAdding) return;

    console.log('Adding to cart:', product, 'quantity:', quantity);
    setIsAdding(true);
    
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (quantity === 0) {
      // Remove item from cart if quantity is 0
      removeFromCart(product._id);
      console.log('Product removed from cart');
    } else {
      // Add/update item in cart
      addToCart(product, quantity);
      console.log('Product added to cart');
    }
    
    setShowSuccess(true);
    setIsAdding(false);
    
    // Reset quantity and hide success message
    setTimeout(() => {
      setShowSuccess(false);
      setShowQuantity(false);
      setQuantity(1);
    }, 2000);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleQuickAdd = () => {
    if (isProductInCart) {
      // If already in cart, show quantity selector to allow removal
      setShowQuantity(true);
      setQuantity(currentQuantity);
    } else {
      // Show quantity selector
      setShowQuantity(true);
    }
  };

  // Different button variants
  if (variant === 'compact') {
    return (
      <div className={`add-to-cart-container ${className}`}>
        {showQuantity && (
          <div className="quantity-selector">
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="quantity-display">{quantity}</span>
            <button
              className="quantity-btn"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= 99}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        )}
        
        <button
          className={`add-to-cart-compact ${isProductInCart ? 'in-cart' : ''}`}
          onClick={showQuantity ? handleAddToCart : handleQuickAdd}
          disabled={isAdding}
          aria-label={showQuantity ? (quantity === 0 ? 'Remove from cart' : `Add ${quantity} to cart`) : 'Add to cart'}
          style={{
            backgroundColor: isProductInCart ? '#6bcf7f' : '#ff6b6b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            minHeight: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          {showQuantity ? (
            <>
              <ShoppingCart size={16} />
              <span>{quantity === 0 ? 'Remove' : `Add ${quantity}`}</span>
            </>
          ) : isProductInCart ? (
            <>
              <Check size={16} />
              <span>Added ({currentQuantity})</span>
            </>
          ) : (
            <>
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    );
  }

  // Default variant with quantity selector
  return (
    <div className={`add-to-cart-container ${className}`}>
      {showQuantity && (
        <div className="quantity-selector">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="quantity-display">{quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= 99}
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      <button
        className={`add-to-cart-btn ${showSuccess ? 'success' : ''} ${isAdding ? 'loading' : ''}`}
        onClick={showQuantity ? handleAddToCart : handleQuickAdd}
        disabled={isAdding}
        aria-label={showQuantity ? (quantity === 0 ? 'Remove from cart' : `Add ${quantity} to cart`) : 'Add to cart'}
        style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 16px',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          width: '100%',
          minHeight: '44px'
        }}
      >
        {showSuccess ? (
          <>
            <Check size={18} />
            <span>Added to Cart!</span>
          </>
        ) : isAdding ? (
          <>
            <div className="loading-spinner"></div>
            <span>Adding...</span>
          </>
        ) : showQuantity ? (
          <>
            <ShoppingCart size={18} />
            <span>{quantity === 0 ? 'Remove from Cart' : `Add ${quantity} to Cart`}</span>
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </>
        )}
      </button>

      {isProductInCart && !showQuantity && (
        <div className="cart-status">
          <span className="in-cart-text">
            In Cart: {currentQuantity}
          </span>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;
