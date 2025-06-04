import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-8">
        <h1 className="text-4xl font-bold mb-4 text-center text-blue-800">
          Добро пожаловать в ReactBook
        </h1>

        <p className="text-lg text-gray-700 mb-6 text-center max-w-xl">
          Hello world
        </p>
        <Link to="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
            Перейти в каталог
          </button>
        </Link>
      </div>
  );
};

export default HomePage;
