import { createContext, ReactChild, useContext, useMemo, useState } from "react";

interface Context {
    token: string | null ;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const ResetTokenContext = createContext<Context | undefined>(undefined);

interface Props {
    children: ReactChild;
}

function ResetTokenContextProvider({children}: Props) {
    const initToken: any = useMemo(() => {
        const initPageUrl = window.location.href;
    
        if (initPageUrl.includes('/password-reset/')) {
          const urlPaths = initPageUrl.split('/');
          const token = urlPaths[urlPaths.length - 1];
          return token;
        }
        return null;
      }, []);
    const [token, setToken] = useState<string | null>(initToken);

    const value: Context = {token, setToken};
    return (
        <ResetTokenContext.Provider value={value}>
            {children}
        </ResetTokenContext.Provider>
    )
}

export function useResetTokenContext() {
    const context = useContext(ResetTokenContext);
    if( context === undefined) {
        throw new Error('ResetTokenContext must be used within a ResetTokenContextProvider');
    }
    return context;
}

export default ResetTokenContextProvider;