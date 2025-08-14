import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import CartIcon from './CartIcon';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/contact', label: 'Contact' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCartClick = () => {
    navigate('/cart');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Sparkles className="logo-icon" />
          <span>Mahalaxmi Fireworks</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <CartIcon onClick={handleCartClick} className="nav-cart-icon" />
          <div className="nav-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
