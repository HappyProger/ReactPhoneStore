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
  description: string;
  imageUrl: string;
  specs: PhoneSpecs;
}

interface PhoneCardProps {
  phone: Phone;
}

const PhoneCard: React.FC<PhoneCardProps> = ({ phone }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={phone.imageUrl}
        alt={phone.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">
          {phone.brand} {phone.name}
        </h3>
        <p className="text-2xl font-bold text-blue-600 mt-2">${phone.price}</p>
        <p className="text-gray-600 mt-2">{phone.description}</p>
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700">Specifications:</h4>
          <ul className="mt-2 text-sm text-gray-600">
            <li>Screen: {phone.specs.screen}</li>
            <li>Processor: {phone.specs.processor}</li>
            <li>RAM: {phone.specs.ram}</li>
            <li>Storage: {phone.specs.storage}</li>
            <li>Camera: {phone.specs.camera}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;
