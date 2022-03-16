import { AxiosResponse } from "axios";
import { UseFormClearErrors, UseFormReset } from "react-hook-form";
import { populateErrorObject } from "../../../../helper/errorsForm.funcions";
import { MessageErrorTypes, TitleErrorTypes } from "../../../../helper/errorTypes.const";
import { OPTIONS } from "../../../../helper/options.const";
import { Config } from "../../../../interfaces/Config";
import { CustomFetch, SetError } from "../../../../interfaces/Http";
import { FormError, FormData, FetchTodos, SetOption } from "../../../../interfaces/Todo";

type ClearFormErrors = UseFormClearErrors<FormData>;
type FormReset = UseFormReset<FormData>;

interface UseFormErrorsReturn {
    titleErrors: string[];
    messageErrors: string[];
}

export function useFormErrors(errors: FormError): UseFormErrorsReturn {
    const titleErrors: string[] = [];
    const messageErrors: string[] = [];
    populateErrorObject(titleErrors, errors.title, TitleErrorTypes);
    populateErrorObject(messageErrors, errors.message, MessageErrorTypes);
    return {
        titleErrors,
        messageErrors
    };
}

export function useOnSubmit(customFetch: CustomFetch, fetchTodos: FetchTodos, reset: FormReset, setError: SetError, setOption: SetOption) {
    async function onSubmit(data: FormData) {
        function handleData(response: AxiosResponse) {
            if (response.status === 201) {
                reset();
                fetchTodos();
                setOption(OPTIONS.ALL);
            } else {
                throw new Error(response.statusText);
            }
        }

        try {
            const config: Config = {
                url: '/api/todo',
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