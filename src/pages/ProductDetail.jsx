import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import productsData from '../data/products.json';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 2rem', textAlign: 'center', minHeight: '60vh' }}>
        <h2>Product not found</h2>
        <Link to="/shop" className="btn-primary" style={{ marginTop: '2rem' }}>Return to Shop</Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: product.currency || 'EUR',
  }).format(product.price);

  return (
    <div className="container product-detail-container animate-fade-in">
      <SEO 
        title={`${product.title} - Le Petit Cadeau`} 
        description={product.description ? product.description.substring(0, 160) : 'View this bespoke product from Le Petit Cadeau.'} 
        image={product.images && product.images.length > 0 ? product.images[0] : '/og-image.jpg'} 
      />
      <Link to="/shop" className="back-link">
        <ArrowLeft size={20} /> Back to Shop
      </Link>
      
      <div className="product-detail-grid">
        <div className="product-detail-images">
          {product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt={product.title} className="main-detail-image glass-panel" />
          ) : (
            <div className="placeholder-image glass-panel">No Image Available</div>
          )}
          
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-grid">
              {product.images.slice(1, 5).map((img, index) => (
                <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className="thumbnail-image" />
              ))}
            </div>
          )}
        </div>
        
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-price">{formattedPrice}</p>
          
          <div className="product-description-container">
            <h3>Description</h3>
            <div className="product-description">
              {product.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <button 
            className="btn-primary add-to-cart-btn" 
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
