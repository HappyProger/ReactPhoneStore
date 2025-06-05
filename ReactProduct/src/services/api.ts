// services/api.ts

import { Phone } from "../types/types";

const API_BASE_URL = "http://localhost:5000/api";

export const api = {
  // Получение всех телефонов
  async getAllPhones(): Promise<Phone[]> {
    const response = await fetch(`${API_BASE_URL}/phones`);
    if (!response.ok) {
      throw new Error("Failed to fetch phones");
    }
    return response.json();
  },

  // Получение телефона по ID
  async getPhoneById(id: string): Promise<Phone> {
    const response = await fetch(`${API_BASE_URL}/phones/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch phone");
    }
    return response.json();
  },

  // Получение телефонов по бренду
  async getPhonesByBrand(brand: string): Promise<Phone[]> {
    const response = await fetch(`${API_BASE_URL}/phones?brand=${brand}`);
    if (!response.ok) {
      throw new Error("Failed to fetch phones by brand");
    }
    return response.json();
  },

  // Получение всех уникальных брендов
  async getBrands(): Promise<string[]> {
    const phones = await this.getAllPhones();
    return Array.from(
      new Set(
        phones
          .map((phone) => phone.brand)
          .filter((brand): brand is string => Boolean(brand))
      )
    );
  },
};
