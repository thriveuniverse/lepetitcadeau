import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import './Storefront.css';

const CATEGORIES = ['All', 'Furniture', 'Architectural Salvage', 'Glasses', 'Bottles', 'Decor & Accents'];

function determineCategory(product) {
  const tagStr = (product.tags || []).join(' ').toLowerCase();
  const titleStr = (product.title || '').toLowerCase();
  
  if (tagStr.includes('furniture') || titleStr.includes('furniture')) return 'Furniture';
  if (tagStr.includes('finial') || tagStr.includes('architectural') || tagStr.includes('newel') || titleStr.includes('finial')) return 'Architectural Salvage';
  if (tagStr.includes('bottle') || titleStr.includes('bottle')) return 'Bottles';
  if (tagStr.includes('glass') || tagStr.includes('sunglass') || titleStr.includes('glass') || titleStr.includes('sunglass')) return 'Glasses';
  
  return 'Decor & Accents';
}

export default function Storefront() {
  const [products] = useState(productsData);
  const [activeCategory, setActiveCategory] = useState('All');

  const productsWithCategories = useMemo(() => {
    return products.map(p => ({
      ...p,
      category: determineCategory(p)
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return productsWithCategories;
    return productsWithCategories.filter(p => p.category === activeCategory);
  }, [productsWithCategories, activeCategory]);

  return (
    <div className="container storefront-container animate-fade-in">
      <header className="storefront-header">
        <h2>Curated Collection</h2>
        <p>Discover our unique selection of antique and bespoke items.</p>
      </header>
      
      <div className="category-filters">
        {CATEGORIES.map(category => (
          <button 
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="product-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="empty-state">
          <p>No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
