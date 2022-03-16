import React, { ReactChild } from 'react';
import Header from '../header/Header';

interface Props {
    children: ReactChild | ReactChild[];
}

function AuthenticatedWrapper({ children }: Props): JSX.Element {
    return (
        <>
            <Header />
            <div>
                {children}
            </div>
        </>
    )
}

export default AuthenticatedWrapper;