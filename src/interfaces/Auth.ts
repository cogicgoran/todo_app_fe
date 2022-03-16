import { FieldError } from "react-hook-form";

export interface FormLoginData {
    email: string;
    password: string;
}

export interface FormRegisterData extends FormLoginData {
    username: string;
}

export interface FormLoginError {
    email?: FieldError | undefined;
    password?: FieldError | undefined;
}

export interface FormRegisterError extends FormLoginError { 
    username?: FieldError | undefined;
}