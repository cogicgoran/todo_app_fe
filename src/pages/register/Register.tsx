import { useUserContext } from '../../context/current-user/CurentUserContext';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../components/form/ErrorMessage';
import Button from '../../components/UI/auth-button/Button';
import { useHttp } from '../../hooks/useHttp';
import { useClearAllErrors, useFormErrors, useOnSubmit } from './hooks/Register.hooks';
import { FormRegisterData } from '../../interfaces/Auth';

function Register(): JSX.Element {
    const { register, handleSubmit, clearErrors: clearFormErrors, formState: { errors } } = useForm<FormRegisterData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        criteriaMode: 'all'
    });
    const { usernameErrors, emailErrors, passwordErrors } = useFormErrors(errors);
    const { isLoading: httpIsLoading, error: httpError, setError, customFetch } = useHttp();
    const { setCurrentUser } = useUserContext();
    const onSubmit = useOnSubmit(customFetch, setError, setCurrentUser);
    const clearAllErrors = useClearAllErrors(setError, clearFormErrors);

    return <div className='auth-page'>
        <form className='auth-form' onSubmit={handleSubmit(onSubmit)} onChange={() => clearAllErrors()}>
            <div className='form__input-field'>
                <input className={["form__input", usernameErrors.length ? 'invalid' : ''].join(' ')} {...register('username', {
                    required: true
                })} placeholder='username' autoComplete="off" />
                {usernameErrors.length > 0 && usernameErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
            </div>
            <div className='form__input-field'>
                <input className={["form__input", emailErrors.length ? 'invalid' : ''].join(' ')} {...register('email', {
                    required: true,
                    validate: {
                        invalidEmail: (value) => /\S+@\S+\.\S+/.test(value),
                    }
                })} placeholder="email" autoComplete="off" />
                {emailErrors.length > 0 && emailErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
            </div>
            <div className='form__input-field'>
                <input className={["form__input", passwordErrors.length ? 'invalid' : ''].join(' ')} {...register('password', {
                    required: true,
                    minLength: 8
                })} placeholder="password" autoComplete="off" type='password' />
                {passwordErrors.length > 0 && passwordErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
            </div>
            {httpError && <ErrorMessage key={httpError.message} message={httpError.message} />}
            <Button className='form-auth-btn' type='submit'>REGISTER</Button>
        </form>
        <Link className="form-auth-link" to='/login'>Already have an account? Login here</Link>
    </div>
}

export default Register;