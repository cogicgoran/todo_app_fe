import axios, { AxiosResponse } from "axios";
import { populateErrorObject } from "../../../../helper/errorsForm.funcions";
import { MessageErrorTypes, TitleErrorTypes } from "../../../../helper/errorTypes.const";
import { Config } from "../../../../interfaces/Config";
import { FetchTodos, FormData, FormError, SetIsEditing } from "../../../../interfaces/Todo";
import { CustomFetch, SetError } from "../../../../interfaces/Http";
import { UseFormClearErrors } from "react-hook-form";

type ClearFormErrors = UseFormClearErrors<FormData>;
interface UseFormErrorsReturn {
    titleErrors: string[];
    messageErrors: string[];
}

export function useOnSubmit(customFetch: CustomFetch, fetchTodos: FetchTodos, setError: SetError, setIsEditing: SetIsEditing, id: string): (data: FormData) => void {
    async function onSubmit(data: FormData) {
        function handleData(response: AxiosResponse) {
            if (response.status === 201) {
                fetchTodos();
                setIsEditing(false);
            } else {
                throw new Error(response.statusText);
            }
        }

        try {
            const config: Config = {
                url: `/api/todo/id/${id}`,
                method: "put",
                data,
            };
            customFetch(config, handleData);
        } catch (error) {
            setError(error);
        }
    }
    return onSubmit;
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

export function useHandles(id: any, fetchTodos: any) {
    async function handleClick() {
        try {
            const response = await axios.delete(`/api/todo/id/${id}`);
            if (response.status === 200) {
                fetchTodos();
            } else {
                alert("something went wrong");
            }
        } catch (error) {
            alert(JSON.stringify(error, null, 2));
        }
    }

    async function handleUpdate() {
        try {
            const response = await axios.patch(`/api/todo/id/${id}`);
            if (response.status === 201) {
                fetchTodos();
            } else {
                alert("something went wrong");
            }
        } catch (error) {
            alert(JSON.stringify(error, null, 2));
        }
    }
    return { handleClick, handleUpdate };
}

export function useClearAllErrors(setError: SetError, clearFormErrors: ClearFormErrors):() => void  {
    return function () {
        setError(null);
        clearFormErrors();
    };
}