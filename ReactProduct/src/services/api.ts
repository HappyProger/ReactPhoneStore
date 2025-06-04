// services/api.ts

import axios from "axios";

// =======================
// Настройки RapidAPI
// =======================
// Замените значение на ваш действующий ключ RapidAPI
const RAPIDAPI_KEY = "ВАШ_RAPIDAPI_KEY";
// Host для Mobile Phone Live API на RapidAPI
const RAPIDAPI_HOST = "mobile-phone-live.p.rapidapi.com";
// Базовый URL для Mobile Phone Live API
const BASE_URL = "https://mobile-phone-live.p.rapidapi.com";

// =======================
// Кэширование результатов
// =======================
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 минут в миллисекундах
const cache = new Map<string, CacheItem<any>>();

// =======================
// Типы данных
// =======================

/**
 * Бренд телефона
 */
export interface Brand {
  id: string;   // Например: "1"
  name: string; // Например: "Samsung"
}

/**
 * Модель устройства (телефона)
 */
export interface Device {
  device_id: string;  // Например: "samsung_galaxy_s23"
  name: string;       // Например: "Samsung Galaxy S23"
  image_url: string;  // URL-изображения товара
  price: number;      // Числовая цена (например, 799.99)
  currency: string;   // Валюта (например, "USD")
  brand: string;      // Название бренда (например, "Samsung")
}

/**
 * Ответ при получении списка брендов
 */
type GetBrandsResponse = Brand[];

/**
 * Ответ при получении устройств одного бренда
 */
interface GetDevicesByBrandResponse {
  brand_id: string;
  brand_name: string;
  devices: Array<{
    device_id: string;
    name: string;
    image_url: string;
    price: number;
    currency: string;
  }>;
}

/**
 * Ответ при получении детальной информации об устройстве
 */
interface GetDeviceByIdResponse {
  device_id: string;
  brand: string;
  name: string;
  specs?: Record<string, any>;
  price: number;
  currency: string;
  release_date?: string;
  image_url: string;
  description?: string;
}

// =======================
// Основной API-объект
// =======================
export const api = {
  /**
   * Получить список всех брендов.
   * Кэшируется на CACHE_DURATION (5 минут).
   */
  async getBrands(): Promise<Brand[]> {
    const cacheKey = "getBrands";
    const now = Date.now();

    // Проверяем кэш
    const cached = cache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.get<GetBrandsResponse>(
        `${BASE_URL}/brands`,
        {
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
          },
        }
      );

      // response.data уже имеет форму Brand[]
      const brands: Brand[] = response.data;

      // Сохраняем в кэш
      cache.set(cacheKey, {
        data: brands,
        timestamp: now,
      });

      return brands;
    } catch (error) {
      // В случае сетевой ошибки пытаемся вернуть данные из кэша
      if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
          console.log("Используем кэшированные бренды из-за отсутствия интернета");
          return cachedData.data;
        }
      }
      console.error("Ошибка при получении списка брендов:", error);
      throw error;
    }
  },

  /**
   * Получить список всех устройств (моделей) для конкретного бренда.
   * Кэшируется на CACHE_DURATION (5 минут) с учётом brandId.
   *
   * @param brandId ID бренда (например, "1" для Samsung)
   */
  async getDevicesByBrand(brandId: string): Promise<Device[]> {
    const cacheKey = `getDevicesByBrand-${brandId}`;
    const now = Date.now();

    // Проверяем кэш
    const cached = cache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.get<GetDevicesByBrandResponse>(
        `${BASE_URL}/brands/${brandId}/devices`,
        {
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
          },
        }
      );

      // Преобразуем ответ в массив Device[]
      const raw = response.data;
      const devices: Device[] = raw.devices.map((item) => ({
        device_id: item.device_id,
        name: item.name,
        image_url: item.image_url,
        price: item.price,
        currency: item.currency,
        brand: raw.brand_name,
      }));

      // Сохраняем в кэш
      cache.set(cacheKey, {
        data: devices,
        timestamp: now,
      });

      return devices;
    } catch (error) {
      // При сетевой ошибке возвращаем кэш, если есть
      if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
          console.log(
            `Используем кэшированные устройства бренда ${brandId} из-за отсутствия интернета`
          );
          return cachedData.data;
        }
      }
      console.error(`Ошибка при получении устройств бренда ${brandId}:`, error);
      throw error;
    }
  },

  /**
   * Получить детальную информацию об устройстве по его ID.
   * Кэшируется на CACHE_DURATION (5 минут) с учётом deviceId.
   *
   * @param deviceId ID устройства (например, "samsung_galaxy_s23")
   */
  async getDeviceById(deviceId: string): Promise<Device> {
    const cacheKey = `getDeviceById-${deviceId}`;
    const now = Date.now();

    // Проверяем кэш
    const cached = cache.get(cacheKey);
    if (cached && now - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await axios.get<GetDeviceByIdResponse>(
        `${BASE_URL}/devices/${deviceId}`,
        {
          headers: {
            "X-RapidAPI-Key": RAPIDAPI_KEY,
            "X-RapidAPI-Host": RAPIDAPI_HOST,
          },
        }
      );

      const raw = response.data;

      // Преобразуем ответ в объект Device
      const device: Device = {
        device_id: raw.device_id,
        name: raw.name,
        image_url: raw.image_url,
        price: raw.price,
        currency: raw.currency,
        brand: raw.brand,
      };

      // Сохраняем в кэш
      cache.set(cacheKey, {
        data: device,
        timestamp: now,
      });

      return device;
    } catch (error) {
      // При сетевой ошибке возвращаем кэш, если есть
      if (axios.isAxiosError(error) && error.code === "ERR_NETWORK") {
        const cachedData = cache.get(cacheKey);
        if (cachedData) {
          console.log(
            `Используем кэшированные данные устройства ${deviceId} из-за отсутствия интернета`
          );
          return cachedData.data;
        }
      }
      console.error(`Ошибка при получении устройства с ID ${deviceId}:`, error);
      throw error;
    }
  },
};
