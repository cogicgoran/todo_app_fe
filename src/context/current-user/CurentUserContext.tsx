import { createContext, ReactChild, ReactNode, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    currentUser: {} | null;
    setCurrentUser: (active: {} | null) => void;
}

const CurrentUserContext = createContext<Props>({
    currentUser: false,
    setCurrentUser: () => { }
});

const USER_COOKIE = 'user'

function getUserCurrent(setCurrentUser: any) {
    const cookies: string[] = document.cookie.split("; ");
    const cookiePairs = cookies.map(cookie => cookie.split("="));
    const user = cookiePairs.find(cookiePair => cookiePair[0] === USER_COOKIE);
    if (user) return setCurrentUser(user);
    return setCurrentUser(false);
}

function CurrentUserContextProvider({ children }: { children: ReactNode }): JSX.Element {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState<any>(false);
    // const [currentUser, setCurrentUser] = useState<any>({dummy:'test'});

    useEffect(() => {
        getUserCurrent(setCurrentUser)
    }, []);

    useEffect(() => {
        if(currentUser) {
            navigate('/')
        } else  {
            navigate('/login');
        }
    }, [currentUser]);

    return <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
    </CurrentUserContext.Provider>
}

export function useUserContext() {
    return useContext(CurrentUserContext);
}

export default CurrentUserContextProvider;

