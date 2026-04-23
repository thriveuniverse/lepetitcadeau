import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Storefront from './pages/Storefront';
import ProductDetail from './pages/ProductDetail';
import Success from './pages/Success';
import Header from './components/Header';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

function App() {
  return (
    <div className="app-container">
      <Header />
      <CartSidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Storefront />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
