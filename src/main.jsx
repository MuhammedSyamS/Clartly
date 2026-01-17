import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import './index.css';
import App from './App.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
      <WishlistProvider>
      <App />
      </WishlistProvider>
      </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
