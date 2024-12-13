import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Context for managing visibility state
const VisibilityContext = createContext();

export const useVisibility = () => {
  return useContext(VisibilityContext);
};

export const VisibilityProvider = ({ children }) => {
  // Get the initial visibility state from localStorage, default to true if not set
  const [servicesVisible, setServicesVisible] = useState(() => {
    return localStorage.getItem('servicesVisible') === 'false' ? false : true;
  });
  const [brandsVisible, setBrandsVisible] = useState(() => {
    return localStorage.getItem('brandsVisible') === 'false' ? false : true;
  });
  const [productsVisible, setProductsVisible] = useState(() => {
    return localStorage.getItem('productsVisible') === 'false' ? false : true;
  });

  // Toggle function for visibility
  const toggleVisibility = (section) => {
    if (section === 'services') {
      const newState = !servicesVisible;
      setServicesVisible(newState);
      localStorage.setItem('servicesVisible', newState);
    }
    if (section === 'brands') {
      const newState = !brandsVisible;
      setBrandsVisible(newState);
      localStorage.setItem('brandsVisible', newState);
    }
    if (section === 'products') {
      const newState = !productsVisible;
      setProductsVisible(newState);
      localStorage.setItem('productsVisible', newState);
    }
  };

  return (
    <VisibilityContext.Provider
      value={{
        servicesVisible,
        brandsVisible,
        productsVisible,
        toggleVisibility,
      }}
    >
      {children}
    </VisibilityContext.Provider>
  );
};
