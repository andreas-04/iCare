import { useState, useEffect } from 'react';
import Authentication from './components/Authentication.jsx'
import Root from './components/root.jsx'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const sessionId = document.cookie.split('; ').find(row => row.startsWith('sessionid='));
    const userId = document.cookie.split('; ').find(row => row.startsWith('user_id='));
    if (sessionId ) {
      setIsAuthenticated(true);
      //set userID cookie
    }else if(userId){
      setIsAuthenticated(true);
    }else{
      console.log("No sesh ID found :(");
      console.log(document.cookie);
    }
  }, []);
  console.log(isAuthenticated);


  return (
    //<>
    //  {isAuthenticated ? <Root/> : <Authentication onAuthenticated={() => setIsAuthenticated(true)} />}
    //</>
    <>
      {isAuthenticated && <Root />}
    </>
  );
}

export default App
