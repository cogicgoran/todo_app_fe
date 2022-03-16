import { FieldError } from "react-hook-form";

export type FetchTodos = (option?: string) => void;
export type SetIsEditing = React.Dispatch<React.SetStateAction<boolean>>;
export type SetOption = React.Dispatch<React.SetStateAction<string>>;

export interface FormData {
    title: string;
    message: string;
    completed: boolean;
}

export interface FormError {
    title?: FieldError | undefined;
    message?: FieldError | undefined;
}

