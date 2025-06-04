import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center max-w-xl w-full">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center text-blue-800 drop-shadow-sm">
          Добро пожаловать в Phone Store
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8 text-center max-w-lg">
          Лучшие смартфоны и гаджеты по отличным ценам. Найдите свой идеальный
          телефон, планшет или аксессуар!
        </p>
        <Link to="/products" className="w-full flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg transition text-lg font-semibold w-full md:w-auto">
            Перейти в каталог
          </button>
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-3xl mb-2 text-blue-500">📱</span>
          <h2 className="font-bold text-lg mb-1">Большой выбор</h2>
          <p className="text-gray-500 text-center">
            Только актуальные модели смартфонов, планшетов и аксессуаров.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-3xl mb-2 text-green-500">💸</span>
          <h2 className="font-bold text-lg mb-1">Выгодные цены</h2>
          <p className="text-gray-500 text-center">
            Сравнивайте, выбирайте и покупайте по лучшим ценам на рынке.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <span className="text-3xl mb-2 text-yellow-500">🚚</span>
          <h2 className="font-bold text-lg mb-1">Быстрая доставка</h2>
          <p className="text-gray-500 text-center">
            Доставим ваш заказ быстро и аккуратно по всей стране.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
