import Login from './components/Login';
import Dashboard from './components/dashboard';
import { useState } from 'react';

function App(){

  const [token, setToken] = useState();
  
  if(!token || token.token == null) {
    return <Login setToken={setToken} />
  }

  return (
      <Dashboard token={token}/>
  )
}

export default App;