import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Theme from './Pages/Theme';
import { ThemeProvider } from '@emotion/react';
import { MatrixTheme } from './MatrixTheme';
import { LightTheme } from './LightTheme';
import { createContext, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export const AppContext = createContext<any>({ matrixTheme: true });
const key = import.meta.env.VITE_API_KEY;
const url = import.meta.env.VITE_SERVICE_URL;
export const env = import.meta.env.VITE_ENV;

export const supabase_client = createClient(url, key);

function App() {
  const [appTheme, setAppTheme] = useState({ matrixTheme: true });
  const [myDatesUpdated, setMyDatesUpdated] = useState<boolean>(false); // flag when true, it means the local storage myDates have been updated

  // save the session if user is logged in with supabase
  const [session, setSession] = useState<any>(null);
  const [authComplete, setAuthComplete] = useState(false);

  const userAuth = async () => {
    await supabase_client.auth
      .getSession()
      .then(({ data: { session }, error }) => {
        setSession(session);

        if (error) {
          console.log(error);
        }
        if (env === 'dev') {
          console.log('dev', session);
        }
      });

    const {
      data: { subscription },
    } = await supabase_client.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (env === 'dev') {
        console.log('dev changed', session);
      }
    });

    setAuthComplete(true);
    return () => subscription.unsubscribe();
  };

  useEffect(() => {
    userAuth();

    const isMatrixTheme = localStorage.getItem('matrixTheme');
    if (isMatrixTheme === null) {
      localStorage.setItem('matrixTheme', 'true');
    } else if (isMatrixTheme !== null && isMatrixTheme === 'true') {
      setAppTheme({ matrixTheme: true });
    } else {
      setAppTheme({ matrixTheme: false });
    }
  }, []);

  return (
    <>
      <AppContext.Provider
        value={{
          authComplete,
          session,
          appTheme,
          setAppTheme,
          myDatesUpdated,
          setMyDatesUpdated,
        }}
      >
        <ThemeProvider theme={appTheme.matrixTheme ? MatrixTheme : LightTheme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='theme' element={<Theme />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AppContext.Provider>
    </>
  );
}

export default App;
