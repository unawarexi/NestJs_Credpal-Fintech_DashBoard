import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignUp from '../presentation/SignUp';
import Login from '../presentation/Login';

const RightContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(location.pathname === '/auth/register');

  useEffect(() => {
    if (isSignUp) {
      navigate('/auth/register');
    } else {
      navigate('/auth/login');
    }
  }, [isSignUp, navigate]);

  return (
    <div className='pl-40'>
      {isSignUp ? (
        <SignUp toggleView={() => setIsSignUp(false)} />
      ) : (
        <Login toggleView={() => setIsSignUp(true)} />
      )}
    </div>
  );
};

export default RightContainer;