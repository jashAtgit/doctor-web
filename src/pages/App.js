import Login from './components/Login';
import Dashboard from './components/dashboard';
import { useState } from 'react';

function App(){

  const [token, setToken] = useState();
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');

  let login_data = {
    setToken:setToken, setEmail:setEmail,  setPassword:setPassword,
    token:token, email:email, password:password,
  } 

  // replace with a valid() function
  if(!token || token.token == null) {
    return <Login props={login_data}/>
  }


  console.log("email from App()" + email);
  return (
      <Dashboard props={login_data}/>
  )
}

export default App;