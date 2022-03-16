import axios from 'axios';
import { useEffect, useState } from 'react';
import CreateTodo from '../create-todo/CreateTodo';
import TodoList from '../todo-list/TodoList';
import { OPTIONS } from '../../../helper/options.const';

import './Main.css';
import { useTodoContext } from '../../../context/todo/TodoContext';

interface Todo {
    title: string;
    message: string;
}


function Main(): JSX.Element {
    const { option } = useTodoContext();
    const {todos, fetchTodos} = useTodo(option);

    return (
        <div className='main'>
            <CreateTodo fetchTodos={fetchTodos} />
            <TodoList todos={todos} fetchTodos={fetchTodos} />
        </div>
    )
}

function useTodo(option: string) {
    const [todos, setTodos] = useState<Todo[]>([]);
    async function fetchTodos(option: string = OPTIONS.ALL) {
        try {
            const response = await axios.get(`/api/todo/${option}`);
            if(response.status === 200) {
                setTodos(response.data.todos);
            }else {
                alert('something went wreng');
            }
        }catch(error) {
            alert(JSON.stringify(error, null, 2));
        }
    }

    useEffect(() => {
        fetchTodos(option);
    }, [option])

    return {todos, fetchTodos};
}

export default Main