import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-brand">
          <h3>Le Petit Cadeau</h3>
          <p>Curated gifts for every occasion.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Shop</h4>
            <a href="/shop">All Products</a>
            <a href="#">New Arrivals</a>
          </div>
          <div>
            <h4>Support</h4>
            <a href="#">Contact Us</a>
            <a href="#">Shipping & Returns</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Le Petit Cadeau. All rights reserved.</p>
      </div>
    </footer>
  );
}
