import React, { createContext, useState, useEffect } from "react";
import { loadFiltersFromStorage, saveFiltersToStorage } from "../utils/storageUtils";

export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState(() => loadFiltersFromStorage());

  useEffect(() => {
    saveFiltersToStorage(filters);
  }, [filters]);

  return <FilterContext.Provider value={{ filters, setFilters }}>{children}</FilterContext.Provider>;
};
