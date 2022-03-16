import { AxiosResponse } from "axios";
import { UseFormClearErrors } from "react-hook-form";
import { populateErrorObject } from "../../../helper/errorsForm.funcions";
import { EmailErrorTypes, PasswordErrorTypes, UsernameErrorTypes } from "../../../helper/errorTypes.const";
import { FormRegisterData, FormRegisterError } from "../../../interfaces/Auth";
import { Config } from "../../../interfaces/Config";
import { CustomFetch, SetError, SetCurrentUser } from "../../../interfaces/Http";

type ClearFormErrors = UseFormClearErrors<FormRegisterData>;
interface UseFormErrorsReturn {
    usernameErrors: string[];
    emailErrors: string[];
    passwordErrors: string[];
}

export function useOnSubmit(customFetch: CustomFetch, setError: SetError, setCurrentUser: SetCurrentUser): (data: FormRegisterData) => void {
    async function onSubmit(data: FormRegisterData) {
        function handleData(response: AxiosResponse) {
            if (response.status === 201) {
                setCurrentUser(response.data.user);
            } else {
                throw new Error(response.statusText);
            }
        }
        try {
            const config: Config = {
                url: '/api/users/register',
                method: 'post',
                data
            };
            customFetch(config, handleData);
        } catch (error) {
            setError(error);
        }
    }

    return onSubmit;
}

export function useFormErrors(errors: FormRegisterError): UseFormErrorsReturn {
    const emailErrors: string[] = [];
    const passwordErrors: string[] = [];
    const usernameErrors: string[] = [];

    populateErrorObject(emailErrors, errors.email, EmailErrorTypes);
    populateErrorObject(passwordErrors, errors.password, PasswordErrorTypes);
    populateErrorObject(usernameErrors, errors.username, UsernameErrorTypes);

    return {
        emailErrors,
        passwordErrors,
        usernameErrors
    };
}

export function useClearAllErrors(setError: SetError, clearFormErrors: ClearFormErrors): () => void {
    return function () {
        setError(null);
        clearFormErrors();
    };
}