import React from "react";
import menuItems from "../data/menuItems";
import QuantityStepper from "./QuantityStepper";

const MenuInput = ({ quantities, handleQuantityChange }) => {
  // Group items by category
  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="menu-wrapper p-4">
      {Object.keys(categories).map((categoryName) => {
        const items = categories[categoryName];
        const mid = Math.ceil(items.length / 2);

        return (
          <div key={categoryName} className="menu-category mb-6">
            {/* Category Title */}
            <h2 className="text-xl font-semibold mb-3">
              {categoryName}
            </h2>

            <div className="flex gap-6">
              {/* Left Column */}
              <div className="flex-1 space-y-3">
                {items.slice(0, mid).map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center p-2 border rounded-lg"
                  >
                    <label className="text-sm font-medium">
                      {item.name} - Rs.{item.price}
                    </label>

                    <QuantityStepper
                      value={quantities[item.name] || 0}
                      onChange={(val) =>
                        handleQuantityChange(item.name, val)
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="flex-1 space-y-3">
                {items.slice(mid).map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center p-2 border rounded-lg"
                  >
                    <label className="text-sm font-medium">
                      {item.name} - Rs.{item.price}
                    </label>

                    <QuantityStepper
                      value={quantities[item.name] || 0}
                      onChange={(val) =>
                        handleQuantityChange(item.name, val)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MenuInput;