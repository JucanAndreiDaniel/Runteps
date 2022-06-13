import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserContext } from './hooks/UserContext';
import PrivateRoute from './pages/PrivateRoute';
import Register from './pages/Register';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import useFindUser from './hooks/useFindUser';
import RunCode from './pages/RunCode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Class from './pages/Class';


const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#614dff',
      weak: '#614dff30',
    },
    secondary: {
      main: '#efb66e',
      weak: '#efb66e30',
    },
    background: {
      lighter: '#3e3e3e',
      default: '#323137',
      darker: '#2c2c2c',
      darkBlue: '#0D1218',
    },
    divider: '#614dff',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          "&:-webkit-autofill": {
            "-webkit-box-shadow": "0 0 0 100px #efb66e30 inset",
            "-webkit-text-fill-color": "var(--text-primary)",
          },
        },
      },
    },
  },
});

function App() {

  const {
    user,
    setUser,
    isLoading } = useFindUser();

  return (
    <ThemeProvider theme={theme}>

      <Router>
        <UserContext.Provider value={{ user, setUser, isLoading }}>
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/home" element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            />
            <Route path="/class" element={
              <PrivateRoute>
                <Class />
              </PrivateRoute>
            }
            />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
            />
            <Route path="/code" element={<RunCode />} />
            <Route element={<NotFound />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
