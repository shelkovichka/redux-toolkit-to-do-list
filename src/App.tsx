import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import {StrictMode} from 'react';

import Layout from '@/components/layout';
import Home from '@/pages/home';
import {ThemeProvider} from '@/theme/theme-provider';

import Auth from './pages/auth';
import ProtectedRoute from './routes/protected-route';

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            variant="error"
            maxSnack={1}
          >
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </Layout>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

export default App;
