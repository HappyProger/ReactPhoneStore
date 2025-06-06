// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhoneCatalog from "./pages/PhoneCatalog";
import HomePage from "./pages/HomePage";
import PhoneDetailsPage from "./pages/PhoneDetails";
import { CartProvider } from "./context/CartContext";
import { NotificationProvider } from "./context/NotificationContext";
import "./App.css";

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <CartProvider>
        <Router>
          <div className="container mx-auto min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow mt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<PhoneCatalog />} />
                <Route path="/phone/:id" element={<PhoneDetailsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Router>
      </CartProvider>
    </NotificationProvider>
  );
};

export default App;
