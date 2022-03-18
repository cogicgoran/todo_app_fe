import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/current-user/CurentUserContext';
import { useResetTokenContext } from '../../context/reset-token/ResetTokenContext';
import { PATHS } from '../../helper/paths.const';

interface Props {
    disallowAuthorized?: boolean;
    redirectTo: string;
    component: React.ComponentType;
}

function ProtectedRoute({disallowAuthorized, redirectTo, component:Component}: Props): JSX.Element {
    const { currentUser } = useUserContext();
    const { token } = useResetTokenContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (token) navigate(PATHS.PASSWORD_RESET_LOGIN);
    },[]);
    console.log("token", token)

    if (disallowAuthorized && !currentUser) return <Component />;
    if (!disallowAuthorized && currentUser) return <Component />;
    return <Navigate to={redirectTo}/>;
};

export default ProtectedRoute;