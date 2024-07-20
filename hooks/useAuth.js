import { useState, useEffect } from 'react';
import api from '@/lib/axiosInstance';

// Define the cache expiry time (e.g., 10 minutes)
const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

const useAuth = () => {
  const [isUserPresent, setIsUserPresent] = useState(null);

  const checkUserPresence = async () => {
    try {
      const response = await api.get('/auth-check');
      const userPresent = response.status === 200;
      setIsUserPresent(userPresent);
      // Cache the result in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('userPresence', JSON.stringify({
          value: userPresent,
          timestamp: Date.now(),
        }));
      }
    } catch (error) {
      // Handle case where cookies might be missing or invalid
      setIsUserPresent(false);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('userPresence'); // Clear cache if cookies are invalid
      }
    }
  };

  const logout = async () => {
    try {
      setIsUserPresent(false);
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('userPresence');
      }
      await api.post('/logout');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    // If running on the server, return early
    if (typeof window === 'undefined') {
      return;
    }

    // Retrieve cached state from sessionStorage
    const cachedData = sessionStorage.getItem('userPresence');
    if (cachedData) {
      const { value, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
        setIsUserPresent(value);
      } else {
        checkUserPresence();
      }
    } else {
      checkUserPresence();
    }
  }, []);

  return { isUserPresent, checkUserPresence, logout };
};

export default useAuth;
