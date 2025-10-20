import React, { useState } from "react";
import { User, ShoppingCart, Settings } from "lucide-react";

export type NotificationItem = {
  id: number;
  icon: "user" | "order" | "system";
  message: string;
  time: string;
  isRead: boolean;
};

export interface ListProps {
  items: NotificationItem[];
}

const iconMap = {
  user: <User className="w-5 h-5 text-gray-500" />,
  order: <ShoppingCart className="w-5 h-5 text-gray-400" />,
  system: <Settings className="w-5 h-5 text-gray-400" />,
};

export const List: React.FC<ListProps> = ({ items }) => {
  const [listItems, setListItems] = useState(items);

  // 클릭 시 읽음 처리
  const markAsRead = (id: number) => {
    setListItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md divide-y divide-gray-100">
      {listItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition cursor-pointer"
          onClick={() => markAsRead(item.id)}
        >
          <div className="flex items-center gap-3">
            {iconMap[item.icon]}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {item.message}
              </span>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          </div>
          {/* 읽지 않은 경우에만 파란 점 표시 */}
          {!item.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
        </div>
      ))}
    </div>
  );
};