import { useState, useEffect } from 'react';
import api from '@/lib/axiosInstance';

// Define the cache expiry time (e.g., 10 minutes)
const CACHE_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

const useAuth = () => {
  const [isUserPresent, setIsUserPresent] = useState(() => {
    // Retrieve cached state from sessionStorage
    const cachedData = sessionStorage.getItem('userPresence');
    if (cachedData) {
      const { value, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY_TIME) {
        return value;
      }
    }
    return null; // Return null to indicate a fresh check is needed
  });

  const checkUserPresence = async () => {
    try {
      const response = await api.get('/auth-check');
      const userPresent = response.status === 200;
      setIsUserPresent(userPresent);
      // Cache the result
      sessionStorage.setItem('userPresence', JSON.stringify({
        value: userPresent,
        timestamp: Date.now(),
      }));
    } catch (error) {
      setIsUserPresent(false);
    }
  };

  const logout = async () => {
    try {
      setIsUserPresent(false);
      sessionStorage.removeItem('userPresence');
      await api.post('/logout');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    // If the state is null, perform a fresh check
    if (isUserPresent === null) {
      checkUserPresence();
    }
  }, [isUserPresent]);

  return { isUserPresent, checkUserPresence, logout };
};

export default useAuth;
