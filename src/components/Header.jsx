import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="glass-panel header-container">
      <div className="container header-content">
        <Link to="/" className="logo">
          <h2>Le Petit Cadeau</h2>
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
        </nav>
        <div className="cart-icon" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={24} />
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </div>
      </div>
    </header>
  );
}
