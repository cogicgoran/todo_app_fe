interface Errors {
    [name: string]: string;
}

export function populateErrorObject(newErrorObject : any, errorObject: any, errorMapper: Errors): void {
    for (const iterator in errorObject?.types) {
        for (const errorType in errorMapper) {
            if (iterator === errorType) {
                newErrorObject.push(errorMapper[errorType]);
                break;
            }
        }
    }
}