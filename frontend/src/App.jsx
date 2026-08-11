import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';
import { Favicon } from './components/ui/LogoVideo';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Individuals from './pages/Individuals';
import B2B from './pages/B2B';
import Charity from './pages/Charity';
import About from './pages/About';
import Satisfaction from './pages/Satisfaction';
import FAQ from './pages/FAQ';
import UserGuide from './pages/UserGuide';
import Delivery from './pages/Delivery';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen bg-slate-50 font-arabic text-slate-800 antialiased selection:bg-brand-500 selection:text-white">
              <Header />
              <Favicon />
              <CartDrawer />
              
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success/:id" element={<OrderConfirmation />} />
                  <Route path="/individuals" element={<Individuals />} />
                  <Route path="/b2b" element={<B2B />} />
                  <Route path="/charity" element={<Charity />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/satisfaction" element={<Satisfaction />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/user-guide" element={<UserGuide />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
