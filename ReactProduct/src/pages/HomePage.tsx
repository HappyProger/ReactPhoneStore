import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8 sm:px-6 lg:px-8 sm:py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col items-center max-w-xl w-full text-center">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-blue-800 drop-shadow-sm">
          Добро пожаловать в Phone Store
        </h1>
        <p className="text-base md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-lg">
          Лучшие смартфоны и гаджеты по отличным ценам. Найдите свой идеальный
          телефон, планшет или аксессуар!
        </p>
        <Link to="/products" className="w-full flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl shadow-lg transition text-base sm:text-lg font-semibold w-full md:w-auto">
            Перейти в каталог
          </button>
        </Link>
      </div>

      {/* Feature cards section */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl w-full px-4 sm:px-0">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <span className="text-2xl sm:text-3xl mb-2 text-blue-500">📱</span>
          <h2 className="font-bold text-lg sm:text-xl mb-1">Большой выбор</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Только актуальные модели смартфонов, планшетов и аксессуаров.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <span className="text-2xl sm:text-3xl mb-2 text-green-500">💸</span>
          <h2 className="font-bold text-lg sm:text-xl mb-1">Выгодные цены</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Сравнивайте, выбирайте и покупайте по лучшим ценам на рынке.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <span className="text-2xl sm:text-3xl mb-2 text-yellow-500">🚚</span>
          <h2 className="font-bold text-lg sm:text-xl mb-1">Быстрая доставка</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Доставим ваш заказ быстро и аккуратно по всей стране.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
