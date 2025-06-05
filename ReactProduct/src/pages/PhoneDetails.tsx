import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { api } from "../services/api";
import { Phone } from "../types/types";

const PhoneDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, toggleCart } = useCart();

  useEffect(() => {
    const fetchPhoneDetails = async () => {
      if (!id) {
        setError("Phone ID is missing");
        setLoading(false);
        return;
      }

      try {
        const data = await api.getPhoneById(id);
        setPhone(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPhoneDetails();
  }, [id]);

  const handleBuy = () => {
    if (phone) {
      addToCart(phone);
      toggleCart();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading phone details...</div>
      </div>
    );
  }

  if (error || !phone) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">
          Error: {error || "Phone not found"}
          <br />
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const discountPercent = phone.oldPrice
    ? Math.round(((phone.oldPrice - phone.price) / phone.oldPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
        {phone.brand} {phone.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-12">
        {/* Фото */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={phone.imageUrl}
            alt={phone.name}
            className="max-w-full max-h-[400px] object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Правая колонка */}
        <div className="md:w-1/2 flex flex-col gap-8">
          {/* Карточка с ценой и кнопкой */}
          <div className="border rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-bold text-blue-600">
                  {phone.currency || "$"}
                  {phone.price}
                </span>
                {phone.oldPrice && (
                  <span className="ml-3 text-xl text-gray-500 line-through">
                    {phone.currency || "$"}
                    {phone.oldPrice}
                  </span>
                )}
              </div>
              {discountPercent > 0 && (
                <span className="bg-green-100 text-green-800 font-semibold px-3 py-1 rounded">
                  -{discountPercent}%
                </span>
              )}
            </div>
            {phone.installment && phone.installmentCount && (
              <div className="mb-4 text-gray-600">
                Рассрочка: {phone.currency || "$"}
                {phone.installment} × {phone.installmentCount} месяцев
              </div>
            )}
            <button
              onClick={handleBuy}
              className="w-full bg-black text-white py-3 rounded-xl font-semibold text-lg hover:bg-gray-800 transition"
            >
              Добавить в корзину
            </button>
          </div>

          {/* Описание */}
          {phone.description && (
            <div className="border rounded-xl p-6 shadow-md">
              <h3 className="font-semibold text-lg mb-4">Описание</h3>
              <p className="text-gray-700">{phone.description}</p>
            </div>
          )}

          {/* Характеристики */}
          <div className="border rounded-xl p-6 shadow-md">
            <h3 className="font-semibold text-lg mb-4">
              Основные характеристики
            </h3>
            <dl className="grid grid-cols-2 gap-y-3 text-gray-700">
              <dt className="font-normal">Экран</dt>
              <dd className="text-right">{phone.specs?.screen ?? ""}</dd>
              <dt className="font-normal">Процессор</dt>
              <dd className="text-right">{phone.specs?.processor ?? ""}</dd>
              <dt className="font-normal">Оперативная память</dt>
              <dd className="text-right">{phone.specs?.ram ?? ""}</dd>
              <dt className="font-normal">Память</dt>
              <dd className="text-right">{phone.specs?.storage ?? ""}</dd>
              <dt className="font-normal">Камера</dt>
              <dd className="text-right">{phone.specs?.camera ?? ""}</dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetailsPage;
