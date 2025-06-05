// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PhoneCatalog from "./components/PhoneCatalog";
import HomePage from "./pages/HomePage";
import Cart from "./components/Cart";
import PhoneDetailsPage from "./pages/PhoneDetails";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<PhoneCatalog />} />
            <Route path="/phone/:id" element={<PhoneDetailsPage />} />
            <Route
              path="/cart"
              element={
                <Cart
                  items={[]}
                  onUpdateQuantity={() => {}}
                  onRemoveItem={() => {}}
                />
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
