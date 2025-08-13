import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Simple cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useProducts = (category = null, featured = false) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const abortControllerRef = useRef(null);

  const generateCacheKey = useCallback(() => {
    if (featured) return 'featured';
    if (category) return `category_${category}`;
    return 'all';
  }, [category, featured]);

  const fetchProducts = useCallback(async (pageNum = 1, append = false) => {
    try {
      // Cancel previous request if it exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setError(null);

      const cacheKey = generateCacheKey();
      const cachedData = cache.get(cacheKey);
      
      // Check if we have valid cached data
      if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION && pageNum === 1) {
        setProducts(cachedData.data);
        setLoading(false);
        return;
      }

      let url = `${API_BASE_URL}/products`;
      if (featured) {
        url += '/featured';
      } else if (category) {
        url += `/category/${category}`;
      }

      console.log('Fetching from URL:', url);

      const response = await axios.get(url, {
        signal: abortControllerRef.current.signal,
        params: { page: pageNum, limit: 12 },
        timeout: 10000 // 10 second timeout
      });

      console.log('Response received:', response.data);

      const newProducts = response.data;
      
      if (append) {
        setProducts(prev => [...prev, ...newProducts]);
      } else {
        setProducts(newProducts);
        // Cache the data
        cache.set(cacheKey, {
          data: newProducts,
          timestamp: Date.now()
        });
      }

      setHasMore(newProducts.length === 12); // Assuming 12 is the page size
      setPage(pageNum);
    } catch (err) {
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED') {
        // Request was cancelled, don't update state
        console.log('Request was cancelled, ignoring error');
        return;
      }
      
      console.error('Full error object:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      console.error('Error code:', err.code);
      
      let errorMessage = 'Failed to fetch products';
      
      if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Check if server is running.';
      } else {
        // Something else happened
        errorMessage = err.message || 'Network error occurred';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [category, featured, generateCacheKey]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      fetchProducts(page + 1, true);
    }
  }, [loading, hasMore, page, fetchProducts]);

  const refresh = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchProducts(1, false);
  }, [fetchProducts]);

  const clearCache = useCallback(() => {
    cache.clear();
  }, []);

  useEffect(() => {
    fetchProducts(1, false);
    
    // Cleanup function to abort request on unmount
    return () => {
      if (abortControllerRef.current) {
        console.log('Cleaning up - aborting request');
        abortControllerRef.current.abort();
      }
    };
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    clearCache,
    page
  };
};

export default useProducts;
