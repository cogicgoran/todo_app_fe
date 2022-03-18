import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import CurrentUserContextProvider from './context/current-user/CurentUserContext';

import ProtectedRoute from './pages/protected-route/ProtectedRoute';
import { Navigate } from 'react-router-dom';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import { PATHS } from './helper/paths.const';
import PasswordReset from './pages/reset-password/PasswordReset';
import PasswordResetLogin from './pages/reset-password-login/PasswordResetLogin';


function App() {

  return (
    <BrowserRouter>
      <CurrentUserContextProvider>
        <Routes>
          <Route path={PATHS.REGISTER} element={<ProtectedRoute redirectTo={PATHS.HOME} disallowAuthorized={true} component={Register} />} />
          <Route path={PATHS.LOGIN} element={<ProtectedRoute redirectTo={PATHS.HOME} disallowAuthorized={true} component={Login} />} />
          <Route path={PATHS.PASSWORD_RESET_LOGIN} element={<ProtectedRoute redirectTo={PATHS.HOME} disallowAuthorized={true} component={PasswordResetLogin} />} />
          <Route path={PATHS.PASSWORD_RESET} element={<ProtectedRoute redirectTo={PATHS.HOME} disallowAuthorized={true} component={PasswordReset} />} />
          <Route path={PATHS.HOME} element={<ProtectedRoute redirectTo={PATHS.LOGIN} component={Home} />} />
          <Route path={PATHS.WILDCARD} element={<Navigate to={PATHS.HOME} />} />
        </Routes>
      </CurrentUserContextProvider>
    </BrowserRouter>
  );
};

export default App;
