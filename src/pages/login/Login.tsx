import { useUserContext } from '../../context/current-user/CurentUserContext';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMessage from '../../components/form/ErrorMessage';
import Button from "../../components/UI/auth-button/Button";
import './Login.css';
import { useHttp } from "../../hooks/useHttp";
import { FormLoginData } from "../../interfaces/Auth";
import { useClearAllErrors, useFormErrors, useOnSubmit } from "./hooks/Login.hooks";
import { PATHS } from '../../helper/paths.const';

function Login(): JSX.Element {
    const { register, handleSubmit, clearErrors: clearFormErrors, formState: { errors } } = useForm<FormLoginData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        criteriaMode: 'all'
    });
    const { emailErrors, passwordErrors } = useFormErrors(errors);
    const { isLoading: httpIsLoading, error: httpError, setError, customFetch } = useHttp();
    const { setCurrentUser } = useUserContext();
    const onSubmit = useOnSubmit(customFetch, setError, setCurrentUser);
    const clearAllErrors = useClearAllErrors(setError, clearFormErrors);

    return (
        <div className="auth-page">
            <form className="form" onSubmit={handleSubmit(onSubmit)} onChange={() => clearAllErrors()}>
                <div className='form__input-field'>
                    <input className={["form__input", emailErrors.length ? 'invalid' : ''].join(' ')} {...register('email', {
                        required: true,
                        validate: {
                            invalidEmail: (value) => /\S+@\S+\.\S+/.test(value),
                        }
                    })} placeholder="email" autoComplete="off" />
                    {emailErrors.length > 0 && emailErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
                </div>
                <div className="form__input-field">
                    <input className={["form__input", passwordErrors.length ? 'invalid' : ''].join(' ')} {...register('password', {
                        required: true,
                        minLength: 8
                    })} placeholder="password" type='password' autoComplete="off" />
                    {passwordErrors.length > 0 && passwordErrors.map(errorMessage => <ErrorMessage key={errorMessage} message={errorMessage} />)}
                </div>
                {httpError && <ErrorMessage key={httpError.message} message={httpError.message} />}
                <Button className="form-auth-btn" type="submit">LOGIN</Button>
            </form>
            <p><Link className="form-auth-link" to={PATHS.PASSWORD_RESET}>Forgot password?</Link></p>
            <p><Link className="form-auth-link" to={PATHS.REGISTER}>Don't have an account? Register here</Link></p>
        </div>
    );
}

export default Login;