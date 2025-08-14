import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import './AddToCartButton.css';

const AddToCartButton = ({ product, className = '', variant = 'default' }) => {
  const { addToCart, removeFromCart, isInCart, getItemQuantity } = useCart();

  const [showQuantity, setShowQuantity] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const currentQuantity = getItemQuantity(product._id);
  const isProductInCart = isInCart(product._id);





  const handleQuickAdd = () => {
    if (isProductInCart) {
      // If already in cart, show quantity selector to allow removal
      setShowQuantity(true);
    } else {
      // If not in cart, directly add 1 item
      addToCart(product, 1);
      setShowSuccess(true);
      
      // Show quantity controls immediately after adding
      setTimeout(() => {
        setShowSuccess(false);
        setShowQuantity(true);
      }, 1000);
    }
  };

  // Different button variants
  if (variant === 'compact') {
    return (
      <div className={`add-to-cart-container ${className}`}>
        {showQuantity && (
          <div className="smart-quantity-controls">
            <div className="cart-status-display">
              <span className="current-quantity">{currentQuantity}</span>
              <span className="quantity-label">in cart</span>
            </div>
            
            <div className="instant-quantity-controls">
              <button
                className="quantity-btn instant"
                onClick={() => {
                  if (currentQuantity <= 1) {
                    removeFromCart(product._id);
                    setShowQuantity(false);
                  } else {
                    addToCart(product, -1); // Remove 1
                  }
                }}
                aria-label="Remove 1 from cart"
              >
                <Minus size={16} />
              </button>
              
              <span className="quantity-display">{currentQuantity}</span>
              
              <button
                className="quantity-btn instant"
                onClick={() => addToCart(product, 1)}
                aria-label="Add 1 to cart"
                disabled={currentQuantity >= 99}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}
        
        {!showQuantity && (
          <button
            className={`add-to-cart-compact ${isProductInCart ? 'in-cart' : ''}`}
            onClick={handleQuickAdd}
            disabled={isAdding}
            aria-label="Add to cart"
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
            {showSuccess ? (
              <>
                <Check size={16} />
                <span>Added!</span>
              </>
            ) : isAdding ? (
              <>
                <div className="loading-spinner"></div>
                <span>Adding...</span>
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
        )}
      </div>
    );
  }

  // Default variant with quantity selector
  return (
    <div className={`add-to-cart-container ${className}`}>
      {showQuantity && (
        <div className="smart-quantity-controls">
          <div className="cart-status-display">
            <span className="current-quantity">{currentQuantity}</span>
            <span className="quantity-label">in cart</span>
          </div>
          
          <div className="instant-quantity-controls">
            <button
              className="quantity-btn instant"
              onClick={() => {
                if (currentQuantity <= 1) {
                  removeFromCart(product._id);
                  setShowQuantity(false);
                } else {
                  addToCart(product, -1); // Remove 1
                }
              }}
              aria-label="Remove 1 from cart"
            >
              <Minus size={16} />
            </button>
            
            <span className="quantity-display">{currentQuantity}</span>
            
            <button
              className="quantity-btn instant"
              onClick={() => addToCart(product, 1)}
              aria-label="Add 1 to cart"
              disabled={currentQuantity >= 99}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      )}

      {!showQuantity && (
        <button
          className={`add-to-cart-btn ${showSuccess ? 'success' : ''} ${isAdding ? 'loading' : ''}`}
          onClick={handleQuickAdd}
          disabled={isAdding}
          aria-label="Add to cart"
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
          ) : (
            <>
              <ShoppingCart size={18} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      )}

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
