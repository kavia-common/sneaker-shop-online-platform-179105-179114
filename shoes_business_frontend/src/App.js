import React, { useState } from 'react';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartSidebar from './components/layout/CartSidebar';
import AppRoutes from './routes/AppRoutes';

// PUBLIC_INTERFACE
function App() {
  /** App shell with header, routes, cart sidebar, and footer. */
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(1); // placeholder count

  const toggleCart = () => setCartOpen((v) => !v);
  const closeCart = () => setCartOpen(false);

  return (
    <div className="app">
      <Header cartCount={cartCount} onToggleCart={toggleCart} />
      <main className="app-main">
        <AppRoutes />
      </main>
      <Footer />
      <CartSidebar open={cartOpen} onClose={closeCart} />
    </div>
  );
}

export default App;
