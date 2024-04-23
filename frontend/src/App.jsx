import { useState, useEffect } from 'react';
import Authentication from './components/Authentication.jsx'
import Root from './components/root.jsx'
import './App.css'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
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
const theme = extendTheme({ cssVarPrefix: 'demo' });

  return (
    <>
    <CssVarsProvider
      defaultMode="dark"
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      // the selector to apply CSS theme variables stylesheet.
      colorSchemeSelector="#demo_dark-mode-by-default"
      //
      // the local storage key to use
      modeStorageKey="demo_dark-mode-by-default"
      //
      // set as root provider
      disableNestedContext
    >
      <div id="demo_dark-mode-by-default">
          {isAuthenticated ? <Root/> : <Authentication onAuthenticated={() => setIsAuthenticated(true)} />}
      </div>
    </CssVarsProvider>
    </>
  )
}

export default App
