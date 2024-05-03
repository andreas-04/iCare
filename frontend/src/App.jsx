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
    }else if(userId){
      setIsAuthenticated(true);
    }
  }, []);
  console.log(isAuthenticated);
const theme = extendTheme({ cssVarPrefix: 'demo' });

  return (
    <>
    <CssVarsProvider
      defaultMode="dark"
      theme={theme}
      colorSchemeSelector="body"
      modeStorageKey="demo_dark-mode-by-default"
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
