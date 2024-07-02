export const saveFiltersToStorage = (filters) => {
    localStorage.setItem('filters', JSON.stringify(filters));
  };

  export const loadFiltersFromStorage = () => {
    const storedFilters = localStorage.getItem('filters');
    return storedFilters ? JSON.parse(storedFilters) : {};
  };