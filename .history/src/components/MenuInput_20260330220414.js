import React from 'react';
import menuItems from '../data/menuItems';

const MenuInput = ({ quantities, handleQuantityChange }) => {
  const categories = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  const renderItem = (item) => (
    <div key={item.name} className="menu-item">
      <label>{item.name} - Rs.{item.price}</label>

      {/* ── Only this part changed ── */}
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
        <button
          onClick={() => handleQuantityChange(item.name, Math.max(0, (quantities[item.name] || 0) - 1))}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
        >
          -
        </button>
        <input
          type="number"
          min="0"
          value={quantities[item.name] || 0}
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            handleQuantityChange(item.name, isNaN(parsed) || parsed < 0 ? 0 : parsed);
          }}
          className="w-14 text-center outline-none tw"
        />
        <button
          onClick={() => handleQuantityChange(item.name, (quantities[item.name] || 0) + 1)}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
        >
          +
        </button>
      </div>
      {/* ── End of change ── */}

    </div>
  );

  return (
    <div className="menu-wrapper">
      {Object.keys(categories).map((categoryName) => (
        <div key={categoryName} className="menu-category">
          <h2>{categoryName}</h2>

          <div className="menu-inputs">
            {/* Left Column */}
            <div className="menu-column">
              {categories[categoryName]
                .slice(0, Math.ceil(categories[categoryName].length / 2))
                .map(renderItem)}
            </div>

            {/* Right Column */}
            <div className="menu-column">
              {categories[categoryName]
                .slice(Math.ceil(categories[categoryName].length / 2))
                .map(renderItem)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuInput;