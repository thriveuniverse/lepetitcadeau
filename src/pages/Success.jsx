import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import './Success.css';

export default function Success() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container success-container animate-fade-in">
      <SEO 
        title="Order Confirmed - Le Petit Cadeau" 
        description="Thank you for your purchase from Le Petit Cadeau." 
      />
      <div className="success-card glass-panel">
        <div className="success-icon">
          <CheckCircle size={64} />
        </div>
        <h1>Thank You for Your Order!</h1>
        <p className="success-message">
          Your payment has been received successfully. We will prepare your items 
          with care and send you a confirmation email with shipping details shortly.
        </p>
        <p className="success-note">
          If you have any questions about your order, please don't hesitate to contact us.
        </p>
        <Link to="/shop" className="btn-primary success-btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
