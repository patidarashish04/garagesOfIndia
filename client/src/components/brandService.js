// services/brandService.js
export const fetchBrands = async (type) => {
    const response = await fetch(`/api/brands/${type}`);
    if (!response.ok) throw new Error('Failed to fetch brands');
    return response.json();
  };
  