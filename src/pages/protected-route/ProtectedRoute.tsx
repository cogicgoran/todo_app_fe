import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../context/current-user/CurentUserContext';

interface Props {
    disallowAuthorized?: boolean;
    redirectTo: string;
    component: React.ComponentType;
}

function ProtectedRoute({disallowAuthorized, redirectTo, component:Component}: Props): JSX.Element {
    const { currentUser } = useUserContext();

    if (disallowAuthorized && !currentUser) return <Component />;
    if (!disallowAuthorized && currentUser) return <Component />;
    return <Navigate to={redirectTo}/>;
};

export default ProtectedRoute;