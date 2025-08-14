import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import './CartIcon.css';

const CartIcon = ({ onClick, className = '' }) => {
  const { totalItems } = useCart();

  return (
    <div className={`cart-icon ${className}`} onClick={onClick}>
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="cart-badge" aria-label={`${totalItems} items in cart`}>
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
