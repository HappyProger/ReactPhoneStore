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
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
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
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {phone.brand} {phone.name}
      </h1>

      <div className="flex flex-col sm:flex-row gap-8">
        <div className="sm:w-1/2 flex justify-center items-center">
          <img
            src={phone.imageUrl}
            alt={phone.name}
            className="max-w-full max-h-[300px] object-contain rounded-lg shadow"
          />
        </div>

        <div className="sm:w-1/2 flex flex-col justify-between">
          <div className="border rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-extrabold text-blue-600">
                  {phone.currency || "$"}
                  {phone.price.toLocaleString()}
                </span>
                {phone.oldPrice && (
                  <span className="text-gray-400 line-through text-lg">
                    {phone.currency || "$"}
                    {phone.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              {discountPercent > 0 && (
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded">
                  -{discountPercent}%
                </span>
              )}
            </div>

            <div className="flex gap-6 text-sm font-semibold text-gray-600 mb-4">
              {phone.installment && phone.installmentCount && (
                <div>
                  <div className="uppercase mb-1 text-xs">В рассрочку</div>
                  <div className="inline-flex items-center bg-yellow-300 text-yellow-900 px-3 py-1 rounded text-lg font-extrabold">
                    {phone.installment.toLocaleString()} {phone.currency || "$"}
                    <span className="ml-2 font-normal text-gray-700 text-base">
                      × {phone.installmentCount} мес.
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleBuy}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md transition focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Добавить в корзину
            </button>
          </div>

          <div className="mt-6 border rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-2">
              Описание
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              {phone.description}
            </p>
            <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-2">
              Характеристики
            </h2>
            <ul className="list-disc list-inside text-gray-700 text-sm space-y-2">
              {phone.specs &&
                Object.entries(phone.specs).map(([key, value]) => (
                  <li key={key}>
                    <span className="capitalize font-semibold">{key}:</span>{" "}
                    {value}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetailsPage;
