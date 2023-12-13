import React, { useState } from "react";

export const HoldUpWeathers = ({ children, style }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen1((open) => !open)}
      >
        {isOpen1 ? "–" : "+"}
      </button>
      <div>{isOpen1 && children}</div>
    </div>
  );
};
