import { createContext, ReactChild, useContext, useState } from "react";
import { OPTIONS } from '../../helper/options.const';

interface Context {
    option: string;
    setOption: React.Dispatch<React.SetStateAction<string>>;
}

const TodoContext = createContext<Context | undefined>(undefined);

interface Props {
    children: ReactChild;
}

function TodoContextProvider({children}: Props) {
    const [option, setOption] = useState(OPTIONS.ALL);

    const value: Context = {option, setOption};
    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodoContext() {
    const context = useContext(TodoContext);
    if( context === undefined) {
        throw new Error('useTodoContext must be used within a TodoContextProvider');
    }
    return context;
}

export default TodoContextProvider;