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
    
    {/* Thumbnail */}
    <img
      src={item.image}
      alt={item.name}
      onError={(e) => { e.target.src = 'https://source.unsplash.com/60x60/?food'; }}
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '8px',
        objectFit: 'cover',
        flexShrink: 0,
        border: '1px solid #e5e7eb',
      }}
    />

    <label style={{ flex: 1 }}>{item.name} - Rs.{item.price}</label>

    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    }}>
      <button
        onClick={() => handleQuantityChange(item.name, Math.max(0, (quantities[item.name] || 0) - 1))}
        style={{ padding: '4px 12px', background: '#f3f4f6', border: 'none', borderRight: '1px solid #d1d5db', cursor: 'pointer', fontSize: '16px' }}
      >-</button>

      <input
        type="number"
        min="0"
        value={quantities[item.name] || 0}
        onChange={(e) => {
          const parsed = parseInt(e.target.value, 10);
          handleQuantityChange(item.name, isNaN(parsed) || parsed < 0 ? 0 : parsed);
        }}
        style={{ width: '56px', textAlign: 'center', outline: 'none', border: 'none', padding: '4px 0', background: '#fff', MozAppearance: 'textfield' }}
      />

      <button
        onClick={() => handleQuantityChange(item.name, (quantities[item.name] || 0) + 1)}
        style={{ padding: '4px 12px', background: '#f3f4f6', border: 'none', borderLeft: '1px solid #d1d5db', cursor: 'pointer', fontSize: '16px' }}
      >+</button>
    </div>
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