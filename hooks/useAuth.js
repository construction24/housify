import { useState, useEffect } from 'react';
import api from '@/lib/axiosInstance'; 

const useAuth = () => {
  const [isUserPresent, setIsUserPresent] = useState(false);

  // Function to check if user is present
  const checkUserPresence = async () => {
    try {
      const response = await api.get('/auth-check');
      setIsUserPresent(response.status === 200);
    } catch (error) {
      setIsUserPresent(false);
    }
  };

  // Function to log out the user
  const logout = async () => {
    try {
      setIsUserPresent(false);
      await api.post('/logout'); // Assuming your logout endpoint is '/api/v1/auth-check/logout'
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    checkUserPresence();
  }, []);

  return { isUserPresent, checkUserPresence, logout };
};

export default useAuth;
