import React from "react";
import menuItems from "../data/menuItems";
import QuantityStepper from "./QuantityStepper";

const MenuInput = ({ quantities, handleQuantityChange }) => {
  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-wrapper p-4">
      {Object.keys(categories).map((categoryName) => {
        const items = categories[categoryName];
        const mid = Math.ceil(items.length / 2);

        const renderItem = (item) => (
          <div
            key={item.name}
            className="flex justify-between items-center p-2 border rounded-lg"
          >
            <label className="text-sm font-medium">
              {item.name} - Rs.{item.price}
            </label>
            <QuantityStepper
              value={quantities[item.name] || 0}
              onChange={(val) => handleQuantityChange(item.name, val)}
            />
          </div>
        );

        return (
          <div key={categoryName} className="menu-category mb-6">
            <h2 className="text-xl font-semibold mb-3">{categoryName}</h2>
            <div className="flex gap-6">
              <div className="flex-1 space-y-3">
                {items.slice(0, mid).map(renderItem)}
              </div>
              <div className="flex-1 space-y-3">
                {items.slice(mid).map(renderItem)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuInput;