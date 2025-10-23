import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './state/CartContext.jsx';
import App from './App';

// Basic smoke test to ensure the app renders without crashing.
test('renders App without crashing', () => {
  render(
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  );
});
