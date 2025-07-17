import React from "react";

const ContextMenu = ({ x, y, options = [], visible, onClose }) => {
  if (!visible) return null;

  return (
    <ul
      style={{
        position: "absolute",
        top: y,
        left: x,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        listStyle: "none",
        padding: "8px 0",
        margin: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        zIndex: 9999,
        width: "120px"
      }}
      onClick={onClose}
    >
      {options.map((opt, idx) => (
        <li
          key={idx}
          onClick={() => {
            opt.onClick();
            onClose();
          }}
          style={{
            padding: "6px 12px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            hover: {
              backgroundColor: "#eee"
            }
          }}
        >
          {opt.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
