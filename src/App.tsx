import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CurrentUserContextProvider from './context/current-user/CurentUserContext';

import ProtectedRoute from './pages/protected-route/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

const PATHS = {
  REGISTER: '/register',
  LOGIN: '/login',
  HOME: '/',
  WILDCARD: '*'
}

function App() {
  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <Routes>
          <Route path={PATHS.REGISTER} element={<ProtectedRoute redirectTo={PATHS.HOME} disallowAuthorized={true} component={Register} />} />
          <Route path={PATHS.LOGIN} element={<ProtectedRoute redirectTo={PATHS.HOME} disallowAuthorized={true} component={Login} />} />
          <Route path={PATHS.HOME} element={<ProtectedRoute redirectTo={PATHS.LOGIN} component={Home} />} />
          <Route path={PATHS.WILDCARD} element={<Navigate to={PATHS.HOME} />} />
        </Routes>
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
};

export default App;
