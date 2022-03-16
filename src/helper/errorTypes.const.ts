interface Errors {
    [name: string]: string;
}

export const EmailErrorTypes: Errors = Object.freeze({
    required: 'Field required!',
    invalidEmail: 'Invalid email!'
});

export const PasswordErrorTypes: Errors = Object.freeze({
    required: 'Field required!',
    minLength: 'Password too short! (Min 8 characters)',
    maxLength: 'Password too long! (Max 128 characters)',
});

export const UsernameErrorTypes: Errors = Object.freeze({
    required: 'Field required!',
    minLength: 'Username too short! (Min 4 characters)',
    maxLength: 'Username too long! (Max 32 characters)',
});

export const TitleErrorTypes: Errors = Object.freeze({
    required: 'Field required!',
    minLength: 'Title too short! (Min 3 characters)',
    maxLength: 'Title too long! (Max 64 characters)'
});

export const MessageErrorTypes: Errors = Object.freeze({
    required: 'Field required!',
    minLength: 'Message too short! (Min 3 characters)',
    maxLength: 'Message too long! (Max 256 characters)'
});