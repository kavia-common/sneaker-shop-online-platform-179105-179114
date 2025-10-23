import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import AppRoutes from './routes/AppRoutes';
import { useCart } from './state/CartContext.jsx';

// PUBLIC_INTERFACE
function App() {
  /** App shell with header, routes, cart sidebar, and footer. Uses global cart context. */
  const { itemCount, sidebarOpen, setSidebarOpen } = useCart();

  const toggleCart = () => setSidebarOpen(!sidebarOpen);
  const closeCart = () => setSidebarOpen(false);

  return (
    <div className="app">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="visually-hidden-focusable">Skip to main content</a>

      <Header cartCount={itemCount} onToggleCart={toggleCart} />
      <main id="main-content" className="app-main" role="main" tabIndex="-1">
        <AppRoutes />
      </main>
      <Footer />
      <CartSidebar open={sidebarOpen} onClose={closeCart} />
    </div>
  );
}

export default App;
