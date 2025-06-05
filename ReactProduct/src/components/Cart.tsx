import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import CloseIcon from '@mui/icons-material/Close';

// Импортируем картинки для пустой корзины и успешного заказа
import packageIcon from "../assets/package-icon.png";
import orderSuccessIcon from "../assets/order-success-icon.png";

interface Phone {
  id: string;
  name: string;
  price: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Phone[];
  onRemoveItem: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemoveItem }) => {
  const { showNotification } = useNotification();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleRemoveItem = (item: Phone) => {
    onRemoveItem(item.id);
    showNotification(`${item.name} удален из корзины`, "info");
  };

  const handleOrder = () => {
    if (items.length === 0) return;
    setIsOrderPlaced(true);
    showNotification("Заказ оформлен!", "success");
  };

  if (!isOpen) return null;

  return (
      <>
        <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[100]"
            onClick={onClose}
        />
        <aside
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-[101] overflow-y-auto flex flex-col"
            role="dialog"
            aria-modal="true"
        >
          <header className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Корзина</h2>
            <button
                onClick={onClose}
                aria-label="Close cart"
                className="text-gray-400 hover:text-gray-700 transition rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CloseIcon />
            </button>
          </header>

          <main className="flex-1 p-6 relative">
            {isOrderPlaced && (
                <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center items-center p-6 rounded-xl shadow-lg z-50">
                  <img
                      src={orderSuccessIcon}
                      alt="Заказ оформлен"
                      className="max-w-full max-h-[250px] object-contain mb-6 mx-auto"
                  />
                  <h3 className="text-2xl font-bold mb-4">Заказ оформлен!</h3>
                  <button
                      onClick={() => {
                        setIsOrderPlaced(false);
                        onClose();
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                  >
                    Закрыть
                  </button>
                </div>
            )}

            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-center">
                  <img
                      src={packageIcon}
                      alt="Корзина пуста"
                      className="max-w-full max-h-[200px] object-contain mb-6"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    Корзина пустая
                  </h3>
                  <p className="text-gray-500 max-w-xs">
                    Добавьте хотя бы один смартфон, чтобы сделать заказ
                  </p>
                </div>
            ) : (
                <>
                  <ul className="space-y-6">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between border-b border-gray-100 pb-4"
                        >
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="mt-1 text-sm text-gray-600">{item.price.toLocaleString()} $</p>
                          </div>
                          <button
                              onClick={() => handleRemoveItem(item)}
                              aria-label={`Удалить ${item.name} из корзины`}
                              className="text-red-600 hover:text-red-800 transition focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                          >
                            <CloseIcon />
                          </button>
                        </li>
                    ))}
                  </ul>

                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xl font-semibold text-gray-900">Итого:</span>
                      <span className="text-xl font-semibold text-gray-900">{total.toLocaleString()} $</span>
                    </div>
                    <button
                        onClick={handleOrder}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                        type="button"
                    >
                      Оплатить заказ
                    </button>
                  </div>
                </>
            )}
          </main>
        </aside>
      </>
  );
};

export default Cart;
