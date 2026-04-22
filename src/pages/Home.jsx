import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-container animate-fade-in">
      <section className="hero-section">
        <div className="container hero-content">
          <h1>The Perfect Gift Awaits</h1>
          <p>Discover our curated collection of bespoke gifts and treasures.</p>
          <Link to="/shop" className="btn-primary">Shop the Collection</Link>
        </div>
      </section>
    </div>
  );
}
