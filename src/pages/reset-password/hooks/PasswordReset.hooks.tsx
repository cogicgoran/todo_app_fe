import { AxiosResponse } from "axios";
import { UseFormClearErrors } from "react-hook-form";
import { populateErrorObject } from "../../../helper/errorsForm.funcions";
import { EmailErrorTypes } from "../../../helper/errorTypes.const";
import { PATHS } from "../../../helper/paths.const";
import { FormPasswordResetData, FormPasswordResetError } from "../../../interfaces/Auth";
import { Config } from "../../../interfaces/Config";
import { CustomFetch, SetError } from "../../../interfaces/Http";

interface UseFormErrorsReturn {
    emailErrors: string[];
}
type ClearFormErrors = UseFormClearErrors<FormPasswordResetData>;
type setIsEmailSentType = React.Dispatch<React.SetStateAction<boolean>>;
type setIsButtonDisabledType = React.Dispatch<React.SetStateAction<boolean>>;

export function useFormErrors(errors: FormPasswordResetError): UseFormErrorsReturn {
    const emailErrors: string[] = [];
    populateErrorObject(emailErrors, errors.email, EmailErrorTypes);
    return {
        emailErrors
    };
}

export function useOnSubmit(customFetch: CustomFetch, setError: SetError, setIsEmailSent: setIsEmailSentType, setIsButtonDisabled: setIsButtonDisabledType): (data: FormPasswordResetData) => void {
    async function onSubmit(data: FormPasswordResetData)  {
        function handleData(response: AxiosResponse) {
            if (response.status === 200) {
                setIsEmailSent(true);
                setIsButtonDisabled(true);
            } else {
                throw new Error(response.statusText);
            }
        }
        try {
            const config: Config = {
                url: '/api/users/password-reset',
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