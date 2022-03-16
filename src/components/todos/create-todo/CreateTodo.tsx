import { useForm } from 'react-hook-form';
import ErrorMessage from '../../form/ErrorMessage';
import { useHttp } from '../../../hooks/useHttp';
import Button from '../../UI/auth-button/Button';
import { useTodoContext } from '../../../context/todo/TodoContext';
import { useClearAllErrors, useFormErrors, useOnSubmit } from './hooks/CreateTodo.hooks';
import './CreateTodo.css';
import { FormData } from "../../../interfaces/Todo";

interface Props {
    fetchTodos: any;
}

function CreateTodo({ fetchTodos }: Props): JSX.Element {
    const { option, setOption } = useTodoContext()
    const { register, handleSubmit, clearErrors: clearFormErrors, formState: { errors }, reset } = useForm<FormData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        criteriaMode: 'all'
    });
    const { isLoading: httpIsLoading, error: httpError, setError, customFetch } = useHttp();
    const { titleErrors, messageErrors } = useFormErrors(errors);
    const clearAllErrors = useClearAllErrors(setError, clearFormErrors);
    const onSubmit = useOnSubmit(customFetch, fetchTodos.bind(null, option), reset, setError, setOption);

    return (
        <div>
            <form className='task-form' onSubmit={handleSubmit(onSubmit)} onChange={clearAllErrors}>
                <h2>New Task</h2>
                <div className='form__input-field'>
                    <input className={["form__input", titleErrors.length ? 'invalid' : ''].join(' ')} {...register('title', {
                        required: true,
                        minLength: 3,
                        maxLength: 64
                    })} placeholder="Title" />
                    {titleErrors.length > 0 && titleErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
                </div>
                <div className='form__input-field'>
                    <textarea rows={5} className={["form__input", messageErrors.length ? 'invalid' : ''].join(' ')} {...register('message', {
                        required: true,
                        minLength: 3,
                        maxLength: 256
                    })} placeholder="Message" />
                    {messageErrors.length > 0 && messageErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
                </div>
                <div className='form__input-field'>
                    <input {...register('completed')} className="form__input" type='checkbox' name='completed' />
                </div>
                {httpError && <ErrorMessage key={httpError.message} message={httpError.message} />}
                <Button className="form-todo-btn" type="submit">Add Task</Button>
            </form>
        </div>
    );
};



export default CreateTodo;