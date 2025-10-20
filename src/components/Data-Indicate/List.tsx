import React from "react";
import { User, ShoppingCart, Cog } from "lucide-react";

interface NotificationItem {
  id: number;
  icon: "user" | "order" | "system";
  message: string;
  time: string;
  isRead: boolean;
}

interface ListProps {
  items: NotificationItem[];
}

const iconMap = {
  user: <User className="w-6 h-6 text-gray-500" />,
  order: <ShoppingCart className="w-6 h-6 text-gray-500" />,
  system: <Cog className="w-6 h-6 text-gray-500" />,
};

export const List = ({ items }: ListProps) => {
  return (
    <div className="w-full bg-white rounded-md border border-gray-200">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex items-center justify-between px-4 py-3 ${
            index !== items.length - 1 ? "border-b border-gray-100" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full">
              {iconMap[item.icon]}
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-800 font-medium">
                {item.message}
              </span>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          </div>

          {!item.isRead && (
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          )}
        </div>
      ))}
    </div>
  );
};