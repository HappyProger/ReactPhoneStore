import React from "react";

interface PhoneSpecs {
  screen: string;
  processor: string;
  ram: string;
  storage: string;
  camera: string;
}

interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  currency?: string;
  description: string;
  imageUrl: string;
  installment?: number;
  installmentCount?: number;
  specs: PhoneSpecs;
}

interface PhoneCardProps {
  phone: Phone;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-0 flex flex-col items-center max-w-xs mx-auto relative overflow-hidden transition-transform duration-200 hover:shadow-2xl hover:-translate-y-2 cursor-pointer">
      <div className="relative w-full flex flex-col items-center pt-6">
        {phone.oldPrice && (
          <div className="absolute left-4 top-2 z-10 bg-blue-500 text-white text-lg font-bold px-4 py-1 rounded-lg line-through opacity-90 select-none">
            {phone.currency || "$"}
            {phone.oldPrice}
          </div>
        )}
        <img
          src={phone.imageUrl}
          alt={phone.name}
          className="h-48 w-auto object-contain mx-auto rounded-xl bg-gray-50"
          style={{ maxWidth: "90%" }}
        />
      </div>
      <div className="flex flex-col items-center w-full px-6 pb-6 pt-2">
        <div className="text-center font-semibold text-lg mt-2 mb-1">
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
        <div className="text-gray-600 text-sm mb-3 text-center min-h-[40px]">
          {phone.description}
        </div>
        <button className="w-full bg-black text-white py-2 rounded-xl font-semibold text-lg hover:bg-gray-800 transition mb-2">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default PhoneCard;
