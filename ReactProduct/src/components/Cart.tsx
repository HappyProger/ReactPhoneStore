import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import packageIcon from "../assets/package-icon.png";
import orderSuccessIcon from "../assets/order-success-icon.png";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { Phone } from "../types/types";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Phone[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onReorderItems: (items: Phone[]) => void;
  clearCart: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onReorderItems,
  clearCart,
}) => {
  const { showNotification } = useNotification();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveItem = (item: Phone) => {
    onRemoveItem(item.id);
    showNotification(`${item.name} удален из корзины`, "info");
  };

  const handleIncrease = (item: Phone) => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = (item: Phone) => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    } else {
      handleRemoveItem(item);
    }
  };

  const handleOrder = () => {
    if (items.length === 0) return;
    setIsOrderPlaced(true);
    showNotification("Заказ оформлен!", "success");
    clearCart();
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(items);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    onReorderItems(reordered);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-[100]"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-[101] overflow-y-auto flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        <header className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Корзина
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="text-gray-400 hover:text-gray-700 transition rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <CloseIcon />
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          {isOrderPlaced && (
            <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col justify-center items-center p-4 sm:p-6 rounded-xl shadow-lg z-50">
              <img
                src={orderSuccessIcon}
                alt="Заказ оформлен"
                className="max-w-full max-h-[200px] sm:max-h-[250px] object-contain mb-4 sm:mb-6 mx-auto"
              />
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Заказ оформлен!
              </h3>
              <button
                onClick={() => {
                  setIsOrderPlaced(false);
                  onClose();
                }}
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Закрыть
              </button>
            </div>
          )}

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10 sm:mt-20 text-center">
              <img
                src={packageIcon}
                alt="Корзина пуста"
                className="max-w-full max-h-[150px] sm:max-h-[200px] object-contain mb-4 sm:mb-6"
              />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                Корзина пустая
              </h3>
              <p className="text-gray-500 max-w-xs text-sm sm:text-base">
                Добавьте хотя бы один смартфон, чтобы сделать заказ
              </p>
            </div>
          ) : (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="cartItems">
                {(provided) => (
                  <ul
                    className="space-y-4 sm:space-y-6"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {items.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`flex items-center justify-between border-b border-gray-100 pb-4 bg-white ${
                              snapshot.isDragging ? "shadow-lg" : ""
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                                {item.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-600">
                                {item.price.toLocaleString()} $ ×{" "}
                                {item.quantity}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2 sm:space-x-4 ml-4">
                              <button
                                onClick={() => handleDecrease(item)}
                                className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                              >
                                <RemoveIcon />
                              </button>
                              <span className="text-sm sm:text-base font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleIncrease(item)}
                                className="p-1 sm:p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100"
                              >
                                <AddIcon />
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item)}
                                className="p-1 sm:p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                              >
                                <CloseIcon />
                              </button>
                            </div>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}

          {items.length > 0 && (
            <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <span className="text-lg sm:text-xl font-semibold text-gray-900">
                  Итого:
                </span>
                <span className="text-lg sm:text-xl font-semibold text-gray-900">
                  {total.toLocaleString()} $
                </span>
              </div>
              <button
                onClick={handleOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg shadow-md transition focus:outline-none focus:ring-4 focus:ring-blue-300"
                type="button"
              >
                Оплатить заказ
              </button>
            </div>
          )}
        </main>
      </aside>
    </>
  );
};

export default Cart;
