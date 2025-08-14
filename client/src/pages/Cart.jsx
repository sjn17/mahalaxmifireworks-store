import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (totalItems === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
          </div>
          
          <div className="empty-cart">
            <ShoppingBag size={64} className="empty-cart-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any fireworks to your cart yet.</p>
            <Link to="/products" className="btn btn-primary">
              <ArrowLeft size={20} />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <Link to="/products" className="back-link">
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          <h1>Shopping Cart ({totalItems} items)</h1>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-category">{item.category}</p>
                  <p className="item-price">₹{item.price}</p>
                </div>

                <div className="item-quantity">
                  <label htmlFor={`quantity-${item._id}`}>Quantity:</label>
                  <select
                    id={`quantity-${item._id}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                    className="quantity-select"
                  >
                    {[...Array(99)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="item-total">
                  <span className="total-label">Total:</span>
                  <span className="total-price">₹{item.price * item.quantity}</span>
                </div>

                <button
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item._id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-header">
              <h3>Order Summary</h3>
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Items ({totalItems}):</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="summary-row">
                <span>Delivery:</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
            </div>

            <div className="summary-actions">
              <button className="btn btn-outline" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="btn btn-primary checkout-btn">
                Proceed to Checkout
              </button>
            </div>

            <div className="cart-note">
              <p>💡 <strong>Safety First:</strong> All fireworks come with safety instructions. Please follow them carefully.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
