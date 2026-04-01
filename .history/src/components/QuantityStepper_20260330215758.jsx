import React from "react";

const QuantityStepper = ({ value = 0, onChange }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      {/* Decrease */}
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="px-1 py-1 bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
      >
        -
      </button>

      {/* Input */}
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w- text-center outline-none"
      />

      {/* Increase */}
      <button
        onClick={() => onChange(value + 1)}
        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
      >
        +
      </button>
    </div>
  );
};

export default QuantityStepper;