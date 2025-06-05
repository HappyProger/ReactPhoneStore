import React from "react";

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
  const total = items.reduce((sum, item) => sum + item.price, 0);

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="flex-1 p-6">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-12 text-lg">Корзина пуста</p>
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
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-400 rounded"
                      aria-label={`Удалить ${item.name} из корзины`}
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-semibold text-gray-900">Итого:</span>
                  <span className="text-xl font-semibold text-gray-900">
                    {total.toLocaleString()} $
                  </span>
                </div>
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold text-lg shadow-md transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                  type="button"
                >
                  Добавить в корзину
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
