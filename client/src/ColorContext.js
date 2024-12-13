import React, { createContext, useContext, useState } from 'react';

// Create a Context for managing colors
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  // State for header and footer colors
  const [headerColor, setHeaderColor] = useState(localStorage.getItem('headerColor') || '#950f0f');
  const [footerColor, setFooterColor] = useState(localStorage.getItem('footerColor') || '#333333');

  // Update header color and persist to localStorage
  const updateHeaderColor = (color) => {
    setHeaderColor(color);
    localStorage.setItem('headerColor', color);
  };

  // Update footer color and persist to localStorage
  const updateFooterColor = (color) => {
    setFooterColor(color);
    localStorage.setItem('footerColor', color);
  };

  return (
    <ColorContext.Provider value={{ headerColor, updateHeaderColor, footerColor, updateFooterColor }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to use ColorContext
export const useColor = () => useContext(ColorContext);
