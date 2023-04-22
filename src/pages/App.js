import Login from './components/Login';
import Dashboard from './components/dashboard';
import { useEffect, useState } from 'react';


function App(){

  
  const [token, setToken] = useState();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  
  let login_data = {
    setToken:setToken, setEmail:setEmail,  setPassword:setPassword,
    token:token, email:email, password:password,
  } 

  useEffect(() => {
    if(!token || token === 'undefined' || token == null) {
        setIsAuthenticated(false);
    }
    else{
      setIsAuthenticated(true);
    }
  }, [token]);

  useEffect(()=>{
    setToken(localStorage.getItem('token'));
  }, []);

  if(isAuthenticated){
    localStorage.setItem('token', token);
    return (
      <Dashboard props={login_data}/>
    )
  }
  else{
    return (
      <Login props={login_data}/>
    );
  }
  
}

export default App;