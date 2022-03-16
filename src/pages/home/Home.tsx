import AuthenticatedWrapper from '../../components/authenticated-wrapper/AuthenticatedWrapper';
import Sidebar from '../../components/todos/sidebar/Sidebar';
import Main from '../../components/todos/main/Main';
import { OPTIONS } from '../../helper/options.const';
import TodoContextProvider from '../../context/todo/TodoContext';

import './Home.css';
import { useState } from 'react';


function Home(): JSX.Element {
    // const [option, setOption] = useState(OPTIONS.ALL);
    return (
        <AuthenticatedWrapper>
            <TodoContextProvider>
                <div className='todo-page'>
                    <Sidebar />
                    <Main />
                </div>
            </TodoContextProvider>
        </AuthenticatedWrapper>
    );
};

export default Home;