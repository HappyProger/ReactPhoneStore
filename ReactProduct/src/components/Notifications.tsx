import React from "react";

interface NotificationsProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  message,
  type,
  onClose,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`p-4 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-500"
            : type === "error"
            ? "bg-red-500"
            : type === "warning"
            ? "bg-yellow-500"
            : "bg-blue-500"
        } text-white`}
      >
        <div className="flex items-center justify-between">
          <span>{message}</span>
          <button
            onClick={onClose}
            className="ml-4 text-white hover:text-gray-200 focus:outline-none"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
