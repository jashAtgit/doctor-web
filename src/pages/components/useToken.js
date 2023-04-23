import { useState, useEffect } from 'react';

export default function useToken() {

  let token, setToken;
    
  useEffect(() => { 
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log("userToken inside useEffect = "+userToken);
        return userToken? userToken.token : null;
      };
    
    [token, setToken] = useState(getToken());
    
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };
    
      return {
        setToken: saveToken,
        token
      }
  }, [])

    
  }

