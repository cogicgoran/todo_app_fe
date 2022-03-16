import { AxiosResponse } from "axios";
import { populateErrorObject } from "../../../helper/errorsForm.funcions";
import { EmailErrorTypes, PasswordErrorTypes } from "../../../helper/errorTypes.const";
import { Config } from "../../../interfaces/Config";
import { FormLoginError, FormLoginData } from "../../../interfaces/Auth";
import { UseFormClearErrors } from "react-hook-form";
import { CustomFetch, SetCurrentUser, SetError } from "../../../interfaces/Http";

type ClearFormErrors = UseFormClearErrors<FormLoginData>;
interface UseFormErrorsReturn {
    emailErrors: string[];
    passwordErrors: string[];
}

export function useOnSubmit(customFetch: CustomFetch, setError: SetError, setCurrentUser: SetCurrentUser): (data: FormLoginData) => void {
    async function onSubmit(data: FormLoginData) {
        function handleData(response: AxiosResponse) {
            if (response.status === 200) {
                setCurrentUser(response.data.user);
            } else {
                throw new Error(response.statusText);
            }
        }
        try {
            const config: Config = {
                url: '/api/users/login',
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

export function useClearAllErrors(setError: SetError, clearFormErrors: ClearFormErrors): () => void {
    return function () {
        setError(null);
        clearFormErrors();
    }
}

export function useFormErrors(errors: FormLoginError): UseFormErrorsReturn {
    const emailErrors: string[] = [];
    const passwordErrors: string[] = [];

    populateErrorObject(emailErrors, errors.email, EmailErrorTypes);
    populateErrorObject(passwordErrors, errors.password, PasswordErrorTypes);

    return {
        emailErrors,
        passwordErrors
    };
}