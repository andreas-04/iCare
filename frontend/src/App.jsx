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
    if (sessionId || userId) {
      setIsAuthenticated(true);
    }
  }, []);
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
          {isAuthenticated ? <Root/> : <Authentication onAuthenticated={() => {setIsAuthenticated(true);window.location.reload();}} />}
      </div>
    </CssVarsProvider>
    </>
  )
}

export default App
