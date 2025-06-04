import React, { useEffect, useState } from "react";
import { api, Brand, Device } from "../services/api";

export default function PhoneCatalog() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  useEffect(() => {
    api
      .getBrands()
      .then((list: Brand[]) => setBrands(list))
      .catch((err: Error) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      api
        .getDevicesByBrand(selectedBrand)
        .then((devs: Device[]) => setDevices(devs))
        .catch((err: Error) => console.error(err));
    }
  }, [selectedBrand]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Каталог телефонов</h1>

      <div className="mb-4">
        <label htmlFor="brand-select" className="mr-2">
          Выберите бренд:
        </label>
        <select
          id="brand-select"
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="border px-2 py-1"
        >
          <option value="">-- Выберите бренд --</option>
          {brands.map((br) => (
            <option key={br.id} value={br.id}>
              {br.name}
            </option>
          ))}
        </select>
      </div>

      {devices.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {devices.map((d) => (
            <div
              key={d.device_id}
              className="border rounded-lg p-4 shadow-sm"
            >
              <img
                src={d.image_url}
                alt={d.name}
                className="h-40 w-full object-contain mb-2"
              />
              <h2 className="font-semibold">{d.name}</h2>
              <p className="text-gray-700">
                Цена: {d.price} {d.currency}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
