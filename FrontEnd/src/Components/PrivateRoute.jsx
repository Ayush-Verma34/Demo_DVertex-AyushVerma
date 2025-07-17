import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../api/userApi'; 

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null); 

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await checkAuth();
        setAuth(true);
      } catch (error) {
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (auth === null) return <div>Loading...</div>; // loading spinner if you prefer
  if (auth === false) return <Navigate to="/login" />;
  return children;
};

export default PrivateRoute;
