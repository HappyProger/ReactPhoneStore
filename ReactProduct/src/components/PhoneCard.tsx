import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { Phone } from "../types/types";

interface PhoneCardProps {
  phone: Phone;
  onAddToCart: (phone: Phone) => void;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone, onAddToCart }) => {
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const handleClick = () => {
    navigate(`/phone/${phone.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(phone);
    showNotification(
      `${phone.brand} ${phone.name} добавлен в корзину`,
      "success"
    );
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-lg p-0 flex flex-col items-center max-w-xs mx-auto relative overflow-hidden transition-transform duration-200 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-[480px]"
    >
      <div className="relative w-full flex flex-col items-center pt-6">
        <div className="absolute left-4 top-2 z-10" style={{ height: 36 }}>
          {phone.oldPrice ? (
            <div className="bg-blue-500 text-white text-lg font-bold px-4 py-1 rounded-lg line-through opacity-90 select-none">
              {phone.currency || "$"}
              {phone.oldPrice}
            </div>
          ) : (
            <div className="invisible px-4 py-1">-</div>
          )}
        </div>
        <img
          src={phone.imageUrl}
          alt={phone.name}
          className="h-48 w-auto object-contain mx-auto rounded-xl bg-gray-50"
          style={{ maxWidth: "90%" }}
        />
      </div>
      <div className="flex flex-col items-center w-full px-6 pb-6 pt-2 flex-1">
        <div className="flex items-center justify-center w-full min-h-[48px] max-h-[48px] text-center font-semibold text-lg mt-2 mb-1 overflow-hidden text-ellipsis line-clamp-2">
          {phone.brand} {phone.name}
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl font-bold text-blue-600">
            {phone.currency || "$"}
            {phone.price}
          </span>
          {phone.installment && phone.installmentCount && (
            <span className="bg-yellow-100 text-yellow-800 font-semibold px-3 py-1 rounded text-base ml-2">
              {phone.currency || "$"}
              {phone.installment} ×{phone.installmentCount}
            </span>
          )}
        </div>
        <div className="text-gray-600 text-sm mb-3 text-center min-h-[40px] max-h-[48px] overflow-hidden text-ellipsis line-clamp-2">
          {phone.description}
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition mb-2 mt-auto"
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export default PhoneCard;
