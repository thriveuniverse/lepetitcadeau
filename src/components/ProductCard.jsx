import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Format price
  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: product.currency || 'EUR',
  }).format(product.price);

  const mainImage = product.images[0] || 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="product-card glass-panel">
      <div className="product-image-container">
        <img src={mainImage} alt={product.title} className="product-image" loading="lazy" />
        <div className="product-overlay">
          <button className="btn-secondary" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      </div>
      <div className="product-info">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 className="product-title">{product.title}</h3>
        </Link>
        <p className="product-price">{formattedPrice}</p>
      </div>
    </div>
  );
}
