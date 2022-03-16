import axios from 'axios';
import TodoItem from '../todo-item/TodoItem';
import './TodoList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useTodoContext } from '../../../context/todo/TodoContext';
import { OPTIONS } from '../../../helper/options.const';

interface Todo {
    title: string;
    message: string;
    completed: boolean;
    _id: string;
}

interface Props {
    todos: any[];
    fetchTodos: (option?: string) => void;
}


function CreateTodo({ todos, fetchTodos }: Props): JSX.Element {
    const { option, setOption } = useTodoContext();
    // For testing
    let dummyLongString = '';
    let dummyLongTitle = '';
    for (let i = 0; i < 30; i++) {
        dummyLongString += 'test123';
        dummyLongTitle += 'tt';
    }
    const dummyItemNotCompleted = <TodoItem title={dummyLongTitle} message={dummyLongString} completed={false} id='id1' fetchTodos={fetchTodos} />
    const dummyItemCompleted = <TodoItem title='TitelComplet' message='Mesaz copmlet' completed={true} id='id2' fetchTodos={fetchTodos} />

    async function deleteAll() {
        try {
            const response = await axios.delete(`/api/todo/${option}`);
            if (response.status === 200) {
                fetchTodos(option);
                setOption(OPTIONS.ALL);
            } else {
                alert('Something went wraeng');
            }
        } catch (error) {
            alert(JSON.stringify(error, null, 2));
        }
    }

    return (
        <div className='task-list'>
            {todos.map((todo: Todo) => {
                return <TodoItem key={todo._id} title={todo.title} message={todo.message} completed={todo.completed} id={todo._id} fetchTodos={fetchTodos} />
            })}
            {/* {[dummyItemCompleted, dummyItemNotCompleted]} */}
            <div className='task-delete-all'>
                {todos.length > 0 && <button className='task-delete-all-btn' onClick={deleteAll}><FontAwesomeIcon icon={faTrashAlt} />Delete All<FontAwesomeIcon icon={faTrashAlt} /></button>}
            </div>
        </div>
    );
};

export default CreateTodo;