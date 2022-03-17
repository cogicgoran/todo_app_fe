import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import ErrorMessage from "../../components/form/ErrorMessage";
import Button from "../../components/UI/auth-button/Button";
import { PATHS } from "../../helper/paths.const"
import { useHttp } from "../../hooks/useHttp";
import { FormPasswordResetData } from "../../interfaces/Auth";
import { useClearAllErrors, useFormErrors, useOnSubmit } from "./hooks/PasswordReset.hooks";

function PasswordReset(): JSX.Element {
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { register, handleSubmit, clearErrors: clearFormErrors, formState: { errors } } = useForm<FormPasswordResetData>({
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        criteriaMode: 'all'
    });
    const { isLoading: httpIsLoading, error: httpError, setError, customFetch } = useHttp();
    const onSubmit = useOnSubmit(customFetch, setError, setIsEmailSent, setIsButtonDisabled);
    const { emailErrors } = useFormErrors(errors);
    const clearAllErrors = useClearAllErrors(setError, clearFormErrors);

    useEffect(() => {
        if (isEmailSent) {
            setTimeout(() => {
                setIsButtonDisabled(false);
            }, 10000);
        }
    }, [isEmailSent]);

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
                {httpError && <ErrorMessage key={httpError.message} message={httpError.message} />}
                {isEmailSent && <p>Recovery code sent. Please check your email</p>}
                <Button className="form-auth-btn" type="submit" disabled={isEmailSent}>RESET PASSWORD</Button>
            </form>
            <p><Link className="form-auth-link" to={PATHS.LOGIN}>Login</Link></p>
            <p><Link className="form-auth-link" to={PATHS.REGISTER}>Don't have an account?<br /> Register here</Link></p>
        </div>
    )
}

export default PasswordReset